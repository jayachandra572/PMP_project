import React ,{Component}from "react";

import Images from "../../themes/Images"
import {ProfileLogoStyles} from "./styleComponent"
export class ProfileLogo extends Component{
    static defaultProps = {
        size :48,
        imageUrl:Images.userDefaultLogo,
    }
    render(){
        const {imageUrl , size} = this.props;
        return (<ProfileLogoStyles src = {imageUrl} size = {size} alt = "profileLogo"/>);
    }
}