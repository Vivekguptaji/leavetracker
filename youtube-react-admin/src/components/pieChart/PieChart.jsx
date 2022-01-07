import "../pieChart/PieChart.css";
import React, { Component } from "react";
import Chart from "react-apexcharts";
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [14,  6, 4, 5, 6],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: [ 
          "UK",
          "USA",
          "India", 
          "Egypt",
          "Canada" ],
        responsive: [
          {
            breakpoint: 100,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }
  render() {
    return (
      <div id="chartPie">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width={450}
        />
        <div className="currentWeek">Global Resources Presence</div>
      </div>
    );
  }
}
export default PieChart;
