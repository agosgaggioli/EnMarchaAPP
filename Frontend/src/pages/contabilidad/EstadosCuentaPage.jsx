import { useState } from "react";
import {
  Search,
  Users,
  Building2,
  CircleDollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const clientes = [
  {
    id: "CL001",
    nombre: "Juan Pérez",
    tipo: "Cliente",
    concepto: "Venta Jeep Compass",
    totalOperacion: "$24.000.000",
    pagado: "$20.000.000",
    saldo: "$4.000.000",
    estado: "Con deuda",
  },
  {
    id: "CL002",
    nombre: "Transportes ABC S.A.",
    tipo: "Cliente",
    concepto: "Venta Toyota Hilux 0km",
    totalOperacion: "$52.000.000",
    pagado: "$52.000.000",
    saldo: "$0",
    estado: "Sin deuda",
  },
  {
    id: "CL003",
    nombre: "María García",
    tipo: "Cliente",
    concepto: "Venta Volkswagen Amarok",
    totalOperacion: "$18.500.000",
    pagado: "$10.000.000",
    saldo: "$8.500.000",
    estado: "Con deuda",
  },
];

const proveedores = [
  {
    id: "PR001",
    nombre: "Toyota Argentina",
    tipo: "Proveedor",
    concepto: "Compra Hilux SRV 2024",
    totalOperacion: "$52.000.000",
    pagado: "$30.000.000",
    saldo: "$22.000.000",
    estado: "Con deuda",
  },
  {
    id: "PR002",
    nombre: "Leandro Olivera",
    tipo: "Proveedor",
    concepto: "Órdenes de trabajo",
    totalOperacion: "$1.085.000",
    pagado: "$0",
    saldo: "$1.085.000",
    estado: "Con deuda",
  },
  {
    id: "PR003",
    nombre: "Chapa y Pintura Córdoba",
    tipo: "Proveedor",
    concepto: "Trabajos de taller",
    totalOperacion: "$420.000",
    pagado: "$420.000",
    saldo: "$0",
    estado: "Sin deuda",
  },
];

export default function EstadosCuentaPage() {
  const navigate = useNavigate();

  const [tipoFiltro, setTipoFiltro] = useState("Todos");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const movimientos = [...clientes, ...proveedores];

  const totalClientes = "$12.500.000";
  const totalProveedores = "$23.085.000";
  const saldoNeto = "-$10.585.000";

  const movimientosFiltrados = movimientos.filter((item) => {
    const texto =
      `${item.id} ${item.nombre} ${item.tipo} ${item.concepto}`.toLowerCase();

    const coincideBusqueda = texto.includes(busqueda.toLowerCase());
    const coincideTipo = tipoFiltro === "Todos" || item.tipo === tipoFiltro;
    const coincideEstado =
      estadoFiltro === "Todos" || item.estado === estadoFiltro;

    return coincideBusqueda && coincideTipo && coincideEstado;
  });

  return (
    <section className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a3263]">
          Estados de cuenta
        </h1>
        <p className="text-[#357eb8]">
          Vista consolidada de saldos pendientes de clientes y proveedores.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard
          title="Clientes por cobrar"
          value={totalClientes}
          icon={Users}
          highlight
        />
        <MetricCard
          title="Proveedores por pagar"
          value={totalProveedores}
          icon={Building2}
          danger
        />
        <MetricCard
          title="Saldo neto"
          value={saldoNeto}
          icon={CircleDollarSign}
          warning
        />
        <MetricCard
          title="Cuentas con deuda"
          value="4"
          icon={AlertTriangle}
          warning
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <ResumenCard
          title="Resumen clientes"
          icon={TrendingUp}
          color="green"
          items={[
            { label: "Total a cobrar", value: "$12.500.000" },
            { label: "Clientes con deuda", value: "2" },
            { label: "Clientes al día", value: "1" },
          ]}
        />

        <ResumenCard
          title="Resumen proveedores"
          icon={TrendingDown}
          color="red"
          items={[
            { label: "Total a pagar", value: "$23.085.000" },
            { label: "Proveedores con deuda", value: "2" },
            { label: "Proveedores al día", value: "1" },
          ]}
        />

        <div className="rounded-2xl border border-[#357eb8]/30 bg-[#357eb8]/10 p-6 text-[#1a3263]">
          <h2 className="mb-4 text-xl font-bold">Lectura rápida</h2>
          <p className="text-sm leading-6">
            El sistema muestra cuánto falta cobrar a clientes y cuánto falta
            pagar a proveedores. El saldo neto permite ver si la agencia está
            más comprometida en pagos o si tiene mayor monto pendiente de cobro.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Cuentas consolidadas
          </h2>
          <p className="text-sm text-[#357eb8]">
            Listado combinado de clientes y proveedores con saldo pendiente o
            cuenta saldada.
          </p>
        </div>

        <div className="p-6">
          <div className="mb-5 grid gap-4 md:grid-cols-[1fr_220px_220px]">
            <div className="flex items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar por cliente, proveedor, operación o ID..."
              />
            </div>

            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none"
            >
              <option>Todos</option>
              <option>Cliente</option>
              <option>Proveedor</option>
            </select>

            <select
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
              className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none"
            >
              <option>Todos</option>
              <option>Con deuda</option>
              <option>Sin deuda</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1200px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Concepto / Operación</th>
                  <th className="p-4">Total operación</th>
                  <th className="p-4">Pagado / Cobrado</th>
                  <th className="p-4">Saldo</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {movimientosFiltrados.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-bold">{item.id}</td>
                    <td className="p-4">
                      <TipoBadge tipo={item.tipo} />
                    </td>
                    <td className="p-4 font-semibold">{item.nombre}</td>
                    <td className="p-4">{item.concepto}</td>
                    <td className="p-4 font-semibold">{item.totalOperacion}</td>
                    <td className="p-4">{item.pagado}</td>
                    <td className="p-4 font-bold">{item.saldo}</td>
                    <td className="p-4">
                      <EstadoBadge estado={item.estado} />
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <IconButton
                          title="Ver estado de cuenta"
                          onClick={() =>
                            navigate(
                              item.tipo === "Cliente"
                                ? `/contabilidad/estados-cuenta/clientes/${item.id}`
                                : `/contabilidad/estados-cuenta/proveedores/${item.id}`
                            )
                          }
                        >
                          <Eye size={18} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl border border-[#357eb8]/30 bg-[#357eb8]/10 p-4 text-sm text-[#1a3263]">
            Este dashboard no reemplaza el Libro Diario: resume los saldos por
            persona o entidad. El detalle de movimientos contables se consulta en
            cada estado de cuenta individual.
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  highlight = false,
  warning = false,
  danger = false,
}) {
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
                : danger
                ? "text-red-600"
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

function ResumenCard({ title, icon: Icon, items, color }) {
  const styles = {
    green: "bg-[#26aa9c]/10 text-[#1b7f75]",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="rounded-2xl border border-[#acbac4]/50 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles[color]}`}
        >
          <Icon size={23} />
        </div>

        <h2 className="text-xl font-bold text-[#1a3263]">{title}</h2>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex justify-between border-b border-[#acbac4]/40 pb-3"
          >
            <span className="text-[#357eb8]">{item.label}</span>
            <span className="font-bold text-[#1a3263]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TipoBadge({ tipo }) {
  const styles = {
    Cliente: "bg-[#357eb8]/15 text-[#245f91]",
    Proveedor: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`rounded-lg px-3 py-1 text-sm font-semibold ${
        styles[tipo] || "bg-[#acbac4]/25 text-[#1a3263]"
      }`}
    >
      {tipo}
    </span>
  );
}

function EstadoBadge({ estado }) {
  const styles = {
    "Con deuda": "bg-red-100 text-red-700",
    "Sin deuda": "bg-[#26aa9c]/15 text-[#1b7f75]",
  };

  return (
    <span
      className={`rounded-lg px-3 py-1 text-sm font-semibold ${
        styles[estado] || "bg-[#acbac4]/25 text-[#1a3263]"
      }`}
    >
      {estado}
    </span>
  );
}

function IconButton({ children, title, onClick }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className="group relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#357eb8] text-[#357eb8] transition hover:bg-[#357eb8]/10"
    >
      {children}

      <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1a3263] px-2 py-1 text-xs font-semibold text-white opacity-0 shadow transition group-hover:opacity-100">
        {title}
      </span>
    </button>
  );
}