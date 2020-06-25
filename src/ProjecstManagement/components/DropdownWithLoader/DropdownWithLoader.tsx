import React,{Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { StatusObject } from "../../stores/type"

interface DropdownWithLoaderProps {
   value:string
   open:boolean
   onChange:(value:string) => void
   onClick : () => void
   loading:boolean
   closeDropdownMenu : () => void
   options:Array<StatusObject>|null
   styles:React.CSSProperties
}

class DropdownWithLoader extends Component<DropdownWithLoaderProps> {
   static defaultProps = {
      styles: {
         width: '320px',
         border: '1px solid #7e858e'
      },
      defaultValue: '',
      loading: false,
      options:null,
      onClick: () => {}
   }

   onChangeState = (_, data) => {
      const { onChange, closeDropdownMenu } = this.props
      onChange(data.value)
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
      const dropdownOptions =
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
            options={dropdownOptions}
            onChange={this.onChangeState}
            onClick={onClick}
            style={styles}
            onBlur={closeDropdownMenu}
         />
      )
   }
}

export { DropdownWithLoader }
