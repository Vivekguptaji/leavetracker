import "./newResource.css";
import axios from "axios";
import { config } from "../../util/config";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
export default function NewResource() {
  const history = useHistory();
  const [resourceData, setResourceData] = useState();
  const [name, setName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [location, setLocation] = useState();
  const [claimHrs, setClaimHrs] = useState();
  // const [role, setRole] = useState();

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
  const changeClaimHrs = (e) => {
    setClaimHrs(e.target.value);
  };
  // const changeRole = (e) => {
  //   setRole(e.target.value);
  // };

  const onSubmitRequest = (e) => {
    e.preventDefault();
    const reqData = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      location: location,
      claimHrs: claimHrs,
      // role: { role }
    };

    axios
      .post(`${config.apiURL}/createResource`, reqData)
      .then((result) => {
        if (result.status === 200) {
          alert("form submitted");
          history.push("/resourceList");
        }
      })
      .catch((err) => {
        debugger;
      });
    clearState();
  };

  const clearState = () => {
    setName("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setClaimHrs("");
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Resource</h1>
      <form className="newUserForm" onSubmit={onSubmitRequest}>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Smith"
            value={name}
            onChange={changeName}
          />
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
          <label>Location</label>
          <input
            type="text"
            placeholder="New York"
            value={location}
            onChange={changeSetLocation}
          />
        </div>

        <div className="newUserItem">
          <label>Claim Hours</label>
          <input
            type="number"
            placeholder="8 | 9"
            value={claimHrs}
            onChange={changeClaimHrs}
          />
        </div>
        <button className="newUserButton" type="submit">
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
