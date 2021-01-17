import React from 'react'
import styled from 'styled-components'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import highchartsWindbarb from 'highcharts/modules/windbarb';
import moment from 'moment-timezone'

import { en } from './constants/en'

highchartsWindbarb(Highcharts);

const { chart1, chart2, rainPrecipitation, temperature, windSpeed } = en

const ChartWrapper = styled.div`
  padding: 20px;
`

const Charts = ({ timezone, pointStart, chartsInfo }) => {
  const { rainPrecipitationData, temperatureData, temperatureUnit, windSpeedData, windSpeedBarbData, windSpeedUnit } = chartsInfo

  Highcharts.setOptions({
    time: {
      getTimezoneOffset: (timestamp) => {
        const zone = timezone,
          timezoneOffset = -moment.tz(timestamp, zone).utcOffset();

        return timezoneOffset;
      }
    }
  });

  const rainPrecipitationTemperatureOptions = {
    title: {
      text: chart1.title
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%l %P, %e %b}'
      },
    },
    yAxis: [{
      lineWidth: 1,
      opposite: true,
      title: {
        text: `${rainPrecipitation.name} (${rainPrecipitation.units.percent})`
      }
    }, {
      lineWidth: 1,
      title: {
        text: `${temperature.name} (${temperatureUnit})`
      }
    }],
    rangeSelector: {
      enabled: true
    },
    series: [{
      name: rainPrecipitation.name,
      type: 'column',
      tooltip: {
        valueSuffix: ` ${rainPrecipitation.units.percent}`
      },
      color: Highcharts.getOptions().colors[9],
      data: rainPrecipitationData,
      pointStart,
      pointInterval: 3 * 36e5
    }, {
      name: temperature.name,
      tooltip: {
        valueSuffix: ` ${temperatureUnit}`
      },
      type: 'line',
      color: Highcharts.getOptions().colors[1],
      data: temperatureData,
      pointStart,
      pointInterval: 3 * 36e5,
      yAxis: 1
    },]
  }

  const windOptions = {
    title: {
      text: chart2.title
    },

    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%l %P, %e %b}'
      },
      offset: 40
    },
    yAxis: {
      title: {
        text: `${windSpeed.name} (${windSpeedUnit})`
      }
    },

    plotOptions: {
      series: {
        pointStart,
        pointInterval: 3 * 36e5
      }
    },

    series: [{
      type: 'windbarb',
      data: windSpeedBarbData,
      name: 'Wind',
      color: Highcharts.getOptions().colors[1],
      showInLegend: false,
      tooltip: {
        pointFormat: `<span style="color:{point.color}">●</span> {series.name}: <b>{point.beaufort}<br/>`
      }
    }, {
      type: 'area',
      keys: ['y', 'rotation'],
      data: windSpeedData,
      color: Highcharts.getOptions().colors[0],
      fillColor: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
          [0, Highcharts.getOptions().colors[0]],
          [
            1,
            Highcharts.color(Highcharts.getOptions().colors[0])
              .setOpacity(0.25).get()
          ]
        ]
      },
      name: windSpeed.name,
      tooltip: {
        valueSuffix: ` ${windSpeedUnit}`
      },
      states: {
        inactive: {
          opacity: 1
        }
      }
    }]

  }
  return (
    <>
      <ChartWrapper>
        <HighchartsReact
          highcharts={Highcharts}
          options={rainPrecipitationTemperatureOptions}
        />
      </ChartWrapper>
      <ChartWrapper>
        <HighchartsReact
          highcharts={Highcharts}
          options={windOptions}
        />
      </ChartWrapper>
    </>
  )
}

export default Charts