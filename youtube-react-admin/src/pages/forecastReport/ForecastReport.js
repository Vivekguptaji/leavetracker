import React, { useState, useEffect } from "react"; 
import MaterialTable from "material-table";
import getReportData from "../../util/utility";
import moment from "moment";
function ForecastReport() {  
    const [resourceData, setResourceData] = useState([]);
    const [columns, setColumns] = useState();
    useEffect(() => {
        getReportData(
            "01-01-2022",
            moment("31-03-2022", "DD-MM-YYYY").add(1, "days")
        ).then(result => {
            let comingColumns = result.updatedColumns;
            comingColumns = comingColumns.map(item => {
                return { title: item === 'resourceName' ? 'Resource' : item, field: item };
            });
            setColumns(comingColumns);
        })
    }, []);
    return (
      <div class="userList">
        <div className="userTitleContainer">
          <h1 className="userTitle">Forecast</h1> 
        </div>
        <br />
  
        <MaterialTable
          title="Forecast Report"
          columns={columns}
          data={resourceData}
           
          options={{
            sorting: true,
            actionsColumnIndex: -1,
            grouping: true
          }}
        />
      </div>
    );
}

export default ForecastReport;