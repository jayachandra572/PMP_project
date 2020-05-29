import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import Colors from '../../themes/Colors'
import Button from '../../../Common/components/Button'
import DropDown from "../../../Common/components/Filters/DropDown";

import { InputLabel } from '../../../Common/components/Lable'
import { InputField } from '../../../Common/components/InputText'

export const ProjectName = styled(InputField)`${tw``}`
export const AddProjectContainer = styled.div`${tw`flex flex-col `}`;

const Label = styled(InputLabel)`${tw`mt-5 mb-5`}`

export const WorkflowType = styled(DropDown)``
export const ProjectType = styled(DropDown)``
export const ProjectNameLabel = styled(Label)``
export const DescriptionLabel = styled(InputLabel)`${tw`mb-5`}`
export const WorkflowTypeLabel = styled(Label)``
export const ProjectTypeLabel = styled(Label)``

export const SubmitButton = styled(Button)`${tw`px-7 mt-5`}
width:70px;`