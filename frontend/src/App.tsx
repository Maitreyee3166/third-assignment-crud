import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors position='top-right' closeButton />
      <RouterProvider router={Routes} />
    </>
  );
}

export default App;
