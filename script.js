let current = [], 
    previuos = [],
    operator = null

const numButtons = document.querySelectorAll('.num-button')
const operatorButtons = document.getElementsByClassName('operator-button')
const resultButton = document.getElementsByClassName('result-button')[0]
const scoreBoard = document.getElementsByClassName('calc__scoreboard')[0]
const clearButton = document.getElementsByClassName('clear-button')[0]
const inverseButton = document.getElementsByClassName('inverse-button')[0]
const ceButton = document.getElementsByClassName('ce-button')[0]

const addNum = num => {
    current.push(num)
    if (scoreBoard.innerText.length < 8) scoreBoard.innerHTML = current.join('') || 0
}

const addKeyupNum = e => {
    console.log(e.code)
    if (e.code.match(/^(numpad|digit)\d$/gi)) {
        const num = e.code.split('').reverse()[0]
        addNum(num)
    }
}

const addClickNum = e => {
    const num = e.target.innerText
    addNum(num)
}

const chooseOperator = choosenOperator => {
    switch(choosenOperator) {
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
    // Если после ввода операндов А и Б вместо результата, операции продолжаются
    if (current.length && previuos.length) {
        previuos = [String(resultOperation())]
        current = []
    } else {
        previuos = [...current]
        current = []
    }
    return  
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
            result = ( +previuos.join('') * +current.join(''))
            break;
        case 'div':
            result = Math.floor(+previuos.join('') / +current.join(''))
            break;
        default:
            return
    }
    // Если результат считается после нажатия = 
    if (e?.target.innerText === '=') {
        if (Number.isInteger(result)) {
            scoreBoard.innerHTML = result
        } else {
            scoreBoard.innerText = 'ERROR' 
        }
        previuos = 0, current = []
    }  
    return result
}

for (let i of numButtons) {
    i.addEventListener('click', addClickNum)
}

for (let i of operatorButtons) {
    i.addEventListener('click', e => {
        chooseOperator(e.target.innerText)
    })
}

resultButton.addEventListener('click', resultOperation)

clearButton.addEventListener('click', e => {
    previuos = [], current = []
    scoreBoard.innerText = '0'
})

ceButton.addEventListener('click', e => {
    if (+current.join('') === 0) {
        return
    }
    if (current.length === 1) {
        current = []
        scoreBoard.innerHTML = "0"
    } else {
        current.pop()
        scoreBoard.innerHTML = current.join('')
    }
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

document.addEventListener('keydown', addKeyupNum)