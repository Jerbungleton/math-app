import React from 'react';

const CalculusPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-orange-800 text-center animate-fade-in">
          Calculus
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-orange-500 animate-slide-up">
            <h2 className="text-2xl font-semibold mb-4 text-orange-700">Limits and Continuity</h2>
            <p className="text-gray-700 leading-relaxed">
              Master the fundamental concepts of limits and continuous functions.
            </p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300">
              Learn More
            </button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-orange-500 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl font-semibold mb-4 text-orange-700">Derivatives</h2>
            <p className="text-gray-700 leading-relaxed">
              Learn about differentiation, its rules, and applications in real-world problems.
            </p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300">
              Learn More
            </button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-orange-500 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-semibold mb-4 text-orange-700">Integrals</h2>
            <p className="text-gray-700 leading-relaxed">
              Explore integration techniques and their applications in calculating areas and volumes.
            </p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculusPage; 