import "../pieChart/PieChart.css";
import React, { Component } from "react";
import Chart from "react-apexcharts";
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [4, 0, 7, 8, 1, 2, 5, 0, 6, 10, 5, 6],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"],
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
        <div className="currentWeek">Leaves Highlights</div>
      </div>
    );
  }
}
export default PieChart;
