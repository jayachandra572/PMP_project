import React ,{Component}from "react"
import {observer} from "mobx-react"
import {Header} from "../Header"
import {Tasks} from "../Tasks"
import {TasksContainer} from "./styledComponent"

@observer
class ProjectTasks extends Component{
    render(){
        const {userLogOut} = this.props;
        return ( <TasksContainer>
                <Header userLogOut = {userLogOut}/>
                 <Tasks {...this.props}/>)
    </TasksContainer>);
    }
}

export default ProjectTasks;


