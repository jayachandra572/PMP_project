import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class DropDown extends React.Component {
   static defaultProps = {
      styles: {
         width: '320px',
         border: '1px solid #7e858e'
      },
      options: [],
      defaultValue: '',
      loading: false,
      error: false,
      onClick: () => {}
   }
   
   onChangeDropdownSelect = (event,data) =>{
      this.props.onChange(data.value)
   }
   render() {
      let {
         options,
         placeholder,
         styles,
         loading,
         value,
         onClick,
         error,
         id
      } = this.props
      options =
         options !== null
            ? options.map(workFlow => {
                 return {
                    key: workFlow.id,
                    text: workFlow.name,
                    value: workFlow.id
                 }
              })
            : []
      return (
         <Dropdown
            data-testid = {id}
            value={value}
            placeholder={placeholder}
            fluid
            selection
            error={error}
            loading={loading}
            disabled={loading || error}
            options={options}
            onChange={this.onChangeDropdownSelect}
            onClick={onClick}
            style={styles}
         />
      )
   }
}

export default DropDown
