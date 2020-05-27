import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import Colors from '../../themes/Colors'
export const ButtonStyleComponent = styled.button`
   ${tw`flex justify-center items-center`}
   border-radius: 4px;
   background-color: ${Colors.brightBlue};
   color: ${Colors.white};
   width: 320px;
   min-height: 40px;
   size: 14px;
   line-height: 24px;
`
