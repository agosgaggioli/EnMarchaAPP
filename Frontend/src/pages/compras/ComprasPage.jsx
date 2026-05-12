import { useState } from "react";
import {
  Plus,
  Search,
  ShoppingCart,
  Car,
  Truck,
  Eye,
  CircleDollarSign,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const comprasIniciales = [
  {
    id: "CP001",
    vendedor: "Toyota Argentina",
    vehiculo: "Toyota Hilux SRV 2024",
    tipo: "0km",
    dominio: "Sin dominio",
    monto: "$52.000.000",
    estadoCuenta: "Con deuda",
    estadoCompra: "Pendiente de búsqueda",
  },
  {
    id: "CP002",
    vendedor: "Marcelo Hoare",
    vehiculo: "Chevrolet S10 LT 2020",
    tipo: "Usado",
    dominio: "AF175KD",
    monto: "$18.500.000",
    estadoCuenta: "Sin deuda",
    estadoCompra: "En búsqueda",
  },
  {
    id: "CP003",
    vendedor: "Volkswagen Oficial",
    vehiculo: "Volkswagen Taos 2024",
    tipo: "0km",
    dominio: "Sin dominio",
    monto: "$33.000.000",
    estadoCuenta: "Con deuda",
    estadoCompra: "Vehículo recibido",
  },
];

export default function ComprasPage() {
  const navigate = useNavigate();

  const [compras] = useState(comprasIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const comprasFiltradas = compras.filter((compra) => {
    const texto =
      `${compra.id} ${compra.vendedor} ${compra.vehiculo} ${compra.dominio}`.toLowerCase();

    const coincideBusqueda = texto.includes(busqueda.toLowerCase());
    const coincideEstado =
      filtroEstado === "Todos" || compra.estadoCompra === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });

  return (
    <section className="w-full">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3263]">
            Compras de vehículos
          </h1>
          <p className="text-[#357eb8]">
            Registrá operaciones de compra y controlá deuda, búsqueda e ingreso
            de unidades.
          </p>
        </div>

        <Link
          to="/compras/nueva"
          className="inline-flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white shadow hover:bg-[#219b8f]"
        >
          <Plus size={18} />
          Nueva compra
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard
          title="Compras totales"
          value={compras.length}
          icon={ShoppingCart}
        />
        <MetricCard
          title="Compras con deuda"
          value={compras.filter((c) => c.estadoCuenta === "Con deuda").length}
          icon={CircleDollarSign}
          danger
        />
        <MetricCard
          title="En búsqueda"
          value={compras.filter((c) => c.estadoCompra === "En búsqueda").length}
          icon={Truck}
        />
        <MetricCard
          title="Recibidas"
          value={
            compras.filter((c) => c.estadoCompra === "Vehículo recibido").length
          }
          icon={Car}
          highlight
        />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Listado de compras
          </h2>
          <p className="text-sm text-[#357eb8]">
            El turno de búsqueda se gestiona desde el submódulo de búsquedas.
          </p>
        </div>

        <div className="p-6">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar por compra, vendedor, vehículo o dominio..."
              />
            </div>

            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none"
            >
              <option>Todos</option>
              <option>Pendiente de búsqueda</option>
              <option>En búsqueda</option>
              <option>Vehículo recibido</option>
              <option>Cancelada</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1200px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">Compra</th>
                  <th className="p-4">Vendedor / proveedor</th>
                  <th className="p-4">Vehículo</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Dominio</th>
                  <th className="p-4">Monto</th>
                  <th className="p-4">Cuenta</th>
                  <th className="p-4">Estado compra</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {comprasFiltradas.map((compra) => (
                  <tr
                    key={compra.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-bold">{compra.id}</td>
                    <td className="p-4 font-semibold">{compra.vendedor}</td>
                    <td className="p-4 font-semibold">{compra.vehiculo}</td>
                    <td className="p-4">
                      <span className="rounded-lg border border-[#acbac4] px-3 py-1 text-sm font-semibold">
                        {compra.tipo}
                      </span>
                    </td>
                    <td className="p-4">{compra.dominio}</td>
                    <td className="p-4 font-bold">{compra.monto}</td>
                    <td className="p-4">
                      <EstadoCuentaBadge estado={compra.estadoCuenta} />
                    </td>
                    <td className="p-4">
                      <EstadoCompraBadge estado={compra.estadoCompra} />
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <IconButton
                          title="Ver detalle"
                          onClick={() => navigate(`/compras/${compra.id}`)}
                        >
                          <Eye size={18} />
                        </IconButton>

                        <IconButton
                          title="Gestionar búsqueda"
                          onClick={() => navigate("/busquedas")}
                        >
                          <Truck size={18} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl border border-[#357eb8]/30 bg-[#357eb8]/10 p-4 text-sm text-[#1a3263]">
            Al confirmar una compra, el sistema genera una búsqueda asociada. La
            deuda de la compra se controla desde la cuenta del proveedor o
            vendedor correspondiente.
          </div>
        </div>
      </div>
    </section>
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

function EstadoCuentaBadge({ estado }) {
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

function EstadoCompraBadge({ estado }) {
  const styles = {
    "Pendiente de búsqueda": "bg-yellow-100 text-yellow-700",
    "En búsqueda": "bg-[#357eb8]/15 text-[#245f91]",
    "Vehículo recibido": "bg-[#26aa9c]/15 text-[#1b7f75]",
    Cancelada: "bg-red-100 text-red-700",
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