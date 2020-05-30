import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import Colors from '../../themes/Colors'
import Button from '../../../Common/components/Button'
import { InputField } from '../../../Common/components/InputText'
import { InputLabel } from '../../../Common/components/Lable'

export const LogInFormContainer = styled.div`${tw`w-screen min-h-screen h-full flex justify-center items-center `}
background-color:${Colors.iceBlue}`

export const UserName = styled(InputField)`
   margin-top:10px;
`
export const UserPassWord = styled(InputField)`
   margin-top:10px;
`;

export const UserNameLabel = styled(InputLabel)`
margin-top:20px;
`

export const UserPasswordLabel  =styled(InputLabel)`
margin-top:20px`


export const LogInButton = styled(Button)`
margin-top:30px;
`

export const SignUp = styled.span`
   color: ${Colors.brightBlue};
   size: 14px;
`

export const Footer = styled.p`
   margin-top: 25px;
   color: ${Colors.darkBlueGray};
`

export const Header = styled.span`
   ${tw`text-center my-8`}
   width: 230px;
   font-family: Rubik;
   font-size: 32px;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.25;
   letter-spacing: normal;
   color: ${Colors.darkBlueGray};
`

export const LogInPage = styled.form`
   ${tw`flex flex-col justify-around items-center  `}
   padding-top:48px;
   padding-bottom: 50px;
   max-width: 536px;
   max-height: 687px;
   flex-grow: 1;
   border-radius: 8px;
   background-color: ${Colors.white};
`
