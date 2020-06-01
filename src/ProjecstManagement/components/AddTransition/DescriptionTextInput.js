import React ,{Component,Fragment} from "react"
import { observer,inject } from 'mobx-react';
import {observable,action} from "mobx"
import { API_SUCCESS , API_INITIAL,API_FETCHING} from '@ib/api-constants'

import Colors from '../../themes/Colors';
import strings from '../../i18n/strings.json';

import {
    DescriptionLabel,
    DescriptionTextArea,
} from "./styleComponent"

const  DescriptionTextInput = observer((props) =>{
        const {AddTransition} = strings
        const  {tranistionDescription,onChangeTransitionDescription} = props
        return(
            <Fragment>
                <DescriptionLabel
                isImportant = {false}
                lableFor={AddTransition.descriptionLabel}
                content={AddTransition.descriptionLabel}
               />
            <DescriptionTextArea
                id = {AddTransition.descriptionLabel}
                isError = {false}
                value = {tranistionDescription} 
                onChange = {onChangeTransitionDescription}/>

            </Fragment>);
    })
    
export {DescriptionTextInput}