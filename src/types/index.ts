export interface User {
  id: string;
  name: string;
  role: 'student' | 'parent' | 'teacher';
  preferences: UserPreferences;
}

export interface UserPreferences {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  fontFamily: 'standard' | 'dyslexic';
  lineSpacing: 'normal' | 'wide' | 'extra-wide';
  colorScheme: 'default' | 'high-contrast' | 'calm' | 'warm';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic';
  speechRate: number; // 0.5 to 2.0
  focusMode: boolean;
  breakReminders: boolean;
}

export interface LearningContent {
  id: string;
  title: string;
  originalText: string;
  simplifiedText?: string;
  bulletPoints?: string[];
  mindMap?: MindMapNode;
  difficulty: 'elementary' | 'middle' | 'high' | 'college';
  subject: string;
  estimatedReadingTime: number;
}

export interface MindMapNode {
  id: string;
  text: string;
  children: MindMapNode[];
  level: number;
}

export interface ProgressData {
  userId: string;
  contentId: string;
  completionPercentage: number;
  timeSpent: number;
  comprehensionScore: number;
  lastAccessed: Date;
  strugglingAreas: string[];
}

export interface LearningSession {
  id: string;
  userId: string;
  contentId: string;
  startTime: Date;
  endTime?: Date;
  interactions: SessionInteraction[];
  focusBreaks: number;
  wordsRead: number;
}

export interface SessionInteraction {
  type: 'pause' | 'replay' | 'question' | 'speed_change' | 'format_change';
  timestamp: Date;
  data?: any;
}