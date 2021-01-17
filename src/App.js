import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Select from './components/Select'
import Toggle from './components/Toggle'
import Charts from './Charts'
import forecastService from './services/forecasts'
import { roundToSingleDecimal, convertToFahrenheit, convertToKnots } from './utils'
import { en } from './constants/en'
import { locationOptions, endPeriodOptions } from './constants/options'

const { heading, subheading, loadingText, errorText, labels, temperature, windSpeed } = en

const Header = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`
const SubSection = styled.section`
  border-top: 1px solid;
  border-bottom: 1px solid;
`

const InputWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const Field = styled.div`
  padding: 12px 4px;
  text-align: center;
  flex: 1;
`

const App = () => {
  const [locationCode, setLocationCode] = useState('')
  const [forecasts, setForecasts] = useState([])
  const [periodHours, setPeriodHours] = useState(24)
  const [unitsNonSI, setUnitsNonSI] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    locationCode &&
      forecastService.getForecast(locationCode, periodHours)
        .then(response => {
          const { countries } = response.data
          const incomingForecasts = countries[0].locations[0].part_day_forecasts.forecasts
          setForecasts([...incomingForecasts])
          setLoading(false)
        })
        .catch(error => {
          setError(true)
          console.log(error)
        })
  }, [locationCode, periodHours])

  const handleLocationChange = (event) => { setLocationCode(event.target.value); setForecasts([]); setLoading(true) }
  const handleEndPeriodChange = (event) => {
    const selectedPeriod = Number(event.target.value);
    if (selectedPeriod !== periodHours) {
      setPeriodHours(selectedPeriod);
      setForecasts([]); setLoading(true)
    }
  }
  const handleUnitsNonSIChange = () => setUnitsNonSI(!unitsNonSI)

  const forecastDataLoaded = forecasts.length > 0

  const { time_zone } = forecastDataLoaded && forecasts[0]
  const pointStart = forecastDataLoaded && new Date(forecasts[0].local_time).getTime()

  const windSpeedData = forecasts.reduce((data, forecast) => [...data, [unitsNonSI ? roundToSingleDecimal(convertToKnots(forecast.wind_speed)) : forecast.wind_speed, forecast.wind_direction]], [])
  const chartsInfo = {
    rainPrecipitationData: forecasts.map(forecast => forecast.rain_prob),
    temperatureData: forecasts.map(({ temperature }) => unitsNonSI ? convertToFahrenheit(temperature) : temperature),
    temperatureUnit: unitsNonSI ? temperature.units.fahrenheit : temperature.units.celsius,
    windSpeedData,
    windSpeedBarbData: windSpeedData.map(wind => [roundToSingleDecimal(wind[0] / 3.6), wind[1]]),
    windSpeedUnit: unitsNonSI ? windSpeed.units.knots : windSpeed.units.kmPerHour
  }

  return (
    <>
      <Header>
        <h1>{heading}</h1>
        <div>{subheading}</div>
        <Field><Select id='location-id' name='location' placeholder={labels.city} options={locationOptions} onChange={handleLocationChange} /></Field>
      </Header>
      {locationCode &&
        <>
          <SubSection>
            <Field>{labels.timezone}{time_zone}</Field>
            <InputWrapper>
              <Field>
                <Select
                  id='end-date-select-id'
                  name='endDate'
                  placeholder={labels.endPeriod}
                  options={endPeriodOptions}
                  onChange={handleEndPeriodChange} />
              </Field>
              <Field>
                <Toggle
                  id='units-toggle-id'
                  name='units' checked={unitsNonSI}
                  onChange={handleUnitsNonSIChange}
                  leftLabel={labels.units.toggleLeft}
                  rightLabel={labels.units.toggleRight} />
              </Field>
            </InputWrapper>
          </SubSection>
        </>}
      {loading && <Field>{loadingText}</Field>}
      {forecastDataLoaded &&
        <Charts
          timezone={time_zone}
          pointStart={pointStart}
          chartsInfo={chartsInfo}
        />
      }
      {error && <Field>{errorText}</Field>}
    </>
  );
}

export default App;
