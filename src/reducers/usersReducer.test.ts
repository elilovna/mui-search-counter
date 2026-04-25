import type { Address, RawUser, User } from "../types";
import {
  createInitialUsersState,
  makeUserId,
  usersReducer,
} from "./usersReducer";

const addr: Address = {
  street: "s",
  suite: "a",
  city: "c",
  zipcode: "z",
  geo: { lat: "0", lng: "0" },
};

const rawUser = (overrides: Partial<RawUser>): RawUser => ({
  id: 1,
  name: "n",
  username: "u",
  email: "e",
  age: 30,
  address: addr,
  phone: "p",
  website: "w",
  company: { name: "Acme", catchPhrase: "", bs: "" },
  ...overrides,
});

describe("createInitialUsersState", () => {
  it("drops users under 18", () => {
    const source: RawUser[] = [
      rawUser({ id: 1, username: "teen", age: 17 }),
      rawUser({ id: 2, username: "adult", age: 18 }),
    ];
    const state = createInitialUsersState(source);
    expect(state.active).toHaveLength(1);
    expect(state.active[0]?.username).toBe("adult");
  });

  it("keeps only username, address, age, companyName, id", () => {
    const source: RawUser[] = [
      rawUser({
        username: "alice",
        age: 25,
        company: { name: "Globex", catchPhrase: "", bs: "" },
      }),
    ];
    const state = createInitialUsersState(source);
    const [u] = state.active;
    if (!u) throw new Error("expected a user");
    expect(Object.keys(u).sort()).toEqual(
      ["address", "age", "companyName", "id", "username"].sort(),
    );
    expect(u.companyName).toBe("Globex");
  });

  it("sorts by age asc, then by companyName asc", () => {
    const source: RawUser[] = [
      rawUser({
        username: "c",
        age: 30,
        company: { name: "Zeta", catchPhrase: "", bs: "" },
      }),
      rawUser({
        username: "a",
        age: 20,
        company: { name: "Bravo", catchPhrase: "", bs: "" },
      }),
      rawUser({
        username: "b",
        age: 30,
        company: { name: "Alpha", catchPhrase: "", bs: "" },
      }),
    ];
    const state = createInitialUsersState(source);
    expect(state.active.map((u) => u.username)).toEqual(["a", "b", "c"]);
  });

  it("starts with an empty removed list", () => {
    const state = createInitialUsersState([]);
    expect(state.removed).toEqual([]);
  });
});

describe("makeUserId", () => {
  it("emits 6 characters from the allowed alphabet", () => {
    for (let i = 0; i < 50; i++) {
      expect(makeUserId()).toMatch(/^[ABCDEF123456]{6}$/);
    }
  });
});

const user = (id: string, overrides: Partial<User> = {}): User => ({
  id,
  username: "u",
  age: 30,
  companyName: "Acme",
  address: addr,
  ...overrides,
});

describe("usersReducer", () => {
  it("remove moves a user from active to removed", () => {
    const state = { active: [user("A"), user("B")], removed: [] };
    const next = usersReducer(state, { type: "remove", payload: "A" });
    expect(next.active.map((u) => u.id)).toEqual(["B"]);
    expect(next.removed.map((u) => u.id)).toEqual(["A"]);
  });

  it("remove is a no-op for unknown ids", () => {
    const state = { active: [user("A")], removed: [] };
    expect(usersReducer(state, { type: "remove", payload: "Z" })).toBe(state);
  });

  it("restore moves a user back and keeps active sorted", () => {
    const state = {
      active: [user("B", { age: 25 }), user("C", { age: 40 })],
      removed: [user("A", { age: 30 })],
    };
    const next = usersReducer(state, { type: "restore", payload: "A" });
    expect(next.active.map((u) => u.id)).toEqual(["B", "A", "C"]);
    expect(next.removed).toEqual([]);
  });

  it("throws on unknown action", () => {
    expect(() =>
      usersReducer(
        { active: [], removed: [] },
        // @ts-expect-error — deliberately invalid
        { type: "bogus", payload: "x" },
      ),
    ).toThrow();
  });
});
