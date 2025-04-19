import { useState } from "react";
import "./App.css";
import { DialogProvider } from "./components/dialog/DialogProvider";
import { Dialog } from "./components/dialog/Dialog";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DialogProvider>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-500 text-black rounded cursor-pointer"
        >
          Open Dialog
        </button>

        <Dialog open={open} setOpen={setOpen}>
          <h2 className="text-lg font-bold mb-4">Custom Dialog</h2>
          <p>This is a dialog built from scratch!</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </Dialog>
      </DialogProvider>
    </>
  );
}

export default App;
