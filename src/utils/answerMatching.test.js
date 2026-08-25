import { evaluateGuess, normalizeGuess } from "./answerMatching";

const photo = (name, korean) => ({ name, korean });

test("accepts a common English pronunciation for Tzuyu", () => {
  expect(evaluateGuess(["Chewy"], photo("Tzuyu")).accepted).toBe(true);
});

test("accepts spaced romanized pronunciation variants", () => {
  expect(evaluateGuess(["I think it is Chay Won"], photo("Chaewon")).accepted).toBe(true);
});

test("accepts a common English spelling returned by recognition", () => {
  expect(evaluateGuess(["Jenny"], photo("Jennie", "jeni")).accepted).toBe(true);
});

test("does not accept a different celebrity", () => {
  expect(evaluateGuess(["Ariana Grande"], photo("Jennie", "jeni")).accepted).toBe(false);
});

test("normalizes filler words and punctuation", () => {
  expect(normalizeGuess("That's Rosé!")).toBe("rose");
});
