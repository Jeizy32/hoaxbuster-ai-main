import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsAnalyzer from "@/components/NewsAnalyzer";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <NewsAnalyzer />
      <AboutSection />
    </div>
  );
};

export default Index;
