import "./resource.css";
import axios from "axios";
import { config } from "../../util/config";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [endDate, setEndDate] = useState(
    new Date(loadData && loadData.endDate)
  );
  const [location, setLocation] = useState();
  const [claimHrs, setClaimHrs] = useState(loadData && loadData.claimHrs);
  const [role, setRole] = useState();
  const [showForm, setShowForm] = useState(false);
  const params = useParams();
  const title = params ? "Edit Resource" : "New Resource";
  console.log("state", loadData);
  useEffect(() => {
    const sessionData = sessionStorage.getItem("user");
    if (!sessionData) {
      history.push("/");
    } else {
      let data = JSON.parse(sessionData);
      data.locations.push({ locationNameValue: "N/A", locationName: "N/A" });
      data.developerRoles.push({
        developerRolesValue: "N/A",
        developerRoleName: "N/A",
      });
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
  return (
    <div className="newUser">
      <h1 className="newUserTitle">{title}</h1>
      <form className="newUserForm" onSubmit={onSubmitRequest}>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Smith"
            value={name}
            onChange={changeName}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={changeStartDate}
            required
          />
        </div>
        <div className="newUserItem">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={changeEndDate}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Location</label>
          <select onChange={changeSetLocation} value={location}>
            {locationOptions}
          </select>
        </div>
        <div className="newUserItem">
          <label>Role</label>
          <select onChange={changeSetRole} value={role}>
            {roleOptions}
          </select>
        </div>
        <div className="newUserItem">
          <label>Claim Hours</label>
          <select value={claimHrs} onChange={changeClaimHrs}>
            <option>8</option>
            <option>9</option>
          </select>
        </div>
        <button
          className="newUserButton"
          type="submit"
          disabled={!name || !startDate || !endDate}
        >
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
      </form>
    </div>
  );
}
