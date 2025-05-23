// src/pages/AlgebraPage.jsx
export default function AlgebraPage() {
  const topics = [
    { id: 1, title: "Solving Linear Equations", path: "/algebra/linear-equations" },
    { id: 2, title: "Understanding Polynomials", path: "/algebra/polynomials" },
    { id: 3, title: "Working with Inequalities", path: "/algebra/inequalities" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-6 text-center text-brand-primary-dark">Algebra</h1> {/* */}
      <p className="text-lg text-center text-brand-text-muted mb-8"> {/* */}
        Explore various concepts in Algebra. Click on a topic to learn more.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map(topic => (
          <div key={topic.id} className="content-card hover:shadow-xl transition-shadow"> {/* */}
            <h2 className="text-2xl font-semibold text-brand-primary-dark mb-3">{topic.title}</h2> {/* */}
            <a href={topic.path} className="text-brand-primary hover:underline"> {/* */}
              Learn more &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}