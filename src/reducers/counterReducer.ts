import type { CountAction, CountState } from "../types";
import { assertNever } from "./assertNever";

const clamp = (count: number): number => (count < 0 ? 0 : count);

export const counterReducer = (
  state: CountState,
  action: CountAction,
): CountState => {
  switch (action.type) {
    case "increment":
      return { count: clamp(state.count + 1) };
    case "decrement":
      return { count: clamp(state.count - 1) };
    case "incrementRandom":
      return { count: clamp(state.count + Math.floor(Math.random() * 10) + 1) };
    case "nextOdd": {
      const base = clamp(state.count);
      const next = base % 2 === 1 ? base + 2 : base + 1;
      return { count: next };
    }
    case "subtractInput":
      return { count: clamp(state.count - action.payload) };
    case "reset":
      return { count: 0 };
    default:
      return assertNever(action);
  }
};

export const initialCounterState: CountState = { count: 0 };
