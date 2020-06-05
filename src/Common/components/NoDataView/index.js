import React from 'react'

import noDataFound from "./NoData.gif"
import { NoDataViewContainer, NoDataViewImg } from './styledComponents'

class NoDataView extends React.Component {
   render() {
      return (
         <NoDataViewContainer>
            <NoDataViewImg src = {noDataFound} alt ="No data Found" />
         </NoDataViewContainer>
      )
   }
}

export default NoDataView
