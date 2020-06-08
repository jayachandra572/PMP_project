import tw from "tailwind.macro"
import styled from "@emotion/styled"

export const ProfileLogoStyles = styled.img`${tw` object-cover`}
width:${props=>props.size}px;
height:${props=>props.size}px;
border-radius:50%;
`