import { toggleSimulator } from "features/layout";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useToggler = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const toggleCheck = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  useEffect(() => {
    dispatch(toggleSimulator(checked));

    return () => {};
  }, [checked, dispatch]);

  return { checked, toggleCheck };
};

export default useToggler;
