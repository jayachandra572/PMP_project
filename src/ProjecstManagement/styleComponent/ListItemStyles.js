import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import Colors from '../themes/Colors'
import { Typo12SteelHKGroteskSemiBold } from '../../styleGuide/Typos'

export const CommonStyle = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`text-center px-3  flex-1`}
   max-width:100%;
   text-overflow: ellipsis;
   white-space: nowrap;
   overflow: hidden;
   font-size:18px;
`

export const Container = styled.div`
   ${tw`flex w-full items-center flex-wrap justify-center`}
   min-height:66px;
   border: solid 1px ${Colors.lightBlueGrey};
   padding-left: 5px;
   background-color: ${props =>
      props.isOdd ? Colors.white : Colors.lightBlueGrey24};
`
