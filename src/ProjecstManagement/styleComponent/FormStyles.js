import tw from 'tailwind.macro'
import styled from '@emotion/styled'

import { InputLabel } from '../../Common/components/Label'
import Colors from '../themes/Colors'

export const Header = styled.h2`
   height: 32px;
   font-family: HKGrotesk;
   font-size: 20px;
   font-weight: bold;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.6;
   letter-spacing: normal;
   text-align: center;
   color: ${Colors.darkBlueGray};
`

export const Label = styled(InputLabel)`
   ${tw`mb-5 w-full`}
   font-size: 12px;
   height: 16px;
   margin-top: 25px;
   color: ${Colors.steel};
   font-weight: 550;
   font-family: HKGrotesk;
`

export const Required = styled.span`
   ${tw``}
   color:red;
   margin-top: 4px;
`

export const Container = styled.div`
   ${tw`flex flex-col  w-full relative`}
   min-height:550px;
   min-width: 400px;
   padding: 10px;
`
