import React,{Component} from "react"
import { API_SUCCESS } from '@ib/api-constants'
import {observer,inject} from "mobx-react"
import { withRouter } from 'react-router-dom';
import {reaction,toJS} from "mobx";
import ProjectTasks from "../../components/ProjectTasks";

@inject("tasksStore",'authenticationStore',)
@observer
class TasksRoute extends Component{
    doNetWorkCall = ()=>{
        const {tasks,offset,tasksPerPage,projectId} = this.props.tasksStore;
        tasks.apiCall({id:projectId,offset:offset,limit:tasksPerPage});
    }
    
    updateTaskReaction = reaction(
        ()=>this.props.tasksStore.postTask.getApiStatus,
        apiStatus =>{
            if(apiStatus === API_SUCCESS){
                this.doNetWorkCall();
            }
        })
    
    taskNetWorkCallDepose = reaction(
        () =>this.props.tasksStore.activePageNumber,
        ()=>this.doNetWorkCall())
        
    componentWillUnmount(){
        this.taskNetWorkCallDepose();
        this.onCreateTaskReactionDeposer();
        this.props.tasksStore.init();
    }
    
    onCreateTaskReactionDeposer = reaction(
        ()=>this.props.tasksStore.taskTrasitionState.getApiStatus,
        apiStatus=>{
            if(apiStatus === API_SUCCESS){
                this.doNetWorkCall();
            }
        })
    
    componentDidMount(){
        const {upDateProjectId} = this.props.tasksStore;
        const {params:{id}} = this.props.match;
        upDateProjectId(id);
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