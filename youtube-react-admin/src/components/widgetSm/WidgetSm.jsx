import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";

export default function WidgetSm(props) {
  // console.log(props.data.resources[0].name);
  // const listItems = props.data.resources.map((link) => <li>{link.name}</li>);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Members</span>
      <ul className="widgetSmList">
        {props.data.resources.map((link) => (
          <li className="widgetSmListItem">
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{link.name}</span>
              <span className="widgetSmUserTitle">{link.role}</span>
            </div>
            <Popup
              trigger={
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                  Display
                </button>
              }
              position="right center"
            >
              <div className="card">
                <ul className="cardul">
                  <li> NAME: {link.name} </li>
                  <li> ROLE: {link.role}</li>
                  <li> LOCATION:{link.location}</li>
                  <li> START DATE: {link.startDate}</li>
                  <li> END DATE: {link.endDate}</li>
                  <li> CLAIM HRS:{link.claimHrs}</li>
                </ul>
              </div>
            </Popup>
          </li>
        ))}
      </ul>
    </div>
  );
}
