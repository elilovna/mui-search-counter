import type { RawUser, User, UsersAction, UsersState } from "../types";
import { assertNever } from "./assertNever";

const ID_CHARS = "ABCDEF123456";

export const makeUserId = (): string =>
  Array.from(
    { length: 6 },
    () => ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)],
  ).join("");

const sortUsers = (list: User[]): User[] =>
  [...list].sort((a, b) => {
    if (a.age !== b.age) return a.age - b.age;
    return a.companyName.localeCompare(b.companyName, "en", {
      sensitivity: "base",
    });
  });

export const createInitialUsersState = (source: RawUser[]): UsersState => {
  const mapped = source
    .filter((u) => u.age >= 18)
    .map<User>((u) => ({
      id: makeUserId(),
      username: u.username,
      age: u.age,
      companyName: u.company.name,
      address: u.address,
    }));
  return { active: sortUsers(mapped), removed: [] };
};

export const usersReducer = (
  state: UsersState,
  action: UsersAction,
): UsersState => {
  switch (action.type) {
    case "remove": {
      const target = state.active.find((u) => u.id === action.payload);
      if (!target) return state;
      return {
        active: state.active.filter((u) => u.id !== action.payload),
        removed: [...state.removed, target],
      };
    }
    case "restore": {
      const target = state.removed.find((u) => u.id === action.payload);
      if (!target) return state;
      return {
        active: sortUsers([...state.active, target]),
        removed: state.removed.filter((u) => u.id !== action.payload),
      };
    }
    default:
      return assertNever(action);
  }
};
