import './Keypad.css'
import keys from './keys'

const Keypad = ({ onKeyDown }) => {
  return (
    <div
      flex="1"
      display="grid"
      grid="cols-4 gap-3"
      p="6"
      bg="bgSecondary"
      rounded="[14px]"
      md="gap-6"
    >
      {keys.map((key, index) => {
        const isNumber = !isNaN(key.content)
        return (
          <button
            key={index}
            bg="keyBgPrimary"
            rounded="[10px]"
            text="xl"
            shadow="key"
            md="text-3xl"
            onClick={() => onKeyDown(key.content)}
            className="key"
            data-testid={isNumber ? 'key-number' : key.testId}
          >
            {key.content}
          </button>
        )
      })}
    </div>
  )
}

export default Keypad
