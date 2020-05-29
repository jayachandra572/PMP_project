import tw from "tailwind.macro"
import styled from "@emotion/styled"


import {
    Typo32BrightBlueHKGroteskMedium
} from "../../../styleGuide/Typos";


export const ProjectHeaderContainer = styled.div`${tw`w-full flex justify-between`}
margin-bottom:40px;
margin-top:20px;
`
;
export const ProjectTitle = styled(Typo32BrightBlueHKGroteskMedium)``