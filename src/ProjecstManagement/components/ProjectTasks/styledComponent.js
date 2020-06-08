import tw from "tailwind.macro"
import styled from "@emotion/styled"
import Colors from "../../themes/Colors"

import {ProjectContainer} from "../ProjecstManagement/styleComponent"

export const TasksContainer = styled(ProjectContainer)`${tw`relative`}`;

export const BackButton = styled.button`${tw`border-none underline absolute`}
color:${Colors.steel};
top:90px;
left:20px;`