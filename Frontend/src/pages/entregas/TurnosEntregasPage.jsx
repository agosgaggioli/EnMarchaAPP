import { useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  Clock,
  PackageCheck,
  Search,
  X,
  Edit3,
  ClipboardCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const entregasIniciales = [
  {
    id: "EN001",
    venta: "VT001",
    cliente: "Juan Pérez",
    vehiculo: "Jeep Compass 2021 4x2 AT",
    dominio: "AF678HL",
    fechaEntrega: "2026-02-28",
    hora: "17:00",
    estadoEntrega: "Sin entregar",
    recepcion: "Completa",
  },
  {
    id: "EN002",
    venta: "VT002",
    cliente: "Transportes ABC S.A.",
    vehiculo: "Toyota Hilux 0km",
    dominio: "Sin dominio",
    fechaEntrega: "",
    hora: "",
    estadoEntrega: "Sin entregar",
    recepcion: "En borrador",
  },
  {
    id: "EN003",
    venta: "VT003",
    cliente: "María García",
    vehiculo: "Volkswagen Amarok 2020",
    dominio: "AD185BD",
    fechaEntrega: "",
    hora: "",
    estadoEntrega: "Sin entregar",
    recepcion: "Sin iniciar",
  },
];

export default function TurnosEntregasPage() {
  const navigate = useNavigate();

  const [entregas, setEntregas] = useState(entregasIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");

  const [entregaTurno, setEntregaTurno] = useState(null);
  const [turnoForm, setTurnoForm] = useState({
    fechaEntrega: "",
    hora: "",
  });

  const abrirTurno = (entrega) => {
    setEntregaTurno(entrega);
    setTurnoForm({
      fechaEntrega: entrega.fechaEntrega || "",
      hora: entrega.hora || "",
    });
  };

  const guardarTurno = () => {
    if (!entregaTurno || !turnoForm.fechaEntrega || !turnoForm.hora) return;

    setEntregas((prev) =>
      prev.map((entrega) =>
        entrega.id === entregaTurno.id
          ? {
              ...entrega,
              fechaEntrega: turnoForm.fechaEntrega,
              hora: turnoForm.hora,
            }
          : entrega
      )
    );

    setEntregaTurno(null);
  };

  const entregasFiltradas = entregas.filter((entrega) => {
    const texto =
      `${entrega.id} ${entrega.venta} ${entrega.cliente} ${entrega.vehiculo} ${entrega.dominio}`.toLowerCase();

    const coincideBusqueda = texto.includes(busqueda.toLowerCase());
    const coincideEstado =
      estadoFiltro === "Todos" || entrega.estadoEntrega === estadoFiltro;

    return coincideBusqueda && coincideEstado;
  });

  return (
    <section className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a3263]">
          Entregas de vehículos
        </h1>
        <p className="text-[#357eb8]">
          Gestioná entregas asociadas a ventas, coordinación de turno y recepción
          de documentación.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard
          title="Entregas totales"
          value={entregas.length}
          icon={CalendarDays}
        />
        <MetricCard
          title="Turnos coordinados"
          value={entregas.filter((e) => e.fechaEntrega && e.hora).length}
          icon={CheckCircle}
          highlight
        />
        <MetricCard
          title="Sin turno"
          value={entregas.filter((e) => !e.fechaEntrega || !e.hora).length}
          icon={Clock}
          warning
        />
        <MetricCard
          title="Recepciones completas"
          value={entregas.filter((e) => e.recepcion === "Completa").length}
          icon={PackageCheck}
        />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Listado de entregas
          </h2>
          <p className="text-sm text-[#357eb8]">
            El turno se coordina desde la entrega y la recepción puede avanzar
            aunque todavía no haya fecha/hora definida.
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
                placeholder="Buscar por cliente, vehículo, dominio, venta o entrega..."
              />
            </div>

            <select
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
              className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none"
            >
              <option>Todos</option>
              <option>Sin entregar</option>
              <option>Entregado</option>
              <option>Cancelado</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1250px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">Entrega</th>
                  <th className="p-4">Venta</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Vehículo</th>
                  <th className="p-4">Dominio</th>
                  <th className="p-4">Turno</th>
                  <th className="p-4">Recepción</th>
                  <th className="p-4">Estado entrega</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {entregasFiltradas.map((entrega) => (
                  <tr
                    key={entrega.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-bold">{entrega.id}</td>
                    <td className="p-4 font-semibold">{entrega.venta}</td>
                    <td className="p-4 font-semibold">{entrega.cliente}</td>
                    <td className="p-4 font-semibold">{entrega.vehiculo}</td>
                    <td className="p-4">{entrega.dominio}</td>

                    <td className="p-4">
                      {entrega.fechaEntrega && entrega.hora ? (
                        <div className="rounded-xl border border-[#357eb8]/30 bg-[#357eb8]/10 p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-bold text-[#1a3263]">
                                {formatFecha(entrega.fechaEntrega)}
                              </p>
                              <p className="text-sm font-semibold text-[#357eb8]">
                                {entrega.hora} hs
                              </p>
                            </div>

                            <IconButton
                              title="Editar turno"
                              onClick={() => abrirTurno(entrega)}
                            >
                              <Edit3 size={17} />
                            </IconButton>
                          </div>
                        </div>
                      ) : (
                        <IconButton
                          title="Coordinar turno"
                          onClick={() => abrirTurno(entrega)}
                        >
                          <CalendarDays size={18} />
                        </IconButton>
                      )}
                    </td>

                    <td className="p-4">
                      <RecepcionBadge estado={entrega.recepcion} />
                    </td>

                    <td className="p-4">
                      <EstadoEntregaBadge estado={entrega.estadoEntrega} />
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center">
                        <IconButton
                          title="Recepcionar documentación"
                          onClick={() => navigate(`/entregas/${entrega.id}`)}
                        >
                          <ClipboardCheck size={18} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl border border-[#357eb8]/30 bg-[#357eb8]/10 p-4 text-sm text-[#1a3263]">
            El turno no tiene estado propio: si tiene fecha y hora está
            coordinado; si no, queda pendiente de coordinar. El cierre real de la
            operación se refleja en el estado de entrega.
          </div>
        </div>
      </div>

      {entregaTurno && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Coordinar turno de entrega
                </h2>
                <p className="text-[#357eb8]">
                  {entregaTurno.cliente} · {entregaTurno.vehiculo}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEntregaTurno(null)}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="mb-6 rounded-2xl border border-[#acbac4]/50 bg-[#acbac4]/10 p-5">
              <div className="grid gap-4 md:grid-cols-3">
                <Info label="Entrega" value={entregaTurno.id} />
                <Info label="Venta" value={entregaTurno.venta} />
                <Info label="Dominio" value={entregaTurno.dominio} />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Fecha de entrega
                </span>
                <input
                  type="date"
                  value={turnoForm.fechaEntrega}
                  onChange={(e) =>
                    setTurnoForm({
                      ...turnoForm,
                      fechaEntrega: e.target.value,
                    })
                  }
                  className="input-base"
                />
              </label>

              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Hora
                </span>
                <input
                  type="time"
                  value={turnoForm.hora}
                  onChange={(e) =>
                    setTurnoForm({ ...turnoForm, hora: e.target.value })
                  }
                  className="input-base"
                />
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
              <button
                type="button"
                onClick={() => setEntregaTurno(null)}
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

function EstadoEntregaBadge({ estado }) {
  const styles = {
    "Sin entregar": "bg-yellow-100 text-yellow-700",
    Entregado: "bg-[#26aa9c]/15 text-[#1b7f75]",
    Cancelado: "bg-red-100 text-red-700",
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

function RecepcionBadge({ estado }) {
  const styles = {
    "Sin iniciar": "bg-[#acbac4]/30 text-[#1a3263]",
    "En borrador": "bg-[#357eb8]/15 text-[#245f91]",
    Completa: "bg-[#26aa9c]/15 text-[#1b7f75]",
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