export default function NavBar() {
    return (
        <nav className="bg-gray-600 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white text-lg font-bold">Admin Panel</div>
                <div>
                    <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    <a href="/add-user" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add User</a>
                    <a href="/logout" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</a>
                </div>
            </div>
        </nav>
    )
}