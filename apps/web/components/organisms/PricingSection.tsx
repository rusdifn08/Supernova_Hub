"use client";
import React from 'react';
import { ModernPricingPage, PricingCardProps } from '../ui/animated-glassy-pricing';

const myPricingPlans: PricingCardProps[] = [
  { 
    planName: 'Novice', 
    description: 'Perfect for basic habit tracking and learning.', 
    price: '0', 
    features: ['Basic Habit Tracking', 'Community Access', '10 Pomodoro Sessions/day'], 
    buttonText: 'Start Free', 
    buttonVariant: 'secondary'
  },
  { 
    planName: 'Pro Scholar', 
    description: 'Unlock your full potential with AI features.', 
    price: '12', 
    features: ['Full AI Tutor Access', 'Advanced Finance Tracking', 'Unlimited Pomodoros', 'Detailed Analytics'], 
    buttonText: 'Subscribe Now', 
    isPopular: true, 
    buttonVariant: 'primary' 
  },
  { 
    planName: 'Lifetime Guild', 
    description: 'A one-time investment for lifelong learners.', 
    price: '299', 
    features: ['Everything in Pro', 'Exclusive Cosmetics', 'VIP Community Role'], 
    buttonText: 'Join the Guild', 
    buttonVariant: 'secondary' 
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="px-4 md:px-8 max-w-7xl mx-auto my-20">
      <ModernPricingPage
        title={
          <>
            Invest in <span className="text-cyan-400">Yourself</span>
          </>
        }
        subtitle="Choose the perfect plan to accelerate your growth and master your life."
        plans={myPricingPlans}
        showAnimatedBackground={true}
      />
    </section>
  );
}
