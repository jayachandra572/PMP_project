import React, { Component } from 'react'
import withPMPHeader from '../../hoc/withPmpHeader'
import VideoComponent from './videoComponent'
import YoutubeComponent from "../YoutubeComponent"
class VideosPageThree extends Component {
   render() {
      return (
         <div>
            <h2 id = "pageTitle"> videos portal 2 </h2>
            <VideoComponent
               videoID={'video-page-2-1'}
               data-video-id='video-page-2-1'
               videoSrc={
                  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
               }
            />
            <VideoComponent
               videoID={'video-page-2-2'}
               data-video-id='video-page-2-2'
               videoSrc={
                  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
               }
            />

            <YoutubeComponent
               iframeSrc={
                  'https://www.youtube.com/embed/gCEowvFXlaE?enablejsapi=1'
               }
               iframeID={'youtubeVideo-page-2-3'}
            />
         </div>
      )
   }
}

export default withPMPHeader(VideosPageThree)
