import React, { useState } from "react";
import {
  ConversionType,
  TemperatureConverterFormProps,
} from "../models/ITemperatureConverterFormProps";
import { Button, Form } from "react-bootstrap";

const TemperatureConverterForm: React.FC<TemperatureConverterFormProps> = ({
  onConvert,
}: TemperatureConverterFormProps) => {
  const [temperature, setTemperature] = useState<number>(0);
  const [conversionType, setConversionType] = useState<ConversionType>(
    ConversionType.CelsiusToFahrenheit
  );

  const handleTemperatureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTemperature(Number(event.target.value));
  };

  const handleConversionTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "CelsiusToFahrenheit") {
      setConversionType(ConversionType.CelsiusToFahrenheit);
    } else if (value === "FahrenheitToCelsius") {
      setConversionType(ConversionType.FahrenheitToCelsius);
    }
  };

  const handleConvertClick = (): void => {
    onConvert(conversionType, temperature);
  };

  return (
    <div className="d-flex justify-content-center">
      <Form className="border p-3 rounded">
        <Form.Group controlId="conversionType">
          <Form.Check
            type="radio"
            label="Celsius to Fahrenheit"
            name="conversionType"
            value="CelsiusToFahrenheit"
            checked={conversionType === ConversionType.CelsiusToFahrenheit}
            onChange={handleConversionTypeChange}
            inline
            className="mr-3"
          />
          <Form.Check
            type="radio"
            label="Fahrenheit to Celsius"
            name="conversionType"
            value="FahrenheitToCelsius"
            checked={conversionType === ConversionType.FahrenheitToCelsius}
            onChange={handleConversionTypeChange}
            inline
          />
        </Form.Group>
        <Form.Group controlId="temperature">
          <Form.Control
            type="number"
            value={temperature}
            onChange={handleTemperatureChange}
            className="mb-3"
            placeholder="Enter temperature"
          />
        </Form.Group>
        <Button
          variant="success"
          onClick={handleConvertClick}
          className="rounded-pill px-4"
        >
          Convert
        </Button>
      </Form>
    </div>
  );
};

export default TemperatureConverterForm;
