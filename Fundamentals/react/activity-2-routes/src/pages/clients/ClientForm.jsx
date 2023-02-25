import React from "react";
import TitlePage from "../../components/TitlePage";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function ClientForm() {
  let navigate = useNavigate();
  return (
    <>
      <TitlePage title={"Client Details"}>
        <Button variant="outline-secondary me-2" onClick={()=> navigate('/client/list')}>
          <i className="fas fa-arrow-left me-2"/>
        </Button>
      </TitlePage>
    </>
  );
}
