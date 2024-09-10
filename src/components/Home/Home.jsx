import { React, useEffect } from 'react'
import './home.css'


const Home = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between p-4 bg-[#155887]">
                <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-[#5DFED3]">L(Earn)</span>
                </div>
                <nav className="hidden md:flex space-x-4">
                    {["Modules", "Videos", "Certified", "Junior", "Blog", "Live"].map((item) => (
                        <a key={item} className="text-white hover:text-[#5DFED3]" href="#">
                            {item}
                        </a>
                    ))}
                </nav>
            </header>
            <div></div>
            <main className="flex-grow">
                <section className="container mx-auto px-4 py-16 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">Free and open</h1>
                            <p className="text-xl md:text-2xl mb-6">stock market and financial education</p>
                            <p className="mb-8">
                                L(Earn) is an extensive and in-depth collection of stock market and financial lessons. It is free and openly
                                accessible to everyone and is one of the largest financial education resources on the web. No signup, no pay-wall,
                                no ads.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-[400px] h-[300px] bg-gray-300 flex items-center justify-center text-gray-600">
                                Illustration Placeholder
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-gray-100 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8">Explore L(Earn)</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {["Modules", "Live", "Videos", "Certified", "Junior"].map((item) => (
                                <div key={item} className="bg-white p-4 rounded shadow">
                                    <div className="w-12 h-12 bg-[#155887] rounded mb-4"></div>
                                    <h3 className="font-semibold">{item}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="container mx-auto px-4 py-16">
                    <div className="bg-gray-100 p-8 rounded-lg flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">L(Earn) on mobile</h2>
                            <p>Explore stock market lessons in bite size modules, quizzes, and tests.</p>
                        </div>
                        <div className="flex mt-4 md:mt-0">
                            <button className="mr-4 bg-black text-white px-4 py-2 rounded flex items-center">
                                <div className="w-6 h-6 bg-white mr-2"></div>
                                Google Play
                            </button>
                            <button className="bg-black text-white px-4 py-2 rounded flex items-center">
                                <div className="w-6 h-6 bg-white mr-2"></div>
                                App Store
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-[#155887] text-white py-8">
                <div className="container mx-auto px-4">
                    <p>&copy; 2024 L(Earn). All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Home
