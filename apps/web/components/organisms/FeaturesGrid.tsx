import React from 'react';
import { SectionBadge } from '../atoms/SectionBadge';
import { LinkCard } from '../ui/link-card';

const cardData = [
  {
    title: 'Interactive Learning',
    description: 'Level up your knowledge with our AI tutor, tracking EXP for every module completed.',
    imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Books.png', 
    href: '/dashboard/learning',
  },
  {
    title: 'Money Management',
    description: 'Set financial goals, track spending, and earn rewards for staying within your budget.',
    imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Money%20with%20Wings.png', 
    href: '/dashboard/finance',
  },
  {
    title: 'Pomodoro & Habits',
    description: 'Keep your streak alive. Sync your focus sessions across all devices in real-time.',
    imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Hourglass%20Done.png', 
    href: '/dashboard/productivity',
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <SectionBadge className="mb-4">Platform Pillars</SectionBadge>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">Master Your Life</h2>
        <p className="text-muted-foreground max-w-2xl text-lg md:text-xl text-gray-400">One unified platform for your learning, habits, and finances.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cardData.map((card) => (
          <LinkCard
            key={card.title}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            href={card.href}
          />
        ))}
      </div>
    </section>
  );
}
