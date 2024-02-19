

//.input-field
//.addPlayer
//[data-player-card]
//Когато добавяме нов играч, програмата 
//проверява дали човек с такова име вече съществува
//Ако съществува и държавата съпвада, упдейтва резултат
//Функция, която проверява дали резултат са подредени,както трябва
//Ако не, ги пренарежда
//Фунцкия,която създава карти, и после 

const addBtn = document.querySelector(".addPlayer")
const cardTemplate = document.querySelector("[data-player-card]")
let playerData = []
const playerDiv = document.querySelector(".player-content")
const plMess = document.querySelector(".playerMess")
const inputs = document.querySelectorAll(".input_Field")




addBtn.addEventListener("click", () => {
    if (checkErr()) {
        const [firstName, lastName, country, score] = GetPlayerInfo()
        const newUser = {}
        const name = `${firstName} ${lastName}`
        newUser.name = name
        newUser.country = country
        newUser.score = score

        //checkErr()
        playerData.push(newUser)
        CreatePlayerCard()
    }
    else {
        for (const input of inputs) {
            input.value = ""
        }
    }
})

function CreatePlayerCard() {
    playerDiv.innerHTML = ""
    playerData = playerData.sort((a, b) => b.score - a.score)
    for (const user of playerData) {
        const card = cardTemplate.content.cloneNode(true).children[0]

        const name = card.querySelector("#pl-name")
        const country = card.querySelector("#pl-country")
        const score = card.querySelector("#pl-score")
        const plusBtn = card.querySelector("#plus5")
        const minusBtn = card.querySelector("#minus5")
        const binBtn = card.querySelector("#bin")
        const date = card.querySelector("#dateRec")
        name.textContent = user.name
        country.textContent = user.country
        score.textContent = user.score
        date.textContent=setCurrDate()
        binBtn.innerHTML+='<i class="fa-solid fa-trash"></i>'
        plusBtn.addEventListener("click", () => {
            user.score = Number(user.score) + 5
            plMess.textContent = ""
            CreatePlayerCard()

        })
        minusBtn.addEventListener("click", () => {
            user.score = Number(user.score) - 5
            plMess.textContent = ""
            CreatePlayerCard()
        })
        binBtn.addEventListener("click", () => {
            playerData = playerData.filter(a => a !== user)
            plMess.textContent = ""
            CreatePlayerCard()
        })
        playerDiv.append(card)
        console.log(playerData)
    }
}
function checkErr() {
    plMess.textContent = ""
    const [firstName, lastName, country, score] = GetPlayerInfo()

    console.log(typeof firstName)
    if (typeof firstName !== "string" ||
        typeof lastName !== "string" ||
        typeof country !== "string" ||
        isNaN(score) ||
        firstName == "" ||
        lastName == "" ||
        country == "") {
        plMess.textContent = "Please enter value for all of the fields"
        return false
    }
    const name = `${firstName} ${lastName}`
    if (playerData.filter(a => a.name == name).length != 0) {
        plMess.textContent = "Please use a new name"
        return false;
    }
    if (!countries.some(a => a.name == country)) {
        plMess.textContent = "Please enter a Real Country"
        return false;
    }
    return true;
}

function setCurrDate() {
    let today = new Date()
    let years = today.getFullYear()
    let month = today.getMonth() + 1
    let day = addZero(today.getDay());
    let monthLet = ""
    switch (month) {
        case 1: monthLet = "JAN"; break;
        case 2: monthLet = "FEB"; break;
        case 3: monthLet = "MAR"; break;
        case 4: monthLet = "APR"; break;
        case 5: monthLet = "MAY"; break;
        case 6: monthLet = "JUN"; break;
        case 7: monthLet = "JUL"; break;
        case 8: monthLet = "AUG"; break;
        case 9: monthLet = "SEP"; break;
        case 10: monthLet = "OCT"; break;
        case 11: monthLet = "NOV"; break;
        case 12: monthLet = "DEC"; break;
    }
    let current_date = `${monthLet} ${day},${years}`
    let hours = addZero(today.getHours())
    let minutes = addZero(today.getMinutes())
    let seconds = addZero(today.getSeconds())
    let current_time = `${hours}:${minutes}:${seconds}`
    return `${current_date} ${current_time}`
}
function addZero(date){
    return date<10 ? `0${date}` : date
}
function GetPlayerInfo() {

    const arr = []
    for (const input of inputs) {
        arr.push(input.value)
    }
    return arr;
}
