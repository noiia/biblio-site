export default function Input(props) {
	return (
		<input
			{...props}
			className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200 h-12"
		/>
	);
}
