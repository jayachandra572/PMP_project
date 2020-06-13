import tw from 'tailwind.macro'
import styled from '@emotion/styled'

import { Header, CloseButton } from '../../styleComponent/FormStyles'
import { Typo12SteelHKGroteskSemiBold } from '../../../styleGuide/Typos'

import { CommonStyle, Container } from '../../styleComponent/ListItemStyles'

export const IssueType = styled(CommonStyle)``
export const Title = styled(CommonStyle)``
export const Description = styled(CommonStyle)``
export const CreatedAt = styled(CommonStyle)``
export const TaskInfo = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`text-center h-auto`}
   flex-grow:0;
   width: 60px;
`
export const State = styled.div`
   ${tw`flex-1 flex justify-center m-0 p-0`}
   flex-basis:0px;
`
export const TaskContainer = styled(Container)``

export const TaskDetailsContainer = styled.div`
   ${tw`flex flex-col flex-wrap `}
   min-width:300px;
`

export const DetailsField = styled.div`
   ${tw`flex flex-wrap my-5`};
`
export const Caption = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`mt-1`}
`
export const CaptionValue = styled.p`
   ${tw`text-justify self-start ml-5`}
   word-wrap: break-word;
   max-width: 250px;
`
export const CloseIconButton = styled(CloseButton)`
   top: 20px;
   right: 20px;
`
