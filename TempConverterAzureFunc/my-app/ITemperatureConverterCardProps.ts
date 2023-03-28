import { ConversionType } from "./ITemperatureConverterFormProps";

export interface TemperatureConverterCardProps {
  id:number,
  temperature: number;
  conversionType: ConversionType;
  convertedTemperature: string;
}

export function getConversionTypeText(conversionType: ConversionType): string {
  switch (conversionType) {
    case ConversionType.CelsiusToFahrenheit:
      return "Celsius to Fahrenheit";
    case ConversionType.FahrenheitToCelsius:
      return "Fahrenheit to Celsius";
    default:
      return "";
  }
}
