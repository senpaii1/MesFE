import { useEffect, useState } from "react";
import { getLeaderboard } from "../api/gameApi";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";

interface LeaderboardEntry {
  username: string;
  guesses: number;
  timeTaken: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const response = await getLeaderboard();
      setLeaderboard(response.data);
    }
    fetchLeaderboard();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", color: "white", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          🏆 Leaderboard
        </Typography>

        {leaderboard.length === 0 ? (
          <Typography>No scores yet!</Typography>
        ) : (
          leaderboard.map((entry, index) => (
            <Card
              key={index}
              sx={{
                mb: 2,
                backgroundColor: "#1e1e1e",
                color: "white",
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {index + 1}. {entry.username}
                </Typography>
                <Typography variant="body2" color="gray">
                  {entry.guesses} guesses in {entry.timeTaken}s
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
}
