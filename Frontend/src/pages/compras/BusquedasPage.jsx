import { useState } from "react";
import {
  Search,
  Truck,
  CalendarDays,
  Clock,
  CheckCircle,
  X,
  Edit3,
  PackageCheck,
} from "lucide-react";

const busquedasIniciales = [
  {
    id: "BU001",
    compra: "CP001",
    proveedor: "Toyota Argentina",
    vehiculo: "Toyota Hilux SRV 2024",
    dominio: "Sin dominio",
    fecha: "",
    hora: "",
    responsable: "",
    origen: "Toyota Argentina - Córdoba",
    destino: "Agencia Central",
    estadoBusqueda: "Sin coordinar",
    estadoRecepcion: "Sin recibir",
  },
  {
    id: "BU002",
    compra: "CP002",
    proveedor: "Marcelo Hoare",
    vehiculo: "Chevrolet S10 LT 2020",
    dominio: "AF175KD",
    fecha: "2026-05-15",
    hora: "09:30",
    responsable: "Cesar Fandiño",
    origen: "Canals",
    destino: "Agencia Central",
    estadoBusqueda: "Coordinada",
    estadoRecepcion: "Sin recibir",
  },
  {
    id: "BU003",
    compra: "CP003",
    proveedor: "Volkswagen Oficial",
    vehiculo: "Volkswagen Taos 2024",
    dominio: "Sin dominio",
    fecha: "2026-05-10",
    hora: "11:00",
    responsable: "Diane Degra",
    origen: "Volkswagen Oficial",
    destino: "Agencia Central",
    estadoBusqueda: "Finalizada",
    estadoRecepcion: "Recibido",
  },
];

export default function BusquedasPage() {
  const [busquedas, setBusquedas] = useState(busquedasIniciales);
  const [busquedaTexto, setBusquedaTexto] = useState("");
  const [filtroRecepcion, setFiltroRecepcion] = useState("Todos");

  const [busquedaActiva, setBusquedaActiva] = useState(null);
  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    responsable: "",
    origen: "",
    destino: "",
    observaciones: "",
  });

  const abrirModal = (busqueda) => {
    setBusquedaActiva(busqueda);
    setForm({
      fecha: busqueda.fecha || "",
      hora: busqueda.hora || "",
      responsable: busqueda.responsable || "",
      origen: busqueda.origen || "",
      destino: busqueda.destino || "",
      observaciones: "",
    });
  };

  const guardarTurno = () => {
    if (!busquedaActiva || !form.fecha || !form.hora) return;

    setBusquedas((prev) =>
      prev.map((item) =>
        item.id === busquedaActiva.id
          ? {
              ...item,
              fecha: form.fecha,
              hora: form.hora,
              responsable: form.responsable,
              origen: form.origen,
              destino: form.destino,
              estadoBusqueda: "Coordinada",
            }
          : item
      )
    );

    setBusquedaActiva(null);
  };

  const marcarRecibido = (id) => {
    setBusquedas((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              estadoBusqueda: "Finalizada",
              estadoRecepcion: "Recibido",
            }
          : item
      )
    );
  };

  const busquedasFiltradas = busquedas.filter((item) => {
    const texto =
      `${item.id} ${item.compra} ${item.proveedor} ${item.vehiculo} ${item.dominio}`.toLowerCase();

    const coincideTexto = texto.includes(busquedaTexto.toLowerCase());
    const coincideRecepcion =
      filtroRecepcion === "Todos" || item.estadoRecepcion === filtroRecepcion;

    return coincideTexto && coincideRecepcion;
  });

  return (
    <section className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a3263]">
          Turnos de búsqueda
        </h1>
        <p className="text-[#357eb8]">
          Coordiná el retiro o recepción de unidades compradas antes de su
          ingreso al stock.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard
          title="Búsquedas totales"
          value={busquedas.length}
          icon={Truck}
        />
        <MetricCard
          title="Con turno"
          value={busquedas.filter((b) => b.fecha && b.hora).length}
          icon={CalendarDays}
          highlight
        />
        <MetricCard
          title="Sin turno"
          value={busquedas.filter((b) => !b.fecha || !b.hora).length}
          icon={Clock}
          warning
        />
        <MetricCard
          title="Recibidas"
          value={busquedas.filter((b) => b.estadoRecepcion === "Recibido").length}
          icon={CheckCircle}
          highlight
        />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Listado de búsquedas
          </h2>
          <p className="text-sm text-[#357eb8]">
            Cada búsqueda se origina desde una compra. El vehículo se considera
            ingresado cuando se marca como recibido.
          </p>
        </div>

        <div className="p-6">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />
              <input
                value={busquedaTexto}
                onChange={(e) => setBusquedaTexto(e.target.value)}
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar por búsqueda, compra, proveedor, vehículo o dominio..."
              />
            </div>

            <select
              value={filtroRecepcion}
              onChange={(e) => setFiltroRecepcion(e.target.value)}
              className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none"
            >
              <option>Todos</option>
              <option>Sin recibir</option>
              <option>Recibido</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1300px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">Búsqueda</th>
                  <th className="p-4">Compra</th>
                  <th className="p-4">Proveedor / vendedor</th>
                  <th className="p-4">Vehículo</th>
                  <th className="p-4">Dominio</th>
                  <th className="p-4">Turno</th>
                  <th className="p-4">Origen</th>
                  <th className="p-4">Destino</th>
                  <th className="p-4">Recepción</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {busquedasFiltradas.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-bold">{item.id}</td>
                    <td className="p-4 font-semibold">{item.compra}</td>
                    <td className="p-4 font-semibold">{item.proveedor}</td>
                    <td className="p-4 font-semibold">{item.vehiculo}</td>
                    <td className="p-4">{item.dominio}</td>

                    <td className="p-4">
                      {item.fecha && item.hora ? (
                        <div className="rounded-xl border border-[#357eb8]/30 bg-[#357eb8]/10 p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-bold text-[#1a3263]">
                                {formatFecha(item.fecha)}
                              </p>
                              <p className="text-sm font-semibold text-[#357eb8]">
                                {item.hora} hs
                              </p>
                              <p className="mt-1 text-xs font-semibold text-[#1a3263]">
                                {item.responsable || "Sin responsable"}
                              </p>
                            </div>

                            <IconButton
                              title="Editar turno"
                              onClick={() => abrirModal(item)}
                            >
                              <Edit3 size={17} />
                            </IconButton>
                          </div>
                        </div>
                      ) : (
                        <IconButton
                          title="Coordinar turno"
                          onClick={() => abrirModal(item)}
                        >
                          <CalendarDays size={18} />
                        </IconButton>
                      )}
                    </td>

                    <td className="p-4">{item.origen}</td>
                    <td className="p-4">{item.destino}</td>

                    <td className="p-4">
                      <RecepcionBadge estado={item.estadoRecepcion} />
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <IconButton
                          title="Marcar recibido"
                          onClick={() => marcarRecibido(item.id)}
                        >
                          <PackageCheck size={18} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl border border-[#357eb8]/30 bg-[#357eb8]/10 p-4 text-sm text-[#1a3263]">
            El turno no necesita estado propio: si tiene fecha y hora, está
            coordinado. La recepción indica si la unidad ya fue recibida.
          </div>
        </div>
      </div>

      {busquedaActiva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Coordinar búsqueda
                </h2>
                <p className="text-[#357eb8]">
                  {busquedaActiva.compra} · {busquedaActiva.vehiculo}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setBusquedaActiva(null)}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="mb-6 rounded-2xl border border-[#acbac4]/50 bg-[#acbac4]/10 p-5">
              <div className="grid gap-4 md:grid-cols-3">
                <Info label="Búsqueda" value={busquedaActiva.id} />
                <Info label="Compra" value={busquedaActiva.compra} />
                <Info label="Dominio" value={busquedaActiva.dominio} />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Fecha"
                type="date"
                value={form.fecha}
                onChange={(value) => setForm({ ...form, fecha: value })}
              />

              <Input
                label="Hora"
                type="time"
                value={form.hora}
                onChange={(value) => setForm({ ...form, hora: value })}
              />

              <Input
                label="Responsable / chofer"
                value={form.responsable}
                onChange={(value) => setForm({ ...form, responsable: value })}
                placeholder="Ej: Cesar Fandiño"
              />

              <Input
                label="Origen"
                value={form.origen}
                onChange={(value) => setForm({ ...form, origen: value })}
                placeholder="Lugar donde se retira"
              />

              <Input
                label="Destino"
                value={form.destino}
                onChange={(value) => setForm({ ...form, destino: value })}
                placeholder="Agencia / salón / taller"
              />

              <label className="block md:col-span-2">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Observaciones
                </span>
                <textarea
                  rows="4"
                  value={form.observaciones}
                  onChange={(e) =>
                    setForm({ ...form, observaciones: e.target.value })
                  }
                  className="input-base"
                  placeholder="Ej: llevar documentación, revisar unidad, retirar segunda llave..."
                />
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
              <button
                type="button"
                onClick={() => setBusquedaActiva(null)}
                className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={guardarTurno}
                className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
              >
                Guardar turno
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function formatFecha(fecha) {
  if (!fecha) return "";
  const [year, month, day] = fecha.split("-");
  return `${day}/${month}/${year}`;
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

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-[#357eb8]">{label}</p>
      <p className="font-bold text-[#1a3263]">{value}</p>
    </div>
  );
}

function Input({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold text-[#1a3263]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-base"
      />
    </label>
  );
}

function RecepcionBadge({ estado }) {
  const styles = {
    "Sin recibir": "bg-yellow-100 text-yellow-700",
    Recibido: "bg-[#26aa9c]/15 text-[#1b7f75]",
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