import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-8 text-brand-primary-dark">
        Page Not Found
      </h1>
      <p className="text-brand-text-dark mb-8">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark transition-colors duration-300"
      >
        Go Home
      </Link>
    </div>
  );
}
