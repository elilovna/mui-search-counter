import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  type ChangeEvent,
  type KeyboardEvent,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  counterReducer,
  initialCounterState,
} from "../reducers/counterReducer";

const NeutralButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderColor: theme.palette.divider,
  "&:hover": {
    borderColor: theme.palette.text.secondary,
    backgroundColor: theme.palette.action.hover,
  },
}));

export const CounterPanel = () => {
  const [state, dispatch] = useReducer(counterReducer, initialCounterState);
  const [numberInput, setNumberInput] = useState("");
  const amountRef = useRef<HTMLInputElement | null>(null);

  const atZero = state.count === 0;

  const handleSubtract = () => {
    const amount = parseInt(numberInput, 10);
    if (!amount) {
      amountRef.current?.focus();
      return;
    }
    dispatch({ type: "subtractInput", payload: amount });
    setNumberInput("");
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    setNumberInput("");
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "" || /^\d+$/.test(value)) setNumberInput(value);
  };

  const handleAmountKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSubtract();
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: { xs: 4, md: 5 },
        textAlign: "center",
      }}
    >
      <Typography variant="overline">Counter</Typography>

      <Typography
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Counter value ${state.count}`}
        sx={{
          fontWeight: 800,
          color: "primary.main",
          fontSize: { xs: 72, md: 96 },
          lineHeight: 1,
          mt: 1,
        }}
      >
        {state.count}
      </Typography>

      <Stack
        direction="row"
        spacing={1.5}
        useFlexGap
        sx={{ flexWrap: "wrap", justifyContent: "center", mt: 4 }}
      >
        <NeutralButton
          variant="outlined"
          startIcon={<RemoveIcon />}
          onClick={() => dispatch({ type: "decrement" })}
          disabled={atZero}
        >
          Decrement
        </NeutralButton>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => dispatch({ type: "increment" })}
        >
          Increment
        </Button>
        <NeutralButton
          variant="outlined"
          startIcon={<ShuffleIcon />}
          onClick={() => dispatch({ type: "incrementRandom" })}
        >
          +Random
        </NeutralButton>
        <NeutralButton
          variant="outlined"
          startIcon={<ArrowForwardIcon />}
          onClick={() => dispatch({ type: "nextOdd" })}
        >
          Next Odd
        </NeutralButton>
        <Button
          variant="outlined"
          color="error"
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
          disabled={atZero}
        >
          Reset
        </Button>
      </Stack>

      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: "center", justifyContent: "center", mt: 2 }}
      >
        <TextField
          type="text"
          size="small"
          label="Amount"
          value={numberInput}
          onChange={handleAmountChange}
          onKeyDown={handleAmountKeyDown}
          inputRef={amountRef}
          disabled={atZero}
          sx={{ width: 130 }}
          slotProps={{
            htmlInput: {
              "aria-label": "subtract amount",
              inputMode: "numeric",
              pattern: "[0-9]*",
            },
          }}
        />
        <NeutralButton
          variant="outlined"
          startIcon={<BackspaceOutlinedIcon />}
          onClick={handleSubtract}
          disabled={atZero}
        >
          Subtract
        </NeutralButton>
      </Stack>
    </Paper>
  );
};
