import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <header className="bg-brand-primary text-white p-10 rounded-lg shadow-xl my-8"> {/* Use new colors */}
        <h1 className="text-5xl font-bold mb-4">Welcome to Math Helper!</h1>
        <p className="text-xl text-gray-100 mb-6">Your friendly guide for Pre-Algebra, Algebra, Pre-Calculus, and Calculus.</p>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
            <Link
              to="/algebra" // Example link
              className="bg-brand-secondary hover:bg-opacity-80 text-brand-dark font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
            >
              Explore Algebra
            </Link>
            <Link
              to="/calculus" // Example link
              className="bg-brand-secondary hover:bg-opacity-80 text-brand-dark font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
            >
              Dive into Calculus
            </Link>
        </div>
      </header>
      
      <section className="my-12">
        <h2 className="text-3xl font-semibold mb-6 text-brand-dark">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Example Topic Cards - You can make this a component */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-brand-primary mb-2">Pre-Algebra</h3>
            <p className="text-gray-700">Master the fundamentals.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-brand-primary mb-2">Algebra</h3>
            <p className="text-gray-700">Solve equations with confidence.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-brand-primary mb-2">Pre-Calculus</h3>
            <p className="text-gray-700">Prepare for advanced math.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-brand-primary mb-2">Calculus</h3>
            <p className="text-gray-700">Understand derivatives and integrals.</p>
          </div>
        </div>
      </section>
    </div>
  );
}