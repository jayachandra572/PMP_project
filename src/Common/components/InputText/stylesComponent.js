import styled from "@emotion/styled";
import tw from "tailwind.macro";
import Colors from "../../themes/Colors"

export const InputContainer = styled.div`${tw`flex flex-col`}`
export const ContentArea = styled.div`${tw`flex `}
width:320px;
height: 40px;
border-radius: 2px;
border: solid 1px ${props=>props.isError ?Colors.neonRed:Colors.steel};
background-color:${props=>props.isError ?Colors.neonRed5:Colors.white};
padding:8px 16px;
margin-bottom:16px;`;
export const Text = styled.input`${tw` w-full`}
height:24px;
font-family: HKGrotesk;
font-size: 14px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.71;
letter-spacing: normal;
color:${Colors.darkBlueGray};
background-color:transparent;`;
export const ErrorMessage = styled.span`
  height: 16px;
  font-family: HKGrotesk;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color:${Colors.neonRed};
  
  margin:0px`;