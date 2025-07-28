
export function Button({ children, ...props }) {
  return (
    <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full mb-2 text-left" {...props}>
      {children}
    </button>
  );
}
