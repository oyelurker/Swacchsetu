import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Gradient Text Component
export const GradientText = ({ children, className = "" }) => {
  return (
    <span className={`bg-gradient-to-r from-primary-forest to-primary-leaf bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

// Animated Counter Component
export const AnimatedCounter = ({ end, duration = 3 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-forest to-primary-leaf bg-clip-text text-transparent"
    >
      {count}+
    </motion.div>
  );
};

// Animated Card Component
export const AnimatedCard = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={`card ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Floating Particles Component
export const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 12 + 4,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    color: ['bg-primary/20', 'bg-secondary/20', 'bg-accent/20'][Math.floor(Math.random() * 3)]
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${particle.color}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 40 - 20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Stats Card Component
export const StatsCard = ({ stat, index }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="bg-gradient-to-br from-card to-white border border-border rounded-2xl p-6 shadow-lg h-full"
    >
      <div className={`${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
        <Icon size={32} className="text-white" />
      </div>
      <div className="text-center">
        <AnimatedCounter end={parseFloat(stat.value)} />
        <p className="text-muted mt-2">{stat.label}</p>
      </div>
    </motion.div>
  );
};

// Feature Card Component
export const FeatureCard = ({ icon: Icon, title, description, color, index }) => {
  return (
    <AnimatedCard delay={index * 0.1}>
      <div className="p-6">
        <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
          <Icon size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-dark mb-3 text-center">{title}</h3>
        <p className="text-muted text-center">{description}</p>
      </div>
    </AnimatedCard>
  );
};

// Testimonial Card Component
export const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="card p-8"
    >
      <Quote size={48} className="text-primary mb-6 opacity-20" />
      <p className="text-muted mb-8 italic text-lg">"{testimonial.content}"</p>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-forest to-primary-leaf flex items-center justify-center text-white font-bold text-xl">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="font-bold text-dark text-lg">{testimonial.name}</h4>
          <p className="text-muted">{testimonial.role}</p>
          <div className="flex mt-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};