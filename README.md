# Gymstant - Find Your Gym Buddy

Gymstant is a React-based application that enables users to connect with potential gym partners. Whether you're looking for a workout companion or someone to share fitness tips with, Gymstant has you covered.

## Getting Started

To run the application locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/gymstant.git
   cd gymstant
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
gymstant/
|-- src/
|   |-- components/
|   |-- pages/
|   |-- App.js
|   |-- index.js
|-- public/
|-- package.json
|-- README.md
```

- `src/`: Contains the source code of the application.
- `components/`: Holds reusable React components.
- `pages/`: Defines different pages of the application.
- `public/`: Public assets and the HTML template.
- `App.js`: Main component that renders other components.
- `index.js`: Entry point of the application.

## Available Routes

- `/login`: Login page for users.
- `/homepage`: Main homepage displaying potential gym buddies.
- `/profile-page`: User profile page.
- `/edit-profile`: Page for editing user profile information.
- `/create`: Page for creating posts or events.
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

   Select hosting as the feature to set up, and follow the prompts.

4. **Deploy to Firebase:**
   ```bash
   firebase deploy
   ```

   Your Gymstant app is now live on Firebase! You can access it at the provided hosting URL.

Feel free to explore and customize the app further according to your needs. Happy coding and happy workouts!
