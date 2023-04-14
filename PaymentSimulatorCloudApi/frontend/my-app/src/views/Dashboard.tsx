import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard:React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>Welcome to Cloud Payment API</h1>
      <div className="row mt-5">
        <div className="col-sm-6">
          <Card>
            <Card.Header>Sellers</Card.Header>
            <Card.Body>
              <Card.Text>Click here to view the Sellers component</Card.Text>
              <Link to="/sellers">
                <Button variant="primary">Go to Sellers</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-6">
          <Card>
            <Card.Header>Orders</Card.Header>
            <Card.Body>
              <Card.Text>Click here to view the Orders component</Card.Text>
              <Link to="/orders">
                <Button variant="primary">Go to Orders</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
