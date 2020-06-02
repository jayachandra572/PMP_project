import tw from "tailwind.macro"
import styled from "@emotion/styled"

export const FailureAndLoadingContainer = styled.div`${tw`flex flex-col justify-center items-center p-5 relative`}
min-width:500px;
min-height:500px;
`

export const TaskTransitionValidateContainer = styled.div`${tw`flex flex-col justify-around w-full`}
border:2px solid red;
min-height:500px;`

export const RetryButton = styled.button`
   ${tw`px-8 py-2 bg-blue-500 text-white text-2xl rounded`}
`
export const FailureViewMessage = styled.p`
   ${tw`m-6 text-2xl text-center`}
`