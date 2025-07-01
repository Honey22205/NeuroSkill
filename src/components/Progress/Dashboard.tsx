import React from 'react';
import { TrendingUp, Clock, Target, Award, BookOpen, Brain, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProgressData {
  totalTimeSpent: number;
  lessonsCompleted: number;
  comprehensionScore: number;
  focusSessions: number;
  streak: number;
  weeklyProgress: { day: string; minutes: number; score: number }[];
  subjectProgress: { subject: string; progress: number; timeSpent: number }[];
}

const mockData: ProgressData = {
  totalTimeSpent: 1245, // minutes
  lessonsCompleted: 28,
  comprehensionScore: 87,
  focusSessions: 15,
  streak: 7,
  weeklyProgress: [
    { day: 'Mon', minutes: 45, score: 85 },
    { day: 'Tue', minutes: 62, score: 90 },
    { day: 'Wed', minutes: 38, score: 82 },
    { day: 'Thu', minutes: 55, score: 88 },
    { day: 'Fri', minutes: 70, score: 92 },
    { day: 'Sat', minutes: 30, score: 78 },
    { day: 'Sun', minutes: 40, score: 85 }
  ],
  subjectProgress: [
    { subject: 'Mathematics', progress: 75, timeSpent: 320 },
    { subject: 'Science', progress: 82, timeSpent: 285 },
    { subject: 'History', progress: 68, timeSpent: 195 },
    { subject: 'Literature', progress: 90, timeSpent: 445 }
  ]
};

export const Dashboard: React.FC = () => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const stats = [
    {
      icon: Clock,
      label: 'Total Time',
      value: formatTime(mockData.totalTimeSpent),
      color: 'bg-primary-500',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-700'
    },
    {
      icon: BookOpen,
      label: 'Lessons Completed',
      value: mockData.lessonsCompleted.toString(),
      color: 'bg-success-500',
      bgColor: 'bg-success-50',
      textColor: 'text-success-700'
    },
    {
      icon: Target,
      label: 'Comprehension',
      value: `${mockData.comprehensionScore}%`,
      color: 'bg-warning-500',
      bgColor: 'bg-warning-50',
      textColor: 'text-warning-700'
    },
    {
      icon: Brain,
      label: 'Focus Sessions',
      value: mockData.focusSessions.toString(),
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          className="text-3xl font-bold text-calm-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Learning Progress Dashboard
        </motion.h1>
        <motion.p
          className="text-lg text-calm-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Track your learning journey and celebrate your achievements
        </motion.p>
      </div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className={`${stat.bgColor} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-success-500" />
              </div>
              <h3 className={`text-2xl font-bold ${stat.textColor} mb-1`}>
                {stat.value}
              </h3>
              <p className="text-calm-600 text-sm font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Weekly Progress Chart */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-calm-900">Weekly Activity</h2>
            <Calendar className="h-5 w-5 text-calm-600" />
          </div>
          
          <div className="space-y-4">
            {mockData.weeklyProgress.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-calm-600">
                  {day.day}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-calm-700">
                      {formatTime(day.minutes)}
                    </span>
                    <span className="text-sm font-medium text-primary-600">
                      {day.score}%
                    </span>
                  </div>
                  <div className="w-full bg-calm-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.minutes / 80) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subject Progress */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-calm-900">Subject Progress</h2>
            <BookOpen className="h-5 w-5 text-calm-600" />
          </div>
          
          <div className="space-y-6">
            {mockData.subjectProgress.map((subject, index) => (
              <div key={subject.subject}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-calm-800">{subject.subject}</h3>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary-600">
                      {subject.progress}%
                    </div>
                    <div className="text-xs text-calm-500">
                      {formatTime(subject.timeSpent)}
                    </div>
                  </div>
                </div>
                <div className="w-full bg-calm-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-success-500 to-success-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.progress}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Achievement Badge */}
      <motion.div
        className="bg-gradient-to-r from-success-500 to-success-600 rounded-xl p-6 text-center text-white shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Award className="h-8 w-8" />
          <h2 className="text-2xl font-bold">🔥 {mockData.streak} Day Streak!</h2>
        </div>
        <p className="text-success-100">
          Amazing consistency! You're building great learning habits.
        </p>
      </motion.div>
    </div>
  );
};