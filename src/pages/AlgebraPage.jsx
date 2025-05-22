// src/pages/AlgebraPage.jsx
// You can create similar pages for PreAlgebraPage, PreCalculusPage, CalculusPage

export default function AlgebraPage() {
  // Later, you might fetch algebra topics/lessons here
  const topics = [
    { id: 1, title: "Solving Linear Equations", path: "/algebra/linear-equations" },
    { id: 2, title: "Understanding Polynomials", path: "/algebra/polynomials" },
    { id: 3, title: "Working with Inequalities", path: "/algebra/inequalities" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-6 text-center text-brand-dark">Algebra</h1>
      <p className="text-lg text-center text-gray-700 mb-8">
        Explore various concepts in Algebra. Click on a topic to learn more.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map(topic => (
          <div key={topic.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-brand-primary mb-3">{topic.title}</h2>
            {/* You can add a brief description of the topic here */}
            <a href={topic.path} className="text-brand-secondary hover:underline">
              Learn more &rarr;
            </a>
          </div>
        ))}
      </div>
      {/* Here you could also add sections for:
          - Interactive solvers
          - Practice problems
          - Quizzes
      */}
    </div>
  );
}