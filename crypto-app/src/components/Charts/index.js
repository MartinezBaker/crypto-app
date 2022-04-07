import React from 'react'
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { labelAlgo, adjustBarThickness } from "utils/functionUtils";
import { sparkLabelsArr  } from 'utils/arrayUtils';
import { ChartTable } from './styles'

export const TableCharts = (props) => {
  return (
    <ChartTable>
      <Line
        datasetIdKey="id"
        data={{
          labels: labelAlgo(sparkLabelsArr, 168), 
          datasets: [
            {
              fill: false,
              borderWidth: 3.0,
              data: props.chartData,
              spanGaps: true,
              maintainAspectRatio: false,
              responsive: true
            },
          ],
        }}
        options={{
          layout:{
            padding:{
              top: 5
            }
          },
          title: {
            display: false,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false
            },
            hover: {
              enabled: false
            }
          },
          elements: {
            line: {
              borderColor: props.sevenDay && props.sevenDay.charAt(0) === "-" ? "red" : "limegreen" ,
              tension: 0.4,
            },
            point: {
              radius: 0,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                display: false,
              },
            },
          },
        }}
      />
    </ChartTable>
  );
}

export const LineChart = ({isLoading, hasError, errMessage, data, labels, priceTimeArry}) => {
  if(isLoading) {
      return <h2>Loading...</h2>
  }else if(hasError) {
    return <h2>{errMessage}</h2>
  } else{
    return (
      <div>
        <Line
          datasetIdKey="id"
          data={{
            labels: labels,
            datasets: [
              {
                fill: true,
                borderWidth: 3.0,
                data: data,
                spanGaps: true,
                maintainAspectRatio: false,
                responsive: true,
                pointHoverBackgroundColor: "limegreen",
                hoverBorderWidth: 3,
                hoverBorderColor: "limegreen",
              },
            ],
          }}
          options={{
            layout: {
              padding: {
                top: 5,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                intersect: true,
                enabled: true,
                mode: "nearest",
                displayColors: false,
                callbacks: {
                  title: (context) => {
                    const raw = context[0].raw;
                    const filteredItem = priceTimeArry
                      .filter((element) => element[1] === raw)
                      .map((element) => {
                        const date = new Date(element[0]);
                        return `${
                          date.getMonth() + 1
                        }-${date.getDate()}-${date.getFullYear()}`;
                      });
                     return filteredItem;
                  },
                  label: (context) => {
                    const value = context.raw.toFixed(2)
                    return `Price: $${value} `
                  }
                },
              },
            },
            elements: {
              line: {
                borderColor: "limegreen",
                tension: 0.4,
              },
              point: {
                radius: 0,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  autoSkip: true,
                  autoSkipPadding: 10,
                  maxRotation: 0,
                  minRotation: 0,
                },
              },
              y: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
          }}
        />
      </div>
    );
  }
};

export const BarChart = ({ labels, data, days, isLoading, errMessage, hasError, volTimeArry }) => {
  if(isLoading) {
    return <h2>Loading...</h2>
  }else if(hasError) {
    return <h2>{errMessage}</h2>
  } else{
    return (
      <div>
        <Bar
          datasetIdKey="id"
          data={{
            labels: labels,
            datasets: [
              {
                barThickness: adjustBarThickness(days),
                data: data,
                maintainAspectRatio: false,
                responsive: true,
              },
            ],
          }}
          options={{
            layout: {
              padding: {
                top: 5,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                intersect: true,
                enabled: true,
                mode: "nearest",
                displayColors: false,
                callbacks: {
                  title: (context) => {
                    const raw = context[0].raw;
                    const filteredItem = volTimeArry
                      .filter((element) => element[1] === raw)
                      .map((element) => {
                        const date = new Date(element[0]);
                        return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
                      });
                    return filteredItem;
                  },
                  label: (context) => {
                    const value = context.raw.toFixed(2)
                    return `Price: $${value} `
                  }
                }
              }
            },
            elements: {
              bar: {
                backgroundColor: "#0275d8",
                borderColor: "#0275d8",
                borderRadius: 5,
                borderSkipped: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  autoSkip: true,
                  autoSkipPadding: 10,
                  maxRotation: 0,
                  minRotation: 0,
                },
              },
              y: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
          }}
        />
      </div>
    );
  }
};


