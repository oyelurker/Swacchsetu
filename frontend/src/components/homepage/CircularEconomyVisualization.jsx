import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Users, ShoppingCart, Package } from 'lucide-react';

const CircularEconomyVisualization = () => {
  const nodes = [
    { id: 1, icon: Leaf, label: "Waste", color: "bg-green-500", position: { x: 50, y: 20 } },
    { id: 2, icon: Recycle, label: "Composting", color: "bg-blue-500", position: { x: 80, y: 50 } },
    { id: 3, icon: Package, label: "Compost", color: "bg-amber-500", position: { x: 50, y: 80 } },
    { id: 4, icon: ShoppingCart, label: "Marketplace", color: "bg-purple-500", position: { x: 20, y: 50 } },
    { id: 5, icon: Users, label: "Community", color: "bg-emerald-500", position: { x: 50, y: 50 } },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 0 },
  ];

  return (
    <div className="relative w-full h-64">
      {/* Animated connections */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((conn, index) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          return (
            <motion.line
              key={index}
              x1={`${fromNode.position.x}%`}
              y1={`${fromNode.position.y}%`}
              x2={`${toNode.position.x}%`}
              y2={`${toNode.position.y}%`}
              stroke="url(#gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 2, 
                delay: index * 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          );
        })}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D1A7" />
            <stop offset="100%" stopColor="#0077FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Animated nodes */}
      {nodes.map((node, index) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${node.color} rounded-full p-3 shadow-lg`}
            style={{
              left: `${node.position.x}%`,
              top: `${node.position.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              delay: index * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.3 }}
          >
            <Icon size={24} className="text-white" />
          </motion.div>
        );
      })}

      {/* Central pulsing element */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 360]
        }}
        transition={{ 
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 10, repeat: Infinity, ease: "linear" }
        }}
      >
        <div className="text-white font-bold text-xs">Cycle</div>
      </motion.div>
    </div>
  );
};

export default CircularEconomyVisualization;