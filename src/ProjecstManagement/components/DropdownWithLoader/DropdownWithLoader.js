import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class DropdownWithLoader extends React.Component {
   static defaultProps = {
      styles: {
         width: '320px',
         border: '1px solid #7e858e'
      },
      options: [],
      defaultValue: '',
      loading: false,
      onClick: () => {}
   }

   onChangeState = (event, data) => {
      const { onChange, closeDropdownMenu } = this.props
      onChange(event, data)
      closeDropdownMenu()
   }
   render() {
      let {
         options,
         styles,
         loading,
         value,
         onClick,
         open,
         closeDropdownMenu
      } = this.props
      options =
         options !== null
            ? options.map(workFlow => {
                 return {
                    key: workFlow.id,
                    value: workFlow.name,
                    text: workFlow.name
                 }
              })
            : []
      return (
         <Dropdown
            data-testid='dropdown'
            open={open}
            value={value}
            fluid
            selection
            loading={loading}
            disabled={loading}
            options={options}
            onChange={this.onChangeState}
            onClick={onClick}
            style={styles}
            onBlur={closeDropdownMenu}
         />
      )
   }
}

export { DropdownWithLoader }
