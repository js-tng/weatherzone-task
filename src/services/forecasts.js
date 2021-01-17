import axios from 'axios'

const forecastUrl = (locationCode, periodHours) => `https://ws.weatherzone.com.au/?lt=aploc&lc=${locationCode}&locdet=1&latlon=1&pdf=twc(period=${periodHours},detail=2)&u=1&format=json`

const getForecast = (locationCode, periodHours) => axios.get(forecastUrl(locationCode, periodHours))

const forecastService = {
  getForecast
}

export default forecastService