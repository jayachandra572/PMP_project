
 // CHANGE THESE THREE:
 var eventName = 'video-duration'; // The event name that is pushed into dataLayer
 var timeIntervalOfSendDataToGTM = 4000 //The interval in milliseconds
 // OTHER SETTINGS:
var videoMountEvent = "videoMountEvent"
var videoUnmountEvent = "videoUnmountEvent"
var iframeNodename = 'IFRAME'
var intialPlaybackRate = 1
var videosStatus = window.videosStatus || {}

function pushDataIntoDataLayer(video,eventCategory) {
   console.log(eventCategory,"event category")
   dataLayer.push({
      event: eventName,
      videoCategory: eventCategory,
      videoLabel:'total spent time',
      videoID:video.id,
      totalTimeSpent: video.totalTimeSpent
   })
}

function clearIntervalIds (id){
   clearInterval(videosStatus[id].updateDataIntervalId)
   videosStatus[id].updateDataIntervalId = null
   
}

function setVideoDurationValue (id , timeDate){
   var video = videosStatus[id]
   var videoDuration = ((timeDate - video.videoPlayDate)/1000) * video.playbackRate
   videosStatus[id].totalTimeSpent += videoDuration 
   videosStatus[id].videoPlayDate = timeDate
}

function onPlayVideo (id){
  console.log("created id ")
   videosStatus[id].videoPlayDate = new Date()
   videosStatus[id].isVideoPlaying = true
   videosStatus[id].updateDataIntervalId = videosStatus[id].updateDataIntervalId || setInterval(
      function() {
         setVideoDurationValue(id,new Date())
         pushDataIntoDataLayer(videosStatus[id],'progress')
      },
      timeIntervalOfSendDataToGTM
   )
}

function onPauseVideo(id){
   clearIntervalIds(id)
   videosStatus[id].isVideoPlaying = false
   setVideoDurationValue(id,new Date())
   pushDataIntoDataLayer(videosStatus[id],'pause')
}

function onVideoEnd(id){
   videosStatus[id].isVideoPlaying = false
   clearIntervalIds(id)
   setVideoDurationValue(id,new Date())
   pushDataIntoDataLayer(videosStatus[id],'end')
}

function playRateChange(id,playbackRate){
  console.log(id,playbackRate,"playRateChange")
   videosStatus[id].playbackRate = playbackRate
   clearIntervalIds(id)
   if(videosStatus[id].isVideoPlaying){
      setVideoDurationValue(id,new Date())
      videosStatus[id].isVideoPlaying && pushDataIntoDataLayer(videosStatus[id],'play rate change')
      onPlayVideo(id)
   }
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
         onVideoEnd(eventId)
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
        onVideoEnd(iframeId)
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
function totalTimeVideoWatchingTrack(){
   if(event === videoMountEvent){
      var videoElement = document.getElementById(videoID)
      if(videoElement){
         videosStatus[videoID] = {}
         videosStatus[videoID].totalTimeSpent = 0
         videosStatus[videoID].id = videoID
         videosStatus[videoID].updateDataIntervalId = null
         videosStatus[videoID].playbackRate = intialPlaybackRate
         videosStatus[videoID.isVideoPlaying = false]
         if(videoElement.nodeName === iframeNodename){
           console.log(videoID,"youtubeID")
            addYoutubeVideoEventListeners(videoID)
         }else{
            addVideoElementEventListeners(videoElement)
         }
      }
   }else if (event === videoUnmountEvent){
      if(videosStatus[videoID].totalTimeSpent){
         setVideoDurationValue(videoID,new Date())
         pushDataIntoDataLayer(videosStatus[videoID],videoUnmountEvent)
         clearIntervalIds(videoID)
         videosStatus[videoID] = {}
      }
   }
}

console.log(window.totalTimeVideoWatchingTrack,"functioncall")
var event =  {{Event}}
var videoID = {{DLV - Mount & Unmount - Video Id}}
if(window.totalTimeVideoWatchingTrack){
   window.totalTimeVideoWatchingTrack(videoID,event)
}else{
   setTimeout( function(){
      window.totalTimeVideoWatchingTrack(videoID,event)
   },1000)
}
