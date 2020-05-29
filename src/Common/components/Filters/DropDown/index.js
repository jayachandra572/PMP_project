import React from "react";
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


class  DropDown extends React.Component {
    static defaultProps = {
        styles:{
            width:"320px",border:"1px solid #7e858e"
        },
        options:[]
    }
    render(){
    let {options,onChange, placeholder,styles} = this.props;
    options =  options!==null ?options.map(workFlow=>{
            return{
                key:workFlow.id,
                text:workFlow.name,
                value:workFlow.id
            }}):[];
    return (<Dropdown
        placeholder= {placeholder}
        fluid
        selection
        options={options}
        onChange = {onChange}
        style = {styles}
    />);
}
}

export default DropDown;