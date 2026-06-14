import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <p className="text-7xl font-bold text-primary-600">404</p>
        <h1 className="mt-4 text-2xl font-bold text-dark-900">Page Not Found</h1>
        <p className="mt-3 text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-6 py-3 text-white font-medium hover:bg-primary-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
