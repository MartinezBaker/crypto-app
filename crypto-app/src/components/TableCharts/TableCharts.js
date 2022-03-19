import React from 'react'
import { labelAlgo } from 'utils/utils';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { ChartTable } from './styles'

let sparkLabelsArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];

function TableCharts(props) {
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
              tension: 0.7,
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

export default TableCharts;