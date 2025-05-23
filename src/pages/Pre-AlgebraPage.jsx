// src/pages/PreAlgebraPage.jsx 
export default function PreAlgebraPage() {
  const topics = [
    { id: 1, title: "Basic Operations", path: "/pre-algebra/operations", desc: "Master addition, subtraction, multiplication, and division." },
    { id: 2, title: "Fractions and Decimals", path: "/pre-algebra/fractions-decimals", desc: "Work confidently with fractions and decimals." },
    { id: 3, title: "Ratios and Proportions", path: "/pre-algebra/ratios", desc: "Understand ratios and solve proportions." },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-brand-primary-dark text-center animate-fade-in">
        Pre-Algebra
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