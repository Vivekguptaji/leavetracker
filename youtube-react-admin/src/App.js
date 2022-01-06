
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import ResourceList from "./pages/resourceList/ResourceList"; 
import Resource from "./pages/resource/Resource";
import Leaves from "./pages/leaves/Leaves";
import LeaveForm from "./pages/leaveForm/LeaveForm";
import EventCalendar from './pages/Calendar/EventCalendar';
import HolidayList from "./pages/holidayList/HolidayList";
import Roles from "./pages/roles/Roles";
import Locations from "./pages/locations/Locations";
import TypesLeave from "./pages/typesLeave/TypesLeave";
import { useEffect, useState } from "react";
import Backdrop from "./components/backdrop/Backdrop";
import ForecastReport from "./pages/forecastReport/ForecastReport"; 
import "react-datepicker/dist/react-datepicker.css";
import LocationChart from "./components/locationChart/LocationChart"
import Login from "./pages/login/Login";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const menuClickHandler = () => {
    setShowMenu(!showMenu);
  }
  let backdrop;
  const setLoginUser = (value) => {
    setIsLogged(value);
  }
  useEffect(() => {
    let isLoggedIn = sessionStorage.getItem('isLoggedIn');
    setIsLogged(isLoggedIn)
  });
  if (showMenu) {
    backdrop = <Backdrop showMenuHandler={menuClickHandler} />;
  }
  return (
    <Router>
      {isLogged && <Topbar showMenuHandler={menuClickHandler} />}
      <div className="container">
        <Sidebar show={showMenu} showMenuHandler={menuClickHandler} />
        {backdrop}
        <Switch>
          <Route exact path="/login">
            {!isLogged && <Login setLoginUser={setLoginUser} putter={true} />}
            {isLogged && <Redirect to='/' />}
          </Route>
          <Route exact path="/">
            {!isLogged && <Login setLoginUser={setLoginUser} putter={true} />}
           
            {isLogged && <Home />}
          </Route>
          <Route path="/dashboard">
            <Home />
          </Route>
          <Route path="/resourceList">
            <ResourceList />
          </Route>
          <Route path="/resource/:_id">
            <Resource />
          </Route>
          <Route path="/resource">
            <Resource />
          </Route>
          <Route path="/leaves">
            <Leaves />
          </Route>
          <Route path="/leaveForm">
            <LeaveForm />
          </Route>
          <Route path="/Calendar">
            <EventCalendar />
          </Route>
          <Route path="/holidayList">
            <HolidayList />
          </Route>
          <Route path="/roles">
            <Roles />
          </Route>
          <Route path="/forecastReport">
            <ForecastReport></ForecastReport>
          </Route>
          <Route path="/locations">
            <Locations />
          </Route>
          <Route path="/typesLeave">
            <TypesLeave />
          </Route>
          <Route path="/locationChart">
            <LocationChart />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
