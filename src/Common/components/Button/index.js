import React from "react"
import Loader from "react-loader-spinner";
import { API_FETCHING} from "@ib/api-constants";
import {ButtonStyleComponent} from "./stylesComponent"

function Button(props){
    let {content , onClick , apiStatus ,className} = props;
    const disabled = apiStatus ===API_FETCHING?"disabled":"";
    content = apiStatus === API_FETCHING ?<Loader type="TailSpin" color="black" text-align="center" height={20}/> :content;
    return (<ButtonStyleComponent className = {className} onClick = {onClick} >{content}</ButtonStyleComponent>);
}

export default Button;