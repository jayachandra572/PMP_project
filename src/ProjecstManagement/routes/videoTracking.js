

var event =  {{Event}}
var videoMountEvent = "videoMountEvent"
var videoUnmountEvent = "videoUnmountEvent"
var videoID = {{Video ID}}
var iframeNodename = 'IFRAME'
var intialPlaybackRate = 1
var videosStatus = window.videosStatus || {}
var timeIntervalOfSendDataToGTM = 2000


function pushDataIntoDataLayer(video,eventCategory) {
   dataLayer.push({
      event: 'video',
      videoCategory: eventCategory,
      videoLabel:'total spent time',
      totalTimeSpent: video.totalTimeSpent
   })
}

function clearIntervalIds (id){
   clearInterval(videosStatus[id].videoTrackIntervalId)
   clearInterval(videosStatus[id].updateDataIntervalId)
   videosStatus[id].videoTrackIntervalId = null
   videosStatus[id].updateDataIntervalId = null
   
}

function onPlayVideo (id,playBackSpeed){
  console.log(id,"playbackspeend")
   videosStatus[id].videoTrackIntervalId = videosStatus[id].videoTrackIntervalId || setInterval(
      function() {
        console.log(id,videosStatus[id].playbackRate,videosStatus[id],"video")
         videosStatus[id].totalTimeSpent += 1 * videosStatus[id].playbackRate
      },
      1000
   )
   videosStatus[id].updateDataIntervalId = videosStatus[id].updateDataIntervalId || setInterval(
      function() {
         pushDataIntoDataLayer(videosStatus[id],'progress')
      },
      timeIntervalOfSendDataToGTM
   )
}

function onPauseVideo(id){
   clearIntervalIds(id)
   pushDataIntoDataLayer(videosStatus[id],'pause')
}

function playRateChange(id,playbackRate){
   videosStatus[id].playbackRate = playbackRate
}

function eventHandler(e) {
   var eventId = e.target.id
   var playbackRate = e.target.playbackRate
   switch (e.type) {
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
     case 'ratechange':
         playRateChange(eventId,eventId,playbackRate)
   }
}

function onPlayerStateChange(event) {
   var iframeId = event.target.f.id
   switch(event.data){
      case YT.PlayerState.PLAYING:
         onPlayVideo(iframeId)
        console.log('youtube video start',iframeId)
         break;
      case YT.PlayerState.PAUSED:
         onPauseVideo(iframeId)
         console.log('youtube video stopped',iframeId)
         break;
      case YT.PlayerState.ENDED:
         console.log('youtube video ended',iframeId)
         clearIntervalIds(iframeId)
         break;
   }
}

function onYoutubePlaybackRateChange (event){
   var iframeId = event.target.f.id
   var playBackRate = event.target.getPlaybackRate()
   playRateChange(iframeId,playBackRate)
}

function addYoutubeVideoEventListeners(id){
   window.YT.ready(function() {
      new window.YT.Player(id, {
         events: {
            onStateChange: onPlayerStateChange,
            onPlaybackRateChange: onYoutubePlaybackRateChange
         }
      })
   })
}

function addVideoElementEventListeners (videoElement){
   videoElement.addEventListener('play', eventHandler, false)
   videoElement.addEventListener('pause', eventHandler, false)
   videoElement.addEventListener('timeupdate', eventHandler, false)
   videoElement.addEventListener('ratechange', eventHandler, false)
}

if(event === videoMountEvent){
   var videoElement = document.getElementById(videoID)
   if(videoElement){
      videosStatus[videoID] = {}
      videosStatus[videoID].totalTimeSpent = 0
      videosStatus[videoID].id = videoID
      videosStatus[videoID].videoTrackIntervalId = null
      videosStatus[videoID].updateDataIntervalId = null
      playRateChange(videoID,intialPlaybackRate)
      if(videoElement.nodeName === iframeNodename){
        console.log(videoID,"youtubeID")
         addYoutubeVideoEventListeners(videoID)
      }else{
         addVideoElementEventListeners(videoElement)
      }
   }
}else if (event === videoUnmountEvent){
   if(videosStatus[videoID].totalTimeSpent){
      pushDataIntoDataLayer(videosStatus[videoID],videoUnmountEvent)
      clearIntervalIds(videoID)
      videosStatus[videoID] = {}
   }
}