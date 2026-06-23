import { LandingLayout } from "@/components/templates/LandingLayout";
import { HeroSection } from "@/components/organisms/HeroSection";
import { FeaturesGrid } from "@/components/organisms/FeaturesGrid";
import { StreakBoard } from "@/components/organisms/StreakBoard";
import { LeaderboardSection } from "@/components/organisms/LeaderboardSection";
import { PricingSection } from "@/components/organisms/PricingSection";

export default function Home() {
  return (
    <LandingLayout>
      <HeroSection 
        word1="Learn." 
        word2="Together." 
        description="The ultimate gamified interactive learning and productivity platform to supercharge your potential."
        primaryCta="Get Started"
        secondaryCta="View Source"
      />
      
      <FeaturesGrid />

      <section id="leaderboard" className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">Productivity & Gamification</h2>
          <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">Keep the streak alive and climb the global ranks.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center">
          <div className="w-full lg:w-1/3 flex">
            <StreakBoard streak={24} />
          </div>
          <div className="w-full lg:w-2/3 flex">
            <LeaderboardSection />
          </div>
        </div>
      </section>

      <PricingSection />
    </LandingLayout>
  );
}
