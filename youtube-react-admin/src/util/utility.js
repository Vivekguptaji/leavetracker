 
import moment from "moment";
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
          currentMonthName = moment(columns[i]).format('MMMM');
        }
        else {
          currentMonthName = moment(columns[i]).format('MMMM');
        }
        updatedColumns.push(columns[i])
      };
      
      //console.log(currentMonthName, columns[columns.length-1]);
      updatedColumns.push(moment(columns[columns.length - 1]).format('MMMM'))
      return updatedColumns;
    }
  
    const getReportData = (startDate, endDate) => {  
      let reportWeekends = getWeekendArray(startDate, endDate);
      let columns = getColumns(reportWeekends); 
      let updatedColumns = updateMonthName(columns); 
      console.log(updatedColumns);
      const sessionData = sessionStorage.getItem('user');
      let data = JSON.parse(sessionData);  
}
    
export default getReportData;