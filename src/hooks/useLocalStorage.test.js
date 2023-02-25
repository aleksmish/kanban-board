import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage.js";

test("useLocalStorage should set the initial value correctly", () => {
  const initialValue = "test value";
  const { result } = renderHook(() =>
    useLocalStorage("test-key", initialValue)
  );
  console.log(result);
  expect(result.current[0]).toBe(initialValue);
});
