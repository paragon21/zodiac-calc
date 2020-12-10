let current = [], 
    previuos = [],
    operator = null

const numButtons = document.querySelectorAll('.num-button')
const operatorButtons = document.getElementsByClassName('operator-button')
const resultButton = document.getElementsByClassName('result-button')[0]
const scoreBoard = document.getElementsByClassName('calc__scoreboard')[0]
const clearButton = document.getElementsByClassName('clear-button')[0]
const inverseButton = document.getElementsByClassName('inverse-button')[0]

const addNum = e => {
    current.push(e.target.innerText)
    if (scoreBoard.innerText.length < 8) scoreBoard.innerHTML = current.join('') || 0
}

const chooseOperator = e => {
    switch(e.target.innerText) {
        case '+':
            operator = 'plus'
            break;
        case '-':
            operator = 'minus'
            break;
        case '*':
            operator = 'mul'
            break;
        case '/':
            operator = 'div'
            break;
        default:
            return;
    }
    previuos = [...current]
    current = []
}

const resultOperation = e => {
    let result
    if (!previuos.length || !current.length) {
        return
    }
    switch (operator) {
        case 'plus':
            result = +previuos.join('') + +current.join('')
            break;
        case 'minus':
            result =  +previuos.join('') - +current.join('')
            break;
        case 'mul':
            result = +previuos.join('') * +current.join('')
        case 'div':
            result = Math.floor(+previuos.join('') / +current.join(''))
    }
    console.log(result)
    if (Number.isInteger(result)) {
        scoreBoard.innerHTML = result
    } else {
        scoreBoard.innerHTML = 'ERROR!' 
    }
    previuos, current = []
}

for (let i of numButtons) {
    i.addEventListener('click', addNum)
}

for (let i of operatorButtons) {
    i.addEventListener('click', chooseOperator)
}

resultButton.addEventListener('click', resultOperation)

clearButton.addEventListener('click', e => {
    previuos, current = []
    scoreBoard.innerHTML = '  '
})

inverseButton.addEventListener('click', e => {
    if (!current.length || scoreBoard.innerText === 0) {
        return
    }
    if (current[0] !== '-') {
        current.unshift('-')
        scoreBoard.innerHTML = `-${scoreBoard.innerHTML}`
    } else {
        current.shift()
        scoreBoard.innerHTML = scoreBoard.innerHTML.replace(/\-/, '')
    }
})