import { useContext } from "react";

import { NubankContext } from "@/app/NubankContext";

const useNubankContext = () => {
  return useContext(NubankContext);
}

export default useNubankContext;