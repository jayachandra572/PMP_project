import React from "react";

import {withKnobs, text, boolean ,} from "@storybook/addon-knobs";

import {InputField} from "./index.js";

export default{
    decorators:[withKnobs],
    title:"Common/InputField"
   
};
export const knob= ()=>(<InputField  
    id ="UserName"
    textType = "text"
    isError = {boolean('isError', false)}
    value = {text("input","")}
    onChangeValue = {()=>{}}/>);

