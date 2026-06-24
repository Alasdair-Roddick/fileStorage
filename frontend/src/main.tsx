import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/home/page";
import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/navbar";
import { ClerkProvider, SignIn, RedirectToSignIn, Show } from "@clerk/react";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/sign-in">
			<BrowserRouter>
				<Routes>
					<Route path="/sign-in/*" element={
						<div className="min-h-screen bg-zinc-50 flex items-center justify-center">
							<SignIn routing="path" path="/sign-in" />
						</div>
					}/>
					<Route path="/*" element={
						<>
							<Show when="signed-in">
								<div className="flex flex-col h-screen bg-zinc-50">
									<NavBar />
									<main className="flex-1 overflow-auto">
										<Routes>
											<Route path="/" element={<Home />}/>
										</Routes>
									</main>
								</div>
							</Show>
							<Show when="signed-out">
								<RedirectToSignIn />
							</Show>
						</>
					}/>
				</Routes>
			</BrowserRouter>
		</ClerkProvider>
	</StrictMode>,
);
