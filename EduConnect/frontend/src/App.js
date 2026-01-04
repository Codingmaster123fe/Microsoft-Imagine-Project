import React, { useState } from 'react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">EduConnect</h1>
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#features" className="text-gray-700 hover:text-purple-600 transition">Features</a>
            <a href="#about" className="text-gray-700 hover:text-purple-600 transition">About</a>
            <a href="#contact" className="text-gray-700 hover:text-purple-600 transition">Contact</a>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-medium">Get Started</button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t">
            <a href="#features" className="block px-4 py-2 text-gray-700">Features</a>
            <a href="#about" className="block px-4 py-2 text-gray-700">About</a>
            <a href="#contact" className="block px-4 py-2 text-gray-700">Contact</a>
            <button className="w-full text-left px-4 py-2 bg-purple-600 text-white font-medium">Get Started</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-24">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">Learn Without Limits</h2>
        <p className="text-xl md:text-2xl mb-4 font-light">AI-powered education for everyone, everywhere</p>
        <p className="text-base md:text-lg mb-10 text-gray-100">Get 24/7 AI tutoring • Connect with global mentors • Access thousands of resources • Track your progress</p>
        <button 
          onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105">
          Get Started Free
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-800">Why Choose EduConnect?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🤖', title: 'AI Tutor', desc: '24/7 personalized learning assistance' },
              { icon: '👥', title: 'Mentor Matching', desc: 'Connect with experienced mentors' },
              { icon: '📚', title: 'Resources', desc: 'Curated educational content' },
              { icon: '📊', title: 'Analytics', desc: 'Track your learning progress' },
              { icon: '💬', title: 'Community', desc: 'Learn from peers worldwide' },
              { icon: '⚡', title: 'Adaptive Learning', desc: 'AI-powered personalized paths' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg shadow-md hover:shadow-xl transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold">1000+</div>
            <div>Students Helped</div>
          </div>
          <div>
            <div className="text-4xl font-bold">500+</div>
            <div>Mentors Worldwide</div>
          </div>
          <div>
            <div className="text-4xl font-bold">50+</div>
            <div>Learning Subjects</div>
          </div>
          <div>
            <div className="text-4xl font-bold">99%</div>
            <div>Success Rate</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>Built with ❤️ for the Microsoft Imagine Cup 2024</p>
        <p className="text-gray-400 mt-2">© 2024 EduConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
