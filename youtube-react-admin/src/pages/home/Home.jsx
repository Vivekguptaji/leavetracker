import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "../../components/featuredInfo/featuredInfo.css";
import "./home.css";
import { userData } from "../../assests/data/dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../util/config";
import LocationChart from "../../components/locationChart/LocationChart";
import PieChart from "../../components/pieChart/PieChart";
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotalySecretKey');

export default function Home() {
  // const sessionData = sessionStorage.getItem("user");
  // let data = JSON.parse(sessionData);

  const [reportData, setReportData] = useState();
  useEffect(() => {
    axios
      .get(`${config.apiURL}/getDashobardData`)
      .then((result) => {
        if (result.status === 200) {
          // const encryptedString = cryptr.encrypt(JSON.stringify(result.data));
          sessionStorage.clear();
          sessionStorage.setItem("user", JSON.stringify(result.data));
          setReportData(result.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <div className="home">
      <div className="welcomeUser">
        Welcome Admin !<div className="dashboard">Dashboard</div>
      </div>
      <FeaturedInfo />
      <div className="homeWidgets">
        {/* <Chart
          data={userData}
          title="User Analytics"
          grid
          dataKey="Active User"
        /> */}
      </div>
      <div className="featured">
        <div className="featuredItem">
          <PieChart />
        </div>
        <div className="featuredItem">
          <LocationChart />
        </div>
      </div>
      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Today Present</span>
          <div className="featuredMoneyContainer">
            <span className="featuredIcons">40</span>
          </div>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Planned Leaves</span>
          <div className="featuredMoneyContainer">
            <span className="featuredIcons">7</span>
          </div>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Unplanned Leaves</span>
          <div className="featuredMoneyContainer">
            <span className="featuredIcons">3</span>
          </div>
        </div>
      </div>
      <div className="homeWidgets">
        {reportData && <WidgetSm data={reportData} />}
        {reportData && <WidgetLg data={reportData} />}
      </div>
    </div>
  );
}
