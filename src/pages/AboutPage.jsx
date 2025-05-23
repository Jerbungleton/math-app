import mathAnimation from '../assets/animations/math-animation.gif';

export default function AboutPage() {
  return (
    <div className="w-full max-w-[1920px] mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-brand-primary-dark">learn math son</h1>
      <div className="content-card text-brand-text-dark">
        <div className="flex justify-center mb-8">
          <img 
            src={mathAnimation} 
            alt="Math Animation" 
            className="rounded-lg shadow-lg w-[600px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}