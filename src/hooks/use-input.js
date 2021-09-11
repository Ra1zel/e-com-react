import React from "react";
import { useState } from "react";
const useInput = () => {
  const [isTouched, setIsTouched] = useState();
  const [isValueValid, setIsValueValid] = useState();
  setIsTouched();
};

export default useInput;
