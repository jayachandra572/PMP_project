import React, { Component } from 'react'
import { API_SUCCESS } from '@ib/api-constants'
import strings from '../../i18n/strings.json'
import Images from '../../themes/Images'
import {
   PreviousButton,
   NextButton,
   PageNumberButton,
   PageNavigationSymbol,
   PageNavigationContainer
} from './styleComponent'

class PageNavigation extends Component {
   renderPageNumberButtons = () => {
      const {
         activePageNumber,
         totalNumberOfPages,
         onClickPageNumber
      } = this.props
      const { startingPageNumber } = strings
      let buttons = []
      for (
         let pageNumber = startingPageNumber;
         pageNumber <= totalNumberOfPages;
         pageNumber++
      ) {
         const active = pageNumber === activePageNumber
         buttons.push(
            <PageNumberButton
               key={pageNumber}
               active={active}
               onClick={() => onClickPageNumber(pageNumber)}
            >
               {pageNumber}
            </PageNumberButton>
         )
      }
      return buttons
   }

   render() {
      const {
         activePageNumber,
         totalNumberOfPages,
         navigateToNextPage,
         navigateToPreviousPage,
         apiStatus
      } = this.props
      const isPreviousButtonDisabled = 1 === activePageNumber
      const isNextButtonDisabled = activePageNumber === totalNumberOfPages
      if (totalNumberOfPages === 0 || totalNumberOfPages == 1) {
         return null
      }
      return (
         <PageNavigationContainer>
            <PreviousButton
               disabled={isPreviousButtonDisabled}
               data-testid={strings.previousButtonDataTestId}
               onClick={navigateToPreviousPage}
               isPreviousButtonDisabled={isPreviousButtonDisabled}
            >
               <PageNavigationSymbol src={Images.previousButtonSymbol} />
            </PreviousButton>
            {this.renderPageNumberButtons()}
            <NextButton
               disabled={isNextButtonDisabled}
               data-testid={strings.nextButtonDataTestId}
               onClick={navigateToNextPage}
               isNextButtonDisabled={isNextButtonDisabled}
            >
               <PageNavigationSymbol src={Images.nextButtonSymbol} />
            </NextButton>
         </PageNavigationContainer>
      )
   }
}

export { PageNavigation }
