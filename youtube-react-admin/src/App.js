import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ResourceList from "./pages/resourceList/ResourceList"; 
import Resource from "./pages/Resource/Resource";
import Leaves from "./pages/leaves/Leaves";
import LeaveForm from "./pages/leaveForm/LeaveForm";
import EventCalendar from './pages/Calendar/EventCalendar';
import HolidayList from "./pages/holidayList/HolidayList";
import Roles from "./pages/roles/Roles";
import Locations from "./pages/locations/Locations";
import TypesLeave from "./pages/typesLeave/TypesLeave";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
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
          <Route path="/locations">
            <Locations />
          </Route>
          <Route path="/typesLeave">
            <TypesLeave />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
