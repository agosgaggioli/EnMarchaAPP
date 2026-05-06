import { useState } from "react";
import {
  Plus,
  Search,
  ClipboardList,
  CircleDollarSign,
  Clock,
  CheckCircle,
  X,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ordenesIniciales = [
  {
    id: "OT001",
    vehiculo: "Jeep Commander Limited",
    dominio: "AF678HL",
    items: ["Cambio de parabrisas", "Pintar capot"],
    proveedor: "Leandro Olivera",
    responsable: "Cesar Fandiño",
    costoEstimado: "$180.000",
    costoFinal: "-",
    estado: "En proceso",
  },
  {
    id: "OT002",
    vehiculo: "Ford Ranger XLT",
    dominio: "AD185BD",
    items: ["Cambio de aceite"],
    proveedor: "Taller El Rápido",
    responsable: "Diane Degra",
    costoEstimado: "$75.000",
    costoFinal: "$82.000",
    estado: "Finalizada",
  },
];

const vehiculos = [
  {
    id: "VH001",
    nombre: "Jeep Commander Limited",
    dominio: "AF678HL",
    itemsPendientes: [
      { id: "IT001", nombre: "Cambio de parabrisas", tipo: "Estética" },
      { id: "IT002", nombre: "Pintar capot", tipo: "Chapa y pintura" },
      { id: "IT003", nombre: "Arreglar volante", tipo: "Mecánica" },
    ],
  },
  {
    id: "VH002",
    nombre: "Volkswagen Fox Track 1.6",
    dominio: "AA398VY",
    itemsPendientes: [
      { id: "IT004", nombre: "Limpieza interior", tipo: "Estética" },
      { id: "IT005", nombre: "Revisión tren delantero", tipo: "Mecánica" },
    ],
  },
];

const proveedores = [
  "Leandro Olivera",
  "Taller El Rápido",
  "Chapa y Pintura Córdoba",
  "Mecánica Integral Sur",
];

export default function OrdenesTrabajoPage() {
  const navigate = useNavigate();

  const [showNuevaOrden, setShowNuevaOrden] = useState(false);
  const [ordenes, setOrdenes] = useState(ordenesIniciales);

  const [form, setForm] = useState({
    vehiculoId: "",
    itemsSeleccionados: [],
    proveedor: "",
    responsable: "",
    costoEstimado: "",
    observaciones: "",
  });

  const vehiculoActual = vehiculos.find((v) => v.id === form.vehiculoId);

  const toggleItem = (itemId) => {
    setForm((prev) => ({
      ...prev,
      itemsSeleccionados: prev.itemsSeleccionados.includes(itemId)
        ? prev.itemsSeleccionados.filter((id) => id !== itemId)
        : [...prev.itemsSeleccionados, itemId],
    }));
  };

  const crearOrden = () => {
    const itemsNombres =
      vehiculoActual?.itemsPendientes
        .filter((item) => form.itemsSeleccionados.includes(item.id))
        .map((item) => item.nombre) || [];

    const nuevaOrden = {
      id: `OT00${ordenes.length + 1}`,
      vehiculo: vehiculoActual?.nombre || "-",
      dominio: vehiculoActual?.dominio || "-",
      items: itemsNombres,
      proveedor: form.proveedor,
      responsable: form.responsable,
      costoEstimado: form.costoEstimado ? `$${form.costoEstimado}` : "-",
      costoFinal: "-",
      estado: "Pendiente",
    };

    setOrdenes([...ordenes, nuevaOrden]);
    setShowNuevaOrden(false);
    setForm({
      vehiculoId: "",
      itemsSeleccionados: [],
      proveedor: "",
      responsable: "",
      costoEstimado: "",
      observaciones: "",
    });
  };

  return (
    <section className="w-full">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3263]">
            Órdenes de Trabajo
          </h1>
          <p className="text-[#357eb8]">
            Gestioná trabajos derivados de ficha técnica, proveedores y costos.
          </p>
        </div>

        <button
          onClick={() => setShowNuevaOrden(true)}
          className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white shadow hover:bg-[#219b8f]"
        >
          <Plus size={18} />
          Nueva orden
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="Total órdenes" value={ordenes.length} icon={ClipboardList} />
        <MetricCard title="En proceso" value="1" icon={Clock} warning />
        <MetricCard title="Finalizadas" value="1" icon={CheckCircle} highlight />
        <MetricCard title="Costo estimado" value="$255.000" icon={CircleDollarSign} />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Listado de órdenes
          </h2>
        </div>

        <div className="p-6">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />
              <input
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar por vehículo, dominio, proveedor o responsable..."
              />
            </div>

            <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
              <option>Todos los estados</option>
              <option>Pendiente</option>
              <option>En proceso</option>
              <option>Finalizada</option>
              <option>Cancelada</option>
            </select>

            <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
              <option>Todos los proveedores</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor}>{proveedor}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1200px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Vehículo</th>
                  <th className="p-4">Dominio</th>
                  <th className="p-4">Ítems</th>
                  <th className="p-4">Proveedor</th>
                  <th className="p-4">Responsable</th>
                  <th className="p-4">Costo estimado</th>
                  <th className="p-4">Costo final</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {ordenes.map((orden) => (
                  <tr
                    key={orden.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-semibold">{orden.id}</td>
                    <td className="p-4 font-semibold">{orden.vehiculo}</td>
                    <td className="p-4">{orden.dominio}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {orden.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-lg bg-[#357eb8]/10 px-3 py-1 text-sm font-semibold text-[#357eb8]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">{orden.proveedor}</td>
                    <td className="p-4">{orden.responsable}</td>
                    <td className="p-4 font-semibold">{orden.costoEstimado}</td>
                    <td className="p-4 font-semibold">{orden.costoFinal}</td>
                    <td className="p-4">
                      <EstadoBadge estado={orden.estado} />
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <IconButton
                          title="Ver detalle"
                          onClick={() => navigate(`/ordenes-trabajo/${orden.id}`)}
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
        </div>
      </div>

      {showNuevaOrden && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Nueva orden de trabajo
                </h2>
                <p className="text-[#357eb8]">
                  Seleccioná el vehículo, los ítems a realizar, el proveedor y el costo estimado.
                </p>
              </div>

              <button
                onClick={() => setShowNuevaOrden(false)}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Select
                label="Vehículo"
                value={form.vehiculoId}
                onChange={(value) =>
                  setForm({ ...form, vehiculoId: value, itemsSeleccionados: [] })
                }
                options={vehiculos.map((v) => ({
                  value: v.id,
                  label: `${v.nombre} - ${v.dominio}`,
                }))}
              />

              <Select
                label="Proveedor / taller"
                value={form.proveedor}
                onChange={(value) => setForm({ ...form, proveedor: value })}
                options={proveedores.map((p) => ({ value: p, label: p }))}
              />

              <Input
                label="Responsable interno"
                value={form.responsable}
                onChange={(value) => setForm({ ...form, responsable: value })}
                placeholder="Ej: Cesar Fandiño"
              />

              <Input
                label="Costo estimado"
                value={form.costoEstimado}
                onChange={(value) => setForm({ ...form, costoEstimado: value })}
                placeholder="Ej: 180000"
              />
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-xl font-bold text-[#1a3263]">
                Ítems pendientes de la ficha técnica
              </h3>

              {!vehiculoActual ? (
                <div className="rounded-xl border border-[#acbac4]/50 bg-[#acbac4]/10 p-5 text-[#357eb8]">
                  Seleccioná un vehículo para ver sus ítems pendientes.
                </div>
              ) : (
                <div className="grid gap-3 md:grid-cols-2">
                  {vehiculoActual.itemsPendientes.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`rounded-xl border p-4 text-left transition ${
                        form.itemsSeleccionados.includes(item.id)
                          ? "border-[#26aa9c] bg-[#26aa9c]/10"
                          : "border-[#acbac4]/60 hover:border-[#357eb8]"
                      }`}
                    >
                      <p className="font-bold text-[#1a3263]">{item.nombre}</p>
                      <p className="text-sm text-[#357eb8]">{item.tipo}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6">
              <label className="mb-1 block font-semibold text-[#1a3263]">
                Observaciones
              </label>
              <textarea
                rows="4"
                value={form.observaciones}
                onChange={(e) =>
                  setForm({ ...form, observaciones: e.target.value })
                }
                className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
                placeholder="Ej: Coordinar retiro del vehículo, revisar repuesto antes de aprobar..."
              />
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
              <button
                onClick={() => setShowNuevaOrden(false)}
                className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
              >
                Cancelar
              </button>

              <button
                onClick={crearOrden}
                className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
              >
                Crear orden
              </button>
            </div>
          </div>
        </div>
      )}
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

function EstadoBadge({ estado }) {
  const styles = {
    Pendiente: "bg-[#acbac4]/30 text-[#1a3263]",
    "En proceso": "bg-[#357eb8]/15 text-[#245f91]",
    Finalizada: "bg-[#26aa9c]/15 text-[#1b7f75]",
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

function Input({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold text-[#1a3263]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none placeholder:text-[#acbac4] focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold text-[#1a3263]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
      >
        <option value="">Seleccionar</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}