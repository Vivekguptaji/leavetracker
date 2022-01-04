import "./locations.css"; 
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { config } from "../../util/config"; 
import MaterialTable from "material-table";
import { Link, useHistory  } from "react-router-dom";

export default function Locations() {
  const url = `${config.apiURL}/getLocations`;
  const history = useHistory();

  const [locationsData, setlocationsData] = useState([]);
  
  useEffect(() => {
    axios.get(url).then((json) => setlocationsData(json.data));
  }, []);
  const handleClickRow = (event, data) => {
    debugger;
  }
  const calllocationsData = (data) => {
    history.push({
      pathname: `/locations/${data._id}`,
      state: data
    });
  };
  return (
    <div class="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">locations List</h1>
        <Link to="/locations">
          <button className="userAddButton" disabled> Create locations</button>
        </Link>
      </div>
      <br />

      <MaterialTable
        title="Locations"
        columns={[
          { title: 'Name', field: 'locationName' }
        ]}
          data={locationsData}
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
