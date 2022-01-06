import "../pieChart/PieChart.css";
import React, { Component } from "react";
import Chart from "react-apexcharts";
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["MON", "TUES", "WED", "THURS", "FRI"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
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
        <div className="currentWeek"> Current Week</div>
      </div>
    );
  }
}
export default PieChart;
