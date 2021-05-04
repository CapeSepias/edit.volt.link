import { useState, useCallback } from 'react'

function MultiButton({ ariaLabel, items, defaultValue, onChange, style }) {
  const [choosen, setChoosen] = useState(defaultValue)

  const handleClick = useCallback(event => {
    const newValue = event.target.dataset.value
    setChoosen(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }, [setChoosen, onChange])

  return <div
    aria-label={ariaLabel}
    className="buttonRow"
    style={{
      display: 'inline-block',
      ...style
    }}
  >
    {
      items.map(item => {
        const value = item.value
        const title = item.title
        return <button
          key={value}
          className={choosen === value ? 'choosen' : ''}
          onClick={handleClick}
          data-value={value}
        >
          {title}
        </button>
      })
    }
  </div>
}

export default MultiButton
