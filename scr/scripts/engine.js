const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    value: {
        gameVelocity: 1000,
        hitPosition:0,
        result:0,
        curretTime:60
    },
    actions:{
        timeId: setInterval(randomSquare,1000),
        countDownTimeId: setInterval(countDown,1000),
    }
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    })
    const randomNumber = Math.floor(Math.random()*9)
    const randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.value.hitPosition = randomSquare.id
}

//function moveEnemy(){
//    state.value.timeId = setInterval(randomSquare, state.value.gameVelocity)
//}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown",()=>{
            if(square.id=== state.value.hitPosition){
                state.value.result++
                state.view.score.textContent = state.value.result
                state.value.hitPosition = null
                playSound()
            }
        })
    })
}

function countDown(){
    state.value.curretTime--
    state.view.timeLeft.textContent = state.value.curretTime
    if(state.value.curretTime<=0){
        clearInterval(state.actions.countDownTimeId)
        clearInterval(state.actions.timeId)
        alert("Game Over! O seu resultado foi: "+state.value.result)
    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a")
    audio.volume = 0.2
    audio.play()
}

function init(){
 //   moveEnemy()
    addListenerHitBox()
}

init()