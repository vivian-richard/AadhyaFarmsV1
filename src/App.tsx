import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import FarmStay from './components/FarmStay';
import About from './components/About';
import Contact from './components/Contact';
import Blogs from './components/Blogs';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <Products />;
      case 'farmstay':
        return <FarmStay />;
      case 'about':
        return <About />;
      case 'blogs':
        return <Blogs />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE0]">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
