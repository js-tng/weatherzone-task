# Weatherzone Task

## Live Demo

https://weatherzone-task.netlify.app/

## App information & assumptions:

Features in this app:
- User can select an Australian city to display weather forecast data (from Weatherzone API) including temperature, rain precipitation probability, wind speed and wind direction based on 3 hourly periods. On selection of a city, the user will be provided with the city's meteograms over a 24h period by default.
- The meteograms are viewed based on city's timezone
- User can select range of forecast period (up to 7 days) to display dynamic periods of weather forecast
- User can toggle between SI and Non-SI units to suit e.g. for temperature and wind speed units
- User can hover over specific data points on the meteogram charts to view individual data points in detail
- User can tap/click on the chart's legend to switch on/off certain graphs on chart i.e. temperature / rain precipitation / wind speed
- Generally responsive layout across mobile/tablet/desktop (however for viewing high number of data points are best viewed on tablet/desktop)

This app is built with:
- React (Hooks)
- Highcharts & Highcharts-React-Official (very nice 3rd party charts library to build nice meteogram visuals for weather, especially related features e.g. wind barb modules for the wind direction)
- Styled-components for CSS
- Axios for HTTP client
- Create-test-renderer for snapshot testing of components
- React switch for the Toggle component (this was to speed up development)

Assumptions:
- The task instructs the app to be a meteogram i.e. graph displaying weather data. It also mentions producing weather data in table format. This app displays the weather data in graphs i.e. tabulated data in a visual forms and therefore assumes to satisfy the core requirements.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).