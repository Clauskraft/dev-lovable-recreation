import AIChat from "@/components/AIChat";

const HeroSection = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Main Heading */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
          TDC Erhverv AI
        </h1>
      </div>
      
      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl">
        Suveræn AI-kraft. Med fuld kontrol og indbygget compliance.
      </p>
      
      {/* AI Chat Interface */}
      <AIChat conversationId={null} />
    </section>
  );
};

export default HeroSection;
