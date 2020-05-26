import React from "react"

import {MdErrorOutline} from "react-icons/md"

function ErrorInfo(props){
    const {color,size} = props;
    return (
        <div style={{color:color,margin:"4px"}}>
            <MdErrorOutline size={size}/>
        </div>);
}

export {ErrorInfo};