import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CommunitySection from "@/components/CommunitySection";

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <Navigation />
      <HeroSection />
      <CommunitySection />
    </div>
  );
};

export default Index;
