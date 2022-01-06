import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import {
  faUsers,
  faLaptop,
  faPhone,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { library, FontAwesomeIcon } from "@fortawesome/fontawesome-svg-core";
export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Resources</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">30</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Working</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">27</span>
        </div>
      </div>
      <div className="featuredItem">

        <div className="featuredIcons"> 
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
