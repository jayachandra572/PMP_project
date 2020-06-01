import React , {Component} from "react"

import {CreatedBy} from "../CreatedBy"
import {observable,toJS} from "mobx"
import {observer} from "mobx-react"

import {TaskStateMenu} from "./TaskStateMenu";
import {IssueType,Title,Description,CreatedAt,TaskContainer} from "./styleComponent"
@observer
class EachTask extends Component{
    @observable modalOpen = false
    
    onChangeState =(event,data)=>{
        this.props.task.changeTaskState();
        // this.handleOpen();
    }

    handleOpen = () => this.modalOpen= true 
    handleClose = () => this.modalOpen = false 
    render(){
        const {index,} = this.props;
        const {issueType,title,description,createdBy,createdAt,
        state,getStatusTransitionOptions,stateOptions,getApiStatus} = this.props.task
        const isOdd = index%2 ===1;
        console.log(toJS(stateOptions))
        return(
                <TaskContainer isOdd = {isOdd} >
                    <IssueType>{issueType}</IssueType>
                    <Title>{title}</Title>
                    <CreatedBy name = {createdBy} />
                    <Description>{description}</Description>
                    <CreatedAt>{createdAt}</CreatedAt>
                    <TaskStateMenu 
                        onChangeState = {this.onChangeState} 
                        onClickStateMenu = {getStatusTransitionOptions}
                        options = {stateOptions} 
                        value = {state} 
                        handleClose={this.handleClose}
                        open={this.modalOpen}
                        getApiStatus = {getApiStatus}/>
                </TaskContainer>
            );
        }
}

export {EachTask};