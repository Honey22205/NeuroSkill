import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Layout/Header';
import { Hero } from './components/Home/Hero';
import { ContentViewer } from './components/Learning/ContentViewer';
import { FocusMode } from './components/Learning/FocusMode';
import { Dashboard } from './components/Progress/Dashboard';
import { AccessibilitySettings } from './components/Settings/AccessibilitySettings';
import { useAccessibility } from './hooks/useAccessibility';

// Sample learning content
const sampleContent = {
  title: "Introduction to Photosynthesis",
  subject: "Science",
  difficulty: "Middle School",
  text: `Photosynthesis is one of the most important processes on Earth. It is the way plants make their own food using sunlight, water, and carbon dioxide from the air. This amazing process not only feeds the plants but also produces oxygen that all living things need to breathe. During photosynthesis, plants capture energy from sunlight using special parts called chloroplasts. These tiny structures contain a green substance called chlorophyll, which gives plants their green color. The chlorophyll absorbs light energy and uses it to combine water from the roots with carbon dioxide from the air. This combination creates glucose, which is a type of sugar that plants use for energy. At the same time, oxygen is released as a byproduct through tiny pores in the leaves called stomata. Without photosynthesis, there would be no life on Earth as we know it. Plants are the foundation of almost all food chains, and the oxygen they produce keeps our atmosphere breathable. Understanding photosynthesis helps us appreciate how interconnected all life on our planet really is.`
};

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isInFocusMode, setIsInFocusMode] = useState(false);
  const { preferences } = useAccessibility();

  const handleGetStarted = () => {
    setCurrentView('learn');
  };

  const handleFocusModeComplete = () => {
    setIsInFocusMode(false);
    setCurrentView('progress');
  };

  const renderCurrentView = () => {
    if (isInFocusMode) {
      return (
        <FocusMode
          content={sampleContent.text}
          onComplete={handleFocusModeComplete}
        />
      );
    }

    switch (currentView) {
      case 'home':
        return <Hero onGetStarted={handleGetStarted} />;
      case 'learn':
        return preferences.focusMode ? (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-calm-900 mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-lg text-calm-600 mb-8">
                You have Focus Mode enabled. Choose how you'd like to learn today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsInFocusMode(true)}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
                >
                  Start Focus Mode
                </button>
                <button
                  onClick={() => {}}
                  className="px-6 py-3 bg-calm-100 text-calm-700 rounded-xl hover:bg-calm-200 transition-colors font-medium"
                >
                  Regular Reading
                </button>
              </div>
            </div>
          </div>
        ) : (
          <ContentViewer content={sampleContent} />
        );
      case 'progress':
        return <Dashboard />;
      case 'settings':
        return <AccessibilitySettings />;
      default:
        return <Hero onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-calm-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (isInFocusMode ? '-focus' : '')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[calc(100vh-4rem)]"
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;