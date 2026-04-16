export default function Button({ children }) {
	return (
		<button className="px-3 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition">
			{children}
		</button>
	);
}
