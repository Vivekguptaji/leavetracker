import "./holidayList.css"; 
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { config } from "../../util/config"; 
import MaterialTable from "material-table";
import { Link, useHistory  } from "react-router-dom";

export default function HolidayList() {
  const url = `${config.apiURL}/getHolidays`;
  const history = useHistory();

  const [holidayData, setHolidayData] = useState([]);
  
  useEffect(() => {
    axios.get(url).then((json) => setHolidayData(json.data));
  }, []);
  const handleClickRow = (event, data) => {
    debugger;
  }
  const callholidayData = (data) => {
    history.push({
      pathname: `/holidayList/${data._id}`,
      state: data
    });
  };
  return (
    <div class="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">Holiday List</h1>
        <Link to="/holiday">
          <button className="userAddButton"> Create Holiday</button>
        </Link>
      </div>
      <br />

      <MaterialTable
        title="Holidays"
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Location', field: 'location' },
          {
            title: 'Date', field: 'startDate', type: 'date', dateSetting: {
              format: 'dd/mm/yyyy'
            }
          },
          { title: 'Status', field: 'isActive', render: rowData => (rowData.isActive ? "Active" : "Disabled") }
        ]}
        data={holidayData}
        actions={[
          {
            icon: "edit",
            iconProps: { fontSize: "small", color: "primary" },
            tooltip: "Edit Holiday",
            onClick: (event, rowData) => { callholidayData(rowData) }
          }
        ]}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          grouping: true,
          pageSize:10,
          pageSizeOptions:[10,20,30]
        }}
      />
    </div>
  );
}
