import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Colors from '../../themes/Colors'
import Button from '../../../Common/components/Button'
import DropDown from '../../../Common/components/Filters/DropDown'
import TextArea from '../../../Common/components/TextArea'

import { InputField } from '../../../Common/components/InputText'
import {
   Header,
   Label,
   Required,
   Container
} from '../../styleComponent/FormStyles'
export { Header, Required}

export const ProjectName = styled(InputField)`
   ${tw``}
   width:400px;
   border: 1px solid ${props => (props.isEmpty ? 'red' : Colors.lightBlueGrey)};
   border-radius: 4px;
   color: ${Colors.steel};
`

export const AddProjectContainer = styled(Container)``

export const WorkflowType = styled(DropDown)``
export const ProjectType = styled(DropDown)``
export const ProjectNameLabel = styled(Label)``
export const DescriptionLabel = styled(Label)``
export const WorkflowTypeLabel = styled(Label)``
export const ProjectTypeLabel = styled(Label)``

export const DescriptionTextArea = styled(TextArea)`
   border: 1px solid ${props => (props.isError ? 'red' : Colors.lightBlueGrey)};
   width: 400px;
   color: ${Colors.steel};
`

export const SubmitButton = styled(Button)`
   ${tw`mt-8`}
   width:400px;
`

