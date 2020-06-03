import React from "react";
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


class  DropDown extends React.Component {
    static defaultProps = {
        styles:{
            width:"320px",border:"1px solid #7e858e"
        },
        options:[],
        defaultValue :"",
        loading :false,
        onClick:()=>{},
    }
    render(){
    let {options,onChange, placeholder,styles,loading,value,onClick} = this.props;
    options =  options!==null ?options.map(workFlow=>{
            return{
                key:workFlow.id,
                text:workFlow.name,
                value:workFlow.id
            }}):[];
    return (<Dropdown
        data-testid = "dropdown"
        value = {value}
        placeholder= {placeholder}
        fluid
        selection
        loading = {loading}
        disabled = {loading}
        options={options}
        onChange = {onChange}
        onClick = {onClick}
        style = {styles}
    />);
}
}

export default DropDown;