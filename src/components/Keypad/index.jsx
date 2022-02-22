import './Keypad.css'
import keys from './keys'

function getKeyStyles(isSecondaryButton, isTertiaryButton) {
  if (isSecondaryButton)
    return 'text-white shadow-secondaryKey bg-keyBgSecondary'
  if (isTertiaryButton) return 'text-white shadow-tertiaryKey bg-keyBgTertiary'
  return 'text-textPrimary shadow-primaryKey bg-keyBgPrimary'
}

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
        const isSecondaryButton = ['DEL', 'RESET'].includes(key.content)
        const isTertiaryButton = key.content === '='
        const keyStyles = getKeyStyles(isSecondaryButton, isTertiaryButton)
        return (
          <button
            key={index}
            rounded="[10px]"
            transform="~ active:translate-y-1"
            md="text-3xl"
            onClick={() => onKeyDown(key.content)}
            className={`key text-xl ${keyStyles} active:shadow-none`}
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
