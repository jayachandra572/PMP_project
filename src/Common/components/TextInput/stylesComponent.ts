import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import Colors from '../../themes/Colors'

interface TextInputProps {
   isError:boolean
}

export const InputField = styled.input<TextInputProps>`
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
   border-radius:5px;
   background-color: ${props =>
      props.isError ? Colors.neonRed5 : Colors.white};
`

