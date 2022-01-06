import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

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
