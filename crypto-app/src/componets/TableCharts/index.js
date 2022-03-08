import React from 'react'
import { labels } from './labelsarr';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart(props) {
    return (
      <div className="table-chart">
        <Line
          datasetIdKey="id"
          data={{
            labels: labels,
            datasets: [
              {
                fill: false,
                borderWidth: 3.0,
                data: props.chartData,
                spanGaps: true,
                maintainAspectRatio: true,
                responsive: true
              },
            ],
          }}
          options={{
            title: {
              display: false,
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            elements: {
              line: {
                borderColor: props.sevenDay && props.sevenDay.charAt(0) === "-" ? "red" : "limegreen" ,
                tension: 0.7,
              },
              point: {
                radius: 0,
              },
              tooltips: {
                enabled: false,
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
      </div>
    );
}

export default LineChart;