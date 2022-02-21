import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, userEvent } from './utils/test-utils'
import App from './App'

let numberKeys = []
let screenComponent,
  sumKey,
  subKey,
  divKey,
  mulKey,
  dotKey,
  resetKey,
  delKey,
  equalsKey

beforeEach(() => {
  render(<App />)
  const { getAllByTestId, getByRole, getByTestId } = screen
  // sort the keys in asc order
  numberKeys = getAllByTestId('key-number').sort(
    (a, b) => a.textContent - b.textContent
  )
  screenComponent = getByRole('screen')
  sumKey = getByTestId('key-sum')
  subKey = getByTestId('key-sub')
  divKey = getByTestId('key-div')
  mulKey = getByTestId('key-mul')
  dotKey = getByTestId('key-dot')
  resetKey = getByTestId('key-reset')
  delKey = getByTestId('key-del')
  equalsKey = getByTestId('key-equ')
})

function inputNumber(value) {
  userEvent.click(numberKeys[value])
}

function clickOnKey(key) {
  userEvent.click(key)
}

function assertScreenContent(text) {
  expect(screenComponent).toHaveTextContent(text)
}

function assertSum() {
  inputNumber(5)
  inputNumber(0)
  clickOnKey(sumKey)
  inputNumber(2)
  inputNumber(5)
  assertScreenContent('50+25')
  clickOnKey(equalsKey)
  assertScreenContent('75')
}

describe('calculator', () => {
  it('should render the pressed number', () => {
    inputNumber(2)
    assertScreenContent('2')
    inputNumber(5)
    assertScreenContent('25')
  })
  it('should render dot in the number', () => {
    inputNumber(2)
    inputNumber(5)
    userEvent.click(dotKey)
    inputNumber(5)
    assertScreenContent('25.5')
  })
  it('should render only one dot in the number', () => {
    inputNumber(2)
    inputNumber(5)
    userEvent.click(dotKey)
    userEvent.click(dotKey)
    inputNumber(5)
    assertScreenContent('25.5')
  })
  it('should delete one character', () => {
    inputNumber(2)
    inputNumber(5)
    assertScreenContent('25')
    clickOnKey(delKey)
    assertScreenContent('2')
    inputNumber(5)
    clickOnKey(sumKey)
    assertScreenContent('25+')
    clickOnKey(delKey)
    assertScreenContent('25')
  })
  it('should render the pressed operator', () => {
    inputNumber(2)
    inputNumber(5)
    clickOnKey(sumKey)
    assertScreenContent('25+')
    clickOnKey(subKey)
    assertScreenContent('25-')
    clickOnKey(divKey)
    assertScreenContent('25/')
    clickOnKey(mulKey)
    assertScreenContent('25x')
  })
  it('should not render pressed operator if there is no number input', () => {
    clickOnKey(sumKey)
    assertScreenContent('')
    clickOnKey(subKey)
    assertScreenContent('')
    clickOnKey(divKey)
    assertScreenContent('')
    clickOnKey(mulKey)
    assertScreenContent('')
  })
  it('should render the second number after operator', () => {
    inputNumber(2)
    inputNumber(5)
    clickOnKey(sumKey)
    inputNumber(5)
    inputNumber(0)
    assertScreenContent('25+50')
  })
  it('should calculate the sum of the two numbers', assertSum)
  it('should calculate the difference between the two numbers', () => {
    inputNumber(5)
    inputNumber(0)
    clickOnKey(subKey)
    inputNumber(2)
    inputNumber(5)
    assertScreenContent('50-25')
    clickOnKey(equalsKey)
    assertScreenContent('25')
  })
  it('should divide the two numbers', () => {
    inputNumber(5)
    inputNumber(0)
    clickOnKey(divKey)
    inputNumber(2)
    inputNumber(5)
    assertScreenContent('50/25')
    clickOnKey(equalsKey)
    assertScreenContent('2')
  })
  it('should multiply the two numbers', () => {
    inputNumber(5)
    inputNumber(0)
    clickOnKey(mulKey)
    inputNumber(2)
    inputNumber(5)
    assertScreenContent('50x25')
    clickOnKey(equalsKey)
    assertScreenContent('1250')
  })
  it('should reset the result on number input', () => {
    assertSum()
    inputNumber(5)
    inputNumber(0)
    assertScreenContent('50')
  })
  it('should reset the state', () => {
    assertSum()
    clickOnKey(resetKey)
    assertScreenContent('')
    inputNumber(5)
    inputNumber(0)
    clickOnKey(sumKey)
    inputNumber(2)
    clickOnKey(resetKey)
    assertScreenContent('')
  })
})
