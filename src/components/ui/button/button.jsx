export default function Button({ children }) {
	return (
		<button className="w-full sm:w-auto px-4 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition text-base">
			{children}
		</button>
	);
}
