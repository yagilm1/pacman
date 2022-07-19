'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '🔸'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gIntervalCherry
var gRemovedGhosts = []

function init() {
    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    gGame.score = 0
    gIntervalCherry = setInterval(getCherry, 5000)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }
                if (i === 1 && j === 1 ||
                    i === 1 && j === SIZE - 2 ||
                     i === SIZE - 2 && j === 1 ||
                      i === SIZE - 2 && j === SIZE - 2) {
                    board[i][j] = SUPER_FOOD
                }
            }
        }
    
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    var elModal = document.querySelector('.lost-modal')
    // elModal.classList.toggle('display')
    elModal.style.display = 'block'
}

function restartGame() {
    var elLostModal = document.querySelector('.lost-modal')
    elLostModal.style.display = 'none'
    var elWinModal = document.querySelector('.win-modal')
    elWinModal.style.display = 'none'
    document.querySelector('h2 span').innerText = 0
    init()

}

function checkVictory(gBoard) {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) return false
        }
    }
    endGame(true)
}

function endGame() {
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    var elWinModal = document.querySelector('.win-modal')
    elWinModal.style.display = 'block'
}


function findEmptyCells(){
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY){
                emptyCells.push({i,j})
            }
        }
    }
    var cellIdx = getRandomIntInt(0,emptyCells.length-1)
    var emptyCell = emptyCells.splice(cellIdx,1)
    return emptyCell
       

}

function getCherry(){
    var emptyCell = findEmptyCells()
        
    gBoard[emptyCell[0].i][emptyCell[0].j] = CHERRY

    renderCell(emptyCell[0], CHERRY)

        
        // console.log('gBoard[emptyCell[0].i]:', gBoard[emptyCell[0].i])
        // // console.log('gBoard[emptyCell[0].j]:', gBoard[emptyCell[0].j])
        // console.log('emptyCell:', emptyCell)
        // console.log('emptyCell[0][i]:', emptyCell[0][i])
        // console.log('emptyCell[0][j]:', emptyCell[0][j])
    }