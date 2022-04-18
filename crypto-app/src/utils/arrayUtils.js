export const marketDaysArr = [
  {
    name: "1d",
    numDays: 1,
    active: false,
  },
  {
    name: "1w",
    numDays: 6,
    active: false,
  },
  {
    name: "1m",
    numDays: 29,
    active: true,
  },
  {
    name: "3m",
    numDays: 89,
    active: false,
  },
  {
    name: "6m",
    numDays: 179,
    active: false,
  },
  {
    name: "1y",
    numDays: 364,
    active: false,
  },
];

export let sparkLabelsArr = Array(23).fill(null).map((_, i) => i)

export let dataInfoArry = [] 

export const createDataInfoArry = (name, price, percent, date) => {
  const infoObj = {name: name, price: price, percent:percent, date:date}
  if(dataInfoArry.length < 2) {
    return dataInfoArry = [...dataInfoArry, infoObj];
  }
  return
}