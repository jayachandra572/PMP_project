import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const CheckboxWithLabel = (props) => {

    const {label,onChange,id,value} = props;
    return(<Checkbox style = {{border:"2px solid red",padding:"5px"}}id = {id} onChange = {onChange} label={label} checked ={value} />)
}

export default CheckboxWithLabel