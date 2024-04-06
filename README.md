# WingHacks2024

# Celebrity Guessing Game Web App

This document provides a detailed guide to setting up and deploying a mobile-first web app designed to let players guess celebrities' names through voice recognition. The app features two game modes: Western celebrities and K-pop celebrities.

## Table of Contents

- [Project Overview](#project-overview)
- [Front-end Development](#front-end-development)
  - [React Basics](#react-basics)
- [Celebrity Photo APIs](#celebrity-photo-apis)
- [Voice Recognition](#voice-recognition)
- [Deployment](#deployment)
- [Step-by-Step Guide](#step-by-step-guide)
- [Suggestions for an Easier Route](#suggestions-for-an-easier-route)
- [Final Notes](#final-notes)

## Project Overview

The game displays random photos of celebrities, and players guess the names aloud. The app evaluates guesses using voice recognition. Technologies include React (optional), celebrity photo APIs, voice recognition APIs, and a suitable deployment platform for dynamic content.

## Front-end Development

React is recommended for its efficient handling of dynamic content and user interactions.

### React Basics

- **Initialize:** Use Create React App for setup.
- **Components:** Create components for different game modes, image display, and feedback.
- **State Management:** Utilize `useState` and `useEffect` for managing app states and API interactions.

## Celebrity Photo APIs

Identify APIs that offer random celebrity photos. Implement fallback mechanisms for better reliability.

- **API Integration:** Use Axios or the Fetch API for requests.
- **Fallback Solution:** Have a static set of images as a backup.

## Voice Recognition

Google's Web Speech API is a powerful solution for implementing voice recognition.

- **Integration:** Follow the Web Speech API documentation.
- **Testing:** Ensure the recognition works well with different names and accents.

## Deployment

Platforms like Heroku, Netlify, and Vercel support dynamic web applications well beyond static site capabilities.

## Step-by-Step Guide

1. **Project Setup:** Initialize with Create React App.
2. **Front End:** Build UI components.
3. **APIs:** Integrate celebrity photo fetching.
4. **Voice Recognition:** Add voice recognition for guesses.
5. **Deploy:** Choose a platform and deploy the app.
6. **Test:** Conduct thorough testing.

## Suggestions for an Easier Route

- Start with a simpler version focusing on core functionalities.
- Initially use a static set of images to simplify development.
- Leverage pre-built React components and libraries.

## Final Notes

Focus on creating a minimal viable product (MVP) within the 36-hour window. Prioritize core features and allow time for deployment and testing.

