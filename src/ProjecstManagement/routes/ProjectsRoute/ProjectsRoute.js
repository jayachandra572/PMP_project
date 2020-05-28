import React,{Component} from "react"
import { inject, observer } from 'mobx-react'



import Projects from "../../components";

@inject('authenticationStore','projectsStore')
@observer
class ProjectsRoute extends Component{
    
    componentWillMount(){
        const {getProjectsFromAPi} = this.props.projectsStore;
        getProjectsFromAPi();
    }
    
    
    render(){
        
        const {projects} = this.props.projectsStore;
        const {userLogOut} = this.props.authenticationStore;
        return(<Projects userLogOut= {userLogOut} projects = {projects}  />
            );
    }
} 

export {ProjectsRoute};
