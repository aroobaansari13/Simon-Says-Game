let gameSeq = [];
let userSeq = [];

let btns = ["red", "green" , "pink" , "purple"]

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

document.addEventListener("keypress" , function(){
    if(started == false){
        console.log("Game started")
        started = true;
        levelUp();
    }
})

function gameFlash(btn){
btn.classList.add("flash");
setTimeout(function(){
    btn.classList.remove("flash")
},200);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },200);
    }
    

function levelUp(){
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randClr = btns[randIdx];
    let randBtn = document.querySelector(`.${randClr}`);
    if (randBtn) { 
        gameSeq.push(randClr);
        gameFlash(randBtn);
    } else {
        console.error(`Button with class '${randClr}' not found!`);
    }
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
         setTimeout(levelUp , 1000)
        }
    }else{
        h3.innerHTML= `Game Over! Your Score was <b>${level}</b><br> Press any key to Start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },300);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn)

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click" , btnPress)
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}