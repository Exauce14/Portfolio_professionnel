import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-950">
      <div className="text-center">
        <div className="text-8xl font-bold text-indigo-500 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Page non trouvée</h1>
        <p className="text-gray-400 mb-8">La page que vous cherchez n&apos;existe pas.</p>
        <Link
          href="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
