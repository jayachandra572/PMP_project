import React, { Component } from 'react'

class YoutubeComponent extends Component {
   componentDidMount() {
      const { iframeID } = this.props
      window.dataLayer.push({
         event: 'videoMountEvent',
         videoID: iframeID
      })
   }

   componentWillUnmount() {
      const { iframeID } = this.props
      window.dataLayer.push({
         event: 'videoUnmountEvent',
         videoID: iframeID
      })
   }
   render() {
      const { iframeSrc, iframeID } = this.props
      return (
         <div>
            <iframe
               width='480'
               height='480'
               id={iframeID}
               style={{ margin: '20px' }}
               src={iframeSrc}
               frameBorder='0'
               allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
               allowFullScreen
            ></iframe>
         </div>
      )
   }
}

export default YoutubeComponent
