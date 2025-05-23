// src/pages/AlgebraPage.jsx
export default function AlgebraPage() {
  const topics = [
    { id: 1, title: "Solving Linear Equations", path: "/algebra/linear-equations", desc: "Learn to solve equations with one or more variables." },
    { id: 2, title: "Understanding Polynomials", path: "/algebra/polynomials", desc: "Explore polynomials and their properties." },
    { id: 3, title: "Working with Inequalities", path: "/algebra/inequalities", desc: "Master solving and graphing inequalities." },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-brand-primary-dark text-center animate-fade-in">
        Algebra
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic, i) => (
          <div key={topic.id} className="content-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-brand-primary animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">{topic.title}</h2>
            <p className="text-brand-text-muted leading-relaxed">{topic.desc}</p>
            <a href={topic.path} className="mt-4 inline-block px-4 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark transition-colors duration-300">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}