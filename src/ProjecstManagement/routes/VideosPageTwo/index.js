import React, { Component } from 'react'
import withPMPHeader from '../../hoc/withPmpHeader'
class VideosPageTwo extends Component {
   componentDidMount() {
      window.dataLayer.push({
         event: 'videoMountEvent',
         videoID: 'video-page-1-1'
      })
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
            <h2> videos portal 1 </h2>
            <video
               src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
               id='video-page-1-1'
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
