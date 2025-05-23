import React from 'react';

const topics = [
  { title: "Functions and Graphs", desc: "Explore various types of functions and their graphical representations." },
  { title: "Trigonometry", desc: "Learn about trigonometric functions, identities, and their applications." },
  { title: "Analytic Geometry", desc: "Study conic sections and their properties in the coordinate plane." },
];

const PreCalculusPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-brand-primary-dark text-center animate-fade-in">
        Pre-Calculus
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic, i) => (
          <div key={topic.title} className="content-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-brand-primary animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">{topic.title}</h2>
            <p className="text-brand-text-muted leading-relaxed">{topic.desc}</p>
            <button className="mt-4 px-4 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark transition-colors duration-300">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreCalculusPage;