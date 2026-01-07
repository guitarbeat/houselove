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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      {isSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="font-medium">Message sent successfully!</p>
          <p className="text-sm">We'll get back to you soon.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};

export default Contact;
