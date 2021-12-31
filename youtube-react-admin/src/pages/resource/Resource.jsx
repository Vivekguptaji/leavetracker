import { Publish } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../../util/config";
import "./resource.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
export default function Resource() {
  const history = useHistory();
  const [resourceData, setResourceData] = useState();

  const [name, setName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [location, setLocation] = useState();
  const [claimHrs, setClaimHrs] = useState();

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

  const onSubmitRequest = (e) => {
    e.preventDefault();
    const reqData = {
      name: "Sumit Kumar",
      startDate: new Date(),
      endDate: null,
      location: "US",
      claimHrs: 9,
      role: "Fullstack",
    };
    axios
      .post(`${config.apiURL}/createResource`, reqData)
      .then((result) => {
        if (result.status === 200) {
          history.push("/resourceList");
        }
      })
      .catch((err) => {
        debugger;
      });
  };
  useEffect(() => {
    const _id = "61c18891e79b87a344021e47"; // need to read from params
    axios
      .get(`${config.apiURL}/getResourceById/${_id}`)
      .then((result) => {
        debugger;
        console.log("resource data", result.data);
      })
      .catch((err) => {
        debugger;
      });
    //   if (result) {
    //     setValue([
    //         { name: {name} },
    //       {  startDate: { startDate }},
    //        { endDate: { endDate }},
    //         {ocation: { location }},
    //         {claimHrs: { claimHrs }} ]);
    // }
  }, []);
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
