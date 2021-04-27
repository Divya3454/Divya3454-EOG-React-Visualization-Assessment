export const MetricQuery = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
    }
  }
}
`;

export const MeasurementSubscriptionQuery = `
subscription MeasurementSub {
    newMeasurement {
    metric
    at
    value
    unit
    }
  }
`;

export const SelectMetricsQuery = `
query {
  getMetrics
}
`;

export const WeatherQuery = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinCelsius
  }
}
`;
