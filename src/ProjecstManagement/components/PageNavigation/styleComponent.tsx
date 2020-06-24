import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import Colors from '../../themes/Colors'


type PageNavigationButtonType = {
   active:boolean
}
type PreviousButtonPropsType = {
   isPreviousButtonDisabled:boolean
}
type NextButtonPropsType = {
   isNextButtonDisabled:boolean
}
export const PageNumberButton = styled.button<PageNavigationButtonType>`
   ${tw`flex justify-center items-center`}
   width: 24px;
   height: 24px;
   margin: 4px;
   border-radius: 2px;
   font-size: 12px;
   border: solid 1px
      ${props => (props.active ? Colors.darkBlueGray : Colors.lightBlueGrey)};
   color: ${props => (props.active ? Colors.darkBlueGray : Colors.steel)};
   background-color: ${Colors.white};
`

export const PageNavigationButton = styled(PageNumberButton)`
   border: solid 1px ${Colors.lightBlueGrey};
   color: black;
`

export const PreviousButton = styled(PageNavigationButton)<PreviousButtonPropsType>`
   cursor: ${props =>
      props.isPreviousButtonDisabled ? 'not-allowed' : 'default'};
`
export const NextButton = styled(PageNavigationButton)<NextButtonPropsType>`
   cursor: ${props => (props.isNextButtonDisabled ? 'not-allowed' : 'default')};
`

export const PageNavigationSymbol = styled.img`
   width: 16px;
   height: 16px;
   object-fit: contain;
`

export const PageNavigationContainer = styled.div`
   ${tw` flex justify-center pt-8`}
`
