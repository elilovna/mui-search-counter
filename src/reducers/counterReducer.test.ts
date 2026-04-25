import { vi } from "vitest";
import { counterReducer, initialCounterState } from "./counterReducer";

describe("counterReducer", () => {
  it("increments from the initial state", () => {
    expect(counterReducer(initialCounterState, { type: "increment" })).toEqual({
      count: 1,
    });
  });

  it("clamps decrement at zero", () => {
    expect(counterReducer({ count: 0 }, { type: "decrement" })).toEqual({
      count: 0,
    });
  });

  it("clamps subtractInput at zero", () => {
    expect(
      counterReducer({ count: 3 }, { type: "subtractInput", payload: 10 }),
    ).toEqual({ count: 0 });
  });

  it("resets to zero", () => {
    expect(counterReducer({ count: 42 }, { type: "reset" })).toEqual({
      count: 0,
    });
  });

  describe("nextOdd", () => {
    it.each([
      [0, 1],
      [1, 3],
      [2, 3],
      [3, 5],
      [4, 5],
    ])("%i -> %i", (input, expected) => {
      expect(counterReducer({ count: input }, { type: "nextOdd" })).toEqual({
        count: expected,
      });
    });
  });

  describe("incrementRandom", () => {
    it("adds between 1 and 10 inclusive", () => {
      const spy = vi.spyOn(Math, "random");
      try {
        spy.mockReturnValue(0);
        expect(
          counterReducer({ count: 0 }, { type: "incrementRandom" }).count,
        ).toBe(1);
        spy.mockReturnValue(0.9999999);
        expect(
          counterReducer({ count: 0 }, { type: "incrementRandom" }).count,
        ).toBe(10);
      } finally {
        spy.mockRestore();
      }
    });
  });

  it("throws on unknown action", () => {
    expect(() =>
      // @ts-expect-error — deliberately invalid
      counterReducer({ count: 0 }, { type: "bogus" }),
    ).toThrow();
  });
});
