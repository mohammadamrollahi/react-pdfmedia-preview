import { ReactNode, createContext, useContext } from "react";

const DialogContext = createContext(null);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  return (
    <DialogContext.Provider value={null}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => useContext(DialogContext);
