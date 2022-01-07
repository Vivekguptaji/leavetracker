import React from "react";
import "../lockPeriod/lockPeriod.css";
import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from "react";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import MaterialTable from "material-table";
import { toast } from "react-toastify";

export default function LockPeriod(props) {
  //   const useHistory = useHistory();
  const arrayData = [];
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [checked, setChecked] = useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const changeMonth = (e) => {
    setMonth(e.target.value);
  };
  const changeYear = (e) => {
    setYear(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let data = { month: month, year: year, checked: checked };
    arrayData.push(data);
    let myJsonString = JSON.stringify(arrayData);

    console.log(myJsonString);
    // history.push({
    //   pathname: "/lockPeriod",
    //   state: data,
    // });

    const clearState = () => {
      setMonth("0");
      setYear("0");
      setChecked("false");
    };
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle"></h1>
      <form className="newUserForm" onSubmit={submitHandler}>
        <Container>
          <Row>
            <Col>
              {/* <div className="newUserItem"> */}
              <label className="required">Month</label>

              <select value={month} onChange={changeMonth}>
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
              {/* </div> */}
            </Col>
            <Col>
              {/* <div className="newUserItem"> */}
              <label className="required">Year</label>

              <select value={year} onChange={changeYear}>
                <option value="0"></option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2023">2023</option>
              </select>
              {/* </div> */}
            </Col>

            <Col>
              {/* <div className="newUserItem"> */}
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
                value={checked}
              />
              {/* </div> */}
            </Col>
          </Row>

          {/* <div className="footer"> */}
          <br />
          <Row>
            <Col>
              <button className="newUserButton" type="submit">
                Submit
              </button>
            </Col>

            <Col>
              <button className="cancelButton" type="cancel">
                Cancel
              </button>
            </Col>
          </Row>
          {/* </div> */}
        </Container>
      </form>
      <MaterialTable
        title="Locked Month"
        columns={[
          { title: "Month", field: "leaveTypeName" },
          { title: "Year", field: "leaveTypeName" },
        ]}
        data={arrayData}
        actions={[
          {
            icon: "edit",
            iconProps: { fontSize: "small", color: "primary" },
            tooltip: "Edit Leave Type",
            onClick: (event, rowData) => {
              toast.warn("Feature not implemented yet!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
              });
            },
          },
        ]}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          grouping: true,
          headerStyle: {
            backgroundColor: "rgb(39 37 37 / 95%)",
            color: "#fff",
            whiteSpace: "nowrap",
          },
        }}
      />
    </div>
  );
}
