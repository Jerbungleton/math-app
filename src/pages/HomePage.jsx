import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-brand-primary-dark text-center animate-fade-in">
        Welcome to Math Helper!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="content-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-brand-primary animate-slide-up">
          <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Pre-Algebra</h2>
          <p className="text-brand-text-muted leading-relaxed">
            Master the fundamentals.
          </p>
          <Link to="/pre-algebra" className="mt-4 inline-block px-4 py-2 bg-brand-primary text-brand-text-light rounded-lg transition-colors duration-300">
            Explore
          </Link>
        </div>
        <div className="content-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-brand-primary animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Algebra</h2>
          <p className="text-brand-text-muted leading-relaxed">
            Solve equations with confidence.
          </p>
          <Link to="/algebra" className="mt-4 inline-block px-4 py-2 bg-brand-primary text-brand-text-light rounded-lg transition-colors duration-300">
            Explore
          </Link>
        </div>
        <div className="content-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-brand-primary animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Pre-Calculus</h2>
          <p className="text-brand-text-muted leading-relaxed">
            Prepare for advanced math.
          </p>
          <Link to="/pre-calculus" className="mt-4 inline-block px-4 py-2 bg-brand-primary text-brand-text-light rounded-lg transition-colors duration-300">
            Explore
          </Link>
        </div>
        <div className="content-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-brand-primary animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Calculus</h2>
          <p className="text-brand-text-muted leading-relaxed">
            Understand derivatives and integrals.
          </p>
          <Link to="/calculus" className="mt-4 inline-block px-4 py-2 bg-brand-primary text-brand-text-light rounded-lg transition-colors duration-300">
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}