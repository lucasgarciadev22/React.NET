using Azure.Data.Tables;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tech_test_payment_api.Context;
using tech_test_payment_api.Models;
using tech_test_payment_api.Models.Helpers;

namespace tech_test_payment_api.Controllers
{
  [ApiController]
  [Produces("application/json")]
  [Consumes("application/json")]
  [Route("[controller]")]
  public class SellerController : ControllerBase
  {
    private readonly OrderContext _context;
    private readonly string _storageAccConnection;
    private readonly string _tableName;
    private TableClient _tableClient;

    public SellerController(OrderContext context, IConfiguration configuration)
    {
      _context = context;
      _storageAccConnection = configuration.GetValue<string>("ConnectionStrings:StorageAccConnection");
      _tableName = configuration.GetValue<string>("ConnectionStrings:AzureSellerTable");
      //get async in ctor needs to use GetWaiter and then GetResult to return the object from Task<TableClient>
      _tableClient = ContextHelper.GetAzureTableClient(_tableName, _storageAccConnection);
    }

    /// <summary>
    /// Registers a new 'seller' in the database.
    /// </summary>
    /// <param name="seller"></param>
    /// <returns>A newly created 'seller'</returns>
    /// <remarks>
    /// Example of request (mandatory parameters):
    /// Id -> auto-incremented by SQL.
    ///
    /// POST /Seller
    /// {
    /// "cpf": "55555588888",
    /// }
    /// </remarks>
    /// <response code="201">If the seller was successfully registered</response>
    /// <response code="400">If the credentials are incorrect</response>
    // // // /// <response code="404">If the seller is not found</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RegisterSeller(Seller seller)
    {
      await _context.AddAsync(seller);
      await _context.SaveChangesAsync();

      SellerLog sellerLog = new SellerLog(seller, ActionType.Insert, seller.Cpf, Guid.NewGuid().ToString());
      await _tableClient.UpsertEntityAsync(sellerLog);

      return CreatedAtAction(nameof(GetSellerById), new { id = seller.Id }, seller);
    }

    /// <summary>
    /// Retrieves all sellers from the database.
    /// </summary>
    /// <remarks>
    /// Example of request:
    ///
    /// GET /sellers
    /// </remarks>
    /// <response code="200">Returns a list of all sellers</response>
    [HttpGet]
    [Route("Sellers")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult GetSellers()
    {
      List<Seller> sellers = _context.Sellers.ToList();
      return Ok(sellers);
    }

    /// <summary>
    /// Gets seller logs based on CPF.
    /// </summary>
    /// <param name="cpf"></param>
    /// <returns>List of seller logs</returns>
    /// <remarks>
    /// Example of request:
    ///
    /// GET /SellerLogs?cpf=55555588888
    /// </remarks>
    /// <response code="200">If the request returns seller logs</response>
    /// <response code="404">If no logs are found for the given CPF</response>
    [HttpGet("SellerLogs/{cpf}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetSellerLogsByCpf(string cpf)
    {
      List<SellerLog> logs = _tableClient
          .Query<SellerLog>()
          .Where(x => x.PartitionKey == cpf)
          .ToList();

      if (logs.Count == 0)
      {
        return NotFound("No logs found for this seller...");
      }

      return Ok(logs);
    }

    /// <summary>
    /// Searches for a seller based on the provided Id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    /// <remarks>
    /// Example of request (mandatory parameters):
    ///
    /// GET /Seller
    /// {
    /// "id": 1,
    /// }
    /// </remarks>
    /// <response code="200">If the request returns a seller</response>
    /// <response code="404">If the seller is not found</response>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetSellerById(int id)
    {
      Seller? seller = await _context.Sellers.FindAsync(id);
      if (seller == null)
      {
        return NotFound(StatusMessage.ShowErrorMessage(ClassType.Seller, $"{id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Get));
      }
      return Ok(seller);
    }

    /// <summary>
    /// Searches for a seller based on the provided CPF.
    /// </summary>
    /// <param name="cpf"></param>
    /// <returns></returns>
    /// <remarks>
    /// Example of request (mandatory parameters):
    ///
    /// GET /Seller/Cpf/11511223548
    /// </remarks>
    /// <response code="200">If the request returns a seller</response>
    /// <response code="404">If the seller is not found</response>
    [HttpGet("Cpf/{cpf}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetSellerByCpf(string cpf)
    {
      Seller? seller = await _context.Sellers.FirstOrDefaultAsync(s => s.Cpf == cpf);
      if (seller == null)
      {
        return NotFound(StatusMessage.ShowErrorMessage(ClassType.Seller, $"{cpf}", ContextHelper.GetCurrentCatalog(_context), ActionType.Get));
      }
      return Ok(seller);
    }

    /// <summary>
    /// Updates the information of a previously registered seller.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="seller"></param>
    /// <returns>Updated seller information</returns>
    /// <remarks>
    /// Example of request (required parameters):
    ///
    /// PUT /Seller
    /// {
    /// "id": 1,
    /// }
    /// </remarks>
    /// <response code="200">If the request successfully updates the seller</response>
    /// <response code="404">If the seller is not found</response>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> EditSellerInfo(int id, Seller seller)
    {
      Seller? sellerToUpdate = await _context.Sellers.FindAsync(id);

      if (sellerToUpdate == null)
      {
        return NotFound(StatusMessage.ShowErrorMessage(ClassType.Seller, $"{id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Update));
      }

      sellerToUpdate.Cpf = seller.Cpf;
      sellerToUpdate.Name = seller.Name;
      sellerToUpdate.Email = seller.Email;
      sellerToUpdate.Phone = seller.Phone;

      _context.Sellers.Update(sellerToUpdate);
      await _context.SaveChangesAsync();

      SellerLog sellerLog = new SellerLog(seller, ActionType.Update, seller.Cpf, Guid.NewGuid().ToString());
      await _tableClient.UpsertEntityAsync(sellerLog);

      return Ok(StatusMessage.ShowConfirmationMessage(ClassType.Seller, $"{sellerToUpdate.Id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Update));
    }

    /// <summary>
    /// Removes a seller from the database according to the provided Id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The confirmation message that the seller has been removed</returns>
    /// <remarks>
    /// Example request:
    ///
    ///     DELETE /Seller/1
    /// </remarks>
    /// <response code="200">If the seller has been successfully removed</response>
    /// <response code="404">If the seller with the provided Id is not found</response>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteSellerInfo(int id)
    {
      Seller? sellerToDelete = await _context.Sellers.FindAsync(id);

      if (sellerToDelete == null)
      {
        return NotFound(StatusMessage.ShowErrorMessage(ClassType.Seller, $"{id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Get));
      }

      _context.Sellers.Remove(sellerToDelete);
      await _context.SaveChangesAsync();

      SellerLog sellerLog = new SellerLog(sellerToDelete, ActionType.Remove, sellerToDelete.Cpf, Guid.NewGuid().ToString());
      await _tableClient.UpsertEntityAsync(sellerLog);

      return Ok(StatusMessage.ShowConfirmationMessage(ClassType.Seller, $"{sellerToDelete.Id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Remove));
    }
  }
}