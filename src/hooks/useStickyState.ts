import { useEffect, useState } from "react";

export const useStickyState = (defaultValue: unknown, key: string) => {
  const [value, setValue] = useState(() => {
    const stickyState = window.localStorage.getItem(key);

    return stickyState !== null ? JSON.parse(stickyState) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
