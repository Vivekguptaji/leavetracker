import "./leaveForm.css";
import axios from "axios";
import { config } from "../../util/config";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getSortOrder, getHolidayCountValidation } from "../../util/utility";
import { toast } from "react-toastify";
import moment from "moment";
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
toast.configure();
let leaveTypeOptions;
let resourceOptions;
let holidaysList = [];
export default function LeaveForm(props) {
  const history = useHistory();
  const historyLocation = useLocation();
  const loadData = historyLocation.state;

  const [resourceId, setResourceId] = useState(loadData && loadData.name);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [endDate, setEndDate] = useState();
  const [leaveType, setLeaveType] = useState();

  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState();

  const params = useParams();
  const title = loadData && loadData.name ? "Edit Leave" : "New Leave";
  console.log("state", loadData);

  useEffect(() => {
    const url = `${config.apiURL}/getHolidays`
    axios.get(url).then((json) =>
      holidaysList = json.data);
  }, []);
  useEffect(() => {
    const sessionData = sessionStorage.getItem("user");
    if (!sessionData) {
      history.push("/");
    } else {
      let data = JSON.parse(sessionData);
      data.leaveTypes.push({ leaveTypeName: "", leaveTypeValue: "0" });
      data.leaveTypes.sort(getSortOrder("leaveTypeName"));
      leaveTypeOptions = data.leaveTypes.map((item) => (
        <option key={item.leaveTypeValue} value={item.leaveTypeValue}>
          {item.leaveTypeName}
        </option>
      ));
      data.resources.push({ _id: "0", name: "" });
      data.resources.sort(getSortOrder("name"));
      resourceOptions = data.resources.map((item) => (
        <option key={item._id} value={item._id}>
          {item.name}
        </option>
      ));
      if (loadData) {
        setLeaveType(loadData.leaveType);
        setResourceId(loadData.resourceId);
        setStartDate(
          loadData.startDate &&
            moment(new Date(loadData.startDate)).format("YYYY-MM-DD")
        );
        setEndDate(
          loadData.endDate &&
            moment(new Date(loadData.endDate)).format("YYYY-MM-DD")
        );
        setReason(loadData.reason);
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
  const changeReason = (e) => { 
    setReason(e.target.value);
  }
  const changeSetleaveType = (e) => {
    setLeaveType(e.target.value);
  };

  const onSubmitRequest = (e) => {
    e.preventDefault();
    const sessionData = sessionStorage.getItem("user");
    let data = JSON.parse(sessionData);
    let resourceData = data.resources.filter(
      (item) => item._id === resourceId
    )[0]; 
    const havingHoliday = getHolidayCountValidation(holidaysList, resourceData, startDate, endDate); 
    if (havingHoliday) { 
      toast.warn(`You have an holoday on ${havingHoliday['holidayDetails']}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    } 
    if (!reason || reason.trim().lenght === 0) { 
      toast.warn(`Please enter reason.`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return
    }
    const reqData = {
      resourceId: resourceId,
      name: resourceData["name"],
      startDate: startDate,
      endDate: endDate,
      leaveType: leaveType,
      reason: reason
    };
    const url =
      loadData && loadData._id ? `/updateLeave/${loadData._id}` : `/applyLeave`;
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
  let btnDisable =
    resourceId &&
    resourceId !== "0" &&
    startDate &&
    endDate &&
    leaveType &&
    leaveType !== "0";
  btnDisable = !btnDisable ? true : false;
  if (!showForm) {
    return (
      <div className="newUser loaderClass">
        <Spinner animation="grow" />
      </div>
    );
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">{title}</h1>
      <form className="newUserForm" onSubmit={onSubmitRequest}>
        <div className="newUserItem">
          <label className="required">Full Name</label>
          <select onChange={changeResource} value={resourceId}>
            {resourceOptions}
          </select>
        </div>
        <div className="newUserItem">
          <label className="required">Start Date</label>
          <input
            type="date"
            value={startDate}
            min={moment(new Date()).format("YYYY-MM-DD")}
            onChange={changeStartDate}
            disabledDays={[
              new Date(2021, 1, 12),
              new Date(2021, 1, 2) 
            ]}
          />
        </div>
        <div className="newUserItem">
          <label className="required">End Date</label>
          <input
            type="date"
            value={endDate}
            min={moment(startDate).format("YYYY-MM-DD")}
            onChange={changeEndDate}
          />
        </div>
        <div className="newUserItem">
          <label className="required">Leave Type</label>
          <select onChange={changeSetleaveType} value={leaveType}>
            {leaveTypeOptions}
          </select>
        </div>
        <div className="newUserItem">
          <label className="required">Reason</label>
          <textarea
            type="textarea"
            value={reason}
            onChange={changeReason}
          />
        </div>
        <div className="footer">
          <button className="newUserButton" type="submit" disabled={btnDisable}>
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
