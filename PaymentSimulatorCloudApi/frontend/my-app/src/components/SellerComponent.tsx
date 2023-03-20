import React, { useState } from "react";
import axios from "axios";
import { Seller } from "../models/Seller";

const SellerComponent: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "view" | null>(null);
  const [newSeller, setNewSeller] = useState<Seller>({
    id: 0,
    cpf: "",
    name: "",
    email: "",
    phone: "",
  });

  const fetchSellers = async () => {
    try {
      const response = await axios.get<Seller[]>("/api/sellers");
      setSellers(response.data);
    } catch (error) {
      console.error("Error fetching sellers", error);
    }
  };

  const fetchSellerById = async (id: number) => {
    try {
      const response = await axios.get<Seller>(`/api/sellers/${id}`);
      setSelectedSeller(response.data);
      setMode("view");
    } catch (error) {
      console.error(`Error fetching seller with ID ${id}`, error);
    }
  };

  const createSeller = async () => {
    try {
      await axios.post("/api/sellers", newSeller);
      setNewSeller({
        id: 0,
        cpf: "",
        name: "",
        email: "",
        phone: "",
      });
      setMode(null);
      fetchSellers();
    } catch (error) {
      console.error("Error creating seller", error);
    }
  };

  const updateSeller = async () => {
    if (selectedSeller) {
      try {
        await axios.put(`/api/sellers/${selectedSeller.id}`, selectedSeller);
        setSelectedSeller(null);
        setMode(null);
        fetchSellers();
      } catch (error) {
        console.error(
          `Error updating seller with ID ${selectedSeller.id}`,
          error
        );
      }
    }
  };

  const deleteSeller = async (id: number) => {
    try {
      await axios.delete(`/api/sellers/${id}`);
      fetchSellers();
    } catch (error) {
      console.error(`Error deleting seller with ID ${id}`, error);
    }
  };

  const renderSellers = () => {
    return (
      <ul>
        {sellers.map((seller) => (
          <li key={seller.id}>
            {seller.name} - {seller.email}
            <button onClick={() => fetchSellerById(seller.id)}>View</button>
            <button onClick={() => setSelectedSeller(seller)}>Edit</button>
            <button onClick={() => deleteSeller(seller.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };

  const renderSellerForm = () => {
    const onSubmit = mode === "create" ? createSeller : updateSeller;

    return (
      <form onSubmit={onSubmit}>
        <label>
          CPF:
          <input
            type="text"
            value={selectedSeller?.cpf ?? newSeller.cpf}
            onChange={(event) =>
              setSelectedSeller((prev) =>
                prev ? { ...prev, cpf: event.target.value } : null
              )
            }
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            value={selectedSeller?.name ?? newSeller.name}
            onChange={(event) =>
              setSelectedSeller((prev) =>
                prev ? { ...prev, name: event.target.value } : null
              )
            }
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={selectedSeller?.email ?? newSeller.email}
            onChange={(event) =>
              setSelectedSeller((prev) =>
                prev ? { ...prev, email: event.target.value } : null
              )
            }
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            value={selectedSeller?.phone ?? newSeller.phone}
            onChange={(event) =>
              setSelectedSeller((prev) =>
                prev ? { ...prev, phone: event.target.value } : null
              )
            }
          />
        </label>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setMode(null)}>
          Cancel
        </button>
      </form>
    );
  };

  return (
    <div>
      <h2>Sellers</h2>
      <button onClick={() => setMode("create")}>New Seller</button>
      {mode === "view" && selectedSeller && (
        <div>
          <h3>{selectedSeller.name}</h3>
          <p>
            <strong>CPF:</strong> {selectedSeller.cpf}
          </p>
          <p>
            <strong>Email:</strong> {selectedSeller.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedSeller.phone}
          </p>
          <button onClick={() => setMode("edit")}>Edit</button>
          <button onClick={() => setSelectedSeller(null)}>Back to List</button>
        </div>
      )}
      {(mode === "create" || (mode === "edit" && selectedSeller)) &&
        renderSellerForm()}
      {mode === null && renderSellers()}
    </div>
  );
};

export default SellerComponent;
