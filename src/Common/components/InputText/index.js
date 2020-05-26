import React,{Component} from "react";

import {InputContainer,Text,ErrorMessage,ContentArea} from "./stylesComponent";

import {ErrorInfo} from "../Icons/ErrorInfo";
import Colors from "../../themes/Colors";

class  InputField extends Component{
    static defaultProps = {
        isError  : false,
  };
    render(){
    const { textType,value,onChangeContent ,id,errorMessage,isError,className} = this.props; 
    return(<InputContainer className = {className}>
                <ContentArea isError = {isError}>
                    <Text
                        type = {textType} 
                        id = {id}
                        data-testid = "inputText"
                        value = {value}
                        onChange = {onChangeContent}/>
                    {isError&&<ErrorInfo size={16} color={Colors.neonRed} />}
                </ContentArea>
                {isError&&
                    <ErrorMessage>
                        {errorMessage}
                    </ErrorMessage>}
            </InputContainer>);
}
}

export {InputField};

