import { Link } from "react-router";



export default function Home() {

	return (
		<div className="flex flex-col gap-4 justify-center bg-white items-center align-middle h-screen">
			<a href="/add-user">Add User</a>
		</div>
	);
}

