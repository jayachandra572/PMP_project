import tw from "tailwind.macro"
import styled from "@emotion/styled"
import Button from '../../../Common/components/Button'
import Colors from "../../themes/Colors"

export const FailureAndLoadingContainer = styled.div`${tw`flex flex-col justify-center h-full items-center`}
min-width:350px;
height:500px;
`

export const TaskTransitionValidateContainer = styled.div`${tw`flex flex-col justify-start px-5 py-4 relative w-full`}
min-width:350px;
height:500px;
color:${Colors.steel}`

export const RetryButton = styled.button`
   ${tw`px-8 py-2 bg-blue-500 text-white text-2xl rounded`}
`
export const FailureViewMessage = styled.p`
   ${tw`m-6 text-2xl text-center`}
`

export const FromAndToStatus = styled.div`${tw`flex justify-between p-2`}`
export const FromStatus = styled.span``;
export const ToStatus = styled.span``;

export const CheckBoxContainer = styled.div`${tw`bg-gray-200 p-4 my-2 `}
color:red;`

export const SubmitButton = styled(Button)`${`px-8 mt-6`}
width:auto;`
export const VadationFields = styled.div`${tw`w-full overflow-y-auto my-5 flex flex-col justify-between`}`

export const From = styled.span`${tw`text-xs`}`
export const To = styled(From)``
export const Status = styled.span`${tw`text-2xl pl-2`}
font-weight:500;`