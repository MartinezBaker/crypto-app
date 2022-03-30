import React from 'react'
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { labelAlgo, getTodaysDate } from "utils/utils";
import { ChartTable } from './styles'

let sparkLabelsArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];

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

export const LineChart = ({ labels, data }) => {
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
};

export const BarChart = ({ labels, data }) => {
  return (
    <div>
      <Bar
        datasetIdKey="id"
        data={{
          labels: labels,
          datasets: [
            {
              barThickness: 10,
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
};


