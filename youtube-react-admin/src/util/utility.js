 
import moment from "moment";
import axios from "axios"; 
import { config } from "./config"; 
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
const getDaysBetweenDates = (startDate, endDate) => {
  const dateArray = [];
  let currentDate = new Date(startDate); 
  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate)); 
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }
  return dateArray;
};
const checkforHoliday = (date) => {
  let isHoliday = false;
  let holidays = data.holidays; 
  for (let i = 0; i < holidays.length; i++) {
    let holidayData = holidays[i];
    let holidayDate = new Date(holidayData['startDate']).setHours(0, 0, 0, 0);
    if (holidayDate === date) {
      isHoliday = true;
    }
  }
  return isHoliday;
}
const getAppliedLeave = (resource, endDate, appliedLeaves) => {
  let count = 0;
  if (!appliedLeaves) { 
    return count;
  }
  endDate = new Date(endDate);
  endDate.setHours(0, 0, 0, 0);
  let startDate = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 4)).setHours(0, 0, 0, 0);
 
  // days
  var dateList = getDaysBetweenDates(appliedLeaves['startDate'], appliedLeaves['endDate']); 
  for (let i = 0; i < dateList.length; i++) {
    let leaveDate = dateList[i];
    leaveDate = new Date(leaveDate).setHours(0, 0, 0, 0);
    const isHoliday = checkforHoliday(leaveDate);
    if (!isHoliday && leaveDate >= startDate && leaveDate <= endDate) {
      console.log('leaveDay', new Date(leaveDate))
      count++;
    }
  }
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
    let holidayData = holidays[i];
    let holidayDate = new Date(holidayData['startDate']).setHours(0, 0, 0, 0);
    if (holidayDate >= startDate && holidayDate <= endDate && resource.location === holidayData.location) {
      count++;
    }
  }
  return count;
}
const prepareReport = (resourceList, columnList, leaves) => {
  let reportData = [];
  for (let i = 0; i < resourceList.length; i++) {
    let resource = resourceList[i];
    let reportObj = {};
    for (let j = 0; j < columnList.length; j++) {
      let column = columnList[j];
      if (column === 'resourceName') {
        debugger;
        reportObj.resourceName = resource['name'];
        reportObj.resourceId = resource._id;
        reportObj.location = resource.location;
        reportObj.role = resource.role;
        reportObj.startDate = resource.startDate;
        reportObj.endDate = resource.endDate;
        reportObj.claimHrs = resource.claimHrs;
        reportObj.isActive = resource.isActive;
      }
      else {
        let appliedLeaves = leaves.filter(item => item.resourceId === reportObj.resourceId)[0];  
        let leaveCount = resource['claimHrs'] * getAppliedLeave(resource, column, appliedLeaves);
        //console.log(`Applied ${leaveCount} b/w ${column}`)
        let holidayCount = resource['claimHrs'] * getHolidayCount(resource, column)
        reportObj[column] = 5 * resource['claimHrs'] - leaveCount - holidayCount;
      }
    }
    reportData.push(reportObj);
  }
  return reportData;
}
const generateReport = (startDate, endDate, leaves) => {
  
  let reportWeekends = getWeekendArray(startDate, endDate);
  let updatedColumns = getColumns(reportWeekends);
  //let updatedColumns = updateMonthName(columns);
  updatedColumns.splice(0, 0, 'resourceName'); 
  debugger;
  let reportData = prepareReport(data.resources, updatedColumns, leaves);   
  console.log(updatedColumns);
  console.log(reportData);
  return {
    reportData,
    updatedColumns
  };
 }
const getReportData = (startDate, endDate) => { 
  const url = `${config.apiURL}/getLeaves`;
  return axios.get(url).then((json) => generateReport(startDate, endDate, json.data));
}
    
export const getSortOrder = (prop) => { 
  return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
}    
export default getReportData;