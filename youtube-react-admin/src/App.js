import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";

import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ResourceList from "./pages/resourceList/ResourceList"; 
import Resource from "./pages/resource/Resource";
import Leaves from "./pages/leaves/Leaves";
import NewProduct from "./pages/newProduct/NewProduct";
import LeaveForm from "./pages/leaveForm/LeaveForm";
import EventCalendar from './pages/Calendar/EventCalendar';


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
          <Route path="/newproduct">
            <NewProduct />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
