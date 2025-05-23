// src/pages/PreAlgebraPage.jsx 
export default function PreAlgebraPage() { // Renamed component
  const topics = [
    // Update with Pre-Algebra specific topics
    { id: 1, title: "Basic Operations", path: "/pre-algebra/operations" },
    { id: 2, title: "Fractions and Decimals", path: "/pre-algebra/fractions-decimals" },
    { id: 3, title: "Ratios and Proportions", path: "/pre-algebra/ratios" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-6 text-center text-brand-primary-dark">Pre-Algebra</h1> {/* */}
      <p className="text-lg text-center text-brand-text-muted mb-8"> {/* */}
        Explore various concepts in Pre-Algebra. Click on a topic to learn more.
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