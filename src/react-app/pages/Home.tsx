import Header from '@/react-app/components/Header';
import Hero from '@/react-app/components/Hero';
import About from '@/react-app/components/About';
import Services from '@/react-app/components/Services';
import Team from '@/react-app/components/Team';
import Reviews from '@/react-app/components/Reviews';
import Blog from '@/react-app/components/Blog';
import Contact from '@/react-app/components/Contact';
import Footer from '@/react-app/components/Footer';
import WhatsAppFloat from '@/react-app/components/WhatsAppFloat';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Team />
      <Reviews />
      <Blog />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
