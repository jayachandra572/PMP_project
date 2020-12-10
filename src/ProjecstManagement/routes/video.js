 // CHANGE THESE THREE:
var eventName = 'video-duration'; // The event name that is pushed into dataLayer
var timeIntervalOfSendDataToGTM = 4000 //The interval in milliseconds

// OTHER SETTINGS:
var videoMountEvent = "videoMountEvent"
var videoUnmountEvent = "videoUnmountEvent"
var iframeNodename = 'IFRAME'
var intialPlaybackRate = 1
var videosStatus = window.videosStatus || {}

function pushDataIntoDataLayer(video,videoAction) {
   console.log(videoAction,"event category")
   dataLayer.push({
      event: eventName,
      videoAction: videoAction,
      videoLabel:'total spent time',
      videoTrackID:video.id,
      videoDuration: video.totalTimeSpent
   })
}

function clearIntervalIds (id){
   clearInterval(videosStatus[id].updateDataIntervalId)
   videosStatus[id].updateDataIntervalId = null
   
}

function setVideoDurationValue (id , timeDate){
   console.log("setVideoDurationValue",id)
   var video = videosStatus[id]
    if(videosStatus[id].isVideoPlaying){
       var videoDuration = ((timeDate - video.videoPlayDate)/1000) * video.playbackRate
       videosStatus[id].totalTimeSpent += videoDuration 
       videosStatus[id].videoPlayDate = timeDate
    }
  console.log("setVideoDurationValue end",id)
}

function onPlayVideo (id){
   alert("onplay video")
   videosStatus[id].videoPlayDate = new Date()
   videosStatus[id].isVideoPlaying = true
   videosStatus[id].updateDataIntervalId = videosStatus[id].updateDataIntervalId || setInterval(
      function() {
        alert('set time out')
         console.log("time interval 1")
         setVideoDurationValue(id,new Date())
         console.log("time interval 2")
         pushDataIntoDataLayer(videosStatus[id],'progress')
         console.log("time interval 3")
      },
      timeIntervalOfSendDataToGTM
   )
}

function onPauseVideo(id){
   clearIntervalIds(id)
   setVideoDurationValue(id,new Date())
   videosStatus[id].isVideoPlaying = false
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
      pushDataIntoDataLayer(videosStatus[id],'play rate change')
      onPlayVideo(id)
   }
}

function eventHandler(e) {
   var eventId = e.target.getAttribute('data-video-id')
   var playbackRate = e.target.playbackRate
   switch (e.type) {
      case 'play':
         onPlayVideo(eventId)
        alert('play')
         console.log('video start')
         break
      case 'pause':
       alert('pause')
         onPauseVideo(eventId)
         console.log('video stopped')
         break
      case 'ended':
       alert('end')
         onVideoEnd(eventId)
         break
     case 'ratechange':
       alert('rate changed')
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
  alert("video listener")
}
  
function totalTimeVideoWatchingTrack(videoID,event){
  console.error(event,videoID,"function called totalTimeVideoWatchingTrack")
   if(event === videoMountEvent){
    //var videos = document.getElementsByTagName('video');
    //   var videoElement = document.getElementById(videoID)
     videoElementId = "\"" + videoID + "\"";
     videoElement = document.querySelectorAll('[data-video-id=' + videoElementId + ']')[1];
     alert(videoElement.getAttribute('data-video-id'))
      alert(videoElement.nodeName)
      if(videoElement){
         videosStatus[videoID] = {}
         videosStatus[videoID].totalTimeSpent = 0
         videosStatus[videoID].id = videoID
         videosStatus[videoID].updateDataIntervalId = null
         videosStatus[videoID].playbackRate = intialPlaybackRate
         videosStatus[videoID].isVideoPlaying = false
         if(videoElement.nodeName === iframeNodename){
           console.log(videoID,"youtubeID")
           alert("youtube")
            addYoutubeVideoEventListeners(videoID)
         }else{
           alert("video")
            addVideoElementEventListeners(videoElement)
         }
      }
   }else if (event === videoUnmountEvent){
     console.log(event,"event")
      if(videosStatus[videoID]&&videosStatus[videoID].totalTimeSpent){
         setVideoDurationValue(videoID,new Date())
         pushDataIntoDataLayer(videosStatus[videoID],videoUnmountEvent)
         clearIntervalIds(videoID)
         videosStatus[videoID] = {}
      }
   }
}
  var event =  {{Event}}
var videoID = {{DLV - Mount & Unmount - Video Id}}
alert(videoID)
totalTimeVideoWatchingTrack(videoID,event)