export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (This is a placeholder)");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-brand-primary-dark">Get In Touch</h1> {/* */}
      <div className="max-w-lg mx-auto content-card"> {/* */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand-text-dark">Full Name</label> {/* */}
            <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 bg-brand-background border border-brand-secondary rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-brand-text-dark" /> {/* */}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand-text-dark">Email Address</label> {/* */}
            <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 bg-brand-background border border-brand-secondary rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-brand-text-dark" /> {/* */}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-brand-text-dark">Message</label> {/* */}
            <textarea name="message" id="message" rows="4" required className="mt-1 block w-full px-3 py-2 bg-brand-background border border-brand-secondary rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-brand-text-dark"></textarea> {/* */}
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-brand-text-light bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"> {/* */}
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}