import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Button, Stack, Typography } from "@mui/material";

type EmptyStateProps = {
  isSearching: boolean;
  allRemoved: boolean;
  onClearSearch: () => void;
};

export const EmptyState = ({
  isSearching,
  allRemoved,
  onClearSearch,
}: EmptyStateProps) => {
  if (isSearching) {
    return (
      <Stack spacing={1.5} sx={{ alignItems: "center", py: 8 }}>
        <SentimentDissatisfiedIcon
          sx={{ fontSize: 56, color: "text.disabled" }}
        />
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          {"No users match your search"}
        </Typography>
        <Button onClick={onClearSearch} variant="text">
          {"Clear search"}
        </Button>
      </Stack>
    );
  }
  if (allRemoved) {
    return (
      <Stack spacing={1.5} sx={{ alignItems: "center", py: 8 }}>
        <PersonOffOutlinedIcon sx={{ fontSize: 56, color: "text.disabled" }} />
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          {"All users removed"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.disabled" }}>
          {"Search by username to find and restore them."}
        </Typography>
      </Stack>
    );
  }
  return (
    <Stack spacing={1.5} sx={{ alignItems: "center", py: 8 }}>
      <SentimentDissatisfiedIcon
        sx={{ fontSize: 56, color: "text.disabled" }}
      />
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        {"No users"}
      </Typography>
    </Stack>
  );
};
