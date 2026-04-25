import { Stack, Typography } from "@mui/material";

type SectionHeadingProps = { label: string; count: number };

export const SectionHeading = ({ label, count }: SectionHeadingProps) => (
  <Stack direction="row" spacing={1.25} sx={{ alignItems: "baseline" }}>
    <Typography variant="overline">{label}</Typography>
    <Typography
      variant="body2"
      sx={{ color: "text.disabled", fontWeight: 600 }}
    >
      {count}
    </Typography>
  </Stack>
);
