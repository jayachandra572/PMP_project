var event =  {{Event}}
var videoMountEvent = "videoMountEvent"
var videoUnmountEvent = "videoUnmountEvent"
var videoId = {{Video ID}}

var videosStatus = window.videosStatus || {}
var timeIntervalOfSendDataToGTM = 2000
function pushDataIntoDataLayer(video,eventCategory) {
   console.log(videoId, event,'pushdatadataLayer')
   dataLayer.push({
      event: 'video',
      gaEventCategory: eventCategory,
      gaEventLabel:'total spent time',
      videoSrc:video.src
      gaEventValue: video.totalTimeSpend
   })
}

function eventHandler(e) {
   switch (e.type) {
      case 'play':
         videosStatus[e.target.id].videoTrackIntervalId = setInterval(
            function() {
               videosStatus[e.target.id].totalTimeSpend++
            },
            1000
         )
         videosStatus[e.target.id].updateDataIntervalId = setInterval(
            function() {
               pushDataIntoDataLayer(videosStatus[e.target.id],'progress')
            },
            timeIntervalOfSendDataToGTM
         )
         console.log('video start')
         break
      case 'pause':
         clearInterval(videosStatus[e.target.id].videoTrackIntervalId)
         clearInterval(videosStatus[e.target.id].updateDataIntervalId)
         pushDataIntoDataLayer(videosStatus[e.target.id],'pause')
         console.log('video stopped')
         break
      case 'ended':
         clearInterval(videosStatus[e.target.id].videoTrackIntervalId)
         clearInterval(videosStatus[e.target.id].updateDataIntervalId)
         break
   }
}

if(event === videoMountEvent){
   var video = document.getElementById(videoId)
   if(video){
      videosStatus[videoId] = {}
      videosStatus[videoId].totalTimeSpend = 0
      videosStatus[videoId].id = videoId
       videosStatus[videoId].src = video.src
      video.addEventListener('play', eventHandler, false)
      video.addEventListener('pause', eventHandler, false)
      video.addEventListener('timeupdate', eventHandler, false)
   }
}else if (event === videoUnmountEvent){
   if(videosStatus[videoId].totalTimeSpend){
      pushDataIntoDataLayer(videosStatus[videoId],videoUnmountEvent)
      clearInterval(videosStatus[videoId].videoTrackIntervalId)
      clearInterval(videosStatus[videoId].updateDataIntervalId)
      videosStatus[videoId] = {}
   }
}
