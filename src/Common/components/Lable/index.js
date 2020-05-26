import React from "react";

import {Label} from "./styleComponent"
function InputLabel (props){
    const {lableFor , content} = props;
    
    return <Label htmlfor = {lableFor}>{content}</Label>
}

export {InputLabel};