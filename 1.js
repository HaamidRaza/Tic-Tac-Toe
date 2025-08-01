let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn =document.querySelector("#newBtn");
let msg =document.querySelector("#msg");
let msgContainer=document.querySelector(".msg-container");

let gameOver = false;

let turnO = true;
let count = 0;

const winPatterns =[ 
     [0,1,2],
     [0,3,6],
     [0,4,8],
     [1,4,7],
     [2,4,6],
     [2,5,8],
     [3,4,5],
     [6,7,8],
];

const resetGame = () =>{
    turnO = true;
    gameOver = false;
    enableBtn();
    msgContainer.classList.add("hide");
    document.querySelector('main').style.display='block';
    count =0;
};

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
    if(turnO) {
        box.innerText ="O";
        turnO = false;
    } else {
        box.innerText ="X";
        turnO=true;
    }
    box.disabled =true;
    count++;
    let isWinner = checkWinner();

    if(isWinner){
        gameOver=true;
    }else if(count === 9){
        gameOver = true;
        gameDraw();
    }
    
});
//for preview of move
box.addEventListener("mouseenter", () => {
    if (!box.innerText && !gameOver) {
        box.classList.add("hover-preview");
        box.setAttribute("data-preview", turnO ? "O" : "X");
    }
});

box.addEventListener("mouseleave", () => {
    box.classList.remove("hover-preview");
    box.removeAttribute("data-preview");
});

});

const gameDraw = () => {
    msg.innerText =`GAME ENDED IN A DRAW.`;
    msgContainer.classList.remove("hide");
    document.querySelector("main").style.display = 'none';
    disableBtn();
}

const disableBtn = () =>{
    for (box of boxes){
        box.disabled = true;
    }
}

const enableBtn= () =>{
    for (box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("hover-preview");
        box.removeAttribute("data-preview");
    }
}


const showWinner = (winner) => {
    msg.innerText = `Congratulations, You are the Winner ${winner}`
    document.querySelector("main").style.display='none';
    msgContainer.classList.remove("hide");
    disableBtn()
}

const checkWinner = () =>{
    for (let pattern of  winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if(pos1Val!="" && pos2Val!="" && pos3Val !="")
            {if(pos1Val==pos2Val && pos2Val==pos3Val){
            showWinner(pos1Val);
            return true;
       }
    }
    }
    return false;
};

newGameBtn.addEventListener("click",resetGame);

resetBtn.addEventListener("click",resetGame);