import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
}
