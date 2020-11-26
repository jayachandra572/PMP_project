import React, { Component } from 'react'

class videoComponent extends Component {
   componentDidMount() {
      const { videoID } = this.props
      window.dataLayer.push({
         event: 'videoMountEvent',
         videoID: videoID
      })
   }

   componentWillUnmount() {
      const { videoID } = this.props
      window.dataLayer.push({
         event: 'videoUnmountEvent',
         videoID: videoID
      })
   }
   render() {
      const { videoSrc, videoID } = this.props
      return (
         <video
            src={videoSrc}
            width='300'
            style={{ margin: '20px' }}
            id={videoID}
            controls
         />
      )
   }
}

export default videoComponent
