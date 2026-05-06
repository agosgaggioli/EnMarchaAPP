import { useMemo, useState } from "react";
import { ArrowLeft, Save, CheckCircle, CalendarDays } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const entregasMock = {
  EN001: {
    id: "EN001",
    venta: "VT001",
    cliente: "Juan Pérez",
    vehiculo: "Jeep Compass 2021 4x2 AT",
    dominio: "AF678HL",
    fechaEntrega: "2026-02-28",
    hora: "17:00",
    estado: "Coordinada",
  },
  EN002: {
    id: "EN002",
    venta: "VT002",
    cliente: "Transportes ABC S.A.",
    vehiculo: "Toyota Hilux 0km",
    dominio: "Sin dominio",
    fechaEntrega: "",
    hora: "",
    estado: "Pendiente de coordinación",
  },
  EN003: {
    id: "EN003",
    venta: "VT003",
    cliente: "María García",
    vehiculo: "Volkswagen Amarok 2020",
    dominio: "AD185BD",
    fechaEntrega: "",
    hora: "",
    estado: "En preparación",
  },
};

const requisitosBase = [
  "Título del automotor",
  "Cédula verde",
  "Cédula autorizado si posee",
  "Libre deuda de patentes",
  "Chapas patente en buenas condiciones",
  "Tarjeta amarilla GNC",
  "Ficha técnica GNC",
  "VTV vigente",
  "Grabado de autopartes",
  "Manuales",
  "Llave duplicado",
  "Código estéreo",
  "Gato",
  "Llave cruz",
  "Llave de seguridad",
  "CAT",
  "Fotocopia DNI del titular",
  "Cancelación de prendas, si posee",
];

export default function EntregaChecklistPage() {
  const { id } = useParams();
  const entrega = entregasMock[id] || entregasMock.EN001;

  const [estadoEntrega, setEstadoEntrega] = useState(entrega.estado);
  const [estadoRecepcion, setEstadoRecepcion] = useState("En borrador");

  const [checklist, setChecklist] = useState(
    requisitosBase.map((item) => ({
      nombre: item,
      recibido: false,
      observacion: "",
    }))
  );

  const [observacionesGenerales, setObservacionesGenerales] = useState("");

  const totalRecibidos = checklist.filter((item) => item.recibido).length;
  const checklistCompleto = totalRecibidos === checklist.length;

  const turnoCoordinado = Boolean(entrega.fechaEntrega && entrega.hora);

  const turnoYaPaso = useMemo(() => {
    if (!turnoCoordinado) return false;

    const fechaHoraTurno = new Date(`${entrega.fechaEntrega}T${entrega.hora}`);
    const hoy = new Date();

    return fechaHoraTurno <= hoy;
  }, [entrega.fechaEntrega, entrega.hora, turnoCoordinado]);

  const puedeFinalizar = turnoCoordinado && turnoYaPaso && checklistCompleto;

  const toggleRequisito = (index) => {
    const copia = [...checklist];
    copia[index].recibido = !copia[index].recibido;
    setChecklist(copia);
  };

  const cambiarObservacion = (index, value) => {
    const copia = [...checklist];
    copia[index].observacion = value;
    setChecklist(copia);
  };

  const guardarBorrador = () => {
    setEstadoRecepcion("En borrador");
    setEstadoEntrega("En preparación");

    console.log("Borrador guardado:", {
      entrega,
      checklist,
      observacionesGenerales,
      estadoEntrega: "En preparación",
      estadoRecepcion: "En borrador",
    });
  };

  const finalizarEntrega = () => {
    if (!puedeFinalizar) return;

    setEstadoRecepcion("Completa");
    setEstadoEntrega("Entregado");

    console.log("Entrega finalizada:", {
      entrega,
      checklist,
      observacionesGenerales,
      estadoEntrega: "Entregado",
      estadoRecepcion: "Completa",
    });
  };

  return (
    <section className="w-full">
      <Link
        to="/entregas"
        className="mb-4 inline-flex items-center gap-2 text-sm text-[#357eb8] hover:text-[#1a3263]"
      >
        <ArrowLeft size={16} />
        Volver a entregas
      </Link>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3263]">
            Recepción de documentación
          </h1>
          <p className="text-[#357eb8]">
            Validá la documentación y elementos recibidos para la entrega de la
            unidad.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <EstadoBadge estado={estadoEntrega} />
          <RecepcionBadge estado={estadoRecepcion} />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <InfoCard label="Entrega" value={entrega.id} />
        <InfoCard label="Venta" value={entrega.venta} />
        <InfoCard label="Cliente" value={entrega.cliente} />
        <InfoCard label="Dominio" value={entrega.dominio} />
      </div>

      <div className="mb-6 rounded-2xl border border-[#acbac4]/50 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays size={20} className="text-[#357eb8]" />
          <h2 className="text-xl font-bold text-[#1a3263]">
            Turno de entrega
          </h2>
        </div>

        {turnoCoordinado ? (
          <div className="grid gap-4 md:grid-cols-3">
            <Info label="Fecha" value={formatFecha(entrega.fechaEntrega)} />
            <Info label="Hora" value={`${entrega.hora} hs`} />
            <Info
              label="Condición"
              value={turnoYaPaso ? "Turno cumplido" : "Turno pendiente"}
            />
          </div>
        ) : (
          <div className="rounded-xl bg-yellow-100 p-4 font-semibold text-yellow-700">
            Esta entrega todavía no tiene fecha/hora coordinada.
          </div>
        )}
      </div>

      <div className="mb-6 rounded-2xl border border-[#acbac4]/50 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-[#1a3263]">
          Unidad a entregar
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Info label="Vehículo" value={entrega.vehiculo} />
          <Info label="Cliente" value={entrega.cliente} />
          <Info label="Dominio" value={entrega.dominio} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#acbac4]/40 p-6">
          <div>
            <h2 className="text-xl font-bold text-[#1a3263]">
              Requisitos al entregar unidad usada
            </h2>
            <p className="text-sm text-[#357eb8]">
              Recibidos {totalRecibidos} de {checklist.length}
            </p>
          </div>

          <span
            className={`rounded-xl px-4 py-2 text-sm font-bold ${
              checklistCompleto
                ? "bg-[#26aa9c]/15 text-[#1b7f75]"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {checklistCompleto ? "Checklist completo" : "Checklist pendiente"}
          </span>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2">
          {checklist.map((item, index) => (
            <div
              key={item.nombre}
              className={`rounded-xl border p-4 ${
                item.recibido
                  ? "border-[#26aa9c]/40 bg-[#26aa9c]/10"
                  : "border-[#acbac4]/50 bg-[#f8fafc]"
              }`}
            >
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={item.recibido}
                  onChange={() => toggleRequisito(index)}
                  className="mt-1 h-5 w-5 accent-[#26aa9c]"
                />

                <div className="flex-1">
                  <p className="font-semibold text-[#1a3263]">{item.nombre}</p>
                  <p className="text-sm text-[#357eb8]">
                    {item.recibido ? "Recibido" : "Pendiente"}
                  </p>
                </div>
              </label>

              <input
                value={item.observacion}
                onChange={(e) => cambiarObservacion(index, e.target.value)}
                placeholder="Observación opcional..."
                className="mt-3 w-full rounded-lg border border-[#acbac4] bg-white px-3 py-2 text-sm text-[#1a3263] outline-none focus:border-[#357eb8]"
              />
            </div>
          ))}
        </div>

        <div className="border-t border-[#acbac4]/40 p-6">
          <label className="block">
            <span className="mb-1 block font-semibold text-[#1a3263]">
              Observaciones generales
            </span>
            <textarea
              rows="4"
              value={observacionesGenerales}
              onChange={(e) => setObservacionesGenerales(e.target.value)}
              placeholder="Ej: Falta llave duplicado, el cliente la entrega mañana..."
              className="input-base"
            />
          </label>

          {!puedeFinalizar && (
            <div className="mt-5 rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800">
              Para finalizar la entrega debe existir un turno coordinado, la fecha
              del turno debe haber llegado o pasado, y el checklist debe estar
              completo.
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={guardarBorrador}
              className="inline-flex items-center gap-2 rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263] hover:bg-[#acbac4]/15"
            >
              <Save size={18} />
              Guardar borrador
            </button>

            <button
              onClick={finalizarEntrega}
              disabled={!puedeFinalizar}
              className="inline-flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCircle size={18} />
              Finalizar entrega
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatFecha(fecha) {
  if (!fecha) return "";
  const [year, month, day] = fecha.split("-");
  return `${day}/${month}/${year}`;
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/40 bg-white p-5 shadow-sm">
      <p className="text-sm text-[#357eb8]">{label}</p>
      <p className="mt-1 text-lg font-bold text-[#1a3263]">{value}</p>
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

function EstadoBadge({ estado }) {
  const styles = {
    "Pendiente de coordinación": "bg-yellow-100 text-yellow-700",
    Coordinada: "bg-[#357eb8]/15 text-[#245f91]",
    "En preparación": "bg-orange-100 text-orange-700",
    "Lista para entregar": "bg-[#26aa9c]/15 text-[#1b7f75]",
    Entregado: "bg-green-100 text-green-700",
    Finalizada: "bg-green-100 text-green-700",
    Cancelada: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-xl px-4 py-2 text-sm font-bold ${
        styles[estado] || "bg-[#acbac4]/25 text-[#1a3263]"
      }`}
    >
      Estado: {estado}
    </span>
  );
}

function RecepcionBadge({ estado }) {
  const styles = {
    "Sin iniciar": "bg-[#acbac4]/30 text-[#1a3263]",
    Pendiente: "bg-yellow-100 text-yellow-700",
    "En borrador": "bg-[#357eb8]/15 text-[#245f91]",
    Completa: "bg-[#26aa9c]/15 text-[#1b7f75]",
  };

  return (
    <span
      className={`rounded-xl px-4 py-2 text-sm font-bold ${
        styles[estado] || "bg-[#acbac4]/25 text-[#1a3263]"
      }`}
    >
      Recepción: {estado}
    </span>
  );
}

