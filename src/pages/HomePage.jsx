import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <header className="bg-gradient-to-br from-brand-primary to-brand-secondary text-brand-text-light p-10 md:p-20 rounded-lg shadow-xl my-8"> {/* */}
        <h1 className="text-5xl font-bold mb-4">Welcome to Math Helper!</h1>
        <p className="text-xl opacity-90 mb-6">Your friendly guide for Pre-Algebra, Algebra, Pre-Calculus, and Calculus.</p>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
            <Link
              to="/algebra"
              className="bg-brand-surface hover:bg-opacity-80 text-brand-primary-dark font-bold py-3 px-6 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg" //
            >
              Explore Algebra
            </Link>
            <Link
              to="/calculus"
              className="bg-brand-surface hover:bg-opacity-80 text-brand-primary-dark font-bold py-3 px-6 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg" //
            >
              Dive into Calculus
            </Link>
        </div>
      </header>
      
      <section className="my-12">
        <h2 className="text-3xl font-semibold mb-6 text-brand-primary-dark">What We Offer</h2> {/* */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="content-card"> {/* */}
            <h3 className="text-xl font-semibold text-brand-primary-dark mb-2">Pre-Algebra</h3> {/* */}
            <p className="text-brand-text-muted">Master the fundamentals.</p> {/* */}
          </div>
          <div className="content-card"> {/* */}
            <h3 className="text-xl font-semibold text-brand-primary-dark mb-2">Algebra</h3> {/* */}
            <p className="text-brand-text-muted">Solve equations with confidence.</p> {/* */}
          </div>
          <div className="content-card"> {/* */}
            <h3 className="text-xl font-semibold text-brand-primary-dark mb-2">Pre-Calculus</h3> {/* */}
            <p className="text-brand-text-muted">Prepare for advanced math.</p> {/* */}
          </div>
          <div className="content-card"> {/* */}
            <h3 className="text-xl font-semibold text-brand-primary-dark mb-2">Calculus</h3> {/* */}
            <p className="text-brand-text-muted">Understand derivatives and integrals.</p> {/* */}
          </div>
        </div>
      </section>
    </div>
  );
}