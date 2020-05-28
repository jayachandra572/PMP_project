import tw from "tailwind.macro"
import styled from "@emotion/styled"
import Button from "../../../Common/components/Button"
import Colors from "../../themes/Colors"

import {
    Typo12DarkBlueGreyHKGroteskSemiBold,
    Typo12SteelHKGroteskSemiBold,
    Typo32BrightBlueHKGroteskMedium
} from "../../../styleGuide/Typos";

export const Heading = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`${tw``}
flex-grow:1;
`;

export const ProjectTopicsContainer= styled.div`${tw`flex w-full items-center justify-center`}
    height: 64px;
    padding-left:5px;
    background-color:${Colors.white};
    border: solid 1px ${Colors.lightBlueGrey}`;

export const Container =styled.div`${tw`flex w-full items-center justify-center`}
    height: 64px;
    border: solid 1px ${Colors.lightBlueGrey};
    padding-left:5px;
    background-color:${props=>props.isOdd?Colors.white: Colors.lightBlueGrey}
`;

export const CreatedAt = styled(Typo12SteelHKGroteskSemiBold)`
flex-grow:1`;
export const ProjectName = styled(Typo12SteelHKGroteskSemiBold)`
flex-grow:1`;
export const WorkFlow = styled(Typo12SteelHKGroteskSemiBold)`
flex-grow:1`;
export const Description = styled(Typo12SteelHKGroteskSemiBold)`
flex-grow:1`;

export const UserName = styled(Typo12SteelHKGroteskSemiBold)`
margin-left:4px;
flex-grow:0;`;
export const CreatedByContainer = styled.div`${tw`flex items-center`}
flex-grow:1`

export const ProjectTitle = styled(Typo32BrightBlueHKGroteskMedium)``
export const ProjectHeaderContainer = styled.div`${tw`w-full flex justify-between my-6`}`;
export const CreatProjectButton = styled(Button)`
height:40px;
width:auto;
padding:5px;`;