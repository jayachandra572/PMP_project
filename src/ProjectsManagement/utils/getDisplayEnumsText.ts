import BackEndConstants from '../constants/BackEndConstants'

export default function(text:string):string {
   return BackEndConstants[text]
}
