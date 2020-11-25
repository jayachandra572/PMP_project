import React, { Component } from 'react'
import withPMPHeader from '../../hoc/withPmpHeader'
class VideosPageOne extends Component {
   render() {
      console.log('rendered')
      return (
         <div>
            <h2> videos portal 1 </h2>
            <video
               src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
               id='video-1'
               width='300'
               style={{ margin: '20px' }}
               controls
            />
            <iframe
               width='480'
               height='480'
               src='https://www.youtube.com/embed/v3nYE1rE7OU'
               frameborder='0'
               allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
               allowfullscreen
            ></iframe>
         </div>
      )
   }
}

export default withPMPHeader(VideosPageOne)
