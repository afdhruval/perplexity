import React, { useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (!username || !email || !password) {
                setError('Please fill in all fields')
                return
            }

            if (password.length < 6) {
                setError('Password must be at least 6 characters')
                return
            }

            // API call will be done here
            console.log('Register attempt:', { username, email, password })

            // Clear form on success
            setUsername('')
            setEmail('')
            setPassword('')
        } catch (err) {
            setError(err.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-2xl border border-gray-800">
                <div className="h-full flex flex-col">
                    <div className="h-24 flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-white">Register</h2>
                    </div>

                    <div className="flex-1 flex flex-col w-full">
                        {error && (
                            <div className="h-16 bg-red-900/20 border border-red-700/50 text-red-300 rounded-lg flex items-center justify-center w-4/5 mx-auto">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col w-4/5 mx-auto">
                            <div className="h-28 flex flex-col justify-center">
                                <label htmlFor="username" className="block text-gray-300 font-medium h-6">
                                    Username
                                </label>
                                <div className="h-2"></div>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="h-12 w-full bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 px-4 text-center placeholder-gray-500 transition duration-200"
                                />
                            </div>

                            <div className="h-2"></div>

                            <div className="h-28 flex flex-col justify-center">
                                <label htmlFor="email" className="block text-gray-300 font-medium h-6">
                                    Email
                                </label>
                                <div className="h-2"></div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="h-12 w-full bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 px-4 text-center placeholder-gray-500 transition duration-200"
                                />
                            </div>

                            <div className="h-2"></div>

                            <div className="h-28 flex flex-col justify-center">
                                <label htmlFor="password" className="block text-gray-300 font-medium h-6">
                                    Password
                                </label>
                                <div className="h-2"></div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="h-12 w-full bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 px-4 text-center placeholder-gray-500 transition duration-200"
                                />
                            </div>

                            <div className="h-6"></div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="h-12 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-lg transition duration-200 shadow-lg hover:shadow-blue-600/50"
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                        </form>

                        <div className="h-4"></div>

                        <div className="h-12 flex items-center justify-center">
                            <p className="text-gray-400">
                                Already have an account?{' '}
                                <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition duration-200">
                                    Login here
                                </a>
                            </p>
                        </div>

                        <div className="h-6"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register