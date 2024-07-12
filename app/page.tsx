import dynamic from "next/dynamic";
import "./common.scss"; // Ensure this is uncommented if CSS is needed globally

const ExcalidrawWithClientOnly = dynamic(
  () => import("./excalidrawWrapper").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ExcalidrawWithClientOnly />
    </div>
  );
}
