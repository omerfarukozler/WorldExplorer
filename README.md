# World Explorer 🌍✈️

An Augmented Reality-based educational mobile app designed for children to explore world geography, cultures, languages, and science concepts through an interactive flight adventure.

## 🎯 Project Overview

World Explorer is a React Native application that combines education with entertainment, allowing children to:
- Create personalized avatars and embark on virtual world journeys
- Learn about different countries, cultures, and landmarks
- Complete interactive missions and mini-games
- Experience AR-enhanced learning through 3D models and immersive content
- Track progress through a digital passport and achievement system

## 🏗️ Project Structure

```
WorldExplorer/
├── app/                          # Expo Router app directory
│   ├── (tabs)/                   # Main tab navigation
│   │   ├── index.tsx            # Home screen
│   │   ├── academy.tsx          # Character creation & introduction
│   │   ├── flight.tsx           # 3D world map & flight routes
│   │   ├── missions.tsx         # Missions & mini-games
│   │   ├── profile.tsx          # User profile & passport
│   │   └── _layout.tsx          # Tab navigation layout
│   ├── (modals)/                # Modal screens (to be implemented)
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable UI components
│   ├── academy/                 # Academy-related components
│   │   ├── AcademyHeader.tsx
│   │   ├── CharacterCreator.tsx
│   │   ├── ExplorerOath.tsx
│   │   └── CertificateModal.tsx
│   ├── flight/                  # Flight-related components
│   │   ├── FlightMap.tsx
│   │   ├── RouteSelector.tsx
│   │   └── FlightControls.tsx
│   ├── missions/                # Mission-related components (to be implemented)
│   ├── profile/                 # Profile-related components (to be implemented)
│   ├── ar/                      # AR-related components (to be implemented)
│   └── ui/                      # Base UI components
├── hooks/                       # Custom React hooks
│   ├── academy/
│   │   └── useAcademyProgress.ts
│   ├── flight/                  # Flight-related hooks (to be implemented)
│   ├── missions/                # Mission-related hooks (to be implemented)
│   └── profile/                 # Profile-related hooks (to be implemented)
├── constants/                   # App constants and configuration
├── types/                       # TypeScript type definitions
│   └── index.ts
├── utils/                       # Utility functions and storage
│   ├── storage/
│   │   ├── userStore.ts
│   │   ├── flightStore.ts
│   │   └── missionStore.ts      # (to be implemented)
│   ├── validation/              # Form validation utilities (to be implemented)
│   └── helpers/                 # Helper functions (to be implemented)
├── services/                    # API and external services
│   ├── api/                     # API service layer (to be implemented)
│   ├── ar/                      # AR service integration (to be implemented)
│   └── audio/                   # Audio service (to be implemented)
├── assets/                      # Static assets
│   ├── animations/              # Lottie animations (to be added)
│   ├── models/                  # 3D models for AR (to be added)
│   ├── audio/                   # Sound effects and music (to be added)
│   └── images/                  # Images and icons
└── scripts/                     # Build and utility scripts
```

## 🚀 Features

### ✈️ Game Introduction and Character Creation
- **Explorer Academy**: Fun animated introduction
- **Avatar Creator**: Customize hair, eyes, outfit, accessories
- **Explorer Tools**: Choose binoculars, compass, notebook, camera
- **Travel Vehicles**: Select magic carpet, plane, rocket, hot air balloon
- **Explorer Oath**: Playful ceremony with digital certificate

### 🌍 Flight Route Introduction
- **3D World Map**: Interactive globe with animated flight paths
- **Route Selection**: Multiple difficulty levels and destinations
- **Waypoint System**: Stops at cities and landmarks
- **Achievement Tracking**: Unlock badges and trophies

### 🎮 Interactive Missions and Mini-Games

#### 📌 Geographic Discoveries
- 3D/AR landmark models (Eiffel Tower, Colosseum, Big Ben)
- "Map Detective" location-finding game
- Geographic information cards

#### 🧥 Cultural Adventures
- Traditional outfit dress-up
- Local cuisine collection game
- Cultural symbol matching

#### 📚 Language Learning
- Basic greetings, colors, numbers per country
- Pronunciation practice games
- Interactive language lessons

#### ☁️ AR Window View Enrichment
- Flying animals and fantasy creatures
- Real-time AR building views
- Cloud painting and shape games

#### 🧠 Educational Mini-Games
- "Sky Math Challenge" for altitude/distance problems
- "Weather Forecaster" for weather concepts
- Interactive science experiments

### 🎓 Learning Progression System
- **Digital Passport**: Country stamps and language stickers
- **Achievement System**: Unlock collectibles and accessories
- **Level Progression**: Experience-based advancement
- **Progress Tracking**: Comprehensive learning analytics

### 🛡️ Safety and Comfort Features
- **Eye Care Reminders**: 20-minute rest intervals
- **Posture Guidance**: Sitting position animations
- **Parental Controls**: Content filtering and time limits
- **Progress Reports**: Detailed learning analytics

## 🛠️ Technical Implementation

### Current Tech Stack
- **React Native** with Expo SDK 53
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Zustand** for state management
- **AsyncStorage** for local data persistence
- **Lottie** for animations
- **React Native Reanimated** for smooth animations

### AR Implementation Strategy

#### Option 1: Expo Eject + ViroReact (Recommended)
```bash
# Eject from Expo managed workflow
npx expo eject

# Install ViroReact
npm install @viro-community/react-viro

# Configure native modules
# Follow ViroReact setup guide for iOS/Android
```

#### Option 2: Expo Development Build + AR Libraries
```bash
# Create development build
npx expo install expo-dev-client
npx expo run:ios  # or run:android

# Add AR capabilities through development build
```

#### Option 3: Web AR (Fallback)
- Use WebXR for web-based AR experiences
- Progressive enhancement approach
- Graceful degradation for non-AR devices

### Required Libraries for AR Features

```json
{
  "dependencies": {
    "@viro-community/react-viro": "^2.20.2",
    "react-native-arkit": "^1.0.0",
    "react-native-arcore": "^1.0.0",
    "three": "^0.150.0",
    "react-three-fiber": "^8.11.0",
    "expo-gl": "~13.0.1",
    "expo-camera": "~14.0.3",
    "expo-sensors": "~12.0.1"
  }
}
```

## 🎨 UI/UX Design Principles

### Color Scheme
- **Primary**: #007bff (Blue)
- **Success**: #28a745 (Green)
- **Warning**: #ffc107 (Yellow)
- **Danger**: #dc3545 (Red)
- **Light**: #f8f9fa (Light Gray)
- **Dark**: #2c3e50 (Dark Blue)

### Typography
- **Title**: 32px, Bold
- **Subtitle**: 20px, Bold
- **Body**: 16px, Regular
- **Caption**: 14px, Regular

### Accessibility
- High contrast mode support
- Screen reader compatibility
- Reduced motion preferences
- Font size scaling
- Color blind friendly design

## 📱 Platform Support

### Current Support
- ✅ iOS (iPhone/iPad)
- ✅ Android (Phone/Tablet)
- ✅ Web (Progressive Web App)

### AR Support Matrix
| Platform | ARKit | ARCore | WebXR | ViroReact |
|----------|-------|--------|-------|-----------|
| iOS      | ✅    | ❌     | ❌    | ✅        |
| Android  | ❌    | ✅     | ❌    | ✅        |
| Web      | ❌    | ❌     | ✅    | ❌        |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd WorldExplorer

# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

### Development Workflow

1. **Setup Development Environment**
   ```bash
   # Install Expo CLI globally
   npm install -g @expo/cli
   
   # Install development dependencies
   npm install --save-dev @types/react @types/react-native
   ```

2. **AR Development Setup**
   ```bash
   # For AR development, eject from Expo
   npx expo eject
   
   # Install AR dependencies
   npm install @viro-community/react-viro
   ```

3. **Testing**
   ```bash
   # Run tests
   npm test
   
   # Run linting
   npm run lint
   
   # Type checking
   npx tsc --noEmit
   ```

## 📋 Development Roadmap

### Phase 1: Core Foundation ✅
- [x] Project structure setup
- [x] Basic navigation and routing
- [x] TypeScript type definitions
- [x] State management with Zustand
- [x] Academy introduction flow
- [x] Character creation system
- [x] Flight route system
- [x] Basic UI components

### Phase 2: Mission System 🚧
- [ ] Mission data structure
- [ ] Mission card components
- [ ] Mission detail screens
- [ ] Progress tracking
- [ ] Reward system

### Phase 3: AR Integration 🔄
- [ ] Eject from Expo managed workflow
- [ ] ViroReact integration
- [ ] 3D model loading
- [ ] AR scene management
- [ ] AR interactions

### Phase 4: Mini-Games 🎮
- [ ] Map Detective game
- [ ] Language learning games
- [ ] Cultural matching games
- [ ] Math challenges
- [ ] Weather forecasting game

### Phase 5: Polish & Optimization ✨
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Parental controls
- [ ] Analytics integration
- [ ] App store preparation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- ViroReact community for AR capabilities
- React Native community for continuous improvements
- Educational content creators and researchers

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Happy Exploring! 🌍✈️🎓**
