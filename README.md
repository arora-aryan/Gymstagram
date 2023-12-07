# Gymstant - Find Your Gym Buddy

Gymstant is a React-based application that enables users to connect with potential gym partners. Whether you're looking for a workout companion or someone to share fitness tips with, Gymstant has you covered.

## Getting Started
*Branch main serves as latest working branch*

*Make sure [Node js](https://nodejs.org/en) is installed before performing any steps. If you are unsure please type*
```bash
   npm -v
   #Make sure the version is 10.2.4 or later.
```
To run the application locally, follow these steps:

```bash
# Step 1: Clone Repository
git clone https://github.com/arora-aryan/Gymstagram;
cd Gymstagram;

# Step 2: Install Dependencies
npm install;

# Step 3: Run Application
npm start;
```

This will start the development server; view the app at [http://localhost:3000](http://localhost:3000).

## Project Structure

The project has the following file structure:

```
Gymstagram/
|-- src/
|   |-- components/*
|   |-- pages/*
|   |-- App.js
|   |-- index.js
|   |-- firebase.js
|   |-- [Other files (logo, setup, etc)]
|-- public/*
|-- package.json
|-- package-lock.json
|-- README.md
```

- `src/`: Contains the source code of the application.
- `components/`: Holds reusable React components.
- `pages/`: Defines different pages of the application, for the specifications described as well to make a basic CRUD (Create Read Upload Delete) Application
- `public/`: Public assets.
- `App.js`: Main component that renders other components, namely pages.
- `index.js`: Entry point of the application, what gets called on load initially.
- `firebase.js`: Exports Cloud Firestore app, authorization, firestore database, and image storage.

## Available Routes

- `/login`: Login page for users.
- `/homepage`: Main homepage displaying potential gym buddies.
- `/profile-page`: User profile page.
- `/edit-profile`: Page for editing user profile information.
- `/create`: Page for creating pure image posts.
- `/create-account`: Account creation page.

## Deployment to Firebase

To deploy the Gymstant app to Firebase, make sure you have the Firebase CLI installed:

```bash
npm install -g firebase-tools
```

Then, follow these steps:

1. **Build the App:**
   ```bash
   npm run build
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Project:**
   ```bash
   firebase init
   ```
   Select hosting prompt as: `Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub
Action deploys`
   Make sure to *select* **build**, not ~public~, when prompted ***`What do you want to use as your public directory?`***
   Enter (default option) for all other options.
   

5. **Deploy to Firebase:**
   ```bash
   npm run build;
   firebase deploy
   ```

   Gymstant (or your app) should be now live on Firebase! You can access it at the provided hosting URL after executing 'firebase deploy'. The URL is based on your unique project id.

Happy coding and happy workouts!
