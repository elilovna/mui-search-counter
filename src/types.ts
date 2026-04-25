export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type RawUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  age: number;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export type User = {
  id: string;
  username: string;
  age: number;
  companyName: string;
  address: Address;
};

export type CountState = { count: number };

export type CountAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "incrementRandom" }
  | { type: "nextOdd" }
  | { type: "subtractInput"; payload: number }
  | { type: "reset" };

export type UsersState = { active: User[]; removed: User[] };

export type UsersAction =
  | { type: "remove"; payload: string }
  | { type: "restore"; payload: string };
