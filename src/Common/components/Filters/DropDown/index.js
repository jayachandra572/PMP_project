import React from "react";
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


const DropDown = (props) => {
    const {options,className,onChange, placeholder} = props;
    console.log(props)
    return (<Dropdown
        placeholder= {placeholder}
        fluid
        selection
        options={options}
        onChange = {onChange}
        style = {{width:"320px",border:"1px solid #7e858e"}}
    />);
};

export default DropDown;