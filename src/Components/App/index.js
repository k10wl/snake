import React from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import StaringMenu from "../StartingMenu";
import GameField from "../GameField";
import Scoreboard from "../Scoreboard";
import Settings from "../Settings";
import bindKeys from "../../constants/keys";
import * as snake from "../../redux-store/snake";

const App = () => {
  const dispatch = useDispatch();

  // keybinding
  bindKeys(
    dispatch,
    snake.moveDirectionLeft,
    snake.moveDirectionUp,
    snake.moveDirectionRight,
    snake.moveDirectionDown
  );

  return (
    <Router>
      <div className="starting-menu">
        <Switch>
          <Route path="/" exact component={StaringMenu} />
          <Route path="/game" component={GameField} />
          <Route path="/scoreboard" component={Scoreboard} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
