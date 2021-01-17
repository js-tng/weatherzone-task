export const locationOptions = [
  { label: "Adelaide", value: 12495 },
  { label: "Brisbane", value: 9388 },
  { label: "Canberra", value: 3928 },
  { label: "Darwin", value: 11 },
  { label: "Hobart", value: 15465 },
  { label: "Melbourne", value: 5594 },
  { label: "Perth", value: 13896 },
  { label: "Sydney", value: 624 }
]

export const endPeriodOptions = [...Array(7).keys()].reduce((periodOptions, day) => [...periodOptions, { label: `${day + 1}-day (${24 * (day + 1)}h)`, value: 24 * (day + 1) }], [])

