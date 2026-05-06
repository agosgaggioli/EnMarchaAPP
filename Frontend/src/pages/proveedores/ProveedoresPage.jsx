import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Building2,
  Wrench,
  Package,
  CircleDollarSign,
  X,
} from "lucide-react";

const proveedoresIniciales = [
  {
    id: "PV001",
    nombre: "Toyota Argentina",
    tipo: "Vehículos 0KM",
    totalProveedor: "$85.000.000",
    saldoPendiente: "$35.000.000",
    estado: "Activo",
  },
  {
    id: "PV002",
    nombre: "Volkswagen Oficial",
    tipo: "Vehículos 0KM",
    totalProveedor: "$48.000.000",
    saldoPendiente: "$18.000.000",
    estado: "Activo",
  },
  {
    id: "PS001",
    nombre: "Leandro Olivera",
    tipo: "Servicios",
    totalProveedor: "$1.085.000",
    saldoPendiente: "$1.085.000",
    estado: "Con deuda",
  },
  {
    id: "PS002",
    nombre: "Chapa y Pintura Córdoba",
    tipo: "Servicios",
    totalProveedor: "$420.000",
    saldoPendiente: "$420.000",
    estado: "Con deuda",
  },
  {
    id: "PV003",
    nombre: "Ferretería Malvinas",
    tipo: "Varios",
    totalProveedor: "$120.000",
    saldoPendiente: "$120.000",
    estado: "Con deuda",
  },
];

export default function ProveedoresPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Todos");
  const [proveedores, setProveedores] = useState(proveedoresIniciales);
  const [showNuevoProveedor, setShowNuevoProveedor] = useState(false);

  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: "",
    tipo: "",
    cuit: "",
    telefono: "",
    email: "",
    domicilio: "",
  });

  const proveedoresFiltrados =
    tab === "Todos"
      ? proveedores
      : proveedores.filter((proveedor) => proveedor.tipo === tab);

  const guardarProveedor = () => {
    if (!nuevoProveedor.nombre || !nuevoProveedor.tipo) return;

    const prefijo =
      nuevoProveedor.tipo === "Vehículos 0KM"
        ? "PV"
        : nuevoProveedor.tipo === "Servicios"
        ? "PS"
        : "PG";

    const nuevo = {
      id: `${prefijo}${String(proveedores.length + 1).padStart(3, "0")}`,
      nombre: nuevoProveedor.nombre,
      tipo: nuevoProveedor.tipo,
      totalProveedor: "$0",
      saldoPendiente: "$0",
      estado: "Activo",
    };

    setProveedores([...proveedores, nuevo]);
    setShowNuevoProveedor(false);
    setNuevoProveedor({
      nombre: "",
      tipo: "",
      cuit: "",
      telefono: "",
      email: "",
      domicilio: "",
    });
  };

  return (
    <section className="w-full">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3263]">Proveedores</h1>
          <p className="text-[#357eb8]">
            Gestioná proveedores de vehículos, servicios y gastos varios.
          </p>
        </div>

        <button
          onClick={() => setShowNuevoProveedor(true)}
          className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white shadow hover:bg-[#219b8f]"
        >
          <Plus size={18} />
          Nuevo proveedor
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="Total proveedores" value={proveedores.length} icon={Building2} />
        <MetricCard title="Servicios con deuda" value="2" icon={Wrench} warning />
        <MetricCard title="Varios pendientes" value="1" icon={Package} />
        <MetricCard
          title="Total a pagar"
          value="$54.625.000"
          icon={CircleDollarSign}
          highlight
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {["Todos", "Vehículos 0KM", "Servicios", "Varios"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              tab === item
                ? "bg-[#1a3263] text-white"
                : "border border-[#acbac4] bg-white text-[#1a3263] hover:bg-[#acbac4]/15"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Listado de proveedores
          </h2>
        </div>

        <div className="p-6">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />
              <input
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar proveedor..."
              />
            </div>

            <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
              <option>Todos los estados</option>
              <option>Activo</option>
              <option>Con deuda</option>
              <option>Inactivo</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Proveedor</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Total proveedor</th>
                  <th className="p-4">Saldo pendiente</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {proveedoresFiltrados.map((proveedor) => (
                  <tr
                    key={proveedor.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-semibold">{proveedor.id}</td>
                    <td className="p-4 font-semibold">{proveedor.nombre}</td>
                    <td className="p-4">
                      <TipoBadge tipo={proveedor.tipo} />
                    </td>
                    <td className="p-4 font-semibold">
                      {proveedor.totalProveedor}
                    </td>
                    <td className="p-4 font-semibold">
                      {proveedor.saldoPendiente}
                    </td>
                    <td className="p-4">
                      <EstadoBadge estado={proveedor.estado} />
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() =>
                          navigate(`/contabilidad/proveedores/${proveedor.id}`)
                        }
                        className="rounded-lg border border-[#357eb8] px-3 py-2 text-sm font-semibold text-[#357eb8] hover:bg-[#357eb8]/10"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {tab === "Vehículos 0KM" && (
            <div className="mt-5 rounded-xl border border-[#357eb8]/30 bg-[#357eb8]/10 p-4 text-sm text-[#1a3263]">
              Los proveedores de vehículos 0KM se gestionan por unidad: cada auto
              tiene precio de compra, pagos realizados y saldo pendiente.
            </div>
          )}
        </div>
      </div>

      {showNuevoProveedor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Nuevo proveedor
                </h2>
                <p className="text-[#357eb8]">
                  Cargá los datos principales del proveedor.
                </p>
              </div>

              <button
                onClick={() => setShowNuevoProveedor(false)}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <InputProveedor
                label="Nombre / Razón social"
                value={nuevoProveedor.nombre}
                onChange={(value) =>
                  setNuevoProveedor({ ...nuevoProveedor, nombre: value })
                }
              />

              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Tipo de proveedor
                </span>
                <select
                  value={nuevoProveedor.tipo}
                  onChange={(e) =>
                    setNuevoProveedor({
                      ...nuevoProveedor,
                      tipo: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="Vehículos 0KM">Vehículos 0KM</option>
                  <option value="Servicios">Servicios</option>
                  <option value="Varios">Varios</option>
                </select>
              </label>

              <InputProveedor
                label="CUIT"
                value={nuevoProveedor.cuit}
                onChange={(value) =>
                  setNuevoProveedor({ ...nuevoProveedor, cuit: value })
                }
              />

              <InputProveedor
                label="Teléfono"
                value={nuevoProveedor.telefono}
                onChange={(value) =>
                  setNuevoProveedor({ ...nuevoProveedor, telefono: value })
                }
              />

              <InputProveedor
                label="Email"
                value={nuevoProveedor.email}
                onChange={(value) =>
                  setNuevoProveedor({ ...nuevoProveedor, email: value })
                }
              />

              <InputProveedor
                label="Domicilio"
                value={nuevoProveedor.domicilio}
                onChange={(value) =>
                  setNuevoProveedor({ ...nuevoProveedor, domicilio: value })
                }
              />
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
              <button
                onClick={() => setShowNuevoProveedor(false)}
                className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
              >
                Cancelar
              </button>

              <button
                onClick={guardarProveedor}
                className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
              >
                Guardar proveedor
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
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

function TipoBadge({ tipo }) {
  const styles = {
    "Vehículos 0KM": "bg-[#357eb8]/15 text-[#245f91]",
    Servicios: "bg-[#26aa9c]/15 text-[#1b7f75]",
    Varios: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={`rounded-lg px-3 py-1 text-sm font-semibold ${styles[tipo]}`}>
      {tipo}
    </span>
  );
}

function EstadoBadge({ estado }) {
  const styles = {
    Activo: "bg-[#26aa9c]/15 text-[#1b7f75]",
    "Con deuda": "bg-yellow-100 text-yellow-700",
    Inactivo: "bg-[#acbac4]/25 text-[#1a3263]",
  };

  return (
    <span className={`rounded-lg px-3 py-1 text-sm font-semibold ${styles[estado]}`}>
      {estado}
    </span>
  );
}

function InputProveedor({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold text-[#1a3263]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
      />
    </label>
  );
}