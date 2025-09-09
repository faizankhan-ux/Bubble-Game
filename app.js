let hit = document.querySelector(".hit")
let time = document.querySelector(".time")
let score = document.querySelector(".score")
let playGround = document.querySelector(".p2")
let start = document.querySelector(".st")
let main = document.querySelector(".main")
let CurrScore = 0;
let Currtime = 59;
let NewHit;

let HighScore = parseInt(localStorage.getItem("high_score")) || 0;



//before game starts
main.style.display = "none"

function MakeTargets() {
    let clutter = ``;
    for (let i = 0; i < 90; i++) {
        let t_no = Math.ceil(Math.random() * 10);
        clutter += `<div class="target bg-[#FFCC00] h-12 w-12 rounded-[50%] m-3 flex justify-center items-center font-bold cursor-pointer hover:bg-green-200 duration-200 hover:font-extrabold">${t_no}</div>`
    }
    playGround.innerHTML = clutter
}


function RunTimer() {
    var ID = setInterval(() => {
        time.textContent = Currtime;
        Currtime--;

        if (Currtime < 0) {
            clearInterval(ID)
            time.style.backgroundColor = "red"
            localStorage.setItem("high_score",HighScore);
            let HighScoreStored = parseInt(localStorage.getItem("high_score"))
            playGround.innerHTML = `<h1 class="font-bold text-white text-2xl"> <span class="text-yellow-400 h-5 underline" >Game Over</span> <br> High Score : ${HighScoreStored} <br> Current Score : ${CurrScore}</h1>`
        }
    }, 1000)
}


function UpdateHit() {
    NewHit = Math.ceil(Math.random() * 10)
    hit.textContent = NewHit;
}


playGround.addEventListener("click", (e) => {
    let clicked = e.target
    if (clicked.classList.contains("target") && clicked.textContent == NewHit) {
        CurrScore++
        score.textContent = CurrScore
        
        if(CurrScore > HighScore){
            score.style.backgroundColor = "green"
        }
        
        HighScore  = Math.max(HighScore , CurrScore)
        UpdateHit()
        MakeTargets()
    }
})

start.addEventListener("click" , StartGame)

function StartGame(){
    start.style.display = "none"
    main.style.display = "flex"

    RunTimer()
    MakeTargets()
    UpdateHit()
}