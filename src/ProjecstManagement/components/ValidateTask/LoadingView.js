import React,{Fragment} from "react";
import Loader from 'react-loader-spinner'
            
 function LoadingView (){
    return( 
     <Fragment>
           <Loader
               type='ThreeDots'
               color='#00BFFF'
               text-align='center'
               height={70}
               width = {70}
            />
            <p clasName="mt-3">Loading...</p>
            </Fragment>);
}

export default LoadingView