import React, { Component } from 'react'
import withPMPHeader from '../../hoc/withPmpHeader'
import YoutubeComponent from "../YoutubeComponent"
class VideosPageTwo extends Component {
   componentDidMount() {
      window.dataLayer.push({
         event: 'videoMountEvent',
         videoID: 'video-page-1-1'
      })
      var timer = 0;
      var video =   document.getElementById('video-page-1-1')
    video.addEventListener('progress', function (e) { 
         if (this.buffered.length > 0) {
     
             if (timer != 0) {
                 clearTimeout(timer);
             }
     
             timer = setTimeout(function () {            
                 if(parseInt(video.buffered.end() / video.duration * 100) == 100) {
                     console.log("loading...") 
                 };          
             }, 1500);
     
         }
     }, false); 
   }

   componentWillUnmount() {
      window.dataLayer.push({
         event: 'videoUnmountEvent',
         videoID: 'video-page-1-1'
      })
   }
   render() {
      return (
         <div>
            <h2 id = "pageTitle"> videos portal 1 </h2>
            <video
               src='https://media-content.onthegomodel.com/otg_prod/22-10-2020/22-10-2020-relationalOperators-Telugu-V1-720p/video.mp4'
               id='video-page-1-1'
               data-video-id='video-page-1-1'
               width='300'
               style={{ margin: '20px' }}
               controls
            />
            <YoutubeComponent
               iframeSrc={
                  'https://www.youtube.com/embed/v3nYE1rE7OU?enablejsapi=1'
               }
               iframeID={'youtubeVideo-page-1-2'}
            />
         </div>
      )
   }
}

export default withPMPHeader(VideosPageTwo)
