import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { SharedLayout } from "./layouts/SharedLayout";

function App() {
  const router = createBrowserRouter( 
    createRoutesFromElements(
      <>
        <Route path="/" element={<SharedLayout />}></Route>
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
