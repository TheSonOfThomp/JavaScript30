let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time')
const controls = document.querySelectorAll('.timer__button')
const form = document.customForm
const twoDigits = (num) => `${num < 10 ? '0' : ''}${num}`

function startTimer(seconds) {
  clearInterval(countdown);
  const start = Date.now()
  const then = start + (seconds * 1000)

  displayEndTime(then)
  displayTime(seconds)
  countdown = setInterval(() => {
    const secondsLeft = Math.ceil((then - Date.now()) / 1000)
    if (secondsLeft <= 0) clearInterval(countdown);
    displayTime(secondsLeft)
  }, 1000);
}

function displayTime(seconds) {
  const hours = Math.floor(seconds / (60*60))
  let remainder = seconds % (60*60)
  const minutes = Math.floor(remainder / 60)
  remainder = remainder % 60
  seconds = remainder

  const display = `${hours}:${twoDigits(minutes)}:${twoDigits(seconds)}`
  
  document.title = display
  timerDisplay.textContent = display
  console.log(hours, minutes, seconds)
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hours = end.getHours()
  const minutes = end.getMinutes()

  const localeHours = hours % 12 || 12
  const am_pm = hours > 12 || hours === 24 ? 'PM' : 'AM'
  
  endTime.textContent = `Be back at ${localeHours}:${twoDigits(minutes)} ${am_pm}`
}

controls.forEach(control => {
  control.addEventListener('click', () => {
    startTimer(control.dataset.time)
  })
})

form.addEventListener('submit', function(e){
  e.preventDefault()
  const minutes = this.minutes.value
  const seconds = minutes * 60
  startTimer(seconds)
})
