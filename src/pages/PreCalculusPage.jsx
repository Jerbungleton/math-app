import React from 'react';

const PreCalculusPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pre-Calculus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Content sections will be added here */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Functions and Graphs</h2>
          <p className="text-gray-600">
            Explore various types of functions and their graphical representations.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Trigonometry</h2>
          <p className="text-gray-600">
            Learn about trigonometric functions, identities, and their applications.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Analytic Geometry</h2>
          <p className="text-gray-600">
            Study conic sections and their properties in the coordinate plane.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreCalculusPage; 