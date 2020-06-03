import React,{Component,Fragment} from "react" 

import {RiCloseLine} from "react-icons/ri"

class CloseButtonWithIcon  extends Component{
    static defaultProps = {
        size:24
    }
    render(){
    const {onClick,size,clasName} = this.props
    return(<Fragment>
    <button clasName = {clasName} 
    onClick ={onClick}><RiCloseLine size = {size}/></button></Fragment>)
    }
}
 export default CloseButtonWithIcon