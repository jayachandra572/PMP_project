import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import Colors from '../../themes/Colors'

import { Typo12DarkBlueGreyHKGroteskSemiBold } from '../../../styleGuide/Typos'

export const ProjectTopicsContainer = styled.div`
   ${tw`flex w-full items-center justify-center`}
   height: 64px;
   padding-left: 5px;
   background-color: ${Colors.white};
   border: solid 1px ${Colors.lightBlueGrey};
   border-top-left-radius: 8px;
   border-top-right-radius: 8px;
`

export const Heading = styled(
   Typo12DarkBlueGreyHKGroteskSemiBold
)`${tw`text-center flex-1`}
color:${Colors.darkBlueGray};
font-weight:500;
font-size:12px;
`
