import React, { useState } from 'react';
import { Play, Pause, Square, RotateCcw, Volume2, Settings, BookOpen, List, Share2, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { useAccessibility } from '../../hooks/useAccessibility';

interface ContentViewerProps {
  content: {
    title: string;
    text: string;
    subject: string;
    difficulty: string;
  };
}

export const ContentViewer: React.FC<ContentViewerProps> = ({ content }) => {
  const [viewMode, setViewMode] = useState<'text' | 'bullets' | 'mindmap'>('text');
  const [showControls, setShowControls] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const { preferences } = useAccessibility();
  
  const {
    isPlaying,
    isPaused,
    currentWordIndex,
    play,
    pause,
    stop,
    setRate,
    setPosition
  } = useTextToSpeech({
    text: content.text,
    rate: speechRate,
    highlightWords: true
  });

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    clearTranscript
  } = useVoiceInput();

  const words = content.text.split(' ');
  
  const generateBulletPoints = (text: string) => {
    const sentences = text.split('.').filter(s => s.trim().length > 0);
    return sentences.map(sentence => sentence.trim() + '.');
  };

  const generateMindMap = (text: string) => {
    const sentences = text.split('.').filter(s => s.trim().length > 0);
    return {
      main: content.title,
      branches: sentences.slice(0, 5).map((sentence, index) => ({
        id: index,
        text: sentence.trim(),
        level: 1
      }))
    };
  };

  const handleRateChange = (rate: number) => {
    setSpeechRate(rate);
    setRate(rate);
  };

  const renderTextWithHighlight = () => {
    return (
      <div className="prose prose-lg max-w-none leading-relaxed">
        {words.map((word, index) => (
          <span
            key={index}
            className={`${
              index === currentWordIndex && isPlaying
                ? 'bg-primary-200 text-primary-900 px-1 rounded'
                : ''
            } transition-all duration-200`}
          >
            {word}{' '}
          </span>
        ))}
      </div>
    );
  };

  const renderBulletPoints = () => {
    const bullets = generateBulletPoints(content.text);
    return (
      <div className="space-y-4">
        {bullets.map((bullet, index) => (
          <motion.div
            key={index}
            className="flex items-start space-x-3 p-3 rounded-lg bg-primary-50 border-l-4 border-primary-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-2 h-2 bg-primary-400 rounded-full mt-3 flex-shrink-0" />
            <p className="text-calm-800 leading-relaxed">{bullet}</p>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderMindMap = () => {
    const mindMap = generateMindMap(content.text);
    return (
      <div className="flex flex-col items-center space-y-8 p-8">
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-xl shadow-lg text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h3 className="text-lg font-semibold">{mindMap.main}</h3>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {mindMap.branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              className="bg-white p-4 rounded-lg shadow-md border-2 border-primary-200 hover:border-primary-400 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <p className="text-calm-800 text-sm leading-relaxed">{branch.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-calm-900 mb-2">{content.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-calm-600">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                {content.subject}
              </span>
              <span className="bg-success-100 text-success-700 px-3 py-1 rounded-full">
                {content.difficulty}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setShowControls(!showControls)}
            className="p-2 text-calm-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            aria-label="Toggle controls"
          >
            <Settings className="h-6 w-6" />
          </button>
        </div>

        {/* View Mode Tabs */}
        <div className="flex space-x-1 bg-calm-100 p-1 rounded-lg mb-4">
          {[
            { id: 'text', label: 'Text', icon: BookOpen },
            { id: 'bullets', label: 'Bullets', icon: List },
            { id: 'mindmap', label: 'Mind Map', icon: Share2 }
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                  viewMode === mode.id
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-calm-600 hover:text-calm-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Audio Controls */}
        <div className="flex items-center justify-between bg-calm-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <button
              onClick={isPlaying ? pause : play}
              className="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>
            
            <button
              onClick={stop}
              className="p-2 text-calm-600 hover:text-calm-800 hover:bg-calm-200 rounded-lg transition-colors"
              aria-label="Stop"
            >
              <Square className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setPosition(0)}
              className="p-2 text-calm-600 hover:text-calm-800 hover:bg-calm-200 rounded-lg transition-colors"
              aria-label="Restart"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-calm-600" />
              <span className="text-sm text-calm-600">Speed:</span>
              <select
                value={speechRate}
                onChange={(e) => handleRateChange(Number(e.target.value))}
                className="text-sm bg-white border border-calm-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>

            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-2 rounded-lg transition-colors ${
                isListening
                  ? 'bg-error-100 text-error-600 hover:bg-error-200'
                  : 'bg-success-100 text-success-600 hover:bg-success-200'
              }`}
              aria-label={isListening ? 'Stop listening' : 'Start voice input'}
            >
              <Mic className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Voice Input Display */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-success-50 border border-success-200 rounded-lg"
            >
              <p className="text-sm text-success-800">
                <strong>You said:</strong> "{transcript}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Display */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8"
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {viewMode === 'text' && renderTextWithHighlight()}
        {viewMode === 'bullets' && renderBulletPoints()}
        {viewMode === 'mindmap' && renderMindMap()}
      </motion.div>
    </div>
  );
};