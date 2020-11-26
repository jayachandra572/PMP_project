import React, { Component } from 'react'
import withPMPHeader from '../../hoc/withPmpHeader'
class VideosPageFour extends Component {
   componentDidMount() {
      window.dataLayer.push({
         event: 'videoMountEvent',
         videoID: 'video-page-3-1'
      })
   }

   componentWillUnmount() {
      window.dataLayer.push({
         event: 'videoUnmountEvent',
         videoID: 'video-page-3-1'
      })
   }
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
            <YoutubeComponent
               iframeSrc={
                  'https://www.youtube.com/embed/Iu7SntY5AeE?enablejsapi=1'
               }
               iframeID={'youtubeVideo-page-3-2'}
            />
         </div>
      )
   }
}

export default withPMPHeader(VideosPageFour)
