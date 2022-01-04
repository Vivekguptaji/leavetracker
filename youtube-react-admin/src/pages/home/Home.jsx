import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../assests/data/dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg"; 
import { useEffect } from "react";
import axios from "axios";
import { config } from "../../util/config"; 
import getReportData from '../../util/utility';
import moment from "moment";
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotalySecretKey');
export default function Home() {  
  useEffect(() => {
    axios.get(`${config.apiURL}/getDashobardData`).then(result => {
      if (result.status === 200) {
       // const encryptedString = cryptr.encrypt(JSON.stringify(result.data));
        sessionStorage.clear();
        sessionStorage.setItem('user', JSON.stringify(result.data));
        getReportData('01-01-2022', moment('28-02-2022', "DD-MM-YYYY").add(1, 'days'));
      }
    }).catch(err => { 
      console.log('err',err)
    })
  });
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
