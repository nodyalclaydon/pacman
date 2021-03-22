const width = 28
const grid = document.querySelector(".grid")
const scoreDisplay = document.getElementById("score")
let squares = []
let score = 0
let pacDotCount = 0

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
    1,1,1,1,1,1,0,1,1,4,1,2,2,5,5,2,2,1,4,1,1,0,1,1,1,1,1,1,
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
            squares[pacmanCurrentIndex].classList.remove("pacman", "pac-right", "pac-up", "pac-down", "pac-left")
            if (pacmanCurrentIndex + pacDirection === 364) { pacmanCurrentIndex = 391 }
            if (pacmanCurrentIndex + pacDirection === 391) { pacmanCurrentIndex = 364 }
            pacmanCurrentIndex = pacmanCurrentIndex + pacDirection
            squares[pacmanCurrentIndex].classList.add("pacman")
            pacAnimate()
        }
        pacDotEaten()
        powerPelletEaten()
        checkForWin()
        checkForGameOver()
    }, 300)
    }
}

//CSS animations for pacman based on travel direction
function pacAnimate() {
    if (pacDirection === -1) { 
        squares[pacmanCurrentIndex].classList.remove("pac-right", "pac-up", "pac-down")
        squares[pacmanCurrentIndex].classList.add("pac-left") 
    } else if (pacDirection === +1) {
        squares[pacmanCurrentIndex].classList.remove("pac-left", "pac-up", "pac-down")
        squares[pacmanCurrentIndex].classList.add("pac-right")
    } else if (pacDirection === +width) {
        squares[pacmanCurrentIndex].classList.remove("pac-right", "pac-left", "pac-up")
        squares[pacmanCurrentIndex].classList.add("pac-down")
    } else if (pacDirection === -width) {
        squares[pacmanCurrentIndex].classList.remove("pac-right", "pac-left", "pac-down")
        squares[pacmanCurrentIndex].classList.add("pac-up")
    }
}

document.addEventListener('keydown', control) //add a "press arrow button to begin" or something like that

// make pacman eat
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
        score++
        pacDotCount++
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
    new Ghost("blinky", 348, 350),
    new Ghost("pinky", 376, 450),
    new Ghost("inky", 351, 400),
    new Ghost("clyde", 379, 475)
]

// draw ghosts onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("ghost")
})

// move ghosts around grid
function moveGhost(ghost) { 
    let direction = -width

    ghost.timerId = setInterval(function() {
        let availDirs = []

         //if traveling horizontally, looks for vertical options
        if (direction === -1 || direction === +1) {
            if (!squares[ghost.currentIndex + direction].classList.contains("wall")) { availDirs.push(direction) }
            if (!squares[ghost.currentIndex + width].classList.contains("wall")) { availDirs.push(+width) }
            if (!squares[ghost.currentIndex - width].classList.contains("wall")) { availDirs.push(-width) }
        }

        //if traveling vertically, looks for left/right options
        if (direction === -width || direction === +width) { 
            if (!squares[ghost.currentIndex + direction].classList.contains("wall")) { availDirs.push(direction) }
            if (!squares[ghost.currentIndex + 1].classList.contains("wall")) { availDirs.push(+1) }
            if (!squares[ghost.currentIndex - 1].classList.contains("wall")) { availDirs.push(-1) }
        }

        //picks available direction unless ghost is in the way, goes opposite
        if (squares[ghost.currentIndex + direction].classList.contains("ghost")) { 
            direction = -direction
        } else { direction = availDirs[Math.floor(Math.random() * availDirs.length)] }

        //makes ghosts exit ghost-lair if they are in middle
        if (squares[ghost.currentIndex].classList.contains("ghost-exit")) { 
            direction = -width
        }

        //logic that moves the ghosts to new div
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove("ghost", 
                                                    "scared-ghost", 
                                                    `${ghost.className}-right`, 
                                                    `${ghost.className}-left`, 
                                                    `${ghost.className}-up`, 
                                                    `${ghost.className}-down`)
        if (ghost.currentIndex + direction === 364) { ghost.currentIndex = 391 }
        if (ghost.currentIndex + direction === 391) { ghost.currentIndex = 364 }
        ghost.currentIndex += direction
        if (direction === +1) { squares[ghost.currentIndex].classList.add(ghost.className, `${ghost.className}-right`, "ghost") }
        if (direction === -1) { squares[ghost.currentIndex].classList.add(ghost.className, `${ghost.className}-left`, "ghost") }
        if (direction === -width) { squares[ghost.currentIndex].classList.add(ghost.className, `${ghost.className}-up`, "ghost") }
        if (direction === +width) { squares[ghost.currentIndex].classList.add(ghost.className, `${ghost.className}-down`, "ghost") }
        if (ghost.isScared) { squares[ghost.currentIndex].classList.add("scared-ghost") }
        //logic that makes scared ghost get eaten *** FIX BUG
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")) { 
            squares[ghost.currentIndex].classList.remove(ghost.className, 
                                                        "scared-ghost", 
                                                        "ghost", 
                                                        `${ghost.className}-right`, 
                                                        `${ghost.className}-left`, 
                                                        `${ghost.className}-up`, 
                                                        `${ghost.className}-down`)
            ghost.currentIndex = ghost.startIndex
            score += 50
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
            ghost.isScared = false
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
            squares[pacmanCurrentIndex].classList.remove("pac-man", "pac-right", "pac-up", "pac-down", "pac-left")
            document.removeEventListener("keydown", control)
            scoreDisplay.innerHTML = score + " GAME OVER"
            clearInterval(moving)
            document.removeEventListener('keydown', control)
        }
}

// Check for Win
function checkForWin() { //redo logic to check if there are any pellets remaining instead of score (can reach score w/o getting all pellets)
    if (pacDotCount === 234) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keydown", control)
        scoreDisplay.innerHTML = score + " YOU WIN!!!"
        clearInterval(moving)
        document.removeEventListener('keydown', control)
    }
}
