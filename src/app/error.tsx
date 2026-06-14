"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-gray-50">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <p className="text-7xl font-bold text-red-500">500</p>
            <h1 className="mt-4 text-2xl font-bold text-dark-900">Server Error</h1>
            <p className="mt-3 text-gray-500">
              Something went wrong on our end. Please try again.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-6 py-3 text-white font-medium hover:bg-primary-800 transition-colors"
              >
                Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
