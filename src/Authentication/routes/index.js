import React from "react";
import {  Route} from "react-router-dom";

import {
  SIGN_IN_PATH,
} from "../constants/RouteConstants";
import {ProtectedRouter} from "../utils/AuthUtils";
import {SignInRoute} from "./SignInRoute";

const signRoute=<Route path={SIGN_IN_PATH}  component={SignInRoute}/>;

export {signRoute };