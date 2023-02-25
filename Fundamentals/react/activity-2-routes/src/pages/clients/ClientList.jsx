import { React, useState } from "react";
import TitlePage from "../../components/TitlePage";
import { useNavigate } from "react-router-dom";
import { Button, InputGroup, Form } from "react-bootstrap";

const clients = [
  {
    id: 1,
    name: "MicroLins",
    responsible: "Osvald",
    contact: 12124356,
    status: "Active",
  },
  {
    id: 2,
    name: "PowerSoft",
    responsible: "Rosane",
    contact: 48561122,
    status: "Deactivated",
  },
  {
    id: 3,
    name: "SoftPlus",
    responsible: "Elizabeth",
    contact: 65582234,
    status: "Active",
  },
  {
    id: 4,
    name: "SoftInfo",
    responsible: "Larissa",
    contact: 55668879,
    status: "Deactivated",
  },
  {
    id: 5,
    name: "TechPlus",
    responsible: "Gerald",
    contact: 12647788,
    status: "Pending",
  },
];

export default function ClientList() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredClients = clients.filter((client) => {
    return Object.values(client)
      .join(" ") //transform into string, trim by space
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const newClient = () => {
    navigate("/client/detail");
  };

  return (
    <>
      <TitlePage title={"Client List"}>
        <Button variant="outline-success" onClick={newClient}>
          <i className="fas fa-plus me-2" />
          New Client
        </Button>
      </TitlePage>
      <hr />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
        <Form.Control
          placeholder="Search clients by name..."
          onChange={handleInputChange}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark mt-3">
            <tr>
              <th scope="col">#Id</th>
              <th scope="col">Name</th>
              <th scope="col">Responsible</th>
              <th scope="col">Contact</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.responsible}</td>
                <td>{client.contact}</td>
                <td>{client.status}</td>
                <td>
                  <div>
                    <button
                      className="btn btn-me btn-outline-primary me-2"
                      onClick={() => navigate(`client/detail/${client.id}`)}
                    >
                      <i className="fas fa-pen me-2"></i>
                      Edit
                    </button>
                    <button className="btn btn-me btn-outline-danger me-2">
                      <i className="fas fa-duotone fa-power-off me-2"></i>
                      Deactivate
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
