import React from 'react'
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { adjustBarThickness, titleCallBack, twentyFourHourFilter } from "utils/functionUtils";
import { sparkLabelsArr  } from 'utils/arrayUtils';
import { ChartTable, StyledMessage } from "./styles";

export const TableCharts = (props) => {
  return (
    <ChartTable>
      <Line
        datasetIdKey="id"
        data={{
          labels: sparkLabelsArr,
          datasets: [
            {
              fill: false,
              borderWidth: 3.0,
              data: twentyFourHourFilter(props.chartData),
              spanGaps: true,
            },
          ],
        }}
        options={{
          maintainAspectRatio: true,
          responsive: true,
          title: {
            display: false,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
            hover: {
              enabled: false,
            },
          },
          elements: {
            line: {
              borderColor:
                props.sevenDay?.charAt(0) === "-" ? "red" : "rgb(0, 252, 42)",
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

export const LineChart = ({isLoading, hasError, errMessage, data, labels, priceTimeArry, currSymbol, darkMode}) => {
  if(isLoading) {
      return <StyledMessage>Loading...</StyledMessage>;
  }else if(hasError) {
    return <StyledMessage>{errMessage}</StyledMessage>;
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
                pointHoverBackgroundColor: darkMode
                  ? "rgb(0, 252, 42)"
                  : "#0275d8",
                hoverBorderWidth: 3,
                hoverBorderColor: darkMode ? "rgb(0, 252, 42)" : "#0275d8",
              },
            ],
          }}
          options={{
            maintainAspectRatio: true,
            responsive: true,
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
                    return titleCallBack(raw, priceTimeArry);
                  },
                  label: (context) => {
                    const value = context.raw.toFixed(2);
                    return `Price: ${currSymbol}${value}`;
                  },
                },
              },
            },
            elements: {
              line: {
                backgroundColor: darkMode
                  ? "rgba(0, 252, 42, 0.04)"
                  : "rgb(2, 117, 216, 0.1)",
                borderColor: darkMode ? "rgb(0, 252, 42)" : "#0275d8",
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

export const BarChart = ({ labels, data, days, isLoading, errMessage, hasError, volTimeArry, currSymbol, darkMode }) => {
  if(isLoading) {
    return <StyledMessage>Loading...</StyledMessage>;
  }else if(hasError) {
    return <StyledMessage>{errMessage}</StyledMessage>;
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
              },
            ],
          }}
          options={{
            maintainAspectRatio: true,
            responsive: true,
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
                    return titleCallBack(raw, volTimeArry);
                  },
                  label: (context) => {
                    const value = context.raw.toFixed(2);
                    return `Price: ${currSymbol}${value}`;
                  },
                },
              },
            },
            elements: {
              bar: {
                backgroundColor: darkMode ? "#0275d8" : "rgb(0, 252, 42)",
                borderColor: darkMode ? "#0275d8" : "rgb(0, 252, 42)",
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

export const CoinPageLineChart = ({
  isLoading,
  hasError,
  errMessage,
  data,
  labels,
  priceTimeArry,
  darkMode
}) => {
  if (isLoading) {
    return <StyledMessage>Loading...</StyledMessage>;
  } else if (hasError) {
    return <StyledMessage>{errMessage}</StyledMessage>;
  } else {
    return (
      <div>
        <Line
          datasetIdKey="id"
          data={{
            labels: labels,
            datasets: [
              {
                fill: true,
                borderWidth: 1.0,
                data: data,
                spanGaps: true,
                pointHoverBackgroundColor: "rgb(0, 252, 42)",
                hoverBorderWidth: 3,
                hoverBorderColor: "rgb(0, 252, 42)",
              },
            ],
          }}
          width="1200px"
          height="250px"
          options={{
            maintainAspectRatio: false,
            responsive: true,
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
                    return titleCallBack(raw, priceTimeArry);
                  },
                  label: (context) => {
                    const value = context.raw.toFixed(2);
                    return `Price: $${value}`;
                  },
                },
              },
            },
            elements: {
              line: {
                borderColor: darkMode
                  ? "rgba(44, 47, 54, 0.6)"
                  : "rgb(237, 239, 242)",
                backgroundColor: darkMode
                  ? "rgba(44, 47, 54, 0.6)"
                  : "rgb(237, 239, 242)",
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
                  drawTicks: false
                },
                ticks: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                  drawBorder: false,
                  drawTicks: false
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