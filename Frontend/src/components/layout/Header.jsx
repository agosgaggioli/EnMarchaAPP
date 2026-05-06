import { Bell, LogOut, User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-[72px] w-full items-center justify-between border-b border-[#acbac4] bg-white px-8">
      <div>
        <h1 className="text-xl font-bold text-[#1a3263]">En Marcha</h1>
        <p className="text-sm text-[#357eb8]">Sistema de gestión automotriz</p>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative rounded-full p-2 hover:bg-[#acbac4]/20">
          <Bell size={21} className="text-[#1a3263]" />
          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#26aa9c]" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26aa9c] text-white">
            <User size={20} />
          </div>

          <div className="leading-tight">
            <p className="font-semibold text-[#1a3263]">Admin Usuario</p>
            <p className="text-sm text-[#357eb8]">Administrador</p>
          </div>
        </div>

        <button className="rounded-full p-2 hover:bg-[#acbac4]/20">
          <LogOut size={21} className="text-[#1a3263]" />
        </button>
      </div>
    </header>
  );
}