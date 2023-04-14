using System.Text.Json;
using Azure.Data.Tables;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tech_test_payment_api.Context;
using tech_test_payment_api.Models;
using tech_test_payment_api.Models.Helpers;

namespace tech_test_payment_api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  [Produces("application/json")]
  [Consumes("application/json")]
  public class OrderRegistryController : ControllerBase
  {
    private readonly OrderContext _context;
    private readonly string _storageAccConnection;
    private readonly string _tableName;
    private TableClient _tableClient;
    public OrderRegistryController(OrderContext context, IConfiguration configuration)
    {
      _context = context;
      _storageAccConnection = configuration.GetValue<string>("ConnectionStrings:StorageAccConnection");
      _tableName = configuration.GetValue<string>("ConnectionStrings:AzureOrderTable");
      _tableClient = ContextHelper.GetAzureTableClientAsync(_tableName, _storageAccConnection).GetAwaiter().GetResult();
    }

    /// <summary>
    /// Registers a new 'order registry' if the 'seller' is already registered.
    /// </summary>
    /// <param name="orderRegistry"></param>
    /// <returns>A newly created 'order registry'</returns>
    /// <remarks>
    /// Example of request (required parameters):
    /// Id-> auto-incremented by SQL.
    /// POST /OrderRegistry
    /// {
    /// "sellerId": 1,
    /// "sellerCpf": "88855849688",
    /// "orderNumber": "+5547988884444",
    /// "orderProducts": "#Item 1 (min. 1 item) -> based on OrderProduct class",
    /// }
    /// </remarks>
    /// <response code="201">If the order was successfully created</response>
    /// <response code="400">If the credentials are incorrect</response>
    /// <response code="404">If the order is not found</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> CreateOrderRegistry(OrderRegistry orderRegistry)
    {
      Seller? registeredSeller = await _context.Sellers.FindAsync(orderRegistry.SellerId);
      if (registeredSeller == null)
      {
        return NotFound(StatusMessage.ShowErrorMessage(ClassType.Seller, $"{orderRegistry.SellerId}", ContextHelper.GetCurrentCatalog(_context), ActionType.Get));
      }
      if (registeredSeller.Cpf != orderRegistry.SellerCpf)
      {
        return BadRequest("Seller's CPF number is wrong, try again.");
      }
      orderRegistry.StatusMessage = StatusMessage.ShowStatusMessage(OrderStatus.Awaiting);
      if (orderRegistry.OrderProductsJson == string.Empty)
      {
        return BadRequest("An order registry must have at least 1 product.");
      }
      if (registeredSeller != null)
      {
        _context.Entry(registeredSeller).State = EntityState.Detached;
        string orderNumber = ContextHelper.GenerateOrderNumber();
        orderRegistry.OrderNumber =ContextHelper.GenerateOrderNumber();
        
        if (_context.Entry(registeredSeller).State == EntityState.Detached)
        {
          await _context.OrderRegistries.AddAsync(orderRegistry);
          await _context.SaveChangesAsync();

          OrderRegistryLog orderRegistryLog = new OrderRegistryLog(orderRegistry, ActionType.Insert, orderRegistry.OrderNumber, Guid.NewGuid().ToString());
          await _tableClient.UpsertEntityAsync(orderRegistryLog);
        }
      }

      return CreatedAtAction(nameof(GetOrderRegistryById), new { id = orderRegistry.Id }, orderRegistry);
    }

    /// <summary>
    /// Fetches all order registry logs from the Azure Table.
    /// </summary>
    /// <returns>A list of all order registry logs</returns>
    /// <remarks>
    /// Request example:
    ///
    /// GET /api/orderregistrylogs
    ///
    /// </remarks>
    /// <response code="200">Returns a list of all order registry logs</response>
    [HttpGet]
    [Route("OrderRegistryLogs")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult GetAllOrderRegistryLogs()
    {
      List<OrderRegistryLog> logs = _tableClient.Query<OrderRegistryLog>().ToList();
      return Ok(logs);
    }

    /// <summary>
    /// Fetches all registered purchase orders.
    /// </summary>
    /// <returns>A list of all purchase orders</returns>
    /// <remarks>
    /// Request example:
    /// 
    ///     GET /api/orders
    ///     
    /// </remarks>
    /// <response code="200">Returns a list of all purchase orders</response>
    [HttpGet]
    [Route("OrderRegistries")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult GetAllOrders()
    {
      List<OrderRegistry> orders = _context.OrderRegistries.ToList();
      return Ok(orders);
    }

    /// <summary>
    /// Fetches all registered purchase orders from a specified seller.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>A list of all purchase orders based on seller's id</returns>
    /// <remarks>
    /// Request example:
    /// 
    ///     GET /api/orders/seller/id
    ///     
    /// </remarks>
    /// <response code="200">Returns a list of all purchase orders from specified seller</response>
    [HttpGet("SellerId/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult GetAllOrdersFromSeller(int id)
    {
      List<OrderRegistry> orders = _context.OrderRegistries.Where(o => o.SellerId == id).ToList();

      if (!orders.Any())
      {
        return NotFound($"No orders found for seller with id {id}.");
      }
      return Ok(orders);
    }

    /// <summary>
    /// Fetches all order registry logs with the specified partitionkey based on a seller's .
    /// </summary>
    /// <param name="cpf"></param>
    /// <returns>A list of all order registry logs for the seller</returns>
    /// <remarks>
    /// Request example:
    ///
    /// GET /api/orderregistrylogs?cpf=12345678901
    ///
    /// </remarks>
    /// <response code="200">Returns a list of all order registry logs for the seller</response>
    [HttpGet("OrderRegistryLogs/{cpf}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult GetSellerLogs(string cpf)
    {
      var logs = _tableClient.Query<OrderRegistryLog>().Where(l => l.PartitionKey == cpf).ToList();
      return Ok(logs);
    }

    /// <summary>
    /// Fetches an 'order registry' based on the given id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>A found purchase order</returns>
    /// <remarks>
    ///   Request example (mandatory parameters):         
    ///
    ///     GET /OrderRegistry
    ///     {
    ///        "id": 1,
    ///     }
    /// </remarks>
    /// <response code="200">If the request returns an 'order registry'</response>
    /// <response code="404">If the order is not found</response>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetOrderRegistryById(int id)
    {
      OrderRegistry? orderRegistry = await _context.OrderRegistries.FindAsync(id);
      if (orderRegistry == null)
      {
        return NotFound(StatusMessage.ShowErrorMessage(ClassType.OrderRegistry, $"{id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Get));
      }

      return Ok(orderRegistry);
    }

    /// <summary>
    /// Updates the status and other information of an 'order registry', based on the given id, according to the operation flow.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="newStatus"></param>
    /// <returns>The updated purchase order</returns>
    /// <remarks>
    ///   Request example (mandatory parameters):
    ///   OrderStatus -> 0: Awaiting payment, 1: Payment approved, 2: Sent to carrier, 3: Delivered, 4: Cancelled, 5: Not allowed              
    ///
    ///     PUT /OrderRegistry
    ///     {
    ///        "id": 1,
    ///        "orderStatus": 0-5 (according to enum),
    ///     }
    /// </remarks>
    /// <response code="200">If the order is updated successfully</response>
    /// <response code="400">If the credentials are wrong</response>
    /// <response code="404">If the order is not found</response>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> EditOrderRegistry(int id, OrderStatus newStatus)
    {
      OrderRegistry? orderRegistryToEdit = await _context.OrderRegistries.FindAsync(id);
      if (orderRegistryToEdit == null)
      {
        return NotFound(StatusMessage.ShowErrorMessage(ClassType.OrderRegistry, $"{id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Get));
      }
      OrderStatus oldStatus = orderRegistryToEdit.OrderStatus;

      if (orderRegistryToEdit.OrderStatus == OrderStatus.Canceled)
      {
        return BadRequest("Order was canceled.");
      }

      orderRegistryToEdit.OrderStatus = VerifyNewStatus(orderRegistryToEdit.OrderStatus, newStatus);

      if (orderRegistryToEdit.OrderStatus == OrderStatus.NotAllowed)
      {
        return BadRequest("Couldn't change the status of this order, please check the status changing rules.");
      }
      orderRegistryToEdit.StatusMessage = StatusMessage.ShowStatusMessage(orderRegistryToEdit.OrderStatus);

      _context.OrderRegistries.Update(orderRegistryToEdit);
      await _context.SaveChangesAsync();

      OrderRegistryLog orderRegistryLog = new OrderRegistryLog(orderRegistryToEdit, ActionType.Update, orderRegistryToEdit.OrderNumber, Guid.NewGuid().ToString());
      await _tableClient.UpsertEntityAsync(orderRegistryLog);

      return Ok(StatusMessage.ShowConfirmationMessage(ClassType.OrderRegistry, $"{orderRegistryToEdit.Id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Update));
    }

    /// <summary>
    /// Removes a specified 'order registry' from database, based on the given id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Confirmation that the object was removed</returns>
    /// <remarks>
    ///   Request example (mandatory parameters):
    ///     DELETE /OrderRegistry
    ///     {
    ///        "id": 1,
    ///     }
    /// </remarks>
    /// <response code="200">If the order is removed successfully</response>
    /// <response code="400">If the credentials are wrong</response>
    /// <response code="404">If the order is not found</response>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteOrderRegistry(int id)
    {
      OrderRegistry? orderRegistryToDelete = await _context.OrderRegistries.FindAsync(id);

      if (orderRegistryToDelete == null)
      {
        return NotFound(StatusMessage.ShowErrorMessage(ClassType.OrderRegistry, $"{id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Remove));
      }

      _context.OrderRegistries.Remove(orderRegistryToDelete);
      await _context.SaveChangesAsync();

      OrderRegistryLog orderRegistryLog = new OrderRegistryLog(orderRegistryToDelete, ActionType.Update, orderRegistryToDelete.OrderNumber, Guid.NewGuid().ToString());
      await _tableClient.UpsertEntityAsync(orderRegistryLog);

      return Ok(StatusMessage.ShowConfirmationMessage(ClassType.OrderRegistry, $"{orderRegistryToDelete.Id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Remove));
    }

    #region Auxiliary Methods
    private OrderStatus VerifyNewStatus(OrderStatus oldStatus, OrderStatus newStatus)
    {
      OrderStatus resultStatus = new OrderStatus();

      switch (newStatus)
      {
        case OrderStatus.Awaiting:
          resultStatus = oldStatus == OrderStatus.Awaiting ? newStatus : OrderStatus.NotAllowed;
          break;
        case OrderStatus.Approved:
          resultStatus = oldStatus == OrderStatus.Awaiting ? newStatus : OrderStatus.NotAllowed;
          break;
        case OrderStatus.Transporting:
          resultStatus = oldStatus == OrderStatus.Approved ? newStatus : OrderStatus.NotAllowed;
          break;
        case OrderStatus.Delivered:
          resultStatus = oldStatus == OrderStatus.Transporting ? newStatus : OrderStatus.NotAllowed;
          break;
        case OrderStatus.Canceled:
          resultStatus = oldStatus == OrderStatus.Transporting || oldStatus == OrderStatus.Delivered ? OrderStatus.NotAllowed : newStatus;
          break;
        default:
          resultStatus = oldStatus;
          break;
      }
      return resultStatus;
    }
    #endregion
  }
}
