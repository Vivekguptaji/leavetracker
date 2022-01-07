import React from "react";
import "../lockPeriod/lockPeriod.css";
import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from "react";

export default function LockPeriod() {
  const [checked, setChecked] = React.useState();
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle"></h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label className="required">Month</label>

          <select>
            <option value="0"></option>
            <option value="Jan">January</option>
            <option value="Feb">February</option>
            <option value="Mar">March</option>
            <option value="Apr">April</option>
            <option value="May">May</option>
            <option value="Jun">June</option>
            <option value="Jul">July</option>
            <option value="Aug">August</option>
            <option value="Sep">September</option>
            <option value="Oct">October</option>
            <option value="Nov">November</option>
            <option value="Dec">December</option>
          </select>
        </div>
        <div className="newUserItem">
          <label className="required">Year</label>

          <select>
            <option value="0"></option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2023">2023</option>
          </select>
        </div>

        <div className="newUserItem">
          <label>Status</label>
          {/* <select>
            <option value="0"></option>
            <option value="8">enabled</option>
            <option value="9">disabled</option>
          </select> */}
          <Switch
            color="primary"
            checked={checked}
            onChange={handleChange}
            name="checked"
          />
        </div>

        <div className="footer">
          <button className="newUserButton" type="submit">
            Submit
          </button>
          <button
            className="cancelButton"
            type="cancel"
            // onClick={() => {
            //   history.push("/resourceList");
            // }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
