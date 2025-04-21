import { useState } from "react";
import "./App.css";
import {ReactPreview} from "./components/Preview/ReactPreview";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={()=>setOpen(true)}>
        open dialog
      </button>
      <ReactPreview
        open={open}
        setOpen={setOpen}
        url="https://apollo.omaxplatform.com/app/api/v1/buckets/amian/files/b754b6e0-b033-4a67-95ac-47911b1d999e.png"
      />
    </>
  );
}

export default App;
