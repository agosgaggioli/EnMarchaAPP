import { useMemo, useState } from "react";
import {
  FolderKanban,
  Search,
  Clock3,
  CheckCircle2,
  Car,
  User,
  CalendarDays,
  Building2,
  Bell,
  ClipboardCheck,
  X,
  MessageSquareText,
  Wallet,
  Plus,
  ReceiptText,
} from "lucide-react";

const tramitesIniciales = [
  {
    id: "GST001",
    venta: "VT250",
    cliente: "Arreche Fernando Gabriel",
    vehiculo: "Chevrolet Montana LTZ",
    dominio: "Sin dominio",
    tipoUnidad: "0KM",
    tramite: "Inscripción 0KM",
    estado: "Documentación pedida",
    origenDocumentacion: "Agencia oficial",
    gestora: "Nadia Conti",
    fechaEstimada: "31/05/2026",
    observacion:
      "Se solicitó documentación a la agencia oficial para iniciar inscripción.",
    gastos: [
      {
        id: "G001",
        fecha: "27/05/2026",
        concepto: "Formulario inscripción",
        medioPago: "Efectivo",
        importe: 18500,
        observacion: "Compra de formulario inicial.",
      },
      {
        id: "G002",
        fecha: "27/05/2026",
        concepto: "Impresiones documentación",
        medioPago: "Efectivo",
        importe: 4500,
        observacion: "Impresión de papeles para legajo.",
      },
    ],
  },
  {
    id: "GST002",
    venta: "VT241",
    cliente: "Marchisio Leandro Daniel",
    vehiculo: "Volkswagen Saveiro",
    dominio: "JZJ895",
    tipoUnidad: "Usado",
    tramite: "Transferencia",
    estado: "En proceso",
    origenDocumentacion: "Cliente / Recepción",
    gestora: "Nadia Conti",
    fechaEstimada: "29/05/2026",
    observacion: "Documentación recibida para iniciar transferencia.",
    gastos: [
      {
        id: "G003",
        fecha: "26/05/2026",
        concepto: "Verificación policial",
        medioPago: "Transferencia",
        importe: 42000,
        observacion: "Pago asociado a transferencia.",
      },
    ],
  },
  {
    id: "GST003",
    venta: "VT248",
    cliente: "Gómez Luciana",
    vehiculo: "Fiat Cronos Precision",
    dominio: "AG452KL",
    tipoUnidad: "0KM",
    tramite: "Inscripción 0KM",
    estado: "Presentado",
    origenDocumentacion: "Agencia oficial",
    gestora: "Nadia Conti",
    fechaEstimada: "04/06/2026",
    observacion: "Trámite presentado en registro.",
    gastos: [],
  },
];

const notificacionesIniciales = [
  {
    id: "NOT001",
    venta: "VT245",
    cliente: "Cáseres Ariel Agustín",
    vehiculo: "Toyota Hilux SRV",
    dominio: "AF321RT",
    tipoUnidad: "Usado entregado como parte de pago",
    enviadaPor: "Recepción",
    gestora: "Nadia Conti",
    fecha: "27/05/2026",
    estado: "Pendiente de revisión",
    observacion:
      "La recepcionista completó el checklist de la unidad usada entregada como parte de pago.",
    checklist: [
      { nombre: "Título del automotor", recibido: true, observacion: "" },
      { nombre: "Cédula verde", recibido: true, observacion: "" },
      {
        nombre: "Cédula autorizado si posee",
        recibido: false,
        observacion: "No posee",
      },
      { nombre: "Libre deuda de patentes", recibido: true, observacion: "" },
      {
        nombre: "Chapas patente en buenas condiciones",
        recibido: true,
        observacion: "",
      },
      {
        nombre: "Tarjeta amarilla GNC",
        recibido: false,
        observacion: "No corresponde",
      },
      {
        nombre: "Ficha técnica GNC",
        recibido: false,
        observacion: "No corresponde",
      },
      { nombre: "VTV vigente", recibido: true, observacion: "" },
      { nombre: "Grabado de autopartes", recibido: true, observacion: "" },
      { nombre: "Manuales", recibido: true, observacion: "" },
      { nombre: "Llave duplicado", recibido: true, observacion: "" },
      { nombre: "Código estéreo", recibido: false, observacion: "Pendiente" },
      { nombre: "Gato", recibido: true, observacion: "" },
      { nombre: "Llave cruz", recibido: true, observacion: "" },
      { nombre: "Llave de seguridad", recibido: true, observacion: "" },
      { nombre: "CAT", recibido: true, observacion: "" },
      { nombre: "Fotocopia DNI del titular", recibido: true, observacion: "" },
      {
        nombre: "Cancelación de prendas, si posee",
        recibido: false,
        observacion: "No posee",
      },
    ],
  },
];

const estadosPorTipo = {
  "0KM": [
    "Documentación pedida",
    "Documentación recibida",
    "En proceso",
    "Listo para inscribir",
    "Presentado",
    "Observado",
    "Inscripto",
  ],
  Usado: [
    "En proceso",
    "Listo para transferir",
    "Presentado",
    "Observado",
    "Transferido",
  ],
};

const formatMoney = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);

export default function GestoriaPage() {
  const [tramites, setTramites] = useState(tramitesIniciales);
  const [notificaciones] = useState(notificacionesIniciales);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const [notificacionSeleccionada, setNotificacionSeleccionada] =
    useState(null);

  const [tramiteGastos, setTramiteGastos] = useState(null);

  const [modalEstado, setModalEstado] = useState({
    abierto: false,
    tramite: null,
    nuevoEstado: "",
    observacion: "",
  });

  const tramitesFiltrados = useMemo(() => {
    return tramites.filter((tramite) => {
      const coincideTipo =
        filtroTipo === "Todos" || tramite.tipoUnidad === filtroTipo;

      const texto =
        `${tramite.venta} ${tramite.cliente} ${tramite.vehiculo} ${tramite.dominio} ${tramite.tramite} ${tramite.estado}`.toLowerCase();

      return coincideTipo && texto.includes(busqueda.toLowerCase());
    });
  }, [tramites, filtroTipo, busqueda]);

  const abrirModalCambioEstado = (tramite, nuevoEstado) => {
    setModalEstado({
      abierto: true,
      tramite,
      nuevoEstado,
      observacion: "",
    });
  };

  const confirmarCambioEstado = () => {
    const { tramite, nuevoEstado, observacion } = modalEstado;

    setTramites((prev) =>
      prev.map((item) =>
        item.id === tramite.id
          ? {
              ...item,
              estado: nuevoEstado,
              observacion: observacion || item.observacion,
            }
          : item
      )
    );

    setModalEstado({
      abierto: false,
      tramite: null,
      nuevoEstado: "",
      observacion: "",
    });
  };

  const agregarGasto = (tramiteId, nuevoGasto) => {
    setTramites((prev) =>
      prev.map((tramite) =>
        tramite.id === tramiteId
          ? {
              ...tramite,
              gastos: [
                ...tramite.gastos,
                {
                  ...nuevoGasto,
                  id: `G${Date.now()}`,
                },
              ],
            }
          : tramite
      )
    );

    setTramiteGastos((prev) =>
      prev
        ? {
            ...prev,
            gastos: [
              ...prev.gastos,
              {
                ...nuevoGasto,
                id: `G${Date.now()}`,
              },
            ],
          }
        : null
    );
  };

  const total0km = tramites.filter((t) => t.tipoUnidad === "0KM").length;
  const totalUsados = tramites.filter((t) => t.tipoUnidad === "Usado").length;

  const pendientes = tramites.filter((t) =>
    [
      "Documentación pedida",
      "Documentación recibida",
      "En proceso",
      "Presentado",
    ].includes(t.estado)
  ).length;

  const finalizados = tramites.filter((t) =>
    ["Inscripto", "Transferido"].includes(t.estado)
  ).length;

  const totalGastos = tramites.reduce(
    (acc, tramite) =>
      acc +
      tramite.gastos.reduce((subtotal, gasto) => subtotal + gasto.importe, 0),
    0
  );

  const totalEfectivo = tramites.reduce(
    (acc, tramite) =>
      acc +
      tramite.gastos
        .filter((gasto) => gasto.medioPago === "Efectivo")
        .reduce((subtotal, gasto) => subtotal + gasto.importe, 0),
    0
  );

  const totalTransferencia = tramites.reduce(
    (acc, tramite) =>
      acc +
      tramite.gastos
        .filter((gasto) => gasto.medioPago === "Transferencia")
        .reduce((subtotal, gasto) => subtotal + gasto.importe, 0),
    0
  );

  return (
    <section className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a3263]">
          Gestión de Gestoría
        </h1>

        <p className="max-w-4xl text-[#357eb8]">
          Seguimiento de documentación, inscripción de unidades 0KM,
          transferencia de usados, caja propia de gestoría y revisión de
          notificaciones recibidas desde recepción.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="0KM a inscribir" value={total0km} icon={Building2} />
        <MetricCard title="Usados a transferir" value={totalUsados} icon={Car} />
        <MetricCard title="Pendientes" value={pendientes} icon={Clock3} warning />
        <MetricCard
          title="Finalizados"
          value={finalizados}
          icon={CheckCircle2}
          highlight
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <MetricCard
          title="Gastos gestoría"
          value={formatMoney(totalGastos)}
          icon={Wallet}
        />
        <MetricCard
          title="Pagado en efectivo"
          value={formatMoney(totalEfectivo)}
          icon={ReceiptText}
          warning
        />
        <MetricCard
          title="Pagado por transferencia"
          value={formatMoney(totalTransferencia)}
          icon={ReceiptText}
          highlight
        />
      </div>

      {notificaciones.length > 0 && (
        <div className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
              <Bell size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#1a3263]">
                Notificaciones para gestoría
              </h2>

              <p className="text-sm text-[#357eb8]">
                Checklist de unidad usada completado por recepción y pendiente
                de revisión.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {notificaciones.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-yellow-200 bg-white p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <ClipboardCheck size={18} className="text-yellow-700" />

                  <p className="font-bold text-[#1a3263]">{item.vehiculo}</p>
                </div>

                <p className="text-sm text-[#357eb8]">
                  Cliente: {item.cliente}
                </p>

                <p className="text-sm text-[#357eb8]">
                  Venta: {item.venta} · Dominio: {item.dominio}
                </p>

                <p className="mt-1 text-sm text-[#6b7c93]">
                  {item.observacion}
                </p>

                <button
                  onClick={() => setNotificacionSeleccionada(item)}
                  className="mt-4 rounded-xl bg-[#1a3263] px-4 py-2 text-sm font-semibold text-white hover:bg-[#16284f]"
                >
                  Ver checklist recibido
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Operaciones de gestoría
          </h2>

          <p className="text-sm text-[#357eb8]">
            Estados relacionados a ventas: inscripción de 0KM, transferencia de
            usados y gastos asociados a cada trámite.
          </p>
        </div>

        <div className="p-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {["Todos", "0KM", "Usado"].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFiltroTipo(tipo)}
                className={`rounded-xl px-4 py-2 font-semibold transition ${
                  filtroTipo === tipo
                    ? "bg-[#1a3263] text-white"
                    : "border border-[#acbac4] bg-white text-[#1a3263] hover:bg-[#acbac4]/15"
                }`}
              >
                {tipo}
              </button>
            ))}

            <div className="ml-auto flex min-w-[340px] flex-1 items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />

              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar cliente, dominio, venta o trámite..."
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1550px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">Venta</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Unidad</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Trámite</th>
                  <th className="p-4">Origen documentación</th>
                  <th className="p-4">Fecha estimada</th>
                  <th className="p-4">Gestora</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Gastos</th>
                  <th className="p-4">Cambiar estado</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {tramitesFiltrados.map((tramite) => {
                  const totalGastoTramite = tramite.gastos.reduce(
                    (acc, gasto) => acc + gasto.importe,
                    0
                  );

                  return (
                    <tr
                      key={tramite.id}
                      className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                    >
                      <td className="p-4 font-bold">{tramite.venta}</td>

                      <td className="p-4 font-semibold">{tramite.cliente}</td>

                      <td className="p-4">
                        <p className="font-semibold">{tramite.vehiculo}</p>

                        <p className="text-sm text-[#357eb8]">
                          {tramite.dominio}
                        </p>

                        <p className="mt-1 max-w-[320px] text-sm text-[#6b7c93]">
                          {tramite.observacion}
                        </p>
                      </td>

                      <td className="p-4">
                        <TipoBadge tipo={tramite.tipoUnidad} />
                      </td>

                      <td className="p-4 font-medium">{tramite.tramite}</td>

                      <td className="p-4">{tramite.origenDocumentacion}</td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <CalendarDays
                            size={16}
                            className="text-[#357eb8]"
                          />
                          {tramite.fechaEstimada}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-[#357eb8]" />
                          {tramite.gestora}
                        </div>
                      </td>

                      <td className="p-4">
                        <EstadoBadge estado={tramite.estado} />
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => setTramiteGastos(tramite)}
                          className="rounded-xl border border-[#26aa9c]/30 bg-[#26aa9c]/10 px-4 py-2 text-sm font-bold text-[#1b7f75] hover:bg-[#26aa9c]/20"
                        >
                          Gastos · {formatMoney(totalGastoTramite)}
                        </button>
                      </td>

                      <td className="p-4">
                        <select
                          value={tramite.estado}
                          onChange={(e) =>
                            abrirModalCambioEstado(tramite, e.target.value)
                          }
                          className="rounded-xl border border-[#acbac4] bg-white px-4 py-2 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
                        >
                          {estadosPorTipo[tramite.tipoUnidad].map((estado) => (
                            <option key={estado}>{estado}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {tramitesFiltrados.length === 0 && (
              <div className="p-8 text-center text-[#357eb8]">
                No se encontraron operaciones para los filtros aplicados.
              </div>
            )}
          </div>
        </div>
      </div>

      {notificacionSeleccionada && (
        <ChecklistModal
          notificacion={notificacionSeleccionada}
          onClose={() => setNotificacionSeleccionada(null)}
        />
      )}

      {modalEstado.abierto && (
        <CambioEstadoModal
          modalEstado={modalEstado}
          setModalEstado={setModalEstado}
          onConfirmar={confirmarCambioEstado}
        />
      )}

      {tramiteGastos && (
        <GastosModal
          tramite={tramiteGastos}
          onClose={() => setTramiteGastos(null)}
          onAgregarGasto={agregarGasto}
        />
      )}
    </section>
  );
}

function GastosModal({ tramite, onClose, onAgregarGasto }) {
  const [nuevoGasto, setNuevoGasto] = useState({
    fecha: new Date().toISOString().slice(0, 10),
    concepto: "",
    medioPago: "Efectivo",
    importe: "",
    observacion: "",
  });

  const total = tramite.gastos.reduce((acc, gasto) => acc + gasto.importe, 0);

  const totalEfectivo = tramite.gastos
    .filter((gasto) => gasto.medioPago === "Efectivo")
    .reduce((acc, gasto) => acc + gasto.importe, 0);

  const totalTransferencia = tramite.gastos
    .filter((gasto) => gasto.medioPago === "Transferencia")
    .reduce((acc, gasto) => acc + gasto.importe, 0);

  const guardarGasto = () => {
    if (!nuevoGasto.concepto || !nuevoGasto.importe) return;

    onAgregarGasto(tramite.id, {
      ...nuevoGasto,
      importe: Number(nuevoGasto.importe),
    });

    setNuevoGasto({
      fecha: new Date().toISOString().slice(0, 10),
      concepto: "",
      medioPago: "Efectivo",
      importe: "",
      observacion: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-[#acbac4]/40 p-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a3263]">
              Gastos del trámite
            </h2>

            <p className="text-[#357eb8]">
              {tramite.venta} · {tramite.cliente} · {tramite.vehiculo}
            </p>

            <p className="text-sm text-[#6b7c93]">
              {tramite.tramite} · {tramite.tipoUnidad}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-[#acbac4] p-2 text-[#1a3263] hover:bg-[#acbac4]/15"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[72vh] overflow-y-auto p-6">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MiniTotalCard title="Total gastos" value={formatMoney(total)} />
            <MiniTotalCard
              title="Efectivo"
              value={formatMoney(totalEfectivo)}
            />
            <MiniTotalCard
              title="Transferencias"
              value={formatMoney(totalTransferencia)}
            />
          </div>

          <div className="mb-6 rounded-2xl border border-[#acbac4]/50 bg-[#f8fafc] p-5">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#1a3263]">
              <Plus size={20} />
              Cargar nuevo gasto
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1a3263]">
                  Fecha
                </label>
                <input
                  type="date"
                  value={nuevoGasto.fecha}
                  onChange={(e) =>
                    setNuevoGasto((prev) => ({
                      ...prev,
                      fecha: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[#acbac4] px-4 py-3 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-[#1a3263]">
                  Concepto
                </label>
                <input
                  value={nuevoGasto.concepto}
                  onChange={(e) =>
                    setNuevoGasto((prev) => ({
                      ...prev,
                      concepto: e.target.value,
                    }))
                  }
                  placeholder="Ej: Patentamiento, formulario, impresión..."
                  className="w-full rounded-xl border border-[#acbac4] px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1a3263]">
                  Medio
                </label>
                <select
                  value={nuevoGasto.medioPago}
                  onChange={(e) =>
                    setNuevoGasto((prev) => ({
                      ...prev,
                      medioPago: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[#acbac4] px-4 py-3 outline-none"
                >
                  <option>Efectivo</option>
                  <option>Transferencia</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1a3263]">
                  Importe
                </label>
                <input
                  type="number"
                  value={nuevoGasto.importe}
                  onChange={(e) =>
                    setNuevoGasto((prev) => ({
                      ...prev,
                      importe: e.target.value,
                    }))
                  }
                  placeholder="$0"
                  className="w-full rounded-xl border border-[#acbac4] px-4 py-3 outline-none"
                />
              </div>

              <div className="md:col-span-4">
                <label className="mb-1 block text-sm font-semibold text-[#1a3263]">
                  Observación
                </label>
                <input
                  value={nuevoGasto.observacion}
                  onChange={(e) =>
                    setNuevoGasto((prev) => ({
                      ...prev,
                      observacion: e.target.value,
                    }))
                  }
                  placeholder="Detalle opcional del gasto..."
                  className="w-full rounded-xl border border-[#acbac4] px-4 py-3 outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={guardarGasto}
                  className="w-full rounded-xl bg-[#1a3263] px-5 py-3 font-semibold text-white hover:bg-[#16284f]"
                >
                  Agregar gasto
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Concepto</th>
                  <th className="p-4">Medio</th>
                  <th className="p-4">Importe</th>
                  <th className="p-4">Observación</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {tramite.gastos.map((gasto) => (
                  <tr
                    key={gasto.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4">{gasto.fecha}</td>
                    <td className="p-4 font-semibold">{gasto.concepto}</td>
                    <td className="p-4">
                      <MedioPagoBadge medio={gasto.medioPago} />
                    </td>
                    <td className="p-4 font-bold">
                      {formatMoney(gasto.importe)}
                    </td>
                    <td className="p-4 text-[#6b7c93]">
                      {gasto.observacion || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {tramite.gastos.length === 0 && (
              <div className="p-8 text-center text-[#357eb8]">
                Este trámite todavía no tiene gastos cargados.
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end border-t border-[#acbac4]/40 p-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-[#acbac4] px-5 py-2 font-semibold text-[#1a3263] hover:bg-[#acbac4]/15"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

function ChecklistModal({ notificacion, onClose }) {
  const recibidos = notificacion.checklist.filter((item) => item.recibido).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-[#acbac4]/40 p-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a3263]">
              Checklist recibido
            </h2>

            <p className="text-[#357eb8]">
              {notificacion.vehiculo} · {notificacion.cliente}
            </p>

            <p className="text-sm text-[#6b7c93]">
              Recibidos {recibidos} de {notificacion.checklist.length} · Enviado
              por {notificacion.enviadaPor}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-[#acbac4] p-2 text-[#1a3263] hover:bg-[#acbac4]/15"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {notificacion.checklist.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#acbac4]/50 bg-[#f8fafc] p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-bold text-[#1a3263]">{item.nombre}</p>

                  <span
                    className={`rounded-lg px-3 py-1 text-sm font-semibold ${
                      item.recibido
                        ? "bg-[#26aa9c]/15 text-[#1b7f75]"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.recibido ? "Recibido" : "Pendiente"}
                  </span>
                </div>

                <p className="text-sm text-[#6b7c93]">
                  {item.observacion || "Sin observaciones"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#acbac4]/40 p-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-[#acbac4] px-5 py-2 font-semibold text-[#1a3263] hover:bg-[#acbac4]/15"
          >
            Cerrar
          </button>

          <button className="rounded-xl bg-[#26aa9c] px-5 py-2 font-semibold text-white hover:bg-[#219b8f]">
            Marcar como revisado
          </button>
        </div>
      </div>
    </div>
  );
}

function CambioEstadoModal({ modalEstado, setModalEstado, onConfirmar }) {
  const { tramite, nuevoEstado, observacion } = modalEstado;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-[#acbac4]/40 p-6">
          <div>
            <h2 className="text-xl font-bold text-[#1a3263]">
              Cambiar estado del trámite
            </h2>

            <p className="text-sm text-[#357eb8]">
              {tramite.venta} · {tramite.cliente}
            </p>
          </div>

          <button
            onClick={() =>
              setModalEstado({
                abierto: false,
                tramite: null,
                nuevoEstado: "",
                observacion: "",
              })
            }
            className="rounded-xl border border-[#acbac4] p-2 text-[#1a3263] hover:bg-[#acbac4]/15"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="rounded-xl bg-[#f8fafc] p-4">
            <p className="text-sm text-[#357eb8]">Nuevo estado</p>
            <p className="mt-1 font-bold text-[#1a3263]">{nuevoEstado}</p>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 font-semibold text-[#1a3263]">
              <MessageSquareText size={18} />
              Observación del cambio
            </label>

            <textarea
              value={observacion}
              onChange={(e) =>
                setModalEstado((prev) => ({
                  ...prev,
                  observacion: e.target.value,
                }))
              }
              rows={5}
              placeholder="Agregar observación..."
              className="w-full resize-none rounded-xl border border-[#acbac4] px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#acbac4]/40 p-5">
          <button
            onClick={() =>
              setModalEstado({
                abierto: false,
                tramite: null,
                nuevoEstado: "",
                observacion: "",
              })
            }
            className="rounded-xl border border-[#acbac4] px-5 py-2 font-semibold text-[#1a3263] hover:bg-[#acbac4]/15"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirmar}
            className="rounded-xl bg-[#1a3263] px-5 py-2 font-semibold text-white hover:bg-[#16284f]"
          >
            Guardar cambio
          </button>
        </div>
      </div>
    </div>
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

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#acbac4]/20 text-[#1a3263]">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

function MiniTotalCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/40 bg-white p-4">
      <p className="text-sm text-[#357eb8]">{title}</p>
      <p className="mt-1 text-2xl font-bold text-[#1a3263]">{value}</p>
    </div>
  );
}

function TipoBadge({ tipo }) {
  const styles = {
    "0KM": "bg-[#357eb8]/15 text-[#245f91]",
    Usado: "bg-[#26aa9c]/15 text-[#1b7f75]",
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
    "Documentación pedida": "bg-yellow-100 text-yellow-700",
    "Documentación recibida": "bg-[#26aa9c]/15 text-[#1b7f75]",
    "En proceso": "bg-[#357eb8]/15 text-[#245f91]",
    "Listo para inscribir": "bg-[#357eb8]/15 text-[#245f91]",
    "Listo para transferir": "bg-[#357eb8]/15 text-[#245f91]",
    Presentado: "bg-[#357eb8]/15 text-[#245f91]",
    Observado: "bg-orange-100 text-orange-700",
    Inscripto: "bg-green-100 text-green-700",
    Transferido: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`whitespace-nowrap rounded-lg px-3 py-1 text-sm font-semibold ${
        styles[estado] || "bg-[#acbac4]/25 text-[#1a3263]"
      }`}
    >
      {estado}
    </span>
  );
}

function MedioPagoBadge({ medio }) {
  const styles = {
    Efectivo: "bg-yellow-100 text-yellow-700",
    Transferencia: "bg-[#357eb8]/15 text-[#245f91]",
  };

  return (
    <span
      className={`rounded-lg px-3 py-1 text-sm font-semibold ${
        styles[medio] || "bg-[#acbac4]/25 text-[#1a3263]"
      }`}
    >
      {medio}
    </span>
  );
}