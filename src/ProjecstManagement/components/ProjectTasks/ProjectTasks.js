import React ,{Component}from "react"
import {observer} from "mobx-react"
import LoadingWrapperWithFailure from "../../../Common/components/LoadingWrapperWithFailure";
import {Header} from "../Header"
import {Tasks} from "../Tasks"
import {TasksContainer} from "./styledComponent"

@observer
class ProjectTasks extends Component{
    renderSuccessUI = observer(() =>{
        return(<Tasks {...this.props}/>)})
    render(){
        const {apiStatus,apiError,doNetWorkCall,userLogOut} = this.props;
        return ( <TasksContainer>
                <Header userLogOut = {userLogOut}/>
                 <LoadingWrapperWithFailure
                    apiError = {apiError}
                    apiStatus = {apiStatus}
                    onRetryClick = {doNetWorkCall}
                    renderSuccessUI = {this.renderSuccessUI}/>
    </TasksContainer>);
    }
}

export default ProjectTasks;
