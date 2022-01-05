import "./resource.css";
import axios from "axios";
import { config } from "../../util/config";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";

// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
import { getSortOrder } from "../../util/utility";
// const Cryptr = require("cryptr");
// const cryptr = new Cryptr("myTotalySecretKey");
let locationOptions;
let roleOptions;

toast.configure();
export default function Resource(props) {
  const history = useHistory();
  const historyLocation = useLocation();
  const loadData = historyLocation.state;

  const [name, setName] = useState(loadData && loadData.name);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [location, setLocation] = useState();
  const [claimHrs, setClaimHrs] = useState(loadData && loadData.claimHrs);
  const [role, setRole] = useState();
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState();
  const params = useParams();
  const title = params ? "Edit Resource" : "New Resource";
  //console.log("state", loadData);
  useEffect(() => {
    const sessionData = sessionStorage.getItem("user");
    if (!sessionData) {
      history.push("/");
    } else {
      let data = JSON.parse(sessionData);
      data.locations.push({ locationNameValue: "0", locationName: "" });
      data.developerRoles.push({
        developerRolesValue: "0",
        developerRoleName: "",
      });
      data.locations.sort(getSortOrder("locationName"));
      data.developerRoles.sort(getSortOrder("developerRoleName"));
      locationOptions = data.locations.map((item) => (
        <option key={item.locationValue} value={item.locationValue}>
          {item.locationName}
        </option>
      ));
      roleOptions = data.developerRoles.map((item) => (
        <option key={item.developerRolesValue} value={item.developerRolesValue}>
          {item.developerRoleName}
        </option>
      ));
      if (loadData) {
        setLocation(loadData.location);
        setRole(loadData.role);
        setStatus(loadData.isActive);
        setStartDate(
          loadData.startDate &&
            new Date(loadData.startDate).toISOString().substr(0, 10)
        );
        setEndDate(
          loadData.endDate &&
            new Date(loadData.endDate).toISOString().substr(0, 10)
        );
      }
      setShowForm(true);
    }
  }, []);
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const changeEndDate = (e) => {
    setEndDate(e.target.value);
  };
  const changeSetLocation = (e) => {
    setLocation(e.target.value);
  };
  const changeSetRole = (e) => {
    setRole(e.target.value);
  };
  const changeClaimHrs = (e) => {
    setClaimHrs(e.target.value);
  };

  const onSubmitRequest = (e) => {
    e.preventDefault();
    const reqData = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      location: location,
      claimHrs: claimHrs,
      role: role,
    };
    const url =
      loadData && loadData._id
        ? `/updateResource/${loadData._id}`
        : `/createResource`;
    axios
      .post(`${config.apiURL}${url}`, reqData)
      .then((result) => {
        if (result.status === 202 || result.status === 200) {
          clearState();
          history.push("/resourceList");
          toast.success("Successfully submitted!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        }
      })
      .catch((err) => {});
  };

  const clearState = () => {
    setName("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setClaimHrs("");
  };
  if (!showForm) {
    return (
      <div className="newUser loaderClass">
        <Spinner animation="grow" />
      </div>
    );
  }
  let today = new Date().toISOString().split("T")[0];
  let btnDisable =
    name &&
    startDate &&
    location &&
    location != 0 &&
    role &&
    role != 0 &&
    claimHrs &&
    claimHrs != 0;
  btnDisable = !btnDisable ? true : false;
  return (
    <div className="newUser">
      <h1 className="newUserTitle">{title}</h1>
      <form className="newUserForm" onSubmit={onSubmitRequest}>
        <div className="newUserItem">
          <label className="required">Full Name</label>
          <input
            type="text"
            placeholder="John Smith"
            value={name}
            onChange={changeName}
            required
          />
        </div>
        <div className="newUserItem">
          <label className="required">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={changeStartDate}
            min={today}
            required
          />
        </div>
        <div className="newUserItem">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={changeEndDate}
            min={startDate}
            required
          />
        </div>
        <div className="newUserItem">
          <label className="required">Location</label>
          <select onChange={changeSetLocation} value={location}>
            {locationOptions}
          </select>
        </div>
        <div className="newUserItem">
          <label className="required">Role</label>
          <select onChange={changeSetRole} value={role}>
            {roleOptions}
          </select>
        </div>
        <div className="newUserItem">
          <label className="required">Claim Hours</label>
          <select value={claimHrs} onChange={changeClaimHrs}>
            <option value="0"></option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Status</label>
          <select value={status} disabled="true">
            <option value="true">Active</option>
            <option value="false">Disabled</option>
          </select>
        </div>
        <div className="footer">
          <button className="newUserButton" type="submit" disabled={btnDisable}>
            Submit
          </button>
          <button
            className="cancelButton"
            type="cancel"
            onClick={() => {
              history.push("/resourceList");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
