import React from 'react'
import { labelAlgo } from '../../utils/utils';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { ChartTable } from './styles'

let sparkLabelsArr = ["3", "6", "9", "12", "15", "18", "21", "24"];

function TableCharts(props) {
  return (
    <ChartTable>
      <Line
        datasetIdKey="id"
        data={{
          labels: labelAlgo(sparkLabelsArr, 56), 
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
    </ChartTable>
    
  );
}

export default TableCharts;