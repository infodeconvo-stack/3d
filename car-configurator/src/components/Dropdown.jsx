import { useEffect, useRef, useState } from 'react'

export default function Dropdown({ label, options, value, onChange, showSwatch }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selected = options.find((o) => o.value === value) ?? options[0]

  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      <div className="dropdown" ref={ref}>
        <button type="button" className="dropdown-trigger" onClick={() => setOpen((o) => !o)}>
          <span className="dropdown-trigger-content">
            {showSwatch && <span className="swatch-chip" style={{ background: selected.hex }} />}
            <span>{selected.label}</span>
          </span>
          <span className={`chevron${open ? ' open' : ''}`}>▾</span>
        </button>
        {open && (
          <ul className="dropdown-menu">
            {options.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  className={`dropdown-option${o.value === value ? ' active' : ''}`}
                  onClick={() => {
                    onChange(o.value)
                    setOpen(false)
                  }}
                >
                  {showSwatch && <span className="swatch-chip" style={{ background: o.hex }} />}
                  <span>{o.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
