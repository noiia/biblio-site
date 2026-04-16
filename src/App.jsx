import { useState } from "react";
import Card from "./components/ui/card/card";
import CardContent from "./components/ui/card/cardContent";
import Input from "./components/ui/input/input";
import Button from "./components/ui/button/button";
import { bibliography, sitography, visuals } from "./data/bibliography";

function highlight(text, query) {
	if (!query) return text;

	const parts = text.split(new RegExp(`(${query})`, "gi"));

	return parts.map((part, i) =>
		part.toLowerCase() === query.toLowerCase() ? (
			<span key={i} className="bg-yellow-200 px-0.5 rounded">
				{part}
			</span>
		) : (
			part
		),
	);
}

function Logo() {
	return (
		<div className="flex items-center gap-2">
			<div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-900 text-white">
				📚
			</div>
			<span className="font-semibold text-lg tracking-tight">
				Bibliographie ADS - Edwin Lecomte
			</span>
		</div>
	);
}

// emoji mapping
function getEmoji(type) {
	switch (type) {
		case "book":
			return "📘";
		case "web":
			return "🌐";
		case "visual":
			return "🖼️";
		default:
			return "📄";
	}
}

// generic card renderer
function RenderCard({ item, search, emoji }) {
	return (
		<Card>
			<CardContent className="p-4 flex justify-between items-start">
				<div>
					<div className="text-lg font-medium">
						{highlight(item.title, search)}
					</div>

					{item.author || item.authors ? (
						<div className="text-sm text-gray-600">
							{item.author || item.authors?.join(", ")} •{" "}
							{item.year || item.published}
						</div>
					) : null}

					{item.source || item.publisher ? (
						<div className="text-sm text-gray-500">
							{item.source || item.publisher}
						</div>
					) : null}
				</div>

				<div className="text-2xl ml-4">{emoji}</div>
			</CardContent>
		</Card>
	);
}

export default function App() {
	const [search, setSearch] = useState("");

	const filterData = (data) =>
		data.filter((e) =>
			Object.values(e).join(" ").toLowerCase().includes(search.toLowerCase()),
		);

	const filteredBib = filterData(bibliography);
	const filteredSit = filterData(sitography);
	const filteredVis = filterData(visuals);

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto space-y-8">
				{/* HEADER */}
				<div className="flex items-center justify-between mb-6">
					<Logo />
				</div>

				{/* SEARCH */}
				<div className="flex gap-2">
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search across all sources..."
					/>
					<Button>🔍</Button>
				</div>

				{/* 📘 BIBLIOGRAPHIE */}
				<div className="space-y-3">
					<h2 className="text-xl font-semibold">📘 Bibliographie</h2>
					{filteredBib.map((item, i) => (
						<RenderCard key={i} item={item} search={search} emoji="📘" />
					))}
				</div>

				{/* 🌐 SITOGRAPHIE */}
				<div className="space-y-3">
					<h2 className="text-xl font-semibold">🌐 Sitographie</h2>
					{filteredSit.map((item, i) => (
						<RenderCard key={i} item={item} search={search} emoji="🌐" />
					))}
				</div>

				{/* 🖼️ VISUELS */}
				<div className="space-y-3">
					<h2 className="text-xl font-semibold">🖼️ Visuels</h2>
					{filteredVis.map((item, i) => (
						<RenderCard key={i} item={item} search={search} emoji="🖼️" />
					))}
				</div>
			</div>
		</div>
	);
}
