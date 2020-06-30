import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const ProjectsContainer = styled.div`
   ${tw` p-8 flex flex-col `}
   flex-grow:1;
`
export const ProjectsBox = styled.div`
   ${tw`flex flex-col  w-full relative overflow-x-auto`}
   min-height:550px;
   min-width: 400px;
   padding: 10px;
   ${tw``}
   flex-grow:1;
`
export const ProjectsWithNavigationBar = styled.div`
   ${tw`relative`}
`
