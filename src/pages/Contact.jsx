import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

      <p className="text-gray-600 mb-8 text-center">
        If you have any questions, feedback, or inquiries, feel free to reach out using the form below.
      </p>

      <form className="grid gap-6 bg-white p-6 rounded shadow-md">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 p-3 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border border-gray-300 p-3 rounded"
        />
        <textarea
          placeholder="Your Message"
          rows={6}
          className="border border-gray-300 p-3 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
