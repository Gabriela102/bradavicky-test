// Zjednodušená verze – celý test by se vešel sem, ale pro přehlednost dáváme minimum
export default function Home() {
  return (
    <div style={{ backgroundImage: "url('/hogwarts-hall.jpg')" }} className="min-h-screen bg-cover bg-center p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold bg-white/70 p-4 rounded-xl shadow-xl">✨ Kouzelný rozřazovací test ✨</h1>
      <p className="mt-4 text-white text-sm">Kompletní verze testu bude zobrazena zde...</p>
    </div>
  );
}
