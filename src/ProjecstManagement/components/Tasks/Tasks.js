import React ,{Component} from "react";
import {observer} from "mobx-react"

import LoadingWrapperWithFailure from "../../../Common/components/LoadingWrapperWithFailure";
import NoDataView from "../../../Common/components/NoDataView"
import {EachTask} from "../EachTask"
import {TaskTopics} from "../TaskTopics"

import {TasksHeader} from "../TasksHeader"

import {TasksContainer,TasksBox} from "./styleComponent"


@observer
class Tasks extends Component {
    renderTasks = ()=>{
        const {tasks} =this.props;
        return (tasks.map((task,index)=>(<EachTask
                    key= {task.id} 
                    task = {task} 
                    index = {index}/>)));
    }
    
    renderSuccessUI = () =>{
         const {
            projectsPerPage,
            tasks
        } = this.props;
        console.log(tasks)
        return(
            <TasksContainer>
                <TasksHeader />
                {tasks.length===0?<NoDataView/>:
                <TasksBox projectsPerPage = {projectsPerPage}>
                    <TaskTopics/>
                    {this.renderTasks()}
                </TasksBox>}
            </TasksContainer>);
    }
    
    render(){
       const {apiError,apiStatus,doNetWorkCall} = this.props;
        return (
            <LoadingWrapperWithFailure
                apiError = {apiError}
                apiStatus = {apiStatus}
                onRetryClick = {doNetWorkCall}
                renderSuccessUI = {this.renderSuccessUI}/>
            );
    }
}

export {Tasks};