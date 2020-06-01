import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import Colors from '../../themes/Colors'
import { ErrorInfo } from '../Icons/ErrorInfo'

export const ErrorIcon = styled(ErrorInfo)`
   ${tw`absolute z-10`}
   top:20px;
   right: 16px;
`

export const InputContainer = styled.div`
   ${tw`flex flex-col relative`}
`

export const ContentArea = styled.input`
   ${tw`relative`}
   width:320px;
   height: 40px;
   font-family: HKGrotesk;
   font-size: 14px;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 24px;
   letter-spacing: normal;
   color: ${Colors.darkBlueGray};
   padding: 8px 16px;
   border: solid 1px ${props => (props.isError ? Colors.neonRed : Colors.steel)};
   background-color: ${props =>
      props.isError ? Colors.neonRed5 : Colors.white};
`

export const ErrorMessage = styled.span`
   height: 16px;
   font-family: HKGrotesk;
   font-size: 12px;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: normal;
   color: ${Colors.neonRed};
   margin: 0px;
   padding: 0px;
   margin-top:3px;

`
