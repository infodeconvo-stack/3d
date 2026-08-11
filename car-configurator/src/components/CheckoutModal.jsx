import { useState } from 'react'

export default function CheckoutModal({ onClose }) {
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const addToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="field">
          <label className="field-label">Customer Name *</label>
          <input
            type="text"
            className="text-input"
            placeholder="e.g. John Smith"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field-label">Phone Number</label>
          <input
            type="tel"
            className="text-input"
            placeholder="e.g. (555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field-label">Email Address</label>
          <input
            type="email"
            className="text-input"
            placeholder="e.g. john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field-label">Quantity</label>
          <div className="quantity-stepper">
            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((q) => q + 1)}>
              +
            </button>
          </div>
        </div>

        <p className="shipping-note">Once submitted your custom wrap will be shipped to your address.</p>

        <button type="button" className="add-to-cart" onClick={addToCart}>
          {added ? 'Added ✓' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  )
}
