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

function click(element) {
  userEvent.click(element)
}

function inputNumber(value) {
  click(numberKeys[value])
}

function assertScreenContent(text) {
  expect(screenComponent).toHaveTextContent(text)
}

function assertSum() {
  inputNumber(5)
  inputNumber(0)
  click(sumKey)
  inputNumber(2)
  inputNumber(5)
  assertScreenContent('50+25')
  click(equalsKey)
  assertScreenContent('75')
}

describe('calculator', () => {
  it('should render the pressed number', () => {
    inputNumber(2)
    assertScreenContent('2')
    inputNumber(5)
    assertScreenContent('25')
  })
  it('should not render more than 15 digits for a number', () => {
    // click on 2 key 16 times
    Array(16)
      .fill('')
      .forEach(() => inputNumber(2))
    expect(screenComponent.textContent).toHaveLength(15)
  })
  it('should render dot in the number', () => {
    inputNumber(2)
    inputNumber(5)
    click(dotKey)
    inputNumber(5)
    assertScreenContent('25.5')
  })
  it('should render only one dot in the number', () => {
    inputNumber(2)
    inputNumber(5)
    click(dotKey)
    click(dotKey)
    inputNumber(5)
    assertScreenContent('25.5')
  })
  it('should delete one character', () => {
    inputNumber(2)
    inputNumber(5)
    assertScreenContent('25')
    click(delKey)
    assertScreenContent('2')
    inputNumber(5)
    click(sumKey)
    assertScreenContent('25+')
    click(delKey)
    assertScreenContent('25')
  })
  it('should render the pressed operator', () => {
    inputNumber(2)
    inputNumber(5)
    click(sumKey)
    assertScreenContent('25+')
    click(subKey)
    assertScreenContent('25-')
    click(divKey)
    assertScreenContent('25/')
    click(mulKey)
    assertScreenContent('25x')
  })
  it('should not render pressed operator if there is no number input', () => {
    click(sumKey)
    assertScreenContent('')
    click(subKey)
    assertScreenContent('')
    click(divKey)
    assertScreenContent('')
    click(mulKey)
    assertScreenContent('')
  })
  it('should render the second number after operator', () => {
    inputNumber(2)
    inputNumber(5)
    click(sumKey)
    inputNumber(5)
    inputNumber(0)
    assertScreenContent('25+50')
  })
  it('should calculate the sum of the two numbers', assertSum)
  it('should calculate the difference between the two numbers', () => {
    inputNumber(5)
    inputNumber(0)
    click(subKey)
    inputNumber(2)
    inputNumber(5)
    assertScreenContent('50-25')
    click(equalsKey)
    assertScreenContent('25')
  })
  it('should divide the two numbers', () => {
    inputNumber(5)
    inputNumber(0)
    click(divKey)
    inputNumber(2)
    inputNumber(5)
    assertScreenContent('50/25')
    click(equalsKey)
    assertScreenContent('2')
  })
  it('should multiply the two numbers', () => {
    inputNumber(5)
    inputNumber(0)
    click(mulKey)
    inputNumber(2)
    inputNumber(5)
    assertScreenContent('50x25')
    click(equalsKey)
    assertScreenContent('1250')
  })
  it('should reset the screen and render the new numbers on number input', () => {
    assertSum()
    inputNumber(5)
    inputNumber(0)
    assertScreenContent('50')
  })
  it('should reset the screen', () => {
    assertSum()
    click(resetKey)
    assertScreenContent('')
    inputNumber(5)
    inputNumber(0)
    click(sumKey)
    inputNumber(2)
    click(resetKey)
    assertScreenContent('')
  })
})
