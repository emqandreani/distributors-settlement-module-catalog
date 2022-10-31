import React, { useCallback, useState } from "react";

const useSearchInput = () => {
  const [value, setValue] = useState<null | string>(null);
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value.trim().toLocaleLowerCase());
  }, []);

  return { value, handleSearch };
};

export default useSearchInput;
