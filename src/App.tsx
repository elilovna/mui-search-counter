import "./styles.css";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useMemo, useReducer, useState } from "react";
import { UserCard } from "./components/Card";
import { CounterPanel } from "./components/CounterPanel";
import { EmptyState } from "./components/EmptyState";
import { SearchField } from "./components/SearchField";
import { SectionHeading } from "./components/SectionHeading";
import { users as rawUsers } from "./data";
import { createInitialUsersState, usersReducer } from "./reducers/usersReducer";
import type { User } from "./types";

const GRID_SX = {
  display: "grid",
  gap: 3,
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
  },
} as const;

export const App = () => {
  const [state, dispatch] = useReducer(
    usersReducer,
    rawUsers,
    createInitialUsersState,
  );
  const [search, setSearch] = useState("");
  const isSearching = search.trim().length > 0;

  const { visibleActive, visibleRemoved } = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return { visibleActive: state.active, visibleRemoved: [] as User[] };
    }
    const match = (u: User) => u.username.toLowerCase().includes(q);
    return {
      visibleActive: state.active.filter(match),
      visibleRemoved: state.removed.filter(match),
    };
  }, [state, search]);

  const totalResults = visibleActive.length + visibleRemoved.length;
  const hasResults = totalResults > 0;
  const allRemoved = state.active.length === 0 && state.removed.length > 0;

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Typography variant="h4">User Directory</Typography>

          <CounterPanel />

          <Stack spacing={1}>
            <SearchField
              value={search}
              onChange={setSearch}
              placeholder="Search by username…"
            />
            {isSearching && hasResults && (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", px: 1 }}
              >
                {totalResults} {totalResults === 1 ? "result" : "results"} for{" "}
                <Box
                  component="span"
                  sx={{ color: "text.primary", fontWeight: 600 }}
                >
                  "{search.trim()}"
                </Box>
              </Typography>
            )}
          </Stack>

          {hasResults ? (
            <Stack spacing={4}>
              {visibleActive.length > 0 && (
                <Stack spacing={2}>
                  {isSearching && (
                    <SectionHeading
                      label="Active"
                      count={visibleActive.length}
                    />
                  )}
                  <Box sx={GRID_SX}>
                    {visibleActive.map((user) => (
                      <UserCard
                        key={user.id}
                        user={user}
                        mode="active"
                        onAction={() =>
                          dispatch({ type: "remove", payload: user.id })
                        }
                      />
                    ))}
                  </Box>
                </Stack>
              )}
              {visibleRemoved.length > 0 && (
                <Stack spacing={2}>
                  <SectionHeading
                    label="Removed"
                    count={visibleRemoved.length}
                  />
                  <Box sx={GRID_SX}>
                    {visibleRemoved.map((user) => (
                      <UserCard
                        key={user.id}
                        user={user}
                        mode="removed"
                        onAction={() =>
                          dispatch({ type: "restore", payload: user.id })
                        }
                      />
                    ))}
                  </Box>
                </Stack>
              )}
            </Stack>
          ) : (
            <EmptyState
              isSearching={isSearching}
              allRemoved={allRemoved}
              onClearSearch={() => setSearch("")}
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
};
