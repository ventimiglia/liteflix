export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-secondary">
      <img
        src="./logo.svg"
        alt="Spinner"
        className="animate-ping h-1/3 w-1/3"
      />
    </div>
  );
}
