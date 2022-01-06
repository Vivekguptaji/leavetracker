import "./roles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../util/config";
import MaterialTable from "material-table";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
toast.configure();
export default function Roles() {
  const url = `${config.apiURL}/getDeveloperRoles`;
  const history = useHistory();

  const [rolesData, setrolesData] = useState([]);

  useEffect(() => {
    axios.get(url).then((json) => setrolesData(json.data));
  }, []);
  const handleClickRow = (event, data) => {
    debugger;
  };
  const callrolesData = (data) => {
    // history.push({
    //   pathname: `/roles/${data._id}`,
    //   state: data
    // });
    toast.warn("Feature not implemented yet!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };
  return (
    <div class="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">Roles List</h1>
        <Link to="/roles">
          <button className="userAddButton" onClick={callrolesData}>
            Create Role
          </button>
        </Link>
      </div>
      <br />

      <MaterialTable
        title="Roles"
        columns={[
          { title: "Name", field: "developerRoleName" },
          {
            title: "Status",
            field: "isActive",
            render: (rowData) => (rowData.isActive ? "Active" : "Disabled"),
          },
        ]}
        data={rolesData}
        actions={[
          {
            icon: "edit",
            iconProps: { fontSize: "small", color: "primary" },
            tooltip: "Edit roles",
            onClick: (event, rowData) => {
              callrolesData(rowData);
            },
          },
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
