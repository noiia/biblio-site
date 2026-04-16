import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import Button from "../components/ui/button/button";
import { Link } from "react-router-dom";

export default function QRCodePage() {
	const canvasRef = useRef(null);

	const generateQR = async () => {
		const url = window.location.origin;

		await QRCode.toCanvas(canvasRef.current, url, {
			width: 300,
		});
	};

	const copyQR = async () => {
		const canvas = canvasRef.current;

		canvas.toBlob(async (blob) => {
			await navigator.clipboard.write([
				new ClipboardItem({
					"image/png": blob,
				}),
			]);
			alert("QR code copié !");
		});
	};

	const downloadQR = () => {
		const canvas = canvasRef.current;
		const link = document.createElement("a");

		link.download = "qrcode.png";
		link.href = canvas.toDataURL();
		link.click();
	};

	useEffect(() => {
		generateQR();
	}, []);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 p-6">
			<h1 className="text-2xl font-semibold">QR Code du site</h1>

			<canvas ref={canvasRef} className="bg-white p-4 rounded-xl shadow" />

			<div className="flex gap-3">
				<Button onClick={copyQR}>📋 Copier</Button>
				<Button onClick={downloadQR}>⬇️ Télécharger</Button>
			</div>

			<Link to="/">
				<Button>⬅️ Retour</Button>
			</Link>
		</div>
	);
}
