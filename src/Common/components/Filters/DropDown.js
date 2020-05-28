import React from "react"
import {IoIosArrowDown} from "react-icons/io";
 
import {SelectRegionDiv,Select} from "./styles";

 function DropDown(props) {
        return(
            <SelectRegionDiv>
            <Select onChange={(event=>(props.onChangeSelectedRegion(event.target.value)))} >
                {props.regionOptions.map(region=>{
                    return(<option key={region}  value={region}>{region} </option>);
                })}
            </Select>
            <IoIosArrowDown width="200" />
            </SelectRegionDiv>
            
            );
    }
export default SelectRegion;