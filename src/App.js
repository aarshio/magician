import "./App.css";
import Path from "./components/Router";
import ReactGA from "react-ga";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    ReactGA.initialize("G-3S7XVNEQ28");
  }, []);

  return <Path />;
};

export default App;
