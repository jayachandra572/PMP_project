var event =  {{Event}}
var videoMountEvent = "videoMountEvent"
var videoUnmountEvent = "videoUnmountEvent"
var videoID = {{Video ID}}
var isYoutubeVideo = ''
var iframeNodename = 'IFRAME'

var videosStatus = window.videosStatus || {}
var timeIntervalOfSendDataToGTM = 2000


function pushDataIntoDataLayer(video,eventCategory) {
   console.log(videoID, event,'pushdatadataLayer')
   dataLayer.push({
      event: 'video',
      gaEventCategory: eventCategory,
      gaEventLabel:'total spent time',
      videoSrc:video.src,
      gaEventValue: video.totalTimeSpend
   })
}

function clearIntervalIds (id){
   clearInterval(videosStatus[id].videoTrackIntervalId)
   clearInterval(videosStatus[id].updateDataIntervalId)
}

function onPlayVideo (id){
   videosStatus[id].videoTrackIntervalId = setInterval(
      function() {
         videosStatus[id].totalTimeSpend++
      },
      1000
   )
   videosStatus[id].updateDataIntervalId = setInterval(
      function() {
         pushDataIntoDataLayer(videosStatus[id],'progress')
      },
      timeIntervalOfSendDataToGTM
   )
}

function onPauseVideo(id){
   clearIntervalIds()
   pushDataIntoDataLayer(videosStatus[id],'pause')
}


function eventHandler(e) {
   switch (e.type) {
      var eventId = e.target.id
      case 'play':
         onPlayVideo(eventId)
         console.log('video start')
         break
      case 'pause':
         onPauseVideo(eventId)
         console.log('video stopped')
         break
      case 'ended':
         clearIntervalIds(eventId)
         break
   }
}

function addYoutubeVideoEventListeners(id){
   window.YT.ready(function() {
      new window.YT.Player(id, {
         events: {
            onStateChange: onPlayerStateChange
         }
      })
   })
   
   function onPlayerStateChange(event) {
      var iframeId = event.target.f.id
      switch(event.data){
         case YT.PlayerState.PLAYING:
            onPlayVideo(iframeId)
            break;
         case YT.PlayerState.PAUSED:
            onPauseVideo(iframeId)
            break;
         case YT.PlayerState.ENDED:
            clearIntervalIds(eventId)
            break;
      }
   }
}

function addVideoElementEventListeners (videoElement){
   video.addEventListener('play', eventHandler, false)
   video.addEventListener('pause', eventHandler, false)
   video.addEventListener('timeupdate', eventHandler, false)
}

if(event === videoMountEvent){
   var videoElement = document.getElementById(videoID)
   if(videoElement){
      videosStatus[videoID] = {}
      videosStatus[videoID].totalTimeSpend = 0
      videosStatus[videoID].id = videoID
      videosStatus[videoID].src = video.src
      if(video.nodeName === iframeNodename){
         addYoutubeVideoEventListeners(videoID)
      }else{
         addVideoElementEventListeners(videoElement)
      }
   }
}else if (event === videoUnmountEvent){
   if(videosStatus[videoID].totalTimeSpend){
      pushDataIntoDataLayer(videosStatus[videoID],videoUnmountEvent)
      clearIntervalIds(videoID)
      videosStatus[videoID] = {}
   }
}
