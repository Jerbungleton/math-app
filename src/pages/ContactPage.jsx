export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to an API or mailto)
    alert("Form submitted! (This is a placeholder)");
  };

  return (
    <div className="container mx-auto p-8 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Get In Touch</h1>
      <div className="max-w-lg mx-auto bg-neutral-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
            <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-music-primary focus:border-music-primary sm:text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
            <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-music-primary focus:border-music-primary sm:text-sm" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
            <textarea name="message" id="message" rows="4" required className="mt-1 block w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-music-primary focus:border-music-primary sm:text-sm"></textarea>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-music-primary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-music-primary">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}