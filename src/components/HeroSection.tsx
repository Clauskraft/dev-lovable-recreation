import AIChat from "@/components/AIChat";

const HeroSection = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(210,100%,60%)]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Main Heading */}
      <div className="flex items-center gap-3 mb-6 animate-fade-in relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
          TDC Erhverv AI
        </h1>
      </div>
      
      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl animate-slide-up relative z-10 drop-shadow-lg">
        Suveræn AI-kraft. Med fuld kontrol og indbygget compliance.
      </p>
      
      {/* AI Chat Interface */}
      <div className="animate-scale-in relative z-10 w-full">
        <AIChat />
      </div>
    </section>
  );
};

export default HeroSection;