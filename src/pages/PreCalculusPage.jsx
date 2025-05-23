import React from 'react';

const PreCalculusPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-brand-primary-dark">Pre-Calculus</h1> {/* */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="content-card hover:shadow-xl transition-shadow"> {/* */}
          <h2 className="text-xl font-semibold text-brand-primary-dark mb-4">Functions and Graphs</h2> {/* */}
          <p className="text-brand-text-muted"> {/* */}
            Explore various types of functions and their graphical representations.
          </p>
        </div>
        <div className="content-card hover:shadow-xl transition-shadow"> {/* */}
          <h2 className="text-xl font-semibold text-brand-primary-dark mb-4">Trigonometry</h2> {/* */}
          <p className="text-brand-text-muted"> {/* */}
            Learn about trigonometric functions, identities, and their applications.
          </p>
        </div>
        <div className="content-card hover:shadow-xl transition-shadow"> {/* */}
          <h2 className="text-xl font-semibold text-brand-primary-dark mb-4">Analytic Geometry</h2> {/* */}
          <p className="text-brand-text-muted"> {/* */}
            Study conic sections and their properties in the coordinate plane.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreCalculusPage;