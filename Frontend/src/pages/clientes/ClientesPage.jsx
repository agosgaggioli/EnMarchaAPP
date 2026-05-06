import { Link } from "react-router-dom";
import { Plus, Search, Users, Building2, ShoppingCart } from "lucide-react";

export default function ClientesPage() {
  return (
    <section className="w-full">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3263]">
            Gestión de Clientes
          </h1>
          <p className="text-[#357eb8]">Administra la cartera de clientes</p>
        </div>

        <Link
          to="/clientes/nuevo"
          className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white shadow hover:bg-[#219b8f]"
        >
          <Plus size={18} />
          Agregar Cliente
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="Total Clientes" value="3" icon={Users} />
        <MetricCard title="Activos" value="3" icon={Users} highlight />
        <MetricCard title="Empresas" value="1" icon={Building2} />
        <MetricCard title="Total Ventas" value="3" icon={ShoppingCart} />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Listado de Clientes
          </h2>
        </div>

        <div className="p-6">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />
              <input
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar por nombre, email o ID..."
              />
            </div>

            <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
              <option>Todos</option>
              <option>Persona Humana</option>
              <option>Persona Jurídica</option>
            </select>

            <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
              <option>Todos</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>

            <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
              <option>Todos</option>
              <option>Al dia</option>
              <option>Deudor</option>
            </select>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#acbac4]/60">
            <table className="w-full text-left">
              <thead className="bg-[#acbac4]/20 text-[#1a3263]">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Contacto</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Ventas</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Estado de cuenta</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {clientes.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-medium">{cliente.id}</td>
                    <td className="p-4 font-semibold">{cliente.nombre}</td>
                    <td className="p-4 text-[#357eb8]">
                      <p>{cliente.email}</p>
                      <p>{cliente.telefono}</p>
                    </td>
                    <td className="p-4">
                      <span className="rounded-lg border border-[#acbac4] px-3 py-1 text-sm">
                        {cliente.tipo}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">{cliente.compras}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-lg px-3 py-1 text-sm font-medium ${
                          cliente.estado === "Activo"
                            ? "bg-[#26aa9c]/15 text-[#1b7f75]"
                            : "bg-[#acbac4]/25 text-[#1a3263]"
                        }`}
                      >
                        {cliente.estado}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`rounded-lg px-3 py-1 text-sm font-medium ${
                          cliente.estadoCuenta === "Al dia"
                            ? "bg-[#26aa9c]/15 text-[#1b7f75]"
                            : "bg-[#acbac4]/25 text-[#1a3263]"
                        }`}
                      >
                        {cliente.estadoCuenta}
                      </span>
                    </td>
                    <td className="p-4 font-bold">...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ title, value, icon: Icon, highlight = false }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/40 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#357eb8]">{title}</p>
          <p
            className={`mt-2 text-3xl font-bold ${
              highlight ? "text-[#26aa9c]" : "text-[#1a3263]"
            }`}
          >
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#acbac4]/25 text-[#1a3263]">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

const clientes = [
  {
    id: "CL001",
    nombre: "Juan Pérez",
    email: "juan.perez@email.com",
    telefono: "+54 11 1234-5678",
    tipo: "Persona Humana",
    compras: 2,
    estado: "Activo",
    estadoCuenta: "Deudor",
  },
  {
    id: "CL002",
    nombre: "María García",
    email: "maria.garcia@email.com",
    telefono: "+54 11 2345-6789",
    tipo: "Persona Humana",
    compras: 5,
    estado: "Activo",
    estadoCuenta: "Al dia",
  },
  {
    id: "CL003",
    nombre: "Transportes ABC S.A.",
    email: "compras@transportesabc.com",
    telefono: "+54 11 5678-9012",
    tipo: "Persona Jurídica",
    compras: 12,
    estado: "Activo",
    estadoCuenta: "Al dia",
  },
];