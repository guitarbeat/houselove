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

    // Simulate async submission
    setTimeout(() => {
        // EmailJS integration will go here
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setIsSuccess(true);
        // Reset success message after a delay if needed, or clear form
        setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Message sent successfully.</span>
            <Button variant="link" className="pl-0 text-green-700" onClick={() => setIsSuccess(false)}>Send another</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Your Name <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Your Email <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Your Message <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full inline-block" role="status" aria-label="loading"></span>
                        Sending...
                    </>
                ) : (
                    'Send Message'
                )}
            </Button>
        </form>
      )}
    </div>
  );
};

export default Contact;
