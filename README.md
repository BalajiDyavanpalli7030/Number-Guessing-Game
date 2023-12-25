# Number Guessing Game

A simple web application for playing the number guessing game. Guess the correct number with the fewest guesses for the best score and enjoy the game!

## Project Structure

- `frontend/`: React.js code for the frontend
 
- `backend/`: Flask code for the backend

- `README.md`: Documentation file

## Setup and Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/BalajiDyavanpalli7030/Number-Guessing-Game.git

2. Navigate to the project folder:
   ```bash
   cd number-guessing-game

## Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```
## Install backend dependencies
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```
3. Run the application:

## Start the frontend
   ```bash
   cd ../frontend
   npm start
   ```
## Start the backend
   ```bash
   cd ../backend
   python app.py
   ```
Visit http://localhost:3000 in your browser to play the game.

## Technologies Used

- React.js for the frontend (utilizing JSX for component structure)
- HTML and CSS for styling and markup
- Flask for the backend
- MySQL for data storage

## Authentication and Game History

- **Authentication System:** User authentication is handled securely using Flask-Bcrypt for password hashing.
- **User Game History:** The application stores user game history, including details such as scores and game number in the database.

## Deployment

The Number Guessing Game is deployed on Netlify. You can play it live at [https://0numberguessinggame.netlify.app/].

## Contact

For any inquiries or feedback, feel free to contact me at balajidyavanpalli@gmail.com.


