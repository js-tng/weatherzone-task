export const roundToSingleDecimal = (value) => Math.round((value + Number.EPSILON) * 10) / 10

export const convertToFahrenheit = (celsiusTemperature) => (celsiusTemperature * 9 / 5) + 32

export const convertToKnots = (kmPerHourWindSpeed) => 0.539957 * kmPerHourWindSpeed
