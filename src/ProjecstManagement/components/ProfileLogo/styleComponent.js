import tw from "tailwind.macro"
import styled from "@emotion/styled"

export const ProfileLogoStyles = styled.img`${tw`mx-2`}
width:${props=>props.size}px;
height:${props=>props.size}px;
radius:50%;
`