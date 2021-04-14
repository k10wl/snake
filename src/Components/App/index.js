import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import StaringMenu from "../StartingMenu";
import GameField from "../GameField";
import Scoreboard from "../Scoreboard";
import Settings from "../Settings";

const App = () => (
  <Router>
    <div className="starting-menu">
      <Switch>
        <Route path="/" exact component={() => <StaringMenu />} />
        <Route path="/game" component={() => <GameField />} />
        <Route path="/scoreboard" component={() => <Scoreboard />} />
        <Route path="/settings" component={() => <Settings />} />
      </Switch>
    </div>
  </Router>
);

export default App;
