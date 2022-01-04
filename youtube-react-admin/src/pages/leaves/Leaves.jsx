import "./leaves.css"; 
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { config } from "../../util/config"; 
import MaterialTable from "material-table";
import { Link, useHistory  } from "react-router-dom";

export default function LeavesList() {
  const url = `${config.apiURL}/getLeaves`;
  const history = useHistory();
  const [leavesData, setLeavesData] = useState([]);

  useEffect(() => {
    axios.get(url).then((json) => setLeavesData(json.data));
  }, []);

  const handleClickRow = (event, data) => {
    //debugger;
  }
  const callLeavesData = (data) => {
    history.push({
      pathname: `/leaveForm/${data.resourceId}`,
      state: data
    });
  };
  return (
    <div class="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">Leave Summary</h1>
        <Link to="/leaveForm">
        <button className="userAddButton">Create Leave</button>
        </Link>
      </div>
      <br />

      <MaterialTable
        title="Leave Summary"
        columns={[
          { title: 'Name', field: 'name' },
          {
            title: 'Start date', field: 'startDate', type: 'date', dateSetting: {
              format: 'dd/mm/yyyy'
            }
          },
          { title: 'End date', field: 'endDate', type: 'date' },
          { title: 'Leave Type', field: 'leaveType' },
          //{ title: 'Status', field: 'isActive', render: rowData => (rowData.isActive ? "Active" : "Disabled") }
        ]}
        data={leavesData}
        actions={[
          {
            icon: "edit",
            iconProps: { fontSize: "small", color: "primary" },
            tooltip: "Edit Resource",
            onClick: (event, rowData) => { callLeavesData(rowData) }
          }
        ]}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          grouping: true
        }}
      />
    </div>
  );
}



