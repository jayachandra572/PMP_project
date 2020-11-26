var event =  {{Event}}
const videoMountEvent = "videoMountEvent"
const videoUnmountEvent = "videoUnmountEvent"
const videoId = {{Video ID}

var videosStatus = window.videosStatus || {}
var timeIntervalOfSendDataToGTM = 2000
function pushDataIntoDataLayer(video) {
   console.log(videoId, event'pushdatadataLayer')
   dataLayer.push({
      event: 'video',
      gaEventCategory: 'total spent time',
      gaEventLabel: videoId,
      gaEventValue: video.totalTimeSpend
   })
}

function eventHandler(e) {
   switch (e.type) {
      case 'play':
         videosStatus[videoId].videoTrackIntervalId = setInterval(
            function() {
               videosStatus[videoId].totalTimeSpend++
            },
            1000
         )
         videosStatus[videoId].updateDataIntervalId = setInterval(
            function() {
               pushDataIntoDataLayer(videosStatus[videoId])
            },
            timeIntervalOfSendDataToGTM
         )
         console.log('video start')
         break
      case 'pause':
         clearInterval(videosStatus[videoId].videoTrackIntervalId)
         dataLayer.push({
            event: 'pause',
            gaEventCategory: 'total spent time',
            gaEventLabel: videosStatus[videoId].id,
            gaEventValue: videosStatus[videoId].totalTimeSpend
         })
         clearInterval(videosStatus[videoId].updateDataIntervalId)
         console.log('video stopped')
         break
      case 'ended':
         clearInterval(videosStatus[videoId].videoTrackIntervalId)
         clearInterval(videosStatus[videoId].updateDataIntervalId)
         break
   }
}

console.log(event,videoMountEvent,document.getElementById(videoId),videoId)

if(event === videoMountEvent){
   var video = document.getElementById(videoId)
   if(video){
      videosStatus[videoId] = {}
      videosStatus[videoId].totalTimeSpend = 0
      video.addEventListener('play', eventHandler, false)
      video.addEventListener('pause', eventHandler, false)
      video.addEventListener('timeupdate', eventHandler, false)
   }
}else if (event === videoUnmountEvent){
   if(videosStatus[videoId].totalTimeSpend){
      pushDataIntoDataLayer(videosStatus[videoId])
      clearInterval(videosStatus[videoId].videoTrackIntervalId)
      clearInterval(videosStatus[videoId].updateDataIntervalId)
   }
}