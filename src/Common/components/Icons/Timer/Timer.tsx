import React, { Component } from 'react'
import SvgComponent from '../../SvgComponent'
import SvgFile from './SvgFile'

class Timer<T> extends Component<T> {
   render() {
      return <SvgComponent renderComponent={SvgFile} {...(this.props as T)} />
   }
}

export default Timer
