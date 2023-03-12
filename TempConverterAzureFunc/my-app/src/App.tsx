import { useState } from "react";
import TemperatureConverterForm from "./components/TemperatureConverterForm";
import TemperatureConverterCard from "./components/TemperatureConverterCard";
import { ConversionType } from "./models/ITemperatureConverterFormProps";
import api from "./api/TempConverterAzureFunc";

interface Conversion {
  conversionType: ConversionType;
  temperature: number;
  result: string;
}

function App(): JSX.Element {
  const [conversions, setConversions] = useState<Conversion[]>([]);

  const handleConversion = async (
    conversionType: ConversionType,
    temperature: number
  ): Promise<void> => {
    let result = "";
    try {
      if (conversionType === ConversionType.CelsiusToFahrenheit) {
        const response = await api.get(
          `CelsiusToFahrenheitConverter/${temperature}`
        );
        result = response.data;
      } else if (conversionType === ConversionType.FahrenheitToCelsius) {
        const response = await api.get(
          `FahrenheitToCelsiusConverter/${temperature}`
        );
        result = response.data;
      }
      setConversions([...conversions, { conversionType, temperature, result }]);
    } catch (error) {
      console.error(error);
      result = `Ops...${error}`;
    }
  };

  return (
    <>
      <div style={{ margin: "24px", textAlign: "center" }}>
        <div style={{ margin: "16px", display:"flex" }}>
          <h1>Temperature Converter</h1>
          <img src="./img/logo.png" alt="Logo" style={{margin:"16px"}}/>
        </div>
        <br />
        <hr />
        <TemperatureConverterForm onConvert={handleConversion} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "16px",
            justifyContent: "center",
          }}
        >
          {conversions.map((conversion, index) => (
            <>
              <div style={{ margin: "16px", width: "500px" }}>
                <TemperatureConverterCard
                  key={index}
                  id={index}
                  conversionType={conversion.conversionType}
                  temperature={conversion.temperature}
                  convertedTemperature={conversion.result}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
