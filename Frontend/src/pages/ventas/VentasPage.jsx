import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  FileText,
  ShoppingCart,
  CircleDollarSign,
  Clock,
  Eye,
} from "lucide-react";

const ventas = [
  {
    id: "VT001",
    cliente: "Juan Pérez",
    vehiculo: "Jeep Compass 2021 4x2 AT",
    tipo: "Usado",
    fecha: "28/02/2026",
    total: "$2.120.000",
    estado: "Boleto generado",
  },
  {
    id: "VT002",
    cliente: "Transportes ABC S.A.",
    vehiculo: "Toyota Hilux 0km",
    tipo: "0km",
    fecha: "12/03/2026",
    total: "$52.000.000",
    estado: "Pendiente boleto",
  },
];

export default function VentasPage() {
  return (
    <section className="w-full">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3263]">
            Gestión de Ventas
          </h1>
          <p className="text-[#357eb8]">
            Registrá operaciones y generá boletos de compra venta.
          </p>
        </div>

        <Link
          to="/ventas/nueva"
          className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white shadow hover:bg-[#219b8f]"
        >
          <Plus size={18} />
          Nueva Venta
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="Total Ventas" value="2" icon={ShoppingCart} />
        <MetricCard title="Boletos Generados" value="1" icon={FileText} highlight />
        <MetricCard title="Pendientes" value="1" icon={Clock} warning />
        <MetricCard title="Monto Total" value="$54.1M" icon={CircleDollarSign} />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">Listado de Ventas</h2>
        </div>

        <div className="p-6">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />
              <input
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar por cliente, vehículo o ID..."
              />
            </div>

            <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
              <option>Todos los tipos</option>
              <option>Usado</option>
              <option>0km</option>
            </select>

            <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
              <option>Todos los estados</option>
              <option>Boleto generado</option>
              <option>Pendiente boleto</option>
            </select>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#acbac4]/60">
            <table className="w-full text-left">
              <thead className="bg-[#acbac4]/20 text-[#1a3263]">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Vehículo</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-center">Boleto</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {ventas.map((venta) => (
                  <tr
                    key={venta.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-medium">{venta.id}</td>
                    <td className="p-4 font-semibold">{venta.cliente}</td>
                    <td className="p-4 text-[#357eb8]">{venta.vehiculo}</td>
                    <td className="p-4">
                      <span className="rounded-lg border border-[#acbac4] px-3 py-1 text-sm">
                        {venta.tipo}
                      </span>
                    </td>
                    <td className="p-4">{venta.fecha}</td>
                    <td className="p-4 font-semibold">{venta.total}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-lg px-3 py-1 text-sm font-medium ${
                          venta.estado === "Boleto generado"
                            ? "bg-[#26aa9c]/15 text-[#1b7f75]"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {venta.estado}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <IconLink
                          title="Previsualizar boleto"
                          to={`/ventas/${venta.id}/boleto`}
                        >
                          <Eye size={18} />
                        </IconLink>
                      </div>
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

function IconLink({ children, title, to }) {
  return (
    <Link
      to={to}
      title={title}
      aria-label={title}
      className="group relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#357eb8] text-[#357eb8] transition hover:bg-[#357eb8]/10"
    >
      {children}

      <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1a3263] px-2 py-1 text-xs font-semibold text-white opacity-0 shadow transition group-hover:opacity-100">
        {title}
      </span>
    </Link>
  );
}

function MetricCard({ title, value, icon: Icon, highlight = false, warning = false }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/40 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#357eb8]">{title}</p>
          <p
            className={`mt-2 text-3xl font-bold ${
              highlight
                ? "text-[#26aa9c]"
                : warning
                ? "text-yellow-600"
                : "text-[#1a3263]"
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