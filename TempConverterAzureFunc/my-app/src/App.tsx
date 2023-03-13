import { useState } from "react";
import TemperatureConverterForm from "./components/TemperatureConverterForm";
import TemperatureConverterCard from "./components/TemperatureConverterCard";
import { ConversionType } from "./models/ITemperatureConverterFormProps";
import api from "./api/TempConverterAzureFunc";
import TitlePage from "./components/TitlePage";

interface Conversion {
  conversionType: ConversionType;
  temperature: number;
  result: string;
}

const App: React.FC = () => {
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
        <TitlePage
          title="Temperature Converter Azure Functions"
          icon="fa-solid fa-temperature-arrow-up"
        />
        <br />
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
              <div style={{ margin: "16px", width: "500px"}}>
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
};

export default App;
