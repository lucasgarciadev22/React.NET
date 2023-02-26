import React from "react";
import { Row, Card, Col } from "react-bootstrap";
import TitlePage from "../../components/TitlePage";

const Dashboard:React.FC = () => {
    const borderStyles = {
        border: '2px solid',
    }
  return (
    <>
      <TitlePage title="Dashboard" />
      <div className="mt-3">
        <Row>
          <Col>
            <Card style={borderStyles} border="success" className="border-success bg-light">
              <Card.Header>Total Clients</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h1 className="text-center">25</h1>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={borderStyles} border="secondary bg-light">
              <Card.Header>Total Activities</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h1 className="text-center">256</h1>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={borderStyles} border="warning" className="bg-light">
              <Card.Header>Urgent Activities</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h1 className="text-center">25</h1>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={borderStyles} border="danger" className="bg-light">
              <Card.Header>Late Activities</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h1 className="text-center">2</h1>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;