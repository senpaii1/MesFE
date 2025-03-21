import { useState } from "react";
import { startNewGame, submitGuess } from "../api/gameApi";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";

export default function Home() {
  const [username, setUsername] = useState("");
  const [gameId, setGameId] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState(""); // Stores ++-- feedback
  const [isWinner, setIsWinner] = useState(false);
  const [error, setError] = useState(""); // Validation error state

  const handleStartGame = async () => {
    if (!username.trim()) return alert("Enter your name!");
    const response = await startNewGame(username.trim());
    setGameId(response.data.gameId);
    setFeedback("Game started! Make a guess.");
    setResult("");
    setIsWinner(false);
  };

  const handleGuess = async () => {
    if (!gameId) return alert("Start a game first!");
    if (guess.length !== 4) {
      setError("Guess must be exactly 4 digits.");
      return;
    }

    const response = await submitGuess(gameId, guess);
    setFeedback(response.data.message);
    setResult(response.data.result);
    setError(""); // Clear error on valid input

    if (response.data.isWinner) {
      setIsWinner(true);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: 3,
            width: "100%",
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Guess the Number
          </Typography>

          {!gameId ? (
            <Box>
              <TextField
                fullWidth
                variant="outlined"
                label="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStartGame()}
                sx={{
                  mb: 2,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "gray" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                  },
                }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleStartGame}
                sx={{ mt: 2 }}
              >
                Start Game
              </Button>
            </Box>
          ) : isWinner ? (
            <Box textAlign="center">
              <Alert severity="success" sx={{ mb: 2 }}>
                🎉 Congratulations! You guessed correctly! 🎉
              </Alert>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  setGameId("");
                  setUsername("");
                  setFeedback("");
                  setResult("");
                  setIsWinner(false);
                }}
              >
                Play Again
              </Button>
            </Box>
          ) : (
            <Box>
              <TextField
                fullWidth
                variant="outlined"
                label="Enter your guess"
                value={guess}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d*$/.test(input) && input.length <= 4) {
                    setGuess(input);
                    setError("");
                  } else if (!/^\d*$/.test(input)) {
                    setError("Please enter numbers only.");
                  }
                }}
                onKeyDown={(e) => e.key === "Enter" && handleGuess()}
                sx={{
                  mb: 2,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "gray" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                  },
                }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleGuess}
              >
                Submit Guess
              </Button>
            </Box>
          )}

          {feedback && !isWinner && (
            <Typography
              variant="body1"
              sx={{ mt: 3, textAlign: "center", color: "#90caf9" }}
            >
              {feedback}
            </Typography>
          )}

          {result && !isWinner && (
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                textAlign: "center",
                fontWeight: "bold",
                color: "#ffeb3b",
              }}
            >
              {result}
            </Typography>
          )}

          <Box mt={3} textAlign="center">
            <Button component={Link} to="/leaderboard" color="inherit">
              View Leaderboard
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
