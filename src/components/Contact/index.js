import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // EmailJS integration will go here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      {isSubmitted ? (
        <div className="p-4 bg-green-100 text-green-800 rounded-md" role="alert">
          Thank you for your message! We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Your Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Your Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium">
              Your Message <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Send Message</Button>
        </form>
      )}
    </div>
  );
};

export default Contact;
