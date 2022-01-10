// import "./locationChart.css";
import React, { Component } from "react";
import Chart from "react-apexcharts";
let monthObj = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
}
class LocationChart extends Component {
  getCLLeaveData = (data) => { 
    let leaveData = data.filter(item => item.leaveType === 'CL');
    for (let month in monthObj) { 
      debugger;
    }
   
  }
  constructor(props) {
    super(props);
    
    this.state = {
      series: [
        {
          name: "Casual Leave",
          data: [4, 0, 7, 8, 1, 2, 5, 0, 6],
        },
        {
          name: "Privilege Leave",
          data: [7, 1, 8, 3, 6, 0, 1, 5, 0, 5],
        },
        {
          name: "Sick Leave",
          data: [3, 1, 0, 6, 2, 9, 4, 3, 0, 8],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 400,
          width: "100%",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: Object.keys(monthObj),
        },
        yaxis: {
          title: {
            text: "Leaves",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            },
          },
        },
      },
    };
  }
  render() {
    let clData = this.getCLLeaveData(this.props.dashbaordData);
    return (
      <div className="chartL">
        <div className="currentWeek">Applied Leaves</div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={300}
          width={500}
        />
      </div>
    );
  }
}
export default LocationChart;
