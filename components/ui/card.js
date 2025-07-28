
export function Card({ children }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl">
      {children}
    </div>
  );
}
