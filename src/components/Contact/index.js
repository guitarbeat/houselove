import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate async operation
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsLoading(false)
      setIsSuccess(true)
      // Reset form
      setFormData({ name: '', email: '', message: '' })
    }, 500) // Reduced timeout for testing
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      {isSuccess ? (
        <div
          className="p-4 bg-green-50 text-green-700 rounded-md border border-green-200"
          role="alert"
        >
          <h2 className="text-lg font-semibold mb-1">
            Message Sent Successfully!
          </h2>
          <p>Thank you for reaching out. We'll get back to you shortly.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsSuccess(false)}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Your Name{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Your Email{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Your Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleChange}
              disabled={isLoading}
              className="min-h-[120px]"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="mt-2">
            {isLoading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      )}
    </div>
  )
}

export default Contact
