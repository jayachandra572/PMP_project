import React,{Component} from "react"

import {observer,inject} from "mobx-react"
import { withRouter } from 'react-router-dom';
import {reaction} from "mobx";
import ProjectTasks from "../../components/ProjectTasks";

@inject("tasksStore",'authenticationStore')
@observer
class TasksRoute extends Component{
    doNetWorkCall = ()=>{
        const {tasks,offset,tasksPerPage} = this.props.tasksStore;
        const {params:{id}} = this.props.match;
        tasks.apiCall({id:id,offset:offset,limit:tasksPerPage});
    }
    
    taskNetWorkCall = reaction(
        () =>this.props.tasksStore.activePageNumber,
        ()=>this.doNetWorkCall())
    
    componentDidMount(){
        this.doNetWorkCall();
    }


    render(){
        const {getApiStatus,getApiError} = this.props.tasksStore.tasks;
        const {userLogOut} = this.props.authenticationStore;
        const {projectTasks,activePageNumber,totalNumberOfPages,
        navigateToNextPage,navigateToPreviousPage,onClickPageNumber
        } = this.props.tasksStore;
       const {taskValidationField} = this.props.tasksStore;
        return(<ProjectTasks
                projectTasks = {projectTasks}
                taskValidationField = {taskValidationField}
                apiStatus = {getApiStatus}
                apiError = {getApiError}
                doNetWorkCall = {this.doNetWorkCall}
                userLogOut = {userLogOut}
                activePageNumber = {activePageNumber}
                totalNumberOfPages = {totalNumberOfPages}
                navigateToNextPage = {navigateToNextPage}
                navigateToPreviousPage = {navigateToPreviousPage}
                onClickPageNumber = {onClickPageNumber}/>);
    }
    
}

export default withRouter(TasksRoute)