const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");

const livesSpan = document.querySelector(".lives_number");
const pointsSpan = document.querySelector(".points_number");
let timeSpan = document.querySelector(".time_number");

const boxesNodeList = document.querySelectorAll(".box");
const boxes = [...boxesNodeList];

const headerDiv = document.querySelector(".header")
const mainDiv = document.querySelector(".main")

let flag = true


//////////////////////////////////////////////////COLOR CHANGE FUNCTION

const changingColors = () => {

  const randomNumber = Math.floor(Math.random() * boxes.length);

  boxes[randomNumber].classList.add("green");
  checkGreenClass();

  setTimeout(function() {
    boxes.forEach(x => x.classList.remove("green"));

    flag && negativePoints()
    flag = true;
  }, 2000);



  window.stoperColorGreen = setInterval(function() {
    const randomNumber2 = Math.floor(Math.random() * boxes.length);
    boxes[randomNumber2].classList.add("green");


    checkGreenClass();
  }, 3000);

  setTimeout(function() {
    window.stoperColorWhite = setInterval(function() {
      checkWhiteClass();

      boxes.forEach(x => x.classList.remove("green"));
      flag && negativePoints()
      flag = true;
      checkGreenClass();
      takeEventPoint();
      checkWhiteClass();

      checkGameOver()
    }, 3000);
  }, 2000);
};

////////////////////////////////////////////////////////// TOP SPANS FUNCTIONS

const timerStart = () => {
  window.stoper = setInterval(function() {
    timeSpan.innerHTML--;
  }, 1000);
};

const checkGreenClass = () => {
  boxes.forEach(x => x.className.includes("green") && x.addEventListener("click", addPoint));
  boxes.forEach(x => !x.className.includes("green") && x.addEventListener("click", subtractLive));
  boxes.forEach(x => x.className.includes("green") && x.removeEventListener("click", subtractLive)  );
  console.log("DODAWANIE NA ZIELONYM");
};
const checkWhiteClass = () => {boxes.forEach(x => x.className.includes("green") && x.removeEventListener("click", addPoint));
};
const takeEventPoint = () => {
  removeEventListener("click", addPoint);
};

const addPoint = () => {

  if (pointsSpan.innerHTML == 10) {
    return;
  } else {
    console.log("DODAJ PKT");
    flag = false
    pointsSpan.innerHTML++;
    checkWinGame()
    boxes.forEach(x => x.removeEventListener("click", addPoint));
  }

};

const subtractLive = () => {
  if (liveSpan.innerHTML == 0) {
    console.log("CO TO KURWA")
    return;
  } else {
  console.log("ODEJMIJ ŻYCIE")
  checkGameOver()
}
};

const stopTimer = () => {
  timeSpan.innerHTML == 0 && clearInterval(stoper);
};

const checkGameOver = () => {


  const createGameOverSpan = () => {
    const gameOverSpan = document.createElement("div")
    gameOverSpan.classList.add('info-lose')
    gameOverSpan.innerHTML = "<h1>PRZEGRANA!</h1>";
    document.body.appendChild(gameOverSpan);
  }

  const gameOver = () => {
    createGameOverSpan();
    reset();

  }
livesSpan.innerHTML <= 0 && gameOver()

}

const checkWinGame = () => {


  const createWinSpan = () => {
    const winGameSpan = document.createElement("div")
    winGameSpan.classList.add('info-win')
    winGameSpan.innerHTML = "<h1>WYGRANA!</h1>";

    document.body.appendChild(winGameSpan);
    console.log(winGameSpan)
    return winGameSpan
  }

  const winGame = () => {
    createWinSpan();
    reset();

  }
pointsSpan.innerHTML == 10 && winGame()
return createWinSpan();

}

const negativePoints = () => {
  livesSpan.innerHTML--

};

///////////////////////////////////// START AND RESET FUNCTIONS

const start = () => {
  changingColors();
  timerStart();
  console.log(typeof winGameSpan !== "undefined")
  console.log(document.getElementsByClassName("info-win").length > 0)
  if (document.getElementsByClassName("info-win").length > 0) {
    winGameSpan.parentNode.removeChild(winGameSpan);
  }
//   if (typeof winGameSpan !== "undefined") {
//     console.log(document.body.contains(winGameSpan))
//
// }
// } else {
//   winGameSpan.parentNode.removeChild(winGameSpan);
//   console.log(winGameSpan)
// }
}

const reset = () => {
  clearInterval(stoperColorWhite);
  clearInterval(stoperColorGreen);
  clearInterval(stoper);

  boxes.forEach(x => x.classList.remove("green"));

  livesSpan.innerHTML = 3;
  pointsSpan.innerHTML = 0;
  timeSpan.innerHTML = 60;
};

startBtn.addEventListener("click", start);
resetBtn.addEventListener("click", reset);
