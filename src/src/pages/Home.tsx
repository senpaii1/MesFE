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
  CircularProgress,
} from "@mui/material";
import { debounce } from "lodash";

export default function Home() {
  const [username, setUsername] = useState("");
  const [gameId, setGameId] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState(""); // Stores ++-- feedback
  const [isWinner, setIsWinner] = useState(false);
  const [error, setError] = useState(""); // Validation error state
  const [loading, setLoading] = useState(false);

  const handleStartGame = async () => {
    if (!username.trim()) {
      setError("Enter your name!");
      return;
    }

    setLoading(true);
    try {
      const response = await startNewGame(username.trim());
      setGameId(response.data.gameId);
      setFeedback("Game started! Make a guess.");
      setResult("");
      setIsWinner(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Failed to start the game.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuess = async () => {
    if (!gameId) return alert("Start a game first!");
    if (guess.length !== 4) {
      setError("Guess must be exactly 4 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await submitGuess(gameId, guess);
      setFeedback(response.data.message);
      setResult(response.data.result);
      setError(""); // Clear error on valid input

      if (response.data.isWinner) {
        setIsWinner(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Error submitting guess.");
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = debounce((value: string) => {
    setUsername(value);
  }, 500);

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
                defaultValue={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
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
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleStartGame}
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#ffeb3b" }} />
                ) : (
                  "Start Game"
                )}
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
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleGuess}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#ffeb3b" }} />
                ) : (
                  "Submit Guess"
                )}
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
