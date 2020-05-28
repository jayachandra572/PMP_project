import React ,{Component} from "react"


import {ProfileLogo} from "../common/ProfileLogo"
import {CreatedByContainer,UserName} from "./stylesComponent"

class   CreatedBy extends Component {
    render(){
        const {imageUrl , name} = this.props; 
        return (
            <CreatedByContainer>
                <ProfileLogo imageUrl = {imageUrl} size = {32}/>
                <UserName>{name}</UserName>
            </CreatedByContainer>
            )
    }
}

export {CreatedBy};