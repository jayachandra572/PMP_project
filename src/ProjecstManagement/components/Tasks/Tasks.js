import React ,{Component,Fragment} from "react";
import {observer} from "mobx-react"

import NoDataView from "../../../Common/components/NoDataView"
import {EachTask} from "../EachTask"
import {TaskTopics} from "../TaskTopics"
import {PageNavigation} from"../PageNavigation"
import {TasksHeader} from "../TasksHeader"

import {TasksContainer,TasksBox} from "./styleComponent"


@observer
class Tasks extends Component {
    renderTasks = ()=>{
        const {projectTasks,taskValidationField} =this.props;
        return (projectTasks.map((task,index)=>(<EachTask
                    key= {task.id} 
                    task = {task} 
                    taskValidationField = {taskValidationField}
                    index = {index}/>)));
    }
    render(){
    const { projectsPerPage,
            projectTasks,
            activePageNumber,
            totalNumberOfPages,
            navigateToNextPage,
            navigateToPreviousPage,
            onClickPageNumber
        } = this.props;
        return(
            <TasksContainer>
                <TasksHeader />
                {projectTasks.length===0?<NoDataView/>:
                <Fragment>
                    <TasksBox projectsPerPage = {projectsPerPage}>
                        <TaskTopics/>
                        {this.renderTasks()}
                    </TasksBox>
                    {totalNumberOfPages!==1&&
                    <PageNavigation
                        activePageNumber = {activePageNumber}
                        totalNumberOfPages = {totalNumberOfPages}
                        navigateToNextPage = {navigateToNextPage}
                        navigateToPreviousPage = {navigateToPreviousPage}
                        onClickPageNumber={onClickPageNumber}/>}
                </Fragment>}
            </TasksContainer>)
    }
}

export {Tasks};