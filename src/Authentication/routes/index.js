import React from "react";
import {  Route} from "react-router-dom";

import {
  SIGN_IN_PATH,
} from "../constants/RouteConstants";
import {ProtectedRouter} from "../utils/AuthUtils";
import {LogInRoute} from "./LogInRoute";

const logRoute=<Route path={SIGN_IN_PATH}  component={LogInRoute}/>;

export {logRoute };