import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#f4f7f9]">
      <Header />

      <div className="flex w-full">
        <Sidebar />

        <main className="min-h-[calc(100vh-72px)] flex-1 overflow-x-hidden bg-[#f4f7f9] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}