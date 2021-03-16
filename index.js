const width = 28
const grid = document.querySelector(".grid")
const scoreDisplay = document.getElementById("score")
let squares = []
let score = 0

// 28 * 28 = 784
    // 0 = pac-dots
    // 1 = wall
    // 2 = ghost-lair
    // 3 = power-pellet
    // 4 = empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,5,5,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,5,5,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

// create board function
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement("div")
        grid.appendChild(square)
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add("pac-dot", "empty")
        } else if (layout[i] === 1) {
            squares[i].classList.add("wall")
        } else if (layout[i] === 3) {
            squares[i].classList.add("power-pellet", "empty")
        } else if (layout[i] === 2) {
            squares[i].classList.add("ghost-lair")
        } else if (layout[i] === 5) {
            squares[i].classList.add("ghost-lair", "ghost-exit")
        } else if (layout[i] === 4) {
            squares[i].classList.add("empty")
        }
    }
}
createBoard()

// starting position of pacman
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add("pacman")

// redo logic so pacman continues direction until another button is pressed
let pacDirections = [-1, +1, -width, +width]
let pacDirection = pacDirections[0]
let moving

function control(e) {
    clearInterval(moving)

    switch(e.keyCode) {
        case 40: //down      
            pacDirection = pacDirections[3]
            pacMove()
        break
        case 38: //up     
            pacDirection = pacDirections[2]
            pacMove()
        break
        case 37: //left
            pacDirection = pacDirections[0]
            pacMove()
        break
        case 39: //right         
            pacDirection = pacDirections[1]
            pacMove()
        break
    }

    function pacMove() { 
        moving = setInterval(function() {
            if (!squares[pacmanCurrentIndex + pacDirection].classList.contains("empty")) {
            pacmanCurrentIndex = pacmanCurrentIndex
        } else {
            squares[pacmanCurrentIndex].classList.remove("pacman")
            if (pacmanCurrentIndex + pacDirection === 364) { pacmanCurrentIndex = 391 }
            if (pacmanCurrentIndex + pacDirection === 391) { pacmanCurrentIndex = 364 }
            pacmanCurrentIndex = pacmanCurrentIndex + pacDirection
            squares[pacmanCurrentIndex].classList.add("pacman")
        }
        pacDotEaten()
        powerPelletEaten()
        checkForWin()
        checkForGameOver()
    }, 300)
    }
}

document.addEventListener('keydown', control) //add a "press arrow button to begin" or something like that

// make pacman eat
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
        score++
        scoreDisplay.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove("pac-dot")
    }
}

function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
        score += 10
        scoreDisplay.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove("power-pellet")
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000)
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

// create ghosts
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN

    }
}

const ghosts = [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 300),
    new Ghost("clyde", 379, 500)
]

// draw ghosts onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("ghost")
})

// move ghosts around grid
function moveGhost(ghost) { 
    //redo logic so ghosts can change direction if option is avail (not just when run into wall/ghost)
    //redo logic so ghosts cannon change direction to current direction (elimiate "stalled ghost")
    //redo logic so ghosts can go through portal
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
        if (
            !squares[ghost.currentIndex + direction].classList.contains("wall") &&
            !squares[ghost.currentIndex + direction].classList.contains("ghost")
        ) {
            //what happens if there's no ghost or wall in front of ghost
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add("ghost")
        } else direction = directions[Math.floor(Math.random() * directions.length)] //what happens if there is a ghost OR wall in front of ghost
        
        //makes ghosts exit ghost-lair if they are in middle
        if (squares[ghost.currentIndex].classList.contains("ghost-exit")) { 
            direction = -width
        }

        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add("scared-ghost")
        }

        if (ghost.isScared && squares[pacmanCurrentIndex].classList.contains("ghost")) { 
            squares[ghost.currentIndex].classList.remove(ghost.className, "scared-ghost", "ghost")
            ghost.currentIndex = ghost.startIndex
            score += 50
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
        }

        checkForGameOver()

    }, ghost.speed)
}

ghosts.forEach(ghost => moveGhost(ghost))

// Check for Game Over
function checkForGameOver() {
    if (
        squares[pacmanCurrentIndex].classList.contains("ghost") &&
        !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
        ) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", control)
            scoreDisplay.innerHTML = score + " GAME OVER"
            clearInterval(moving)
            document.removeEventListener('keydown', control)
        }
}

// Check for Win
function checkForWin() { //redo logic to check if there are any pellets remaining instead of score (can reach score w/o getting all pellets)
    if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keyup", control)
        scoreDisplay.innerHTML = score + " YOU WIN!!!"
        clearInterval(moving)
        document.removeEventListener('keydown', control)
    }
}