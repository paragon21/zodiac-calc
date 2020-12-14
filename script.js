let current = [], 
    previuos = [],
    operator = null

const numButtons = document.querySelectorAll('.num-button')
const operatorButtons = document.querySelectorAll('.operator-button')
const resultButton = document.querySelector('.result-button')
const scoreBoard = document.querySelector('.calc__scoreboard')
const clearButton = document.querySelector('.clear-button')
const inverseButton = document.querySelector('.inverse-button')
const ceButton = document.querySelector('.ce-button')

const addNum = num => {
    if (current.length < 8) {
        current.push(num)       
    }
    scoreBoard.textContent = current.join('')
}

const addKeyupNum = e => {
    if (e.code.match(/^(numpad|digit)\d$/gi)) {
        e.preventDefault()
        const num = e.code.split('').reverse()[0]
        addNum(num)
    }
    if (e.code.match(/numpad(divide|multiply|subtract|add)/gi)) {
        e.preventDefault()
        switch (e.code) {
            case 'NumpadDivide':
                chooseOperator('/')
                break;
            case 'NumpadMultiply':
                chooseOperator('*')
                break;
            case 'NumpadSubtract':
                chooseOperator('-')
                break;
            case 'NumpadAdd':
                chooseOperator('+')
                break;
            default:
                break;
        }
    }
    if(e.code.match(/((numpad)?enter|equal)/gi)) {
        e.preventDefault()
        resultOperation(e)
    }
}

const addClickNum = e => {
    const num = e.target.textContent
    addNum(num)
}

const chooseOperator = choosenOperator => {

    // Если после ввода операндов А и Б вместо результата, операции продолжаются
    if (current.length && previuos.length) {
        const tmp_result = resultOperation()
        scoreBoard.textContent = tmp_result
        previuos = [String(tmp_result)]
        current = []
    } else {
        // До ввода любой цифры второго числа можно поменять операцию нажав на любую другую операцию
        previuos = current.length ? [...current] : [...previuos]
        current = []
    }

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
}

const resultOperation = e => {
    let result
    if ( !previuos.length || !current.length ) {
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
            result = Number.parseInt( +previuos.join('') / +current.join('') )
            break;
        default:
            return
    }
    // Обрезать результат, табло не длинее 8 символов
    result = Number.parseInt(
        String(result).split('').slice(0,8).join('')
        )
    // Если результат считается после нажатия = / Enter
    if ( e?.target.textContent === '=' || 
        e?.code.match(/((numpad)?enter|equal)/gi) ) {

        if (Number.isInteger(result)) {
            scoreBoard.textContent = result
        } else {
            scoreBoard.textContent = 'ERROR' 
        }
        previuos = [], current = [...String(result).split('')]
    }  
    return result
}

for (let i of numButtons) {
    i.addEventListener('click', addClickNum)
}

for (let i of operatorButtons) {
    i.addEventListener('click', e => {
        chooseOperator(e.target.textContent)
    })
}

resultButton.addEventListener('click', resultOperation)

clearButton.addEventListener('click', e => {
    previuos = [], current = []
    scoreBoard.textContent = '0'
})

ceButton.addEventListener('click', e => {
    if (+current.join('') === 0) {
        return
    }
    if (current.length === 1) {
        current = []
        scoreBoard.textContent = "0"
    } else {
        current.pop()
        scoreBoard.textContent = current.join('')
    }
})

inverseButton.addEventListener('click', e => {
    if (!current.length || scoreBoard.textContent === 0) {
        return
    }
    if (current[0] !== '-') {
        current.unshift('-')
        scoreBoard.textContent = `-${scoreBoard.textContent}`
    } else {
        current.shift()
        scoreBoard.textContent = scoreBoard.textContent.replace(/\-/, '')
    }
})

document.addEventListener('keydown', addKeyupNum)