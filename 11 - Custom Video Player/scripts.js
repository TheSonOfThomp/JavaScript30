const player = document.querySelector('.player')
const video = player.querySelector('video')
const progressBar = player.querySelector('.progress')
const toggleBtn = player.querySelector('button.toggle')
const volumeSlider = player.querySelector('.player__slider[name="volume"]')
const playbackRateSlider = player.querySelector('.player__slider[name="playbackRate"]')
const skipBtns = player.querySelectorAll('.player__button[data-skip]')
const fullscreenBtn = player.querySelector('button.fullscreen')

console.dir(video)

// update the progress bar
const setProgress = () => player.style.setProperty('--video-progress', `${video.currentTime / video.duration * 100}%`)
video.addEventListener('progress', setProgress)




// toggle the video
const toggleVideo = () => video.paused ? video.play() : video.pause()
video.addEventListener('click', toggleVideo)
toggleBtn.addEventListener('click', toggleVideo)




// update the button text
const updateButtonText = () => toggleBtn.textContent = video.paused ? '►' : "❚ ❚" 
video.addEventListener('play', updateButtonText)
video.addEventListener('pause', updateButtonText)




// change the playback speed
const updatePlaybackRate = (e) => video.playbackRate = e.target.value
playbackRateSlider.addEventListener('change', updatePlaybackRate)




// update the volume
const updateVolume = (e) => video.volume = e.target.value
volumeSlider.addEventListener('change', updateVolume)




// handle the skip buttons
const handlePlaybackSpeed = (e) => {
  video.currentTime = Math.max(
    Math.min(video.currentTime + parseInt(e.target.dataset.skip), video.duration),
  0)
}
skipBtns.forEach(btn => btn.addEventListener('click', handlePlaybackSpeed))




// handle scrub
let isScrubbing = false
const handleScrub = (e) => {
  if(isScrubbing) {
    video.currentTime = video.duration * (e.offsetX / player.offsetWidth)
    setProgress()
  }
}
player.addEventListener('mousemove', (e) => isScrubbing && handleScrub(e))
progressBar.addEventListener('mousedown', () => isScrubbing = true)
progressBar.addEventListener('mouseup', () => isScrubbing = false)
player.addEventListener('mouseout', () => isScrubbing = false) 


// enable fullscreen
const toggleFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    player.requestFullscreen()
  }
}
fullscreenBtn.addEventListener('click', toggleFullscreen)