import {
  TemperatureConverterCardProps,
  getConversionTypeText,
} from "../models/ITemperatureConverterCardProps";
import "../styles/TemperatureConverterCardStyles.css";
import Card from "react-bootstrap/Card";

const TemperatureConverterCard: React.FC<TemperatureConverterCardProps> = ({
  id,
  temperature,
  conversionType,
  convertedTemperature,
}: TemperatureConverterCardProps) => {
  const conversionTypeText = getConversionTypeText(conversionType);

  // Regular expression to find temperature values in the converted string
  const regex = /-?\d+(?:\.\d+)?°[CF]/g;

  // Replace temperature values with highlighted version using the `code` element
  const highlightedConvertedTemperature = convertedTemperature.replace(
    regex,
    (match) => `<code class="code-highlight">${match}</code>`
  );

  return (
    <Card
      bg="light"
      border="secondary"
      style={{ borderRadius: "20px", boxSizing: "border-box",minHeight:"325px"}}
    >
      <Card.Header
        style={{
          backgroundColor: "#00BF63",
          color: "#FFFFFF",
          borderRadius: "20px 20px 0px 0px ",
          fontSize: "1.2rem",
          fontWeight: "bold",
          padding: "0.5rem",
        }}
      >
       #{id} - {temperature} {conversionTypeText}<i className="ms-3 fa-solid fa-arrows-rotate"></i> 
      </Card.Header>
      <Card.Body style={{ textAlign: "center", padding: "2rem" }}>
        <Card.Title style={{ fontSize: "2rem", fontWeight: "bold" }}>
          <div
            style={{ fontSize: "2.5rem", fontWeight: "bold" }}
            dangerouslySetInnerHTML={{
              __html: highlightedConvertedTemperature,
            }}
          />
        </Card.Title>
        <Card.Text
          style={{ fontSize: "1.5rem", fontWeight: "bold"}}
        ></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TemperatureConverterCard;
