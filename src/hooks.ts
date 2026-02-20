import { useEffect, useState } from "react";

type UseLocalStorageProps<T> = {
  initialValue: T;
  key: string;
};

export function useLocalStorage<T>({
  initialValue,
  key,
}: UseLocalStorageProps<T>) {
  const [value, setValue] = useState<T>(getLocalStorageItem(key, initialValue));

  useEffect(() => {
    setLocalStorageItem(key, value);
  }, [value, key]);

  return { value, setValue };
}

function getLocalStorageItem<T>(key: string, initialValue: T): T {
  const raw = localStorage.getItem(key);
  if (raw === null) {
    return initialValue;
  }
  return JSON.parse(raw);
}

function setLocalStorageItem<T>(key: string, value: T) {
  const zipped = JSON.stringify(value);
  localStorage.setItem(key, zipped);
}
