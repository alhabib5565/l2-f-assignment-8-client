import { useEffect, useState } from "react";

const useDebounce = (value: string, dealy: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handleDebounce = setInterval(() => {
      setDebouncedValue(value);
    }, dealy);

    return () => clearInterval(handleDebounce);
  }, [value, dealy]);

  return debouncedValue;
};

export default useDebounce;
