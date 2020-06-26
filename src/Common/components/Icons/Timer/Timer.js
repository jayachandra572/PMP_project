import React, { Component } from 'react'
import SvgComponent from '../../SvgComponent'
import SvgFile from './SvgFile'

class Timer extends Component {
   render() {
      return <SvgComponent renderComponent={SvgFile} {...this.props} />
   }
}

export default Timer