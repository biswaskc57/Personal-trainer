import "./App.css";
import Customerlist from "./Components/Customerlist";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Traininglist from "./Components/Trainings/Traininglist";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Personal trainer</Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography>
              <Link to="/" style={{ marginRight: 10 }}>
                Customer
              </Link>
              <Link to="/Todolist" style={{ marginRight: 10 }}>
                Training
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginRight: 10 }}>
          <Switch>
            <Route exact path="/" component={Customerlist} />
            <Route path="/Todolist" component={Traininglist} />

            <Route render={() => <h1> Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
