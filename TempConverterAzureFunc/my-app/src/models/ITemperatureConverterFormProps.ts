export enum ConversionType {
  CelsiusToFahrenheit,
  FahrenheitToCelsius,
}

export interface TemperatureConverterFormProps {
  onConvert: (conversionType: ConversionType, temperature: number) => void;
}