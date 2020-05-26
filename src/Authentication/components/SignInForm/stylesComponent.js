import tw from "tailwind.macro";
import styled  from "@emotion/styled";
import Colors from "../../themes/Colors"
import Button from "../../../Common/components/Button"
import {InputField} from "../../../Common/components/InputText";

export const SignFormContainer = styled.div`${tw`w-screen h-screen flex justify-center items-center `}
background-color:${Colors.iceBlue}`

export const UserName = styled(InputField)`
margin-bottom:20px;`
export const UserPassWord = styled(InputField)`
margin-bottom:20px;`

export const SignButton = styled(Button)``;

export const SignUp = styled.span`
color:${Colors.brightBlue};
size:14px;`;

export const Footer = styled.p`
margin-top:25px;
color:${Colors.darkBlueGray}`;

export const Header =styled.span`${tw`text-center my-8`}
  width: 230px;
  font-family: Rubik;
  font-size: 32px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color:${Colors.darkBlueGray}`;
  
export const SignPage = styled.form`${tw`flex flex-col justify-around items-center  `}
  padding-top:48px;
  padding-bottom:100px;
  max-width:536px;
  max-height:687px;
  flex-grow:1;
  border-radius: 8px;
  background-color:${Colors.white}`;
  