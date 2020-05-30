import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import Colors from "../../themes/Colors"

import {Typo24DarkBlueGreyHKGroteskMedium,
        Typo18DarkBlueGreyHKGroteskMedium
} from "../../../styleGuide/Typos";

export const UserNameAndLogo = styled.div`${tw` flex items-center mr-3` }`;
export const ProjectTitleAndLogo =styled.div`${tw`flex items-center ml-4`}`;

export const ProjectTitle = styled(Typo24DarkBlueGreyHKGroteskMedium)`${tw`ml-4`}`
export const UserName = styled(Typo18DarkBlueGreyHKGroteskMedium)`${tw`mr-4`}`

export const HeaderContainer = styled.div`${tw` flex justify-between items-center `}
  height: 80px;
  border: solid 1px ${Colors.lightBlueGrey};
  background-color:${Colors.white};
  padding-left:8px;
  padding-right:16px`;
export const LogOutButton = styled.button`
padding:5px;
margin-right:20px;
border-radius:4px;
background-color:${Colors.brightBlue};
color:${Colors.white};
`