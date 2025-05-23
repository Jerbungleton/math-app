import React from 'react';

const CalculusPage = () => {
  return (
    // Removed the gradient background to align with the global bg-brand-background
    // <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-brand-primary-dark text-center animate-fade-in"> {/* */}
        Calculus
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="content-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-brand-primary animate-slide-up"> {/* */}
          <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Limits and Continuity</h2> {/* */}
          <p className="text-brand-text-muted leading-relaxed"> {/* */}
            Master the fundamental concepts of limits and continuous functions.
          </p>
          <button className="mt-4 px-4 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark transition-colors duration-300"> {/* */}
            Learn More
          </button>
        </div>

        <div className="content-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-brand-primary animate-slide-up" style={{ animationDelay: '100ms' }}> {/* */}
          <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Derivatives</h2> {/* */}
          <p className="text-brand-text-muted leading-relaxed"> {/* */}
            Learn about differentiation, its rules, and applications in real-world problems.
          </p>
          <button className="mt-4 px-4 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark transition-colors duration-300"> {/* */}
            Learn More
          </button>
        </div>

        <div className="content-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-brand-primary animate-slide-up" style={{ animationDelay: '200ms' }}> {/* */}
          <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Integrals</h2> {/* */}
          <p className="text-brand-text-muted leading-relaxed"> {/* */}
            Explore integration techniques and their applications in calculating areas and volumes.
          </p>
          <button className="mt-4 px-4 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark transition-colors duration-300"> {/* */}
            Learn More
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default CalculusPage;