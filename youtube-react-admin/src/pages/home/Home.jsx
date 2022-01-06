import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../assests/data/dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../util/config";
import LocationChart from "../../components/locationChart/LocationChart";

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
          //sessionStorage.clear();
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
      <FeaturedInfo />
      <div className="homeWidgets">
        <Chart
          data={userData}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
        <LocationChart />
      </div>
      
      <div className="homeWidgets">
        {
          reportData && <WidgetSm data={reportData} />
        }
        {
          reportData && <WidgetLg data={reportData} />
        }

      </div>
    </div>
  );
}
