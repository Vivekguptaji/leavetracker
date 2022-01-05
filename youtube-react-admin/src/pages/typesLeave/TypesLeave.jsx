import "./typesLeave.css"; 
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { config } from "../../util/config"; 
import MaterialTable from "material-table";
import { Link, useHistory  } from "react-router-dom";

export default function TypesLeave() {
  const url = `${config.apiURL}/getLeaveTypes`;
  const history = useHistory();

  const [typesLeaveData, settypesLeaveData] = useState([]);
  
  useEffect(() => {
    axios.get(url).then((json) => settypesLeaveData(json.data));
  }, []);
  const handleClickRow = (event, data) => {
    debugger;
  }
  const calltypesLeaveData = (data) => {
    history.push({
      pathname: `/typesLeave/${data._id}`,
      state: data
    });
  };
  return (
    <div class="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">Leave Type List</h1>
        <Link to="/typesLeave">
          <button className="userAddButton"> Create New</button>
        </Link>
      </div>
      <br />

      <MaterialTable
        title="Leave Types"
        columns={[
          { title: 'Name', field: 'leaveTypeName' },
        ]}
        data={typesLeaveData}
        options={{
          sorting: true, 
          actionsColumnIndex: -1,
          grouping: true 
        }}
      />
    </div>
  );
}
