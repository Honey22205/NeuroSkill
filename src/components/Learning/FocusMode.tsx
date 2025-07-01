import React, { useState, useEffect } from 'react';
import { Timer, Coffee, CheckCircle, Brain, Target, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FocusModeProps {
  content: string;
  onComplete: () => void;
}

export const FocusMode: React.FC<FocusModeProps> = ({ content, onComplete }) => {
  const [currentChunk, setCurrentChunk] = useState(0);
  const [showBreakTimer, setShowBreakTimer] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(300); // 5 minutes
  const [focusTime, setFocusTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Split content into manageable chunks (approximately 100-150 words each)
  const words = content.split(' ');
  const chunkSize = 120;
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }

  const progress = ((currentChunk + 1) / chunks.length) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !showBreakTimer) {
      interval = setInterval(() => {
        setFocusTime(focusTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, focusTime, showBreakTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showBreakTimer && breakTimeLeft > 0) {
      interval = setInterval(() => {
        setBreakTimeLeft(breakTimeLeft - 1);
      }, 1000);
    } else if (breakTimeLeft === 0) {
      setShowBreakTimer(false);
      setBreakTimeLeft(300);
    }
    return () => clearInterval(interval);
  }, [showBreakTimer, breakTimeLeft]);

  const handleNext = () => {
    if (currentChunk < chunks.length - 1) {
      setCurrentChunk(currentChunk + 1);
      
      // Suggest break every 3 chunks (approximately 15-20 minutes)
      if ((currentChunk + 1) % 3 === 0) {
        setShowBreakTimer(true);
        setIsActive(false);
      }
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentChunk > 0) {
      setCurrentChunk(currentChunk - 1);
    }
  };

  const startSession = () => {
    setIsActive(true);
    setFocusTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AnimatePresence mode="wait">
        {showBreakTimer ? (
          <motion.div
            key="break"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-20"
          >
            <div className="bg-gradient-to-br from-success-100 to-success-200 rounded-3xl p-12 shadow-xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Coffee className="h-10 w-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-success-800 mb-4">
                Great Work! Time for a Break
              </h2>
              
              <p className="text-lg text-success-700 mb-8">
                You've been focusing well. Take a 5-minute break to recharge.
              </p>
              
              <div className="text-6xl font-bold text-success-600 mb-8">
                {formatTime(breakTimeLeft)}
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowBreakTimer(false)}
                  className="px-6 py-3 bg-success-600 text-white rounded-xl hover:bg-success-700 transition-colors"
                >
                  Skip Break
                </button>
                <button
                  onClick={() => setBreakTimeLeft(0)}
                  className="px-6 py-3 bg-white text-success-600 border-2 border-success-600 rounded-xl hover:bg-success-50 transition-colors"
                >
                  I'm Ready
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="focus"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Focus Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-6 mb-8 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Target className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold mb-1">Focus Mode</h1>
                    <p className="text-primary-100">
                      Chunk {currentChunk + 1} of {chunks.length}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-primary-100 mb-2">
                    <Timer className="h-5 w-5" />
                    <span>{formatTime(focusTime)}</span>
                  </div>
                  {!isActive && (
                    <button
                      onClick={startSession}
                      className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                    >
                      Start Focus
                    </button>
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-primary-100 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <motion.div
                    className="bg-white h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Content Chunk */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <motion.div
                key={currentChunk}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="prose prose-lg max-w-none leading-relaxed"
              >
                <p className="text-calm-800 text-lg leading-relaxed">
                  {chunks[currentChunk]}
                </p>
              </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentChunk === 0}
                className="flex items-center space-x-2 px-6 py-3 bg-calm-100 text-calm-700 rounded-xl hover:bg-calm-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                <div className="text-center text-sm text-calm-600">
                  <Brain className="h-5 w-5 mx-auto mb-1" />
                  <p>Stay focused!</p>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
              >
                <span>{currentChunk === chunks.length - 1 ? 'Complete' : 'Next'}</span>
                <CheckCircle className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};