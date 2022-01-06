import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import {
  faUsers,
  faLaptop,
  faPhone,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faUsers, faLaptop, faPhone, faHome);

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="featuredIcons">
          <FontAwesomeIcon icon={"users"} />
        </div>
        <div>
          <span className="featuredTitle">Total Resources</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">30</span>
          </div>
        </div>
      </div>
      <div className="featuredItem">
        <div className="featuredIcons">
          <FontAwesomeIcon icon={"laptop"} />
        </div>
        <div>
          <span className="featuredTitle">Active Users</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">25</span>
          </div>
        </div>
      </div>
      <div className="featuredItem">
        <div className="featuredIcons">
          <FontAwesomeIcon icon={"phone"} />
        </div>
        <div>
          <span className="featuredTitle">Working</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">23</span>
          </div>
        </div>
      </div>
      <div className="featuredItem">
        <div className="featuredIcons">
          <FontAwesomeIcon icon={"home"} />
        </div>
        <div>
          <span className="featuredTitle-leave">Leave</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
