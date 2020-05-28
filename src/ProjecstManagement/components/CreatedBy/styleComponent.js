import tw from "tailwind.macro"
import styled from "@emotion/styled"
import {
    Typo12SteelHKGroteskSemiBold
} from "../../../styleGuide/Typos";


export const CreatedByContainer = styled.div`${tw`flex items-center justify-center flex-1`}`

export const UserName = styled(Typo12SteelHKGroteskSemiBold)`${tw`flex-1`}
margin-left:4px;
flex-grow:0;`;