import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QRCodePage from "./pages/QRCodePage";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/qrcode" element={<QRCodePage />} />
		</Routes>
	);
}
