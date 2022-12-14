import All from "./Components/All";
import Pending from "./Components/Pending";
import Completed from "./Components/Completed";
import Inprogress from "./Components/Inprogress";
import Test from "./Components/Test";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<All />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/pending" element={<Pending />}></Route>
        <Route path="/completed" element={<Completed />}></Route>
        <Route path="/inProgress" element={<Inprogress />}></Route>
      </Routes>
      ;
    </>
  );
}

export default App;
