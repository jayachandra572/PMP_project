import React,{Component} from "react"

import {Header} from "./Header"
import {Projects} from "./Projects"

function ProjectsView(props){
    const {userLogOut,projects} =props;
    return(
        <div>
            <Header/>
            <Projects projects = {projects}/>
            <button onClick = {userLogOut}>logout</button>
        </div>)
}

export default ProjectsView