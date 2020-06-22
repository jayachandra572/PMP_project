import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import Colors from '../../themes/Colors'
import Button from '../../../Common/components/Button'
import DropDown from '../../../Common/components/Filters/DropDown'
import TextArea from '../../../Common/components/TextArea'

import { InputField } from '../../../Common/components/InputText'
import {
   Header,
   Label,
   Container
} from '../../styleComponent/FormStyles'
export { Header }

export const TransitionContainer = styled(Container)`
   ${tw`p-0`}
`
export const FromStatusLable = styled(Label)``
export const ToStatusLabel = styled(Label)``
export const FromStatusDropDown = styled(DropDown)``

export const ToStatusDropDown = styled(DropDown)``

export const TrasitionName = styled(InputField)`
   width: 400px;
   border: 1px solid ${props => (props.isEmpty ? 'red' : Colors.lightBlueGrey)};
   border-radius: 4px;
   color: ${Colors.steel};
`

export const TrasitionNameLabel = styled(Label)``

export const DescriptionLabel = styled(Label)``

export const DescriptionTextArea = styled(TextArea)`
   border: 1px solid ${props => (props.isError ? 'red' : Colors.lightBlueGrey)};
   width: 400px;
   color: ${Colors.steel};
`

export const AddTransitionButton = styled(Button)`
   ${tw`mt-4`}
   width:400px;
`
