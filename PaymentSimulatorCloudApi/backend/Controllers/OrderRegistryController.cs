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

    public OrderRegistryController(OrderContext context)
    {
      _context = context;
    }

    /// <summary>
    /// Registers the purchase order if the seller is registered.
    /// </summary>
    /// <param name="OrderToRegister"></param>
    /// <returns>A new generated purchase order</returns>
    /// <remarks>
    /// Example of request (required parameters):
    ///
    /// POST /OrderRegistry
    /// {
    /// "sellerId": 0,
    /// "sellerCpf": "888558496-88",
    /// "orderNumber": "89844898",
    /// "orderProducts": "#Item 1 (min. 1 item)",
    /// }
    /// </remarks>
    /// <response code="201">If the order was successfully created</response>
    /// <response code="400">If the credentials are incorrect</response>
    /// <response code="404">If the order is not found</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult CreateOrderRegistry(OrderRegistry orderRegistry)
    {
      var registeredSeller = _context.Sellers.Find(orderRegistry.SellerId);
      if (registeredSeller == null)
      {
        return NotFound(StatusMessage.ShowErrorMessage(ClassType.Seller, $"{orderRegistry.SellerId}", ContextHelper.GetCurrentCatalog(_context), ActionType.Get));
      }
      if (registeredSeller.Cpf != orderRegistry.SellerCpf)
      {
        return BadRequest("Seller's Registration number is wrong, try again.");
      }
      orderRegistry.StatusMessage = StatusMessage.ShowStatusMessage(OrderStatus.Awaiting);
      if (orderRegistry.OrderProductsJson == string.Empty || orderRegistry.OrderProducts == null)
      {
        return BadRequest("An order registry must have at least 1 product.");
      }
      if (registeredSeller != null)
      {
        _context.Entry(registeredSeller).State = EntityState.Detached;
      }
      if (_context.Entry(registeredSeller).State == EntityState.Detached)
      {
        _context.Add(orderRegistry);
        _context.SaveChanges();
      }

      return CreatedAtAction(nameof(GetOrderRegistryById), new { id = orderRegistry.Id }, orderRegistry);
    }

    /// <summary>
    /// Fetches a purchase order based on the provided Id.
    /// </summary>
    /// <param nameof="OrderToFind"></param>
    /// <returns>A found purchase order</returns>
    /// <remarks>
    ///   Request example (mandatory parameters):         
    ///
    ///     GET /OrderRegistry
    ///     {
    ///        "id": 1,
    ///     }
    /// </remarks>
    /// <response code="200">If the request returns a purchase order</response>
    /// <response code="404">If the order is not found</response>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetOrderRegistryById(int id)
    {
      var orderRegistry = _context.OrderRegistries.Find(id);
      if (orderRegistry == null)
      {
        return NotFound(StatusMessage.ShowErrorMessage(ClassType.OrderRegistry, $"{id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Get));
      }
      return Ok(orderRegistry);
    }

    /// <summary>
    /// Updates the status of a purchase order according to the operation flow.
    /// </summary>
    /// <param nameof="OrderToUpdate"></param>
    /// <returns>The updated purchase order</returns>
    /// <remarks>
    ///   Request example (mandatory parameters):
    ///   OrderStatus -> 0: Awaiting payment, 1: Payment approved, 2: Sent to carrier, 3: Delivered, 4: Cancelled, 5: Not allowed              
    ///
    ///     PUT /OrderRegistry
    ///     {
    ///        "id": 0,
    ///        "orderStatus": 0 (according to enum),
    ///     }
    /// </remarks>
    /// <response code="200">If the order is updated successfully</response>
    /// <response code="400">If the credentials are wrong</response>
    /// <response code="404">If the order is not found</response>

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult EditOrderRegistry(int id, OrderStatus newStatus)
    {
      var orderRegistryToEdit = _context.OrderRegistries.Find(id);
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
      _context.SaveChanges();

      return Ok(StatusMessage.ShowConfirmationMessage(ClassType.OrderRegistry, $"{orderRegistryToEdit.Id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Update));
    }

    #region Auxiliary Methods
    OrderStatus VerifyNewStatus(OrderStatus oldStatus, OrderStatus newStatus)
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
