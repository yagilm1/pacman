'use strict'

const PACMAN = '😷'; 
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === CHERRY) updateScore(15)
    if (nextCell === FOOD) {
        updateScore(1)
        checkVictory(gBoard)
    } if (nextCell === EMPTY) checkVictory(gBoard)
    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        makeSuper()

    }
    // if (gPacman.isSuper && nextCell === SUPER_FOOD) return




    else if (nextCell === GHOST && gPacman.isSuper === false) {
        gameOver()
        renderCell(gPacman.location, '😵')
        return
    } if (nextCell === GHOST && gPacman.isSuper) {
       removeGhosts(nextLocation)
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}


function makeSuper() {
    gPacman.isSuper = true

    setTimeout(() => {

        gPacman.isSuper = false
        returnGhosts()
    }, 5000)
}



