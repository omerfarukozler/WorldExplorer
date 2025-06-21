// Core App Types
export interface User {
  id: string;
  name: string;
  avatar: Avatar;
  level: number;
  experience: number;
  passport: Passport;
  achievements: Achievement[];
  settings: UserSettings;
  createdAt: Date;
  lastActive: Date;
}

export interface Avatar {
  id: string;
  name: string;
  hair: AvatarItem;
  eyes: AvatarItem;
  outfit: AvatarItem;
  accessories: AvatarItem[];
  tools: ExplorerTool[];
  vehicle: TravelVehicle;
}

export interface AvatarItem {
  id: string;
  name: string;
  category: 'hair' | 'eyes' | 'outfit' | 'accessory';
  imageUrl: string;
  unlocked: boolean;
  price?: number;
}

export interface ExplorerTool {
  id: string;
  name: string;
  type: 'binoculars' | 'compass' | 'notebook' | 'camera' | 'map';
  imageUrl: string;
  unlocked: boolean;
  level: number;
}

export interface TravelVehicle {
  id: string;
  name: string;
  type: 'magic_carpet' | 'small_plane' | 'rocket' | 'hot_air_balloon';
  imageUrl: string;
  unlocked: boolean;
  speed: number;
  fuel: number;
}

// Flight & Navigation Types
export interface FlightRoute {
  id: string;
  name: string;
  description: string;
  startLocation: Location;
  endLocation: Location;
  waypoints: Waypoint[];
  distance: number;
  estimatedDuration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  unlocked: boolean;
  completed: boolean;
}

export interface Location {
  id: string;
  name: string;
  country: string;
  continent: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: 'city' | 'landmark' | 'natural_wonder';
  imageUrl: string;
  description: string;
  population?: number;
  timezone: string;
}

export interface Waypoint {
  id: string;
  location: Location;
  order: number;
  missions: Mission[];
  unlocked: boolean;
  completed: boolean;
}

// Mission Types
export interface Mission {
  id: string;
  title: string;
  description: string;
  type: MissionType;
  category: MissionCategory;
  location: Location;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  unlocked: boolean;
  completed: boolean;
  progress: number;
  requirements: MissionRequirement[];
  rewards: Reward[];
}

export type MissionType = 
  | 'geographic_discovery'
  | 'cultural_adventure'
  | 'language_learning'
  | 'ar_exploration'
  | 'mini_game'
  | 'quiz';

export type MissionCategory = 
  | 'landmarks'
  | 'culture'
  | 'language'
  | 'nature'
  | 'history'
  | 'science';

export interface MissionRequirement {
  type: 'level' | 'item' | 'mission' | 'location';
  value: string | number;
  description: string;
}

export interface Reward {
  type: 'experience' | 'item' | 'badge' | 'currency';
  value: string | number;
  amount: number;
}

// Achievement & Progress Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

export type AchievementCategory = 
  | 'explorer'
  | 'geographer'
  | 'linguist'
  | 'culturalist'
  | 'scientist'
  | 'collector';

export interface Passport {
  id: string;
  stamps: PassportStamp[];
  totalCountries: number;
  totalLandmarks: number;
  totalLanguages: number;
}

export interface PassportStamp {
  id: string;
  location: Location;
  date: Date;
  type: 'visit' | 'mission' | 'discovery';
  imageUrl: string;
}

// AR & Interactive Types
export interface ARModel {
  id: string;
  name: string;
  type: 'landmark' | 'animal' | 'vehicle' | 'object';
  modelUrl: string;
  textureUrl?: string;
  scale: number;
  position: ARPosition;
  rotation: ARRotation;
  interactive: boolean;
  animations?: ARAnimation[];
}

export interface ARPosition {
  x: number;
  y: number;
  z: number;
}

export interface ARRotation {
  x: number;
  y: number;
  z: number;
}

export interface ARAnimation {
  id: string;
  name: string;
  duration: number;
  loop: boolean;
  trigger: 'auto' | 'touch' | 'proximity';
}

export interface ARScene {
  id: string;
  name: string;
  description: string;
  models: ARModel[];
  environment: AREnvironment;
  interactions: ARInteraction[];
}

export interface AREnvironment {
  lighting: 'day' | 'night' | 'sunset' | 'custom';
  weather: 'clear' | 'cloudy' | 'rainy' | 'snowy';
  background: string;
}

export interface ARInteraction {
  id: string;
  type: 'tap' | 'drag' | 'rotate' | 'scale';
  target: string;
  action: string;
  feedback: 'haptic' | 'audio' | 'visual';
}

// Mini Game Types
export interface MiniGame {
  id: string;
  name: string;
  type: MiniGameType;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  maxScore: number;
  instructions: string[];
  assets: GameAsset[];
}

export type MiniGameType = 
  | 'map_detective'
  | 'sky_math'
  | 'weather_forecaster'
  | 'cloud_painter'
  | 'symbol_matcher'
  | 'pronunciation_game';

export interface GameAsset {
  id: string;
  type: 'image' | 'audio' | 'video' | '3d_model';
  url: string;
  metadata?: Record<string, any>;
}

// Settings & Preferences
export interface UserSettings {
  audio: AudioSettings;
  visual: VisualSettings;
  accessibility: AccessibilitySettings;
  parental: ParentalSettings;
  ar: ARSettings;
}

export interface AudioSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  voiceVolume: number;
  enabled: boolean;
}

export interface VisualSettings {
  quality: 'low' | 'medium' | 'high';
  brightness: number;
  contrast: number;
  colorBlindMode: boolean;
  reducedMotion: boolean;
}

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  screenReader: boolean;
  subtitles: boolean;
  simplifiedUI: boolean;
}

export interface ParentalSettings {
  timeLimit: number; // minutes
  contentFilter: 'strict' | 'moderate' | 'relaxed';
  progressReports: boolean;
  purchaseRestrictions: boolean;
  eyeCareReminders: boolean;
  postureReminders: boolean;
}

export interface ARSettings {
  quality: 'low' | 'medium' | 'high';
  tracking: boolean;
  occlusion: boolean;
  lighting: boolean;
  safetyMode: boolean;
}

// API & Service Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  Academy: undefined;
  Flight: { routeId?: string };
  Missions: { category?: MissionCategory };
  Profile: undefined;
  AvatarCreator: undefined;
  FlightMap: { routeId: string };
  MissionDetail: { missionId: string };
  ARScene: { sceneId: string };
  MiniGame: { gameId: string };
  Settings: undefined;
  ParentalControls: undefined;
};

// Event Types
export interface AppEvent {
  id: string;
  type: string;
  timestamp: Date;
  data: Record<string, any>;
  userId: string;
}

export interface ProgressEvent extends AppEvent {
  type: 'mission_completed' | 'achievement_unlocked' | 'level_up' | 'location_visited';
  data: {
    itemId: string;
    itemName: string;
    points: number;
    experience: number;
  };
} 