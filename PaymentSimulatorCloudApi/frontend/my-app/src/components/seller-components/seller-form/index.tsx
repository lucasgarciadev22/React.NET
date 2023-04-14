import React, { useEffect, useState } from "react";
import { ISellerFormProps } from "../../../models/seller-models/ISellerComponentsProps";
import { Button, Form } from "react-bootstrap";
import { GlobalButtonWrapper } from "../../global/GlobalComponents";
import { ISeller } from "../../../models/seller-models/ISeller";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SellerForm: React.FC<ISellerFormProps> = ({
  selectedSeller,
  addSeller,
  updateSeller,
  cancelSeller,
}: ISellerFormProps) => {
  const initialSeller: ISeller = {
    id: 0,
    cpf: "",
    email: "",
    name: "",
    orderCount: 0,
    phone: "",
  };
  const [seller, setSeller] = useState<ISeller>(currentSeller());

  function currentSeller(): ISeller {
    if (selectedSeller.id !== 0) {
      return selectedSeller;
    } else {
      return initialSeller;
    }
  }

  useEffect(() => {
    if (selectedSeller.id !== 0) {
      setSeller(selectedSeller);
    }
  }, [selectedSeller]);

  //#region  Main Form Event Handlers
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedSeller.id !== 0) {
      updateSeller(seller);
    } else addSeller(seller);

    setSeller(initialSeller); //reset seller state
  };

  const handleButtonCancel = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    cancelSeller();

    setSeller(initialSeller);
  };
  //#endregion

  //#region Input Changing Event Handlers
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeller({ ...seller, name: e.target.value });
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeller({ ...seller, cpf: e.target.value });
  };

  const handlePhoneChange = (
    value: string,
    country: { countryCode: string }
  ) => {
    setSeller({
      ...seller,
      phone: `+${country.countryCode}${value}`,
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeller({ ...seller, email: e.target.value });
  };

  //#endregion

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            onChange={handleNameChange}
            value={seller.name}
            placeholder="Fulano da Silva"
            pattern="[A-Za-zÀ-ú ]+"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formCpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            onChange={handleCPFChange}
            value={seller.cpf}
            placeholder="111.222.333-44"
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <PhoneInput
            onChange={handlePhoneChange}
            value={seller.phone}
            placeholder="+55 (47) 98877-6655"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={handleEmailChange}
            value={seller.email}
            placeholder="fulano@email.com"
            required
          ></Form.Control>
        </Form.Group>
        <br />
        <br />
        <GlobalButtonWrapper>
          <Button variant="outline-danger" onClick={handleButtonCancel}>
            Cancel
          </Button>
          <div>
            {seller.id === 0 ? (
              <Button variant="outline-success" type="submit">
                Add
              </Button>
            ) : (
              <Button variant="outline-success" type="submit">
                Update
              </Button>
            )}
          </div>
        </GlobalButtonWrapper>
      </Form>
    </>
  );
};

export default SellerForm;
