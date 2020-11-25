import React, { Component } from 'react'
import withPMPHeader from '../../hoc/withPmpHeader'
class VideosPageFour extends Component {
   render() {
      return (
         <div>
            <h2> videos portal 3 </h2>
            <video
               src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
               id='video-page-3-1'
               width='300'
               style={{ margin: '20px' }}
               controls
            />
            <iframe
               width='480'
               height='480'
               style={{ margin: '30px' }}
               src='https://www.youtube.com/embed/Iu7SntY5AeE'
               frameborder='0'
               allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
               allowfullscreen
               id='video-page-3-2'
            ></iframe>
         </div>
      )
   }
}

export default withPMPHeader(VideosPageFour)
