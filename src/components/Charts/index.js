import React from 'react'
import { connect } from 'react-redux'
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

export const LineChart = connect(
  (state) => ({
    main: state.main,
    coins: state.coins
  })
)((props) => {
  if(props.coins.loading) {
      return <StyledMessage>Loading...</StyledMessage>;
  }else if(props.coins.error) {
    return <StyledMessage>{props.coins.errorMessage}</StyledMessage>;
  } else{
    return (
      <div>
        <Line
          datasetIdKey="id"
          data={{
            labels: props.labels,
            datasets: [
              {
                fill: true,
                borderWidth: 3.0,
                data: props.data,
                spanGaps: true,
                pointHoverBackgroundColor: props.main.darkMode
                  ? "rgb(0, 252, 42)"
                  : "#0275d8",
                hoverBorderWidth: 3,
                hoverBorderColor: props.main.darkMode ? "rgb(0, 252, 42)" : "#0275d8",
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
                    return titleCallBack(raw, props.coins.chartData?.prices);
                  },
                  label: (context) => {
                    const value = context.raw.toFixed(2);
                    return `Price: ${props.main.symbol}${value}`;
                  },
                },
              },
            },
            elements: {
              line: {
                backgroundColor: props.main.darkMode
                  ? "rgba(0, 252, 42, 0.04)"
                  : "rgb(2, 117, 216, 0.1)",
                borderColor: props.main.darkMode ? "rgb(0, 252, 42)" : "#0275d8",
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
})

export const BarChart = connect(
  (state) => ({
    main: state.main,
    coins: state.coins
  })
)((props) => {
  if(props.coins.loading) {
    return <StyledMessage>Loading...</StyledMessage>;
  }else if(props.coins.error) {
    return <StyledMessage>{props.coins.errorMessage}</StyledMessage>;
  } else{
    return (
      <div>
        <Bar
          datasetIdKey="id"
          data={{
            labels: props.labels,
            datasets: [
              {
                barThickness: adjustBarThickness(props.coins.marketDays),
                data: props.data,
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
                    return titleCallBack(raw, props.coins.chartData?.total_volumes);
                  },
                  label: (context) => {
                    const value = context.raw.toFixed(2);
                    return `Price: ${props.main.symbol}${value}`;
                  },
                },
              },
            },
            elements: {
              bar: {
                backgroundColor: props.main.darkMode ? "#0275d8" : "rgb(0, 252, 42)",
                borderColor: props.main.darkMode ? "#0275d8" : "rgb(0, 252, 42)",
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
})

export const CoinPageLineChart = connect(
  (state) => ({
    main: state.main,
    coinPage: state.coinPage
  })
)((props) => {
  if (props.coinPage.loading) {
    return <StyledMessage>Loading...</StyledMessage>;
  } else if (props.coinPage.error) {
    return <StyledMessage>{props.coinPage.errorMessage}</StyledMessage>;
  } else {
    return (
      <div>
        <Line
          datasetIdKey="id"
          data={{
            labels: props.labels,
            datasets: [
              {
                fill: true,
                borderWidth: 1.0,
                data: props.data,
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
                    return titleCallBack(
                      raw,
                      props.coinsPage?.chartData?.prices
                    );
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
                borderColor: props.main.darkMode
                  ? "rgba(44, 47, 54, 0.6)"
                  : "rgb(237, 239, 242)",
                backgroundColor: props.main.darkMode
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
                  drawTicks: false,
                },
                ticks: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                  drawBorder: false,
                  drawTicks: false,
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
})