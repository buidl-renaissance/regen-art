export const metadata = {
  title: 'Renaissance City Community Fund',
  description:
    "Join our community-powered investment model strengthening Detroit's future, one bond at a time.",
};

import CallToAction from '../components/CallToAction';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import Image from 'next/image';
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
