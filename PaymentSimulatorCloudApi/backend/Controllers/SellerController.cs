using Azure.Data.Tables;
using Microsoft.AspNetCore.Mvc;
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
            _tableName = configuration.GetValue<string>("ConnectionStrings:AzureTableName");
            _tableClient = ContextHelper.GetAzureTableClient(_tableName, _storageAccConnection);
        }

        /// <summary>
        /// Registers a new seller in the database.
        /// </summary>
        /// <param name="SellerToRegister"></param>
        /// <returns>A newly registered seller</returns>
        /// <remarks>
        /// Example of request (mandatory parameters):
        /// Id -> auto-incremented by SQL.
        ///
        /// POST /Seller
        /// {
        /// "cpf": "555555888-88",
        /// }
        /// </remarks>
        /// <response code="201">If the seller was successfully registered</response>
        /// <response code="400">If the credentials are incorrect</response>
        // // // /// <response code="404">If the seller is not found</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult RegisterSeller(Seller seller)
        {
            _context.Add(seller);
            _context.SaveChanges();

            SellerLog sellerLog = new SellerLog(seller, ActionType.Insert, seller.Cpf, Guid.NewGuid().ToString());
            _tableClient.UpsertEntity(sellerLog);

            return CreatedAtAction(nameof(GetSellerById), new { id = seller.Id }, seller);
        }

        /// <summary>
        /// Searches for a seller based on the provided Id.
        /// </summary>
        /// <param name="SellerToFind"></param>
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
        public IActionResult GetSellerById(int id)
        {
            var seller = _context.Sellers.Find(id);
            if (seller == null)
            {
                return NotFound(StatusMessage.ShowErrorMessage(ClassType.Seller, $"{id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Get));
            }
            return Ok(seller);
        }

        /// <summary>
        /// Updates the information of a previously registered seller.
        /// </summary>
        /// <param name="SellerToUpdate"></param>
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
        public IActionResult EditSellerInfo(int id, Seller seller)
        {
            var sellerToUpdate = _context.Sellers.Find(id);

            if (sellerToUpdate == null)
            {
                return NotFound(StatusMessage.ShowErrorMessage(ClassType.Seller, $"{id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Update));
            }

            sellerToUpdate.Cpf = seller.Cpf;
            sellerToUpdate.Name = seller.Name;
            sellerToUpdate.Email = seller.Email;
            sellerToUpdate.Phone = seller.Phone;

            _context.Sellers.Update(sellerToUpdate);
            _context.SaveChanges();

            SellerLog sellerLog = new SellerLog(seller, ActionType.Update, seller.Cpf, Guid.NewGuid().ToString());
            _tableClient.UpsertEntity(sellerLog);

            return Ok(StatusMessage.ShowConfirmationMessage(ClassType.Seller, $"{sellerToUpdate.Id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Update));
        }

        /// <summary>
        /// Removes a seller from the database according to the provided Id.
        /// </summary>
        /// <param nameof="SellerToDelete"></param>
        /// <returns>Informs which seller has been removed</returns>
        /// <remarks>
        ///   Example request (required parameters):         
        ///
        ///     PUT /Seller
        ///     {
        ///        "id": 1,
        ///     }
        /// </remarks>
        /// <response code="200">If the request successfully removes the seller</response>
        /// <response code="404">If the seller is not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteSellerInfo(int id, Seller seller)
        {
            var sellerToDelete = _context.Sellers.Find(id);

            if (sellerToDelete == null)
            {
                return NotFound(StatusMessage.ShowErrorMessage(ClassType.Seller, $"{id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Get));
            }

            _context.Sellers.Remove(sellerToDelete);
            _context.SaveChanges();

            SellerLog sellerLog = new SellerLog(seller, ActionType.Remove, seller.Cpf, Guid.NewGuid().ToString());
            _tableClient.UpsertEntity(sellerLog);

            return Ok(StatusMessage.ShowConfirmationMessage(ClassType.Seller, $"{sellerToDelete.Id}", ContextHelper.GetCurrentCatalog(_context), ActionType.Remove));
        }
    }
}