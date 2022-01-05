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
                  <li> Name: {link.name} </li>
                  <li> Role: {link.role}</li>
                  <li> Location:{link.location}</li>
                  <li> Start Date: {link.startDate}</li>
                  <li> End Date: {link.endDate}</li>
                  <li> Claim Hrs:{link.claimHrs}</li>
                </ul>
              </div>
            </Popup>
          </li>
        ))}
      </ul>
    </div>
  );
}
