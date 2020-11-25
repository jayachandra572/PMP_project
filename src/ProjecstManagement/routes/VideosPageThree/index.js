import React, { Component } from 'react'
import withPMPHeader from '../../hoc/withPmpHeader'
class VideosPageThree extends Component {
   componentDidMount() {
      window.dataLayer.push({
         event: 'videoMountEvent',
         videoID: 'video-page-2-1'
      })
   }
   
   componentWillUnmount(){
      window.dataLayer.push({
         event: 'videoUnmountEvent',
         videoID: 'video-page-2-1'
      })
   }
   render() {
      return (
         <div>
            <h2> videos portal 2 </h2>
            <video
               src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
               id='video-1'
               width='300'
               style={{ margin: '20px' }}
               id='video-page-2-1'
               controls
            />
            <iframe
               width='480'
               height='480'style={{ margin: '20px' }}
               src='https://www.youtube.com/embed/gCEowvFXlaE'
               frameborder='0'
               allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
               allowfullscreen
               id='video-page-2-2'
            ></iframe>
         </div>
      )
   }
}

export default withPMPHeader(VideosPageThree)
