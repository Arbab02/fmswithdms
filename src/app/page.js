export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center md:px-4 pl-16 pr-2 text-center bg-gray-50">
      <div className="space-y-2">
        <h1 className="text-indigo-700 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Welcome To Our
        </h1>
        <h1 className="text-indigo-700 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Finance
        </h1>
        <h1 className="text-indigo-700 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Management
        </h1>
        <h1 className="text-indigo-700 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          System!
        </h1>
      </div>
      <p className="text-indigo-600 mt-6 text-lg sm:text-xl md:text-2xl font-light max-w-2xl">
        A modern solution for your finance management!
      </p>
      <p className="text-indigo-600 mt-4 text-base sm:text-lg md:text-xl font-light">
        TechStack: Next.js, TailwindCSS, Framer Motion, Recharts, MongoDB.
      </p>
    </div>
  );
}