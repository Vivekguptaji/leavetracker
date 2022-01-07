
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
import PrivateRoute from "./util/Route/PrivateRoute";
import PublicRoute from "./util/Route/PublicRoute"; 
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
      {isLogged &&<Topbar showMenuHandler={menuClickHandler} />}
      <div className="container">
        <Sidebar show={showMenu} showMenuHandler={menuClickHandler} />
        {backdrop}
        <Switch>
          <PrivateRoute restricted={true} exact path="/login">
            {!isLogged && <Login setLoginUser={setLoginUser} />}
            {isLogged && <Redirect to='/' />}
         </PrivateRoute>
          <PrivateRoute restricted={true} exact path="/" component={Home} >  
          </PrivateRoute>
          <PrivateRoute restricted={true} path="/dashboard" component={Home}> 
          </PrivateRoute>
          <PrivateRoute restricted={true} path="/resourceList" component={ResourceList}> 
          </PrivateRoute>
          <PrivateRoute restricted={true} path="/resource/:_id" component={Resource}> 
          </PrivateRoute>
          <PrivateRoute restricted={true} path="/resource" component={Resource} > 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/leaves" component={Leaves}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/leaveForm" component={LeaveForm}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/Calendar" component={EventCalendar}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/holidayList" component={HolidayList}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/roles" component={Roles}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/forecastReport" component={ForecastReport}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/locations" component={Locations}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/typesLeave" component={TypesLeave}> 
         </PrivateRoute>
        <PrivateRoute restricted={true} path="/locationChart" component={LocationChart}> 
          </PrivateRoute>
          <PrivateRoute restricted={true} path="*"><Redirect to='/'></Redirect> 
         </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
