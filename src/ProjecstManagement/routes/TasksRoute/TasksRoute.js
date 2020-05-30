import React,{Component} from "react"

import {observer,inject} from "mobx-react"

import ProjectTasks from "../../components/ProjectTasks";

@inject("tasksStore",'authenticationStore')
@observer
class TasksRoute extends Component{
    doNetWorkCall = ()=>{
        const {tasks} = this.props.tasksStore;
        tasks.apiCall({});
    }
    
    componentDidMount(){
        const {tasks} = this.props.tasksStore;
        tasks.apiCall({});
    }

    render(){
        const {getApiStatus,getApiError} = this.props.tasksStore.tasks;
         const {userLogOut} = this.props.authenticationStore;
        const {projectTasks} = this.props.tasksStore;
        return(<ProjectTasks
                projectTasks = {projectTasks}
                apiStatus = {getApiStatus}
                apiError = {getApiError}
                doNetWorkCall = {this.doNetWorkCall}
                userLogOut = {userLogOut}
        />);
    }
    
}

export {TasksRoute}