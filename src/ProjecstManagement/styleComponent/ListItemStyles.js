import tw from "tailwind.macro"
import styled from "@emotion/styled"
import Colors from "../themes/Colors"
import {
    Typo12SteelHKGroteskSemiBold
} from "../../styleGuide/Typos";

export const CommonStyle = styled(Typo12SteelHKGroteskSemiBold)`${tw`text-center flex-1`}
overflow: visible;`;

export const Container =styled.div`${tw`flex w-full items-center justify-center`}
    min-height:66px;
    border: solid 1px ${Colors.lightBlueGrey};
    padding-left:5px;
    background-color:${props=>props.isOdd?Colors.white: Colors.lightBlueGrey24}
`;