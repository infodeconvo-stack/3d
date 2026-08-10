import { useRef } from 'react'

export default function ColorStrip({ colors, value, onChange }) {
  const customInputRef = useRef(null)

  return (
    <div className="color-strip">
      <button
        type="button"
        className="color-strip-swatch custom-swatch-trigger"
        title="Pick a custom color"
        onClick={() => customInputRef.current?.click()}
      />
      <input
        ref={customInputRef}
        type="color"
        className="custom-color-input"
        value={value && /^#[0-9a-fA-F]{6}$/.test(value) ? value : '#ffffff'}
        onChange={(e) => onChange(e.target.value)}
      />
      {colors.map((c) => (
        <button
          key={c.value}
          type="button"
          title={c.label}
          className={`color-strip-swatch${c.value === value ? ' active' : ''}`}
          style={{ background: c.hex }}
          onClick={() => onChange(c.value)}
        />
      ))}
    </div>
  )
}
