import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";

type SetState<T> = Dispatch<SetStateAction<T>>;
type JSON = string | number | boolean | null | JSON[] | { [key: string]: JSON };

export const useLocalStorage = <K extends JSON>(key: string, initialValue: K): [K, SetState<K>] => {
  const [storedValue, setStoredValue] = useState<K>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback((action: SetStateAction<K>) => {
    if (typeof action === "function") {
      setStoredValue((prev) => {
        const act = action(prev);
        localStorage.setItem(key, JSON.stringify(act));
        return act;
      });
    } else {
      setStoredValue(action);
      localStorage.setItem(key, JSON.stringify(action));
    }
  }, []);

  return [storedValue, setValue];
};
