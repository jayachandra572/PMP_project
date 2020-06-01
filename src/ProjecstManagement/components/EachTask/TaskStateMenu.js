import React from "react"
import {observable} from "mobx"
import {observer} from "mobx-react"
import { API_SUCCESS , API_INITIAL,API_FETCHING} from '@ib/api-constants'

import DropDown from "../../../Common/components/Filters/DropDown";
import ValidateTask from "../ValidateTask"

import {State} from "./styleComponent"
@observer
class TaskStateMenu extends React.Component{
    render(){
    const {options,value,onChangeState,handleClose,open,onClickStateMenu,getApiStatus} = this.props;
    return(<State>
    <DropDown
            options = {options}
            value = {value}
            onChange = {onChangeState}
            onClick = {onClickStateMenu}
            loading = {getApiStatus===API_FETCHING}
            styles = {{
                minWidth:"90px",
                maxWidth:"130px",
                width:"100%",
                border:"none",
                backgroundColor:"transparent"
            }}
    />
    <ValidateTask open = {open} handleClose = {handleClose}/>
    </State>)
}
}

export {TaskStateMenu}