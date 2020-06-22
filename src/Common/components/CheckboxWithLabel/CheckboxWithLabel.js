import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import strings from '../../i18n/strings.json'
const CheckboxWithLabel = props => {
   const { label, onClick, id, value } = props
   return (
      <Checkbox
         data-testid={strings.checkboxDataTestId}
         id={id}
         onClick={onClick}
         label={label}
         checked={value}
      />
   )
}

export default CheckboxWithLabel
