import React, { Component } from 'react'

class TextArea extends Component {
   static defaultProps = {
      cols: '40',
      rows: '5'
   }
   render() {
      const { value, onChange, cols, rows, className, id } = this.props
      return (
         <textarea
            id={id}
            data-testid = {id}
            value={value}
            className={className}
            onChange={onChange}
            cols={cols}
            rows={rows}
         />
      )
   }
}

export default TextArea
