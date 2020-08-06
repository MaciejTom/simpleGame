const startBtn = document.querySelector(".start")
const resetBtn = document.querySelector(".reset")

const livesSpan = document.querySelector(".lives_number")
const pointsSpan = document.querySelector(".points_number")
let timeSpan = document.querySelector(".time_number")

const boxesNodeList = document.querySelectorAll(".box")
const boxes= [...boxesNodeList]

//////////////////////////////////////////////////COLOR CHANGE FUNCTION

const changingColors = () => {

  const randomNumber = Math.floor(Math.random()*(boxes.length))

  boxes[randomNumber].classList.add("green")

  setTimeout(function() {boxes.forEach(x => x.classList.remove("green"))}, 2000)
  checkWhiteClass()
  checkGreenClass()
  window.stoperColorGreen = setInterval(function() {
    const randomNumber2 = Math.floor(Math.random()*(boxes.length))
    boxes[randomNumber2].classList.add("green")
    console.log("zielone")
    checkGreenClass()


  }, 3000)

  setTimeout(function() {window.stoperColorWhite = setInterval(function() {
    boxes.forEach(x => x.classList.remove("green"))
    console.log("białe")
    checkWhiteClass()
  }, 3000)}, 2000)

}

////////////////////////////////////////////////////////// TOP SPANS FUNCTIONS

const timerStart = () => {
  window.stoper = setInterval(function() {timeSpan.innerHTML--}, 1000)
}

const checkGreenClass = () => {

boxes.forEach(x => x.className.includes("green") && x.addEventListener("click", addPoint))

}
const checkWhiteClass = () => {

boxes.forEach(x => x.className.includes("green") && x.removeEventListener("click", addPoint))


}
const takeEventPoint = () => {
  removeEventListener("click", addPoint)
}

const addPoint = () => {
  pointsSpan.innerHTML++
  boxes.forEach(x => x.removeEventListener("click", addPoint))

}





















///////////////////////////////////// START AND RESET FUNCTIONS

const start = () => {
  changingColors()
  timerStart()

}

const reset = () => {
  clearInterval(stoperColorWhite)
  clearInterval(stoperColorGreen)
  clearInterval(stoper)

  boxes.forEach(x => x.classList.remove("green"))

  livesSpan.innerHTML = 3;
  pointsSpan.innerHTML = 0;
  timeSpan.innerHTML = 60;
}

startBtn.addEventListener("click", start);
resetBtn.addEventListener("click", reset);
