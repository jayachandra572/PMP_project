import React, { Component } from 'react'
import withPMPHeader from '../../hoc/withPmpHeader'
class VideosPageTwo extends Component {
   render() {
      return (
         <div>
            <h2> videos portal 1 </h2>
            <video
               src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
               id='video-page-1-1'
               width='300'
               style={{ margin: '20px' }}
               controls
            />
            <iframe
               width='480'
               height='480'
               style={{ margin: '20px' }} 
               src='https://www.youtube.com/embed/v3nYE1rE7OU'
               frameborder='0'
               allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
               allowfullscreen
               id='video-page-1-2'
            ></iframe>
         </div>
      )
   }
}

export default withPMPHeader(VideosPageTwo)
