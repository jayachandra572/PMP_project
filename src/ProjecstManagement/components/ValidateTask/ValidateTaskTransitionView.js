import React,{Component,Fragment} from "react"
import {observer} from "mobx-react"
import { API_SUCCESS,API_FETCHING,API_FAILED} from '@ib/api-constants'
import {RiCloseLine} from "react-icons/ri"

import CheckboxWithLabel from "../../../Common/components/CheckboxWithLabel";
import {Header,Required,CloseButton} from "../../styleComponent/FormStyles"
import {FromAndToStatus,FromStatus,ToStatus,TaskTransitionValidateContainer,
CheckBoxContainer,SubmitButton,From,To,Status,
VadationFields} from "./styleComponent"
import FailureView from "./FailureView"
import LoadingView from "./LoadingView"

@observer
class ValidateTaskTransitionView extends Component{
    
    renderValidationConditions = () =>{
        const {response} = this.props.taskValidationField;
        return(response.map(eachCondition=>(
            <CheckBoxContainer>
                <CheckboxWithLabel
                    id = {eachCondition.id}
                    label = {eachCondition.label}
                    value = {eachCondition.value}
                    onChange = {eachCondition.onChange}
                />
            </CheckBoxContainer>)));
    }
    
    renderSuccessUI = () =>{
        const {renderValidationConditions} = this;
        return(
            <Fragment>
                <VadationFields>
                    {renderValidationConditions()}
                </VadationFields>
                <SubmitButton content = {"SUBMIT"}/>
            </Fragment>);
    }
    
    LoadingWrapperWithFailure = observer(() =>{
        const {getValidateFields} = this.props;
        const {getApiStatus,getApiError} =  this.props.taskValidationField;
        switch(getApiStatus){
            case API_FAILED :
                return (<FailureView onRetryClick = {getValidateFields}/>);
            case API_FETCHING:
                return <LoadingView/>;
            case API_SUCCESS:
                return this.renderSuccessUI();
            default:
                return null;
        }
        
    })
    render(){
       const {LoadingWrapperWithFailure,props:{toStatus,fromStatus,title}} = this;
        return(
            <TaskTransitionValidateContainer>
             <CloseButton onClick ={this.props.handleClose}><RiCloseLine size = {24}/></CloseButton>
                <Header>{title.toUpperCase()}</Header>
                <FromAndToStatus>
                    <FromStatus>
                        <From>Form :</From><Status>{fromStatus}</Status>
                    </FromStatus>
                    <ToStatus>
                        <To>To : </To><Status>{toStatus}</Status>
                    </ToStatus>
                </FromAndToStatus>
                <LoadingWrapperWithFailure/>
            </TaskTransitionValidateContainer>)
    }
}

export {ValidateTaskTransitionView};