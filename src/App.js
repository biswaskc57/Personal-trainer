import "./App.css";
import { makeStyles } from "@material-ui/core/styles";

import Navigator from "./Components/Navigator";

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      minHeight: 128,
      alignItems: "flex-start",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      alignSelf: "flex-end",
    },
  }));
  const classes = useStyles();
  return (
    <div className="App">
      <Navigator />
    </div>
  );
}

export default App;
