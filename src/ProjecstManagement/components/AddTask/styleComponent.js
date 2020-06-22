import tw from 'tailwind.macro'
import styled from '@emotion/styled'

import DropDown from '../../../Common/components/Filters/DropDown'
import TextArea from '../../../Common/components/TextArea'
import { InputField } from '../../../Common/components/InputText'
import Button from '../../../Common/components/Button'

import {
   Header,
   Label,
   Required,
   Container
} from '../../styleComponent/FormStyles'
export { Header, Required }

import Colors from '../../themes/Colors'

export const IssueTypeMenu = styled(DropDown)``

export const DescriptionTextArea = styled(TextArea)`
   border: 1px solid ${props => (props.isError ? 'red' : Colors.lightBlueGrey)};
   width: 400px;
   color: ${Colors.steel};
`

export const TaskTitle = styled(InputField)`
   ${tw``}
   width:400px;
   border: 1px solid ${props => (props.isEmpty ? 'red' : Colors.lightBlueGrey)};
   border-radius: 4px;
   color: ${Colors.steel};
`

export const AddTaskContainer = styled(Container)`
   min-height: 300px;
   padding: 10px;
`

export const TaskTitleLabel = styled(Label)`
   margin-top: 30px;
`
export const DescriptionLabel = styled(Label)`
   margin-top: 30px;
`
export const IssueTypeLabel = styled(Label)`
   margin-top: 30px;
`

export const SubmitButton = styled(Button)`
   ${tw`mt-8`}
   width:400px;
`
