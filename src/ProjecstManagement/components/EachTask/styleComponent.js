import tw from "tailwind.macro"
import styled from "@emotion/styled"

import {CommonStyle,Container} from "../../styleComponent/ListItemStyles"

export const IssueType = styled(CommonStyle)``
export const Title = styled(CommonStyle)``
export const Description = styled(CommonStyle)``
export const CreatedAt = styled(CommonStyle)``
export const State = styled.div`${tw`flex-1 flex justify-center m-0 p-0`}
flex-basis:0px;
`;
export const TaskContainer = styled(Container)``;