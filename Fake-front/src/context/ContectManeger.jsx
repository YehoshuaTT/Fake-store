import { useState } from "react";
import ImageContext from "./ImageContext";
import UserContext from "./UserContext";

export const ContextProvider = ({ user, setUser, children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const [afterISP, setAfterISP] = useState(afterISPTemp);
  const [beforeISP, setBeforeISP] = useState(beforeISPTemp);
  const [currentImages, setCurrentImages] = useState();

  return (
    <UserContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
      <ImageContext.Provider
        value={{
          afterISP,
          setAfterISP,
          beforeISP,
          setBeforeISP,
          currentImages,
          setCurrentImages,
        }}
      >
        {children}
      </ImageContext.Provider>
    </UserContext.Provider>
  );
};
