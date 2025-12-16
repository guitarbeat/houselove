import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // EmailJS integration will go here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Name <span className="text-red-500">*</span></label>
          <Input id="name" type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required aria-required="true" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
          <Input id="email" type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required aria-required="true" />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">Message <span className="text-red-500">*</span></label>
          <Textarea id="message" name="message" placeholder="How can we help you?" value={formData.message} onChange={handleChange} required aria-required="true" className="min-h-[120px]" />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
};

export default Contact;
