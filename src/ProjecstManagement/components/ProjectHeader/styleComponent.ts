import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import Colors from '../../themes/Colors'

import { Typo32BrightBlueHKGroteskMedium } from '../../../styleGuide/Typos'

export const ProjectHeaderContainer = styled.div`
   ${tw`w-full flex justify-between`}
   margin-bottom:40px;
   margin-top: 20px;
`
export const ProjectTitle = styled(Typo32BrightBlueHKGroteskMedium)``

export const CreateWorkFlow = styled.button`
   padding: 10px;
   margin-right: 20px;
   border-radius: 4px;
   background-color: ${Colors.brightBlue};
   color: ${Colors.white};
`
