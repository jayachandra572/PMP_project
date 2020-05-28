import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import Colors from "../../themes/Colors"


export const UserNameAndLogo = styled.div`${tw` flex items-center`}`;
export const ProjectTitleAndLogo =styled.div`${tw`flex items-center`}`;

export const HeaderContainer = styled.div`${tw` flex justify-between items-center `}
  height: 80px;
  border: solid 1px ${Colors.lightBlueGrey};
  background-color:${Colors.white};
  padding-left:8px;
  padding-right:16px`;