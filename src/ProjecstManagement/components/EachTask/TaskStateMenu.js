import React from "react"
import {observable,reaction} from "mobx"
import {observer} from "mobx-react"
import { API_SUCCESS , API_INITIAL,API_FETCHING} from '@ib/api-constants'

import {DropdownWithLoader} from "../DropdownWithLoader";
import ValidateTask from "../ValidateTask"
import {State} from "./styleComponent"

@observer
class TaskStateMenu extends React.Component{
    @observable isDropdownMenuOpen = false;
    
    openDropdownReaction = reaction(
        ()=>this.props.getApiStatus,
        apiStatus=>{
            if(apiStatus===API_SUCCESS){
                this.openDropdownMenu();
            }
        })
    openDropdownMenu = ()=>{
        this.isDropdownMenuOpen = true;
    }
    
    closeDropdownMenu = ()=>{
        this.isDropdownMenuOpen = false;
    }
    render(){
    const {options,value,onChangeState,handleClose,modalOpen,getApiStatus,onClickStateMenu,taskValidationField,getValidateFields} = this.props;
    return(<State>
    <DropdownWithLoader
            options = {options}
            value = {value}
            onChange = {onChangeState}
            onClick = {onClickStateMenu}
            loading = {getApiStatus===API_FETCHING}
            open = {this.isDropdownMenuOpen}
            closeDropdownMenu = {this.closeDropdownMenu} 
            styles = {{
                minWidth:"90px",
                maxWidth:"110px",
                width:"100%",
                border:"none",
                backgroundColor:"transparent"
            }}
    />
        <ValidateTask 
            getValidateFields = {getValidateFields}
            taskValidationField = {taskValidationField} 
            open = {modalOpen} 
            handleClose = {handleClose}/>
    </State>);
}
}

export {TaskStateMenu};