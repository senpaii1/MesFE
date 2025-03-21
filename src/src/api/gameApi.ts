import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Ensure this matches the backend

// Start a new game (generate a random number)
export const startNewGame = async (username: string) => {
  return axios.post(`${API_BASE_URL}/game/start-game`, { username });
};

// Submit a guess
export const submitGuess = async (gameId: string, guess: string) => {
  return axios.post(`${API_BASE_URL}/game/guess`, { gameId, guess });
};

// Get leaderboard scores
export const getLeaderboard = async () => {
  return axios.get(`${API_BASE_URL}/leaderboard`);
};
