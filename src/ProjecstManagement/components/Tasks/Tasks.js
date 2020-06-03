import React ,{Component} from "react";
import {observer} from "mobx-react"

import NoDataView from "../../../Common/components/NoDataView"
import {EachTask} from "../EachTask"
import {TaskTopics} from "../TaskTopics"

import {TasksHeader} from "../TasksHeader"

import {TasksContainer,TasksBox} from "./styleComponent"


@observer
class Tasks extends Component {
    renderTasks = ()=>{
        const {tasks,taskValidationField} =this.props;
        return (tasks.map((task,index)=>(<EachTask
                    key= {task.id} 
                    task = {task} 
                    taskValidationField = {taskValidationField}
                    index = {index}/>)));
    }
    render(){
    const { projectsPerPage,
            tasks
        } = this.props;
        return(
            <TasksContainer>
                <TasksHeader />
                {tasks.length===0?<NoDataView/>:
                <TasksBox projectsPerPage = {projectsPerPage}>
                    <TaskTopics/>
                    {this.renderTasks()}
                </TasksBox>}
            </TasksContainer>)
    }
}

export {Tasks};