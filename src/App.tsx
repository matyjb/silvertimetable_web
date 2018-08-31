import * as React from "react";
import "react-calendar-timeline/lib/Timeline.css";
import "./App.css";
import CustomTimeline from "./components/CustomTimeline";

import logo from "./logo.svg";
import { Provider } from "react-redux";
import store from "./store/index";

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">testing timeline</h1>
          </header>
          <Provider store={store}>
            <CustomTimeline/>
          </Provider>
        </div>
    );
  }
}

export default App;
