import { useState } from "react";
import "./App.css";
import { DialogProvider } from "./components/dialog/DialogProvider";
import { Dialog } from "./components/dialog/Dialog";
import Preview from "./components/Preview/Preview";
import { Document, Page } from "react-pdf";

function App() {
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>open dilaog</button>
      {/* <DialogProvider>
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
      </DialogProvider> */}
      <Preview
        open={open}
        setOpen={setOpen}
        url="https://apollo.omaxplatform.com/app/api/v1/buckets/amian/files/46a4c7ab-fa05-40f7-a86e-417bf6d0670c.pdf"
      />
      {/* <Document
        file={
          "https://apollo.omaxplatform.com/app/api/v1/buckets/amian/files/46a4c7ab-fa05-40f7-a86e-417bf6d0670c.pdf"
        }
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />

      </Document> */}
    </>
  );
}

export default App;
