import React from 'react';
import { Type, Eye, Volume2, Brain, Palette, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { UserPreferences } from '../../types';

export const AccessibilitySettings: React.FC = () => {
  const { preferences, updatePreferences, resetPreferences } = useAccessibility();

  const fontSizeOptions = [
    { value: 'small', label: 'Small', example: 'text-sm' },
    { value: 'medium', label: 'Medium', example: 'text-base' },
    { value: 'large', label: 'Large', example: 'text-lg' },
    { value: 'extra-large', label: 'Extra Large', example: 'text-xl' }
  ];

  const fontFamilyOptions = [
    { value: 'standard', label: 'Standard', desc: 'Regular system font' },
    { value: 'dyslexic', label: 'Dyslexia-Friendly', desc: 'Enhanced readability font' }
  ];

  const lineSpacingOptions = [
    { value: 'normal', label: 'Normal', desc: '1.5x spacing' },
    { value: 'wide', label: 'Wide', desc: '1.8x spacing' },
    { value: 'extra-wide', label: 'Extra Wide', desc: '2.0x spacing' }
  ];

  const colorSchemeOptions = [
    { value: 'default', label: 'Default', colors: ['bg-primary-500', 'bg-success-500', 'bg-warning-500'] },
    { value: 'high-contrast', label: 'High Contrast', colors: ['bg-black', 'bg-white', 'bg-calm-800'] },
    { value: 'calm', label: 'Calm', colors: ['bg-calm-400', 'bg-calm-300', 'bg-calm-200'] },
    { value: 'warm', label: 'Warm', colors: ['bg-orange-400', 'bg-yellow-400', 'bg-red-400'] }
  ];

  const learningStyleOptions = [
    { value: 'visual', label: 'Visual', icon: Eye, desc: 'Learn through images and diagrams' },
    { value: 'auditory', label: 'Auditory', icon: Volume2, desc: 'Learn through listening and speaking' },
    { value: 'kinesthetic', label: 'Kinesthetic', icon: Brain, desc: 'Learn through hands-on activities' }
  ];

  const handlePreferenceChange = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    updatePreferences({ [key]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <motion.h1
          className="text-3xl font-bold text-calm-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Accessibility Settings
        </motion.h1>
        <motion.p
          className="text-lg text-calm-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Customize your learning experience for optimal comfort and comprehension
        </motion.p>
      </div>

      {/* Text Settings */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Type className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-bold text-calm-900">Text & Typography</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-calm-700 mb-3">
              Font Size
            </label>
            <div className="space-y-2">
              {fontSizeOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontSize"
                    value={option.value}
                    checked={preferences.fontSize === option.value}
                    onChange={(e) => handlePreferenceChange('fontSize', e.target.value as any)}
                    className="w-4 h-4 text-primary-600 border-calm-300 focus:ring-primary-500"
                  />
                  <span className={`${option.example} text-calm-800`}>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-calm-700 mb-3">
              Font Family
            </label>
            <div className="space-y-2">
              {fontFamilyOptions.map((option) => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="fontFamily"
                    value={option.value}
                    checked={preferences.fontFamily === option.value}
                    onChange={(e) => handlePreferenceChange('fontFamily', e.target.value as any)}
                    className="w-4 h-4 text-primary-600 border-calm-300 focus:ring-primary-500 mt-1"
                  />
                  <div>
                    <div className="text-calm-800 font-medium">{option.label}</div>
                    <div className="text-sm text-calm-600">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Line Spacing */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-calm-700 mb-3">
            Line Spacing
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            {lineSpacingOptions.map((option) => (
              <label key={option.value} className="flex items-start space-x-3 cursor-pointer p-3 border-2 border-calm-200 rounded-lg hover:border-primary-300 transition-colors">
                <input
                  type="radio"
                  name="lineSpacing"
                  value={option.value}
                  checked={preferences.lineSpacing === option.value}
                  onChange={(e) => handlePreferenceChange('lineSpacing', e.target.value as any)}
                  className="w-4 h-4 text-primary-600 border-calm-300 focus:ring-primary-500 mt-1"
                />
                <div>
                  <div className="text-calm-800 font-medium">{option.label}</div>
                  <div className="text-sm text-calm-600">{option.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Color & Theme Settings */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Palette className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-bold text-calm-900">Colors & Theme</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {colorSchemeOptions.map((scheme) => (
            <label
              key={scheme.value}
              className="flex items-center space-x-4 p-4 border-2 border-calm-200 rounded-lg hover:border-primary-300 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name="colorScheme"
                value={scheme.value}
                checked={preferences.colorScheme === scheme.value}
                onChange={(e) => handlePreferenceChange('colorScheme', e.target.value as any)}
                className="w-4 h-4 text-primary-600 border-calm-300 focus:ring-primary-500"
              />
              <div className="flex space-x-2">
                {scheme.colors.map((color, index) => (
                  <div key={index} className={`w-6 h-6 ${color} rounded-full`} />
                ))}
              </div>
              <span className="text-calm-800 font-medium">{scheme.label}</span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Learning Style */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-bold text-calm-900">Learning Style</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {learningStyleOptions.map((style) => {
            const Icon = style.icon;
            return (
              <label
                key={style.value}
                className="flex flex-col items-center p-6 border-2 border-calm-200 rounded-lg hover:border-primary-300 cursor-pointer transition-colors text-center"
              >
                <input
                  type="radio"
                  name="learningStyle"
                  value={style.value}
                  checked={preferences.learningStyle === style.value}
                  onChange={(e) => handlePreferenceChange('learningStyle', e.target.value as any)}
                  className="w-4 h-4 text-primary-600 border-calm-300 focus:ring-primary-500 mb-3"
                />
                <Icon className="h-8 w-8 text-primary-600 mb-2" />
                <div className="text-calm-800 font-medium mb-1">{style.label}</div>
                <div className="text-sm text-calm-600">{style.desc}</div>
              </label>
            );
          })}
        </div>
      </motion.div>

      {/* Audio Settings */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Volume2 className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-bold text-calm-900">Audio & Speech</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-calm-700 mb-3">
              Speech Rate: {preferences.speechRate}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={preferences.speechRate}
              onChange={(e) => handlePreferenceChange('speechRate', Number(e.target.value))}
              className="w-full h-2 bg-calm-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-calm-600 mt-1">
              <span>0.5x (Slow)</span>
              <span>1x (Normal)</span>
              <span>2x (Fast)</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-calm-800">Break Reminders</h3>
              <p className="text-sm text-calm-600">Get gentle reminders to take breaks</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.breakReminders}
                onChange={(e) => handlePreferenceChange('breakReminders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-calm-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-calm-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-calm-800">Focus Mode</h3>
              <p className="text-sm text-calm-600">Enable focused reading with content chunks</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.focusMode}
                onChange={(e) => handlePreferenceChange('focusMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-calm-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-calm-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Reset Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={resetPreferences}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-calm-100 text-calm-700 rounded-xl hover:bg-calm-200 transition-colors focus:outline-none focus:ring-2 focus:ring-calm-500 focus:ring-offset-2"
        >
          <RotateCcw className="h-5 w-5" />
          <span>Reset to Defaults</span>
        </button>
      </motion.div>
    </div>
  );
};