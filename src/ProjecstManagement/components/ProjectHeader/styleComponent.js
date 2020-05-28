import tw from "tailwind.macro"
import styled from "@emotion/styled"
import Button from "../../../Common/components/Button"
import {
    Typo32BrightBlueHKGroteskMedium
} from "../../../styleGuide/Typos";


export const ProjectHeaderContainer = styled.div`${tw`w-full flex justify-between`}
margin-bottom:40px;
margin-top:20px`;
export const ProjectTitle = styled(Typo32BrightBlueHKGroteskMedium)``

export const CreatProjectButton = styled(Button)`
height:40px;
width:auto;
padding:5px;`;