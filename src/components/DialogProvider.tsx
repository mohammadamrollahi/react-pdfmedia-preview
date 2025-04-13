// components/DialogContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";

const DialogContext = createContext<any>(null);

export const useDialog = () => useContext(DialogContext);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<React.ReactNode>(null);
  const [mounted, setMounted] = useState(false); // 💡 Important for Vite/SSR

  useEffect(() => {
    setMounted(true); // Now we can access document.body
  }, []);

  const openDialog = (dialogContent: React.ReactNode) =>
    setContent(dialogContent);
  const closeDialog = () => setContent(null);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog}}>
      {children}
      {mounted &&
        content &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
            onClick={closeDialog}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{
                // backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                minWidth: "300px",
                position: "relative",
              }}
            >
              {content}
            </div>
          </div>,
          document.body
        )}
    </DialogContext.Provider>
  );
};
