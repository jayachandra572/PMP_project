import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import Colors from '../../themes/Colors'
import Button from '../../../Common/components/Button'
import DropDown from "../../../Common/components/Filters/DropDown";
import TextArea from "../../../Common/components/TextArea";

import { InputLabel } from '../../../Common/components/Lable'
import { InputField } from '../../../Common/components/InputText'


export const Header = styled.h2`  height: 32px;
  font-family: HKGrotesk;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: normal;
  text-align:center;
  color: ${Colors.darkBlueGray}`
export const ProjectName = styled(InputField)`${tw``}
width:400px;
border:1px solid ${Colors.lightBlueGrey};
border-radius:4px;`
export const AddProjectContainer = styled.div`${tw`flex flex-col `}
min-height:550px;
min-width:450px`;

const Label = styled(InputLabel)`${tw`mb-5`}
font-size: 12px;
height: 16px;
margin-top:16px;
color:${Colors.steel};
font-weight:550`

export const WorkflowType = styled(DropDown)``
export const ProjectType = styled(DropDown)``
export const ProjectNameLabel = styled(Label)`
margin-bottom:16px`
export const DescriptionLabel = styled(Label)`
margin-top:30px;`
export const WorkflowTypeLabel = styled(Label)`${tw`mt-5`}
margin-top:30px;`
export const ProjectTypeLabel = styled(Label)`${tw`mt-5`}
margin-top:30px;`

export const DescriptionTextArea = styled(TextArea)`
border:1px solid ${Colors.lightBlueGrey};
width:400px;`

export const SubmitButton = styled(Button)`${tw`px-7 mt-8`}
width:400px;`