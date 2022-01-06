import React, { useState, useEffect } from "react"; 
import MaterialTable from "material-table";
import getReportData from "../../util/utility";
import moment from "moment";  

const columnsTitle = {
    resourceName: 'Resource',
    startDate: 'Start Date',
    endDate: 'End Date',
    location:'Location'
}
function ForecastReport() {
    const [reportData, setReportData] = useState([]);
    const [columns, setColumns] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    useEffect(() => {
        getReportData(
            "01-01-2022",
            moment("31-12-2022", "DD-MM-YYYY").add(1, "days")
        ).then(result => {
            let comingColumns = result.updatedColumns;
            comingColumns = comingColumns.map(item => {
                return { title:  columnsTitle[item] ? columnsTitle[item]: item, item, field: item };
            });
            setColumns(comingColumns);
            setReportData(result.reportData);
        }).catch(err => console.log);
    }, []);
    return (
        <div class="userList">
            <div className="userTitleContainer">
                <h1 className="userTitle">Forecast</h1>  
            </div> 
            <MaterialTable
                title="Forecast Report"
                columns={columns}
                data={reportData}
                localization={{
                    toolbar: {
                        exportCSVName: "WGM9X Weeks Forecast",
                    }
                }}
                options={{
                    searchFieldAlignment: "right",
                    sorting: true,
                    actionsColumnIndex: -1,
                    grouping: false,
                    paging: false,
                    exportFileName: "WGM9X Weeks Forecast",
                    exportButton: {
                        csv: true,
                        pdf: false,
                        position:'right'
                    }
                }}
            />
        </div>
    );
}

export default ForecastReport;