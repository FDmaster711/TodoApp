import { Link } from 'react-router-dom';
import { useRegister } from '../../hooks/useRegister';

export function RegisterPage() {
  const { formData, handleSubmit, handleChange, error, loading } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-slate-100">
        
        {/* Header */}
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900">
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Sign up to get started
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            
            {/* USERNAME INPUT */}
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username" 
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200"
                placeholder="New User"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* REGISTER BUTTON */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white transition duration-150 ease-in-out shadow-md
                ${loading 
                  ? "bg-indigo-400 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
                }`}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>

          {/* LOGIN LINK */}
          <div className="text-center mt-4">
            <p className="text-sm text-slate-600">
              You already have an account?{" "}
              <Link 
                to="/login" 
                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-all"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}