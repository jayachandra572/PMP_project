import React, { Component } from 'react'
import withPMPHeader from '../../hoc/withPmpHeader'
import VideoComponent from './videoComponent'
class VideosPageThree extends Component {

   render() {
      return (
         <div>
            <h2> videos portal 2 </h2>
            <VideoComponent
               videoID={'video-page-2-1'}
               videoSrc={
                  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
               }
            />
             <VideoComponent
               videoID={'video-page-2-2'}
               videoSrc={
                  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
               }
            />
            <iframe
               width='480'
               height='480'
               style={{ margin: '20px' }}
               src='https://www.youtube.com/embed/gCEowvFXlaE'
               frameborder='0'
               allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
               allowfullscreen
               id='video-page-2-3'
            ></iframe>
         </div>
      )
   }
}

export default withPMPHeader(VideosPageThree)
