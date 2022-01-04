 
import moment from "moment";
const sessionData = sessionStorage.getItem('user');
  let data = JSON.parse(sessionData);
const getWeekendArray = (start, end) => {
    var weekendArr = new Array();
    var dt = new Date(start);
    while (dt <= new Date(end)) { 
      if (dt.getDay() === 5) { // Looking for Friday only
        weekendArr.push(new Date(dt));
      }
        dt.setDate(dt.getDate() + 1);
    }  
    return weekendArr;
    }
    const getColumns = (weekends) => {
      let columnsArray = [];
      for (let i = 0; i < weekends.length; i++) {
        let dt = moment(weekends[i]).format('YYYY-MM-DD');
        columnsArray.push(dt);
      }
      return columnsArray;
    }  
    const updateMonthName = (columns) => {
      let currentMonthName = '';
      let updatedColumns = [];
      
      for (let i = 0; i < columns.length; i++) {
        if (currentMonthName.length > 0 && moment(columns[i]).format('MMMM') !== currentMonthName) {
          if (!updatedColumns.includes(currentMonthName)) {
            updatedColumns.push(currentMonthName)
          } 
        }
        currentMonthName = moment(columns[i]).format('MMMM');
        updatedColumns.push(columns[i])
      };
      //console.log(currentMonthName, columns[columns.length-1]);
      updatedColumns.push(moment(columns[columns.length - 1]).format('MMMM'))
      return updatedColumns;
} 
const getAppliedLeave = (resource,endDate) => {
  let count = 0;
  let startDate = moment(endDate, "DD-MM-YYYY").add(4, 'days');
  // days

  return count;
}
const getHolidayCount = (resource, endDate) => {
  let count = 0;
  endDate = new Date(endDate);
  endDate.setHours(0, 0, 0, 0);
  let startDate = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 4)).setHours(0, 0, 0, 0); 
  let holidays = data.holidays; 
  endDate.setHours(0, 0, 0, 0);
  for (let i = 0; i < holidays.length; i++) {
    let holidayDate = new Date(holidays[i]['startDate']).setHours(0, 0, 0, 0);  
    if (holidayDate >= startDate && holidayDate <= endDate) {
      count++;
    }
  }
  return count;
}
const prepareReport = (resourceList, columnList) => {
  let reportData = [];
  for (let i = 0; i < resourceList.length; i++) { 
    let resource = resourceList[i];
    let reportObj = {};
    for (let j = 0; j < columnList.length; j++) { 
      let column = columnList[j];
      if (column === 'resourceName') {
        reportObj.resrouceName = resource['name'];
        reportObj.resourceId = resource._id;
      }
      else { 
        let leaveCount = resource['claimHrs'] * getAppliedLeave(resource, column);
        let holidayCount = resource['claimHrs'] * getHolidayCount(resource, column)
        reportObj[column] = 5 * resource['claimHrs'] - leaveCount  - holidayCount;
      }
    }
    reportData.push(reportObj);
  }
  return reportData;
}
const getReportData = (startDate, endDate) => {
  let reportWeekends = getWeekendArray(startDate, endDate);
  let updatedColumns = getColumns(reportWeekends);
  //let updatedColumns = updateMonthName(columns);
  updatedColumns.splice(0, 0, 'resourceName');
  console.clear();
  console.log(updatedColumns);
  
  let reportData = prepareReport(data.resources, updatedColumns);
  console.log(reportData);
}
    
export default getReportData;