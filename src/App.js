import "./App.css";
import Customerlist from "./Components/Customerlist";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Personal trainer</Typography>
        </Toolbar>
      </AppBar>
      <Customerlist />
    </div>
  );
}

export default App;
