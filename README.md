# Gymstant - Find Your Gym Buddy

Gymstant is a React-based application that enables users to connect with potential gym partners. Whether you're looking for a workout companion or someone to share fitness tips with, Gymstant has you covered.

## Getting Started

To run the application locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/arora-aryan/Gymstagram/edit/main/README.md
   cd Gymstagram
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm start
   ```

   This will start the development server, and you can view the app at [http://localhost:3000](http://localhost:3000).

## Project Structure

The project has the following file structure:

```
Gymstagram/
|-- src/
|   |-- components/*
|   |-- pages/*
|   |-- App.js
|   |-- index.js
|-- public/
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
   --make sure to select build, not public, when prompted ***What do you want to use as your public directory?***
   Select hosting as the feature to set up, and follow the prompts.

4. **Deploy to Firebase:**
   ```bash
   npm run build
   firebase deploy
   ```

   Gymstant (or your app) should be now live on Firebase! You can access it at the provided hosting URL after the last command aforementioned.

Happy coding and happy workouts!
