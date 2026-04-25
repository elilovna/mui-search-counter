import BusinessIcon from "@mui/icons-material/BusinessOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { styled, type Theme } from "@mui/material/styles";

import type { User } from "../types";

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 56,
  height: 56,
  fontSize: 22,
  fontWeight: 700,
  backgroundColor: theme.palette.warning.main,
}));

type UserCardProps = {
  user: User;
  mode: "active" | "removed";
  onAction: () => void;
};

export const UserCard = ({ user, mode, onAction }: UserCardProps) => {
  const isRemoved = mode === "removed";
  const { username, age, companyName, address, id } = user;

  const initial = username.charAt(0).toUpperCase();

  return (
    <Card
      sx={(theme: Theme) => ({
        opacity: isRemoved ? 0.6 : 1,
        filter: isRemoved ? "grayscale(0.7)" : "none",
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.shortest,
        }),
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[2],
        },
      })}
    >
      <CardHeader
        avatar={<UserAvatar>{initial}</UserAvatar>}
        title={
          <Typography
            variant="h6"
            title={username}
            sx={{
              fontWeight: 700,
              lineHeight: 1.1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {username}
          </Typography>
        }
        subheader={
          <Chip
            label={`Age ${age}`}
            size="small"
            color="success"
            sx={{ mt: 0.75, height: 24 }}
          />
        }
        action={
          isRemoved ? (
            <Button
              onClick={onAction}
              variant="outlined"
              color="success"
              size="small"
              startIcon={<RestoreIcon />}
            >
              {"Restore"}
            </Button>
          ) : (
            <Button
              onClick={onAction}
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteOutlineIcon />}
            >
              {"Remove"}
            </Button>
          )
        }
        sx={{
          p: 3,
          pb: 0,
          "& .MuiCardHeader-action": { m: 0, alignSelf: "flex-start" },
          "& .MuiCardHeader-content": { minWidth: 0 },
        }}
      />

      <CardContent sx={{ p: 3 }}>
        <Stack spacing={1.25} sx={{ color: "text.secondary" }}>
          <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
            <BusinessIcon fontSize="small" />
            <Typography variant="body1">{companyName}</Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1.25}
            sx={{ alignItems: "flex-start" }}
          >
            <LocationOnIcon fontSize="small" sx={{ mt: "2px" }} />
            <Box>
              <Typography variant="body1">
                {address.street}, {address.suite}
              </Typography>
              <Typography variant="body1">
                {address.city} · {address.zipcode}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2.5 }} />

        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {"ID"}
          </Typography>
          <Typography variant="mono">{id}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
