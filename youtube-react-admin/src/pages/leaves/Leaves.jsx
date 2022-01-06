import "./leaves.css"; 
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { config } from "../../util/config"; 
import MaterialTable from "material-table";
import { Link, useHistory  } from "react-router-dom";
import { getDaysDifference } from "../../util/utility";
import moment from "moment";
const leaveDetails = {
  "CL": "Casual Leave", // just for example, remove it if you don't need
  "PL": "Privilege Leave",
  "Sick": "Sick Leave",
};

export default function LeavesList() {
  const url = `${config.apiURL}/getLeaves`;
  const history = useHistory();
  const [leavesData, setLeavesData] = useState([]);

  useEffect(() => {
    axios.get(url).then((json) => {
      let data = json.data.map(item => {
        item.daysDiff = getDaysDifference(item.startDate, item.endDate)['difference'];
        return item;
      })
      setLeavesData(data);
    });
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
            title: 'From', field: 'startDate', type: 'date',width: "10%", render: rowData => {
              return moment(new Date(rowData.startDate)).format('DD MMM YYYY')
            }
          },
          {
            title: 'To', field: 'endDate', type: 'date', width: "10%", render: rowData => {
              return moment(new Date(rowData.endDate)).format('DD MMM YYYY')
            }
          },
          { title: '# Days', field: 'daysDiff', width: "5%" },
          {
            title: 'Leave Type', field: 'leaveType', width: "10%" ,
            render: rowData => {
             
              return (
                <div class={rowData.leaveType === 'PL' ? 'pl-leave' : rowData.leaveType === 'CL' ? 'cl-leave'
                  : 'sick-leave'}><span>{leaveDetails[rowData.leaveType]}</span></div>)
            }
          },
          { title: 'Reason', field: 'reason', width: "30%" },
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
          grouping: true,
          headerStyle: {
            backgroundColor: 'rgb(39 37 37 / 95%)',
            color: '#fff',
             whiteSpace: 'nowrap'
          },
        }}
      />
    </div>
  );
}



