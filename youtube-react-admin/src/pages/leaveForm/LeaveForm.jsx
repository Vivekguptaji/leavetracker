import "./leaveForm.css";
import axios from "axios";
import { config } from "../../util/config";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getSortOrder } from "../../util/utility";

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

let leaveTypeOptions;
let resourceOptions;
export default function LeaveForm(props) {

  const history = useHistory();
  const historyLocation = useLocation();
  const loadData = historyLocation.state;

  const [resourceId, setResourceId] = useState(loadData && loadData.name);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(new Date(loadData && loadData.endDate));
  const [leaveType, setLeaveType] = useState();

  const [showForm, setShowForm] = useState(false);

  const params = useParams();
  const title = loadData && loadData.name ?'Edit Leave' : 'New Leave';
  console.log('state', loadData)

  useEffect(() => {
    const sessionData = sessionStorage.getItem('user');
    if (!sessionData) {
      history.push('/');
    }
    else {
      let data = JSON.parse(sessionData);
      data.leaveTypes.push({ leaveTypeName: '', leaveTypeValue: '0' });
      data.leaveTypes.sort(getSortOrder('leaveTypeName'));
      leaveTypeOptions = data.leaveTypes.map(item => <option key={item.leaveTypeValue} value={item.leaveTypeValue}>{item.leaveTypeName}</option>);
      data.resources.push({ _id: '0', name: '' });
      data.resources.sort(getSortOrder('name')); 
      resourceOptions = data.resources.map(item => <option key={item._id} value={item._id}>{item.name}</option>);
      if (loadData) { 
        setLeaveType(loadData.leaveType);
        setResourceId(loadData.resourceId);
        setStartDate(loadData.startDate && new Date(loadData.startDate).toISOString().substr(0, 10));
        setEndDate(loadData.endDate && new Date(loadData.endDate).toISOString().substr(0, 10))
      }
      setShowForm(true);
    }
  }, []);

  const changeResource = (e) => {
    setResourceId(e.target.value);
  };
  const changeStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const changeEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const changeSetleaveType = (e) => {
    setLeaveType(e.target.value);
  };

  const onSubmitRequest = (e) => {
    e.preventDefault(); 
    const sessionData = sessionStorage.getItem('user');
    let data = JSON.parse(sessionData);
    let resourceData = data.resources.filter(item => item._id === resourceId)[0];
    const reqData = {
      resourceId: resourceId,
      name:resourceData['name'],
      startDate: startDate,
      endDate: endDate,
      leaveType: leaveType,
    }; 
    const url =  loadData && loadData._id ?`/updateLeave/${loadData._id}`: `/applyLeave`;
    //const url = `/applyLeave`;
    axios
      .post(`${config.apiURL}${url}`, reqData)
      .then((result) => {
        if (result.status === 202 || result.status === 200) {
          clearState();
          history.push("/leaves");
        }
      })
      .catch((err) => {
        //debugger;
      });
  };

  const clearState = () => {
    setResourceId("");
    setStartDate("");
    setEndDate("");
    setLeaveType("");
  };
  if (!showForm) {
    return <div className="newUser loaderClass">
      <Spinner animation="grow" />
    </div >;
  }
  return(
  <div className="newUser">
    <h1 className="newUserTitle">{title}</h1>
    <form className="newUserForm" onSubmit={onSubmitRequest}>
      <div className="newUserItem">
        <label>Full Name</label>
           <select onChange={changeResource} value={resourceId}>
          {resourceOptions}
        </select>
      </div>
      <div className="newUserItem">
        <label>Start Date</label>
        <input type="date" value={startDate} onChange={changeStartDate} />
      </div>
      <div className="newUserItem">
        <label>End Date</label>
        <input type="date" value={endDate} onChange={changeEndDate} />
      </div>
      <div className="newUserItem">
        <label>Leave Type</label>
        <select onChange={changeSetleaveType} value={leaveType}>
          {leaveTypeOptions}
        </select>
        </div>
        <div className="footer">
        <button className="newUserButton" type="submit">
        Submit
      </button>
      <button
        className="cancelButton"
        type="cancel"
        onClick={() => {
          history.push("/leaves");
        }}
      >
        Cancel
      </button>
        </div>
      
    </form>
  </div>
  );
}