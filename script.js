const startScreen = document.getElementById("start-screen");
const playBtn = document.getElementById("play-btn");

const gameContainer = document.getElementById("game-container");
const board = document.getElementById("game-board");

const countdown = document.getElementById("countdown");

const scoreText = document.getElementById("score");
const movesText = document.getElementById("moves");
const timeText = document.getElementById("time");

const popup = document.getElementById("winner-popup");

const finalScore = document.getElementById("final-score");
const finalMoves = document.getElementById("final-moves");
const finalTime = document.getElementById("final-time");
const bestTime = document.getElementById("best-time");

const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");
const playAgainBtn = document.getElementById("play-again");
const themeBtn = document.getElementById("theme-btn");

const bgMusic = document.getElementById("bg-music");
const flipSound = document.getElementById("flip-sound");
const matchSound = document.getElementById("match-sound");
const wrongSound = document.getElementById("wrong-sound");
const winSound = document.getElementById("win-sound");

let firstCard=null;
let secondCard=null;

let firstDiv=null;
let secondDiv=null;

let score=0;
let moves=0;
let seconds=0;

let timer;

let paused=false;

let lockBoard=true;

const cards=[
    {
        id:1,
        symbol:"elephant",
        image:"./images/elephant.png",
        flipped: false,
        matched: false
    },
    {
        id:2,
        symbol:"elephant",
        image:"./images/elephant.png",
        flipped: false,
        matched: false
    },
    {
        id:3,
        symbol:"peacock",
        image:"./images/peacock.png",
        flipped: false,
        matched: false
    },
    {
        id:4,
        symbol:"peacock",
        image:"./images/peacock.png",
        flipped: false,
        matched: false
    },
    {
        id:5,
        symbol:"bananatree",
        image:"./images/bananatree.png",
        flipped: false,
        matched: false
    },
    {
        id:6,
        symbol:"bananatree",
        image:"./images/bananatree.png",
        flipped: false,
        matched: false
    },
    {
        id:7,
        symbol:"coconut",
        image:"./images/coconut.png",
        flipped: false,
        matched: false
    },
    {
        id:8,
        symbol:"coconut",
        image:"./images/coconut.png",
        flipped: false,
        matched: false
    },
    {
        id:9,
        symbol:"rudraksha",
        image:"./images/rudraksha.png",
        flipped: false,
        matched: false
    },
    {
        id:10,
        symbol:"rudraksha",
        image:"./images/rudraksha.png",
        flipped: false,
        matched: false
    },
    {
        id:11,
        symbol:"hibiscus",
        image:"./images/hibiscus.png",
        flipped: false,
        matched: false
    },
    {
        id:12,
        symbol:"hibiscus",
        image:"./images/hibiscus.png",
        flipped: false,
        matched: false
    },
    {
        id:13,
        symbol:"diya",
        image:"./images/diya.png",
        flipped: false,
        matched: false
    },
     {
        id:14,
        symbol:"diya",
        image:"./images/diya.png",
        flipped: false,
        matched: false
    },
    {
        id:15,
        symbol:"rangoli",
        image:"./images/rangoli.png",
        flipped: false,
        matched: false
    },
    {
        id:16,
        symbol:"rangoli",
        image:"./images/rangoli.png",
        flipped: false,
        matched: false
    },
 ];

cards.sort(() => Math.random() - 0.5);

function createBoard(){
    board.innerHTML = "";
    cards.forEach((card) => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = "?";
            board.appendChild(div);

            div.addEventListener("click", () => {
                 flipCard(card, div);
            });
  
   });
}

function flipCard(card, div){
    if(lockBoard){
        return;
    }

    if(paused){
        return;
    }

    if(card.matched){
        return;
    }

    if(firstCard == card){
        return;
    }

    div.innerHTML = `<img src="${card.image}">`;
    div.style.transform = "rotateY(180deg)";

    if(firstCard == null){
        firstCard = card;
        firstDiv = div;
        return;
    }

    secondCard = card;
    secondDiv = div;
    moves++;
    movesText.innerHTML = "🎯 Moves : " + moves;
    lockBoard = true;
    checkMatch();

}

function checkMatch(){

    setTimeout(function(){
        if(firstCard.symbol==secondCard.symbol){
            matchSound.currentTime=0;
            matchSound.play();

            firstCard.matched=true;
            secondCard.matched=true;

            score++;
            scoreText.innerHTML="⭐ Score : "+score;

            if(score==8){
                clearInterval(timer);

                winSound.currentTime=0;
                winSound.play();

                finalScore.innerHTML="⭐ Score : "+score;
                finalMoves.innerHTML="🎯 Moves : "+moves;
                finalTime.innerHTML=timeText.innerHTML;

                popup.style.display="flex";
            }

        }
        else{
            wrongSound.currentTime=0;
            wrongSound.play();

            firstDiv.innerHTML="?";
            secondDiv.innerHTML="?";

            firstDiv.style.transform="rotateY(0deg)";
            secondDiv.style.transform="rotateY(0deg)";
        }

        firstCard=null;
        secondCard=null;

        firstDiv=null;
        secondDiv=null;

        lockBoard=false;

    },800);

}

pauseBtn.onclick=function(){
    paused=!paused;

    if(paused){
        clearInterval(timer);
        pauseBtn.innerHTML="▶ Resume";
    }

    else{
        startTimer();
        pauseBtn.innerHTML="⏸ Pause";
    }

}

restartBtn.onclick=function(){
    resetGame();
}

playAgainBtn.addEventListener("click",function(){
    resetGame();
});

function resetGame(){

    board.innerHTML="";

    score=0;
    moves=0;
    seconds=0;

    firstCard=null;
    secondCard=null;
    firstDiv=null;
    secondDiv=null;

    cards.forEach(function(card){
        card.matched=false;
        card.flipped=false;
    });

    cards.sort(() => Math.random() - 0.5);

    scoreText.innerHTML="⭐ Score : 0";
    movesText.innerHTML="🎯 Moves : 0";
    timeText.innerHTML="⏱ Time : 00:00";

    popup.style.display="none";

    clearInterval(timer);

    createBoard();

    lockBoard=true;

    countdown.style.display="flex";
    countdown.innerHTML="3";
    startCountdown();

}

themeBtn.onclick=function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeBtn.innerHTML="☀ Light";
    }

    else{
        themeBtn.innerHTML="🌙 Dark";
    }

}
playBtn.addEventListener("click",function(){

    startScreen.style.display="none";
    gameContainer.style.display="block";
    createBoard();
    startCountdown();

});

function startCountdown(){

    let count=3;
    countdown.innerHTML=count;
    let interval=setInterval(function(){
        count--;
        if(count>0){
            countdown.innerHTML=count;
        }

        else if(count==0){
            countdown.innerHTML="GO!";
        }

        else{
            clearInterval(interval);
            countdown.style.display="none";
            lockBoard=false;
            startTimer();
        }

    },1000);

}

function startTimer(){

    timer=setInterval(function(){
        seconds++;
        let min=Math.floor(seconds/60);
        let sec=seconds%60;
        if(min<10){
            min="0"+min;
        }

        if(sec<10){
            sec="0"+sec;
        }

        timeText.innerHTML="⏱ Time : "+min+":"+sec;

    },1000);

}