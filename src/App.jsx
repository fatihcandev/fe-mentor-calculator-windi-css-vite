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

  function handleNumberInput(value) {
    // didnt use handleUpdateState func here because i need to access to the
    // state immediately after the reset (if reset is fired)
    setState((prevState) => {
      const key = prevState.operator ? 'secondNumber' : 'firstNumber'
      return {
        ...prevState,
        [key]: String(value),
      }
    })
  }

  function handleDotInput() {
    const { firstNumber, secondNumber } = state
    if (firstNumber && !secondNumber && !firstNumber.includes('.')) {
      return handleUpdateState('firstNumber', firstNumber.concat('.'))
    }

    if (secondNumber && !secondNumber.includes('.')) {
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
      return
    }

    const isDot = value === '.'
    const isOperator = ['+', '-', '/', 'x'].includes(value)
    const isEquals = value === '='
    const isDel = value === 'DEL'

    if (isNumber) {
      const concattenatedInput = state.operator
        ? state.secondNumber.concat(value)
        : state.firstNumber.concat(value)
      return handleNumberInput(concattenatedInput)
    }
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
