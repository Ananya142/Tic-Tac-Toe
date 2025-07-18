# 🎮 Tic-Tac-Toe Game

A dynamic and interactive Tic-Tac-Toe game built with clean logic and modular design. Play against a friend in a classic 3x3 grid with real-time winner detection and responsive UI.

## 🚀 Features

- 🧠 Smart winner detection logic
- 🎨 Intuitive and responsive UI
- 🔄 Real-time game state updates
- 🔁 Restart functionality for replayability
- 🧩 Modular code structure for easy maintenance

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|--------|
| HTML | Structure of the game board |
| CSS | Styling and layout |
| JavaScript | Game logic and dynamic interactions |

## 📦 Installation

Clone the repository and open the game in your browser:

```bash
# Clone the repository
git clone https://github.com/your-username/tic-tac-toe-game

# Navigate into the project folder
cd tic-tac-toe-game

# Open index.html in your browser
```

## 🎯 How to Play

1. Click on any empty cell to place your mark (X or O).
2. Players alternate turns.
3. The game automatically detects a win or draw.
4. Click "Restart" to play again.

## 🧠 Logic Overview

- **Grid Representation**: 3x3 matrix tracked in JavaScript
- **Turn Management**: Alternates between X and O
- **Winner Detection**: Checks rows, columns, and diagonals after each move
- **Draw Handling**: Detects when all cells are filled without a winner
- **UI Updates**: DOM manipulation for real-time feedback

## 🧪 Testing

- ✅ Validates win conditions for all directions
- ✅ Handles edge cases like early wins and full board draws
- ✅ Ensures restart resets all states cleanly

## 📁 File Structure

```
tic-tac-toe-game/
├── index.html       # Game layout
├── style.css        # Styling and animations
└── script.js        # Game logic and interactions
```

## 🤝 Contributing

Feel free to fork the repo and submit pull requests! Suggestions for improving UX or adding AI opponent logic are welcome.

## 📃 License

This project is licensed under the MIT License.


