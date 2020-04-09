function shuffle (arr) {
  var j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
}//1 step:-made the shuffle function for the shuffle cards
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
const icons = shuffle(["fa-chart-area", "fa-chart-bar", "fa-check-double", "fa-chart-line", "fa-chart-pie", "fa-check"])
//set the icons 
const gridClasses = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
//give the class for each cards
const $easy = document.querySelector(".easy")
//define const for easy level
const $medium = document.querySelector(".medium")
//define const for medium level
const $hard = document.querySelector(".hard")
//define const for a hard level
const $game = document.getElementById("game")
//define const for a game level
const $start = document.getElementById("start")
//define a const method for a game start 
const $end = document.getElementById("end")
//define a const method for the end game
let $cards = undefined
//define an empty cards
let gameIcons = undefined
//define an empty gameIcon
let mCard = undefined
//define an empty mCard
let openCard = []
//define an empty openCard


//----------------Functions define--------------------//

//Define an function for easy method
//1 function
$easy.addEventListener("click", function (e) {
  gameIcons = icons.slice(0, 3)
  for (let i = 0; i < 3; i++) {
    gameIcons.push(gameIcons[i])
  }
  gameIcons = shuffle(gameIcons)
  $game.classList.add("grid-6")
  $game.classList.remove("hidden")
  $start.classList.add("hidden")
  for (let i = 0; i < gameIcons.length; i++) {
    $game.innerHTML += `<div class="card card-1 ${gridClasses[i]}">
                      <i class="fas ${gameIcons[i]} hidden"></i>
                      </div>`
  }
  $cards = document.querySelectorAll(".card")
})

//Define a function for medium method
//2 function
//Using the same logic from the first except  logic of array
$medium.addEventListener("click", function (e) {
  gameIcons = icons.slice(0, 4)
  for (let i = 0; i < 4; i++) {
    gameIcons.push(gameIcons[i])
  }
  gameIcons = shuffle(gameIcons)
  $game.classList.add("grid-8")
  $start.classList.add("hidden")
  $game.classList.remove("hidden")
  for (let i = 0; i < gameIcons.length; i++) {
    $game.innerHTML += `<div class="card card-1 ${gridClasses[i]}">
                        <i class="fas ${gameIcons[i]} hidden"></i>
                        </div>`
  }
  $cards = document.querySelectorAll(".card")
})

//Define a function for hard method
//3 function
//Using the same logic from the first except  logic of array
$hard.addEventListener("click", function (e) {
  gameIcons = icons
  for (let i = 0; i < 6; i++) {
    gameIcons.push(gameIcons[i])
  }
  gameIcons = shuffle(gameIcons)
  $game.classList.add("grid-12")
  $start.classList.add("hidden")
  $game.classList.remove("hidden")
  for (let i = 0; i < gameIcons.length; i++) {
    $game.innerHTML += `<div class="card card-3 ${gridClasses[i]}">
                              <i class="fas ${gameIcons[i]} hidden"></i>
                          </div>`
  }
  $cards = document.querySelectorAll(".card")
})


//------------Final Game object----------------------//
//Define a function for game 

//click event using function
$game.addEventListener("click", function (e) {
  //calling cards
  if (e.target.classList.contains("card")) {

    e.target.classList.add('animated', 'fast', 'flipInX')
    //animations for the cards using the animated css
    sleep(200).then(() => { e.target.firstElementChild.classList.remove("hidden") })
    //sleep mode for the cards once user clicl on the cards
    if (this.classList.contains('matched')) {
      //Using the match function
      alert("Please Select Another Card")
      //not match cards then select the other cards
    } else {
      if (openCard.length == 0) {
        openCard = e.target.firstElementChild.classList
      } else {
        let iClass = `.${[...openCard].pop("fas")}`
        mCard = document.querySelectorAll(iClass)
        temp = [...e.target.firstElementChild.classList].filter((item) => { return item !== 'hidden' })
        if (JSON.stringify(Object.values(openCard)) == JSON.stringify(temp)) {
          for (let card of mCard) {
            card.parentNode.classList.add("matched")
          }
          gameIcons = gameIcons.filter(function (e) { return `.${e}` !== iClass })
          if (gameIcons.length == 0) {
            $game.style.opacity = 0.4
            sleep(200).then(() => $end.classList.remove("hidden"))
          }
        } else {
          sleep(200).then(() => {
            for (let card of mCard) {
              card.classList.add("hidden")
              card.parentNode.classList.remove('animated', 'fast', 'flipInX')
              // card.parentNode.style.backgroundColor = "#14a"
              // e.target.style.backgroundColor = "#14a"
              e.target.classList.remove('animated', 'fast', 'flipInX')
              e.target.firstElementChild.classList.add("hidden")
            }
          })
        }
        openCard = []
        iClass = undefined
      }
    }
  }
})


const $startAgain = document.getElementById("start-again")
//restart game again
$startAgain.addEventListener("click", function (e) {
  //clicl event
  $end.classList.add("hidden")
  //end game 
  $game.classList.add("hidden")
  //hidden define in game
  $game.innerHTML = null
  ////inner part is define as null
  $start.classList.remove("hidden")
  //remove class using hidden
  $game.classList = ["game"]
  //used the game object giving the classlist
  $game.classList.add("hidden")
  //adding classlist into game
  $game.style.opacity = 1
  //cards opacity
})