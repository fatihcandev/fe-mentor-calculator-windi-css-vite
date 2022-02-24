import { useMemo, useState } from 'react'

import { Header, Keypad, Screen } from './components'

const initialState = {
  firstNumber: '',
  secondNumber: '',
  operator: '',
  result: '',
}

function App() {
  const [state, setState] = useState(initialState)

  const input = useMemo(() => {
    const concattenatedString = `${state.firstNumber}${state.operator}${state.secondNumber}`
    return state.result || concattenatedString
  }, [state.firstNumber, state.operator, state.result, state.secondNumber])

  function handleUpdateState(key, value) {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  // didnt use handleUpdateState func here because i need to access to the
  // state immediately after the reset (if reset is fired)
  function handleNumberInput(value) {
    setState((prevState) => {
      // if there is an operator selected, the entered number is gonna be the second number
      const key = prevState.operator ? 'secondNumber' : 'firstNumber'
      const currentNumber = prevState[key]
      // limit the amount of digits that can be entered for each number to 15
      if (currentNumber.length < 15) {
        return {
          ...prevState,
          [key]: currentNumber.concat(value),
        }
      }

      return prevState
    })
  }

  function handleDotInput() {
    const { firstNumber, secondNumber } = state
    const firstNumberCondition =
      firstNumber &&
      firstNumber.length < 15 &&
      !firstNumber.includes('.') &&
      !secondNumber
    const secondNumberCondition =
      secondNumber && secondNumber.length < 15 && !secondNumber.includes('.')
    if (firstNumberCondition) {
      handleUpdateState('firstNumber', firstNumber.concat('.'))
    }

    if (secondNumberCondition) {
      handleUpdateState('secondNumber', secondNumber.concat('.'))
    }
  }

  function handleOperatorInput(value) {
    if (state.firstNumber) {
      handleUpdateState('operator', value)
    }
  }

  function handleDelete() {
    const { firstNumber, secondNumber, operator } = state

    if (firstNumber && !secondNumber && !operator) {
      return handleUpdateState(
        'firstNumber',
        firstNumber.slice(0, firstNumber.length - 1)
      )
    }

    if (operator && !secondNumber) {
      return handleUpdateState('operator', '')
    }

    handleUpdateState(
      'secondNumber',
      secondNumber.slice(0, secondNumber.length - 1)
    )
  }

  function handleReset() {
    setState(initialState)
  }

  function handleCalculation() {
    const { firstNumber, secondNumber, operator } = state
    if (firstNumber && secondNumber && operator) {
      const convertedFirstNumber = Number(firstNumber)
      const convertedSecondNumber = Number(secondNumber)
      const calculations = {
        '+': convertedFirstNumber + convertedSecondNumber,
        '-': convertedFirstNumber - convertedSecondNumber,
        '/': convertedFirstNumber / convertedSecondNumber,
        x: convertedFirstNumber * convertedSecondNumber,
      }
      const result = calculations[operator]
      handleUpdateState('result', result)
    }
  }

  function handleKeyDown(value) {
    const isReset = value === 'RESET'
    const isNumber = !isNaN(value)
    //  if there is a result, dont allow any other action except reset and number input
    if (state.result) {
      if (isNumber) {
        handleReset()
        return handleNumberInput(value)
      }
      if (isReset) return handleReset()
    }

    const isDot = value === '.'
    const isOperator = ['+', '-', '/', 'x'].includes(value)
    const isEquals = value === '='
    const isDel = value === 'DEL'

    if (isNumber) return handleNumberInput(value)
    if (isDot) return handleDotInput()
    if (isOperator) return handleOperatorInput(value)
    if (isEquals) return handleCalculation()
    if (isDel) return handleDelete()
    if (isReset) return handleReset()
  }

  return (
    <div display="flex" bg="bgPrimary" h="100vh" p="7.5" md="p-0">
      <div display="flex" flex="col" w="full max-135" h="full max-175" m="auto">
        <Header />
        <Screen input={input} />
        <Keypad onKeyDown={handleKeyDown} />
      </div>
    </div>
  )
}

export default App
