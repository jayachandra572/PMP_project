import React ,{Component} from "react";

import projectsData from "../../fixtures/projectResponseData.json";
import {EachProject} from "./EachProject"
import {ProjectTopics} from "./ProjectTopics"
import {ProjectHeader} from "./ProjectHeader"
class Projects extends Component {
    
    renderProjects = ()=>{
        console.log(this.props)
        const projects = this.props.projects;
        return (projects.map((project,index)=>(<EachProject key= {project.id} project = {project} index = {index}/>)));
    }
    
    render(){
            return (
            <div className = "w-full p-8">
            <ProjectHeader/>
            <ProjectTopics/>
            {this.renderProjects()}
            </div>
            );
    }
}

export {Projects};