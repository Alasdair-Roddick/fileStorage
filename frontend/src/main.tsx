import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/home/page";
import AddUser from "./pages/addUser/page";
import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/navbar";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<div className="flex flex-col h-screen bg-zinc-50">
				<NavBar />
				<main className="flex-1 overflow-auto">
					<Routes>
						<Route path="/" element={<Home />}/>
						<Route path="/add-user" element={<AddUser />}/>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	</StrictMode>,
);
