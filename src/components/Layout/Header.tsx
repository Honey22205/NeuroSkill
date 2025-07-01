import React from 'react';
import { Brain, Settings, User, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: Brain },
    { id: 'progress', label: 'Progress', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <motion.header 
      className="bg-white shadow-lg border-b-2 border-primary-100"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                NeuroSkill
              </h1>
              <p className="text-xs text-calm-600 font-medium">Adaptive Learning</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-md'
                      : 'text-calm-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5" />
                    <span className="hidden sm:block">{item.label}</span>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-8 h-0.5 bg-primary-500 rounded-full"
                      layoutId="activeTab"
                      initial={false}
                      style={{ x: '-50%' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};