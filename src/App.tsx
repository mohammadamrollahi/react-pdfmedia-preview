import viteLogo from "/vite.svg";
import "./App.css";
import  { useDialog } from "./components/DialogProvider";

function App() {
  const { openDialog } = useDialog();

  return (
    <>
        <img
          src={viteLogo}
          className="logo"
          alt="Vite logo"
          onClick={() => openDialog(<div>modal</div>)}
        />
    </>
  );
}

export default App;
module.exports = App