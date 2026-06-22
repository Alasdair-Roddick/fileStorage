import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/home/page";
import AddUser from "./pages/addUser/page";
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/add-user" element={<AddUser />}/>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
