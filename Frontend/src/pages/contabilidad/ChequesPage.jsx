import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  X,
  ReceiptText,
  WalletCards,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarDays,
  Building2,
} from "lucide-react";

const chequesIniciales = [
  {
    id: "CH001",
    fechaIngreso: "02/07/2025",
    numero: "33565120",
    emisor: "TMSA",
    cliente: "Ariel Gaitán",
    banco: "Físico",
    vencimiento: "20/06/2025",
    monto: 1755028,
    montoEntregado: 1755028,
    entregadoA: "Maipú - Raptor",
    fechaEntregado: "02/07/2025",
    estado: "Entregado",
    observacion: "Cheque entregado a proveedor.",
  },
  {
    id: "CH002",
    fechaIngreso: "02/07/2025",
    numero: "34425387",
    emisor: "Agrocoraje SA",
    cliente: "Ariel Gaitán",
    banco: "Físico",
    vencimiento: "08/07/2025",
    monto: 4602249.2,
    montoEntregado: 4602249.2,
    entregadoA: "Maipú - Raptor",
    fechaEntregado: "02/07/2025",
    estado: "Entregado",
    observacion: "Aplicado a operación Maipú.",
  },
  {
    id: "CH003",
    fechaIngreso: "18/07/2025",
    numero: "318",
    emisor: "Romagnoli Sebastián",
    cliente: "Romagnoli Sebastián",
    banco: "Electrónico",
    vencimiento: "20/07/2025",
    monto: 1125000,
    montoEntregado: 1125000,
    entregadoA: "Maipú - Maverick",
    fechaEntregado: "20/07/2025",
    estado: "Entregado",
    observacion: "E-cheq entregado.",
  },
  {
    id: "CH004",
    fechaIngreso: "26/07/2025",
    numero: "1894",
    emisor: "Servicios Ambientales IV SRL",
    cliente: "Villareal Darío",
    banco: "Físico",
    vencimiento: "19/08/2025",
    monto: 282000,
    montoEntregado: 282000,
    entregadoA: "Durán",
    fechaEntregado: "",
    estado: "En cartera",
    observacion: "Pendiente de entrega.",
  },
  {
    id: "CH005",
    fechaIngreso: "26/07/2025",
    numero: "9543",
    emisor: "Caminos al Puerto SRL",
    cliente: "Villareal Darío",
    banco: "Físico",
    vencimiento: "30/08/2025",
    monto: 1358510.37,
    montoEntregado: 1358510.37,
    entregadoA: "Fantini",
    fechaEntregado: "",
    estado: "En cartera",
    observacion: "Pendiente de confirmar entrega.",
  },
  {
    id: "CH006",
    fechaIngreso: "14/08/2025",
    numero: "S/N",
    emisor: "Quevedo",
    cliente: "Quevedo",
    banco: "Electrónico",
    vencimiento: "14/08/2025",
    monto: 18000000,
    montoEntregado: 18000000,
    entregadoA: "Venta ganadera",
    fechaEntregado: "",
    estado: "Vencido",
    observacion: "Revisar estado del valor.",
  },
];

const formInicial = {
  fechaIngreso: "",
  numero: "",
  emisor: "",
  cliente: "",
  banco: "Físico",
  vencimiento: "",
  monto: "",
  montoEntregado: "",
  entregadoA: "",
  fechaEntregado: "",
  estado: "En cartera",
  observacion: "",
};

export default function ChequesPage() {
  const [cheques, setCheques] = useState(chequesIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [tipoFiltro, setTipoFiltro] = useState("Todos");
  const [chequeSeleccionado, setChequeSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formCheque, setFormCheque] = useState(formInicial);
  const [pagina, setPagina] = useState(1);

  const registrosPorPagina = 6;

  const chequesFiltrados = cheques.filter((cheque) => {
    const texto = `${cheque.numero} ${cheque.emisor} ${cheque.cliente} ${cheque.banco} ${cheque.entregadoA}`.toLowerCase();

    const coincideBusqueda = texto.includes(busqueda.toLowerCase());
    const coincideEstado = estadoFiltro === "Todos" || cheque.estado === estadoFiltro;
    const coincideTipo = tipoFiltro === "Todos" || cheque.banco === tipoFiltro;

    return coincideBusqueda && coincideEstado && coincideTipo;
  });

  const totalPaginas = Math.ceil(chequesFiltrados.length / registrosPorPagina);

  const chequesPaginados = chequesFiltrados.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  );

  const metricas = useMemo(() => {
    const total = cheques.reduce((acc, item) => acc + item.monto, 0);
    const entregado = cheques
      .filter((item) => item.estado === "Entregado")
      .reduce((acc, item) => acc + item.montoEntregado, 0);
    const cartera = cheques
      .filter((item) => item.estado === "En cartera")
      .reduce((acc, item) => acc + item.monto, 0);
    const vencidos = cheques.filter((item) => item.estado === "Vencido").length;

    return { total, entregado, cartera, vencidos };
  }, [cheques]);

  const guardarCheque = () => {
    if (!formCheque.numero || !formCheque.emisor || !formCheque.monto) return;

    const nuevoCheque = {
      id: `CH${Date.now().toString().slice(-5)}`,
      ...formCheque,
      monto: Number(formCheque.monto),
      montoEntregado: Number(formCheque.montoEntregado || 0),
    };

    setCheques([nuevoCheque, ...cheques]);
    setShowModal(false);
    setFormCheque(formInicial);
  };

  const abrirNuevoCheque = () => {
    setFormCheque({
      ...formInicial,
      fechaIngreso: new Date().toISOString().slice(0, 10),
    });
    setShowModal(true);
  };

  return (
    <section className="w-full">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3263]">
            Gestión de cheques
          </h1>
          <p className="text-[#357eb8]">
            Reemplaza el Excel de cheques con búsqueda, filtros, vencimientos y seguimiento de cartera.
          </p>
        </div>

        <button
          onClick={abrirNuevoCheque}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
        >
          <Plus size={18} />
          Nuevo cheque
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="Total cheques" value={formatMoney(metricas.total)} icon={ReceiptText} />
        <MetricCard title="Entregados" value={formatMoney(metricas.entregado)} icon={CheckCircle} highlight />
        <MetricCard title="En cartera" value={formatMoney(metricas.cartera)} icon={WalletCards} warning />
        <MetricCard title="Vencidos" value={metricas.vencidos} icon={AlertTriangle} danger />
      </div>

      <div className="mb-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-[#acbac4]/50 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#357eb8]/15 text-[#1a3263]">
              <CalendarDays size={22} />
            </div>
            <div>
              <h2 className="font-bold text-[#1a3263]">Próximos vencimientos</h2>
              <p className="text-sm text-[#357eb8]">Valores que requieren seguimiento.</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {cheques
              .filter((cheque) => cheque.estado !== "Entregado")
              .slice(0, 3)
              .map((cheque) => (
                <div key={cheque.id} className="rounded-xl border border-[#acbac4]/50 bg-[#f8fafc] p-4">
                  <p className="text-xs font-bold uppercase text-[#357eb8]">
                    Vence {cheque.vencimiento}
                  </p>
                  <p className="mt-1 font-bold text-[#1a3263]">{cheque.emisor}</p>
                  <p className="text-sm text-[#357eb8]">{cheque.numero}</p>
                  <p className="mt-3 text-lg font-bold text-[#26aa9c]">
                    {formatMoney(cheque.monto)}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#acbac4]/50 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#26aa9c]/15 text-[#1b7f75]">
              <Building2 size={22} />
            </div>
            <div>
              <h2 className="font-bold text-[#1a3263]">Destino frecuente</h2>
              <p className="text-sm text-[#357eb8]">A quién se entregan o aplican los cheques.</p>
            </div>
          </div>

          <div className="space-y-3">
            {["Maipú - Raptor", "Zento", "Giorgi - Boiero"].map((destino) => (
              <div key={destino} className="flex items-center justify-between rounded-xl bg-[#f8fafc] px-4 py-3">
                <span className="font-semibold text-[#1a3263]">{destino}</span>
                <span className="rounded-lg bg-[#acbac4]/20 px-3 py-1 text-sm font-bold text-[#357eb8]">
                  {cheques.filter((c) => c.entregadoA.toLowerCase().includes(destino.toLowerCase())).length} cheques
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">Listado de cheques</h2>
          <p className="text-sm text-[#357eb8]">
            Control de número, emisor, cliente, vencimiento, monto, entrega y saldo en cartera.
          </p>
        </div>

        <div className="p-6">
          <div className="mb-5 grid gap-4 xl:grid-cols-[1fr_180px_180px]">
            <div className="flex items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />
              <input
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setPagina(1);
                }}
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar por cheque, emisor, cliente, banco o entregado a..."
              />
            </div>

            <select
              value={tipoFiltro}
              onChange={(e) => {
                setTipoFiltro(e.target.value);
                setPagina(1);
              }}
              className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none"
            >
              <option>Todos</option>
              <option>Físico</option>
              <option>Electrónico</option>
            </select>

            <select
              value={estadoFiltro}
              onChange={(e) => {
                setEstadoFiltro(e.target.value);
                setPagina(1);
              }}
              className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none"
            >
              <option>Todos</option>
              <option>En cartera</option>
              <option>Entregado</option>
              <option>Vencido</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1250px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">N° cheque</th>
                  <th className="p-4">Emisor</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Vencimiento</th>
                  <th className="p-4">Monto</th>
                  <th className="p-4">Entregado a</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-center">Acción</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {chequesPaginados.map((cheque) => (
                  <tr key={cheque.id} className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10">
                    <td className="p-4 font-bold">{cheque.numero}</td>
                    <td className="p-4 font-semibold">{cheque.emisor}</td>
                    <td className="p-4">{cheque.cliente}</td>
                    <td className="p-4">
                      <TipoBadge tipo={cheque.banco} />
                    </td>
                    <td className="p-4">{cheque.vencimiento}</td>
                    <td className="p-4 font-bold text-[#26aa9c]">{formatMoney(cheque.monto)}</td>
                    <td className="p-4">{cheque.entregadoA || "-"}</td>
                    <td className="p-4">
                      <EstadoBadge estado={cheque.estado} />
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <IconButton title="Ver cheque" onClick={() => setChequeSeleccionado(cheque)}>
                          <Eye size={18} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#357eb8]">
              Mostrando {chequesPaginados.length} de {chequesFiltrados.length} cheques
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={pagina === 1}
                onClick={() => setPagina(pagina - 1)}
                className="rounded-lg border border-[#acbac4] p-2 text-[#1a3263] disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-sm font-bold text-[#1a3263]">
                Página {pagina} de {totalPaginas || 1}
              </span>

              <button
                disabled={pagina === totalPaginas || totalPaginas === 0}
                onClick={() => setPagina(pagina + 1)}
                className="rounded-lg border border-[#acbac4] p-2 text-[#1a3263] disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {chequeSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-7 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">Detalle del cheque</h2>
                <p className="text-[#357eb8]">
                  N° {chequeSeleccionado.numero} · {formatMoney(chequeSeleccionado.monto)}
                </p>
              </div>

              <button onClick={() => setChequeSeleccionado(null)} className="rounded-full p-2 hover:bg-[#acbac4]/20">
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="mb-5 flex items-center justify-between rounded-2xl bg-[#f8fafc] p-4">
              <div>
                <p className="text-sm text-[#357eb8]">Estado actual</p>
                <EstadoBadge estado={chequeSeleccionado.estado} />
              </div>
              <div className="text-right">
                <p className="text-sm text-[#357eb8]">Monto</p>
                <p className="text-xl font-bold text-[#26aa9c]">
                  {formatMoney(chequeSeleccionado.monto)}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <DatoSimple label="Fecha ingreso" value={chequeSeleccionado.fechaIngreso} />
              <DatoSimple label="N° cheque" value={chequeSeleccionado.numero} />
              <DatoSimple label="Emisor" value={chequeSeleccionado.emisor} />
              <DatoSimple label="Cliente" value={chequeSeleccionado.cliente} />
              <DatoSimple label="Tipo" value={chequeSeleccionado.banco} />
              <DatoSimple label="Vencimiento" value={chequeSeleccionado.vencimiento} />
              <DatoSimple label="Monto entregado" value={formatMoney(chequeSeleccionado.montoEntregado)} />
              <DatoSimple label="Entregado a" value={chequeSeleccionado.entregadoA || "-"} />
              <DatoSimple label="Fecha entregado" value={chequeSeleccionado.fechaEntregado || "-"} />
              <DatoSimple label="Observación" value={chequeSeleccionado.observacion || "-"} />
            </div>

            <div className="mt-7 flex justify-end border-t border-[#acbac4]/40 pt-5">
              <button
                onClick={() => setChequeSeleccionado(null)}
                className="rounded-xl bg-[#1a3263] px-5 py-3 font-semibold text-white hover:bg-[#14264c]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">Nuevo cheque</h2>
                <p className="text-[#357eb8]">Cargá los datos principales del valor.</p>
              </div>

              <button onClick={() => setShowModal(false)} className="rounded-full p-2 hover:bg-[#acbac4]/20">
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Fecha ingreso" type="date" value={formCheque.fechaIngreso} onChange={(v) => setFormCheque({ ...formCheque, fechaIngreso: v })} />
              <Input label="N° cheque" value={formCheque.numero} onChange={(v) => setFormCheque({ ...formCheque, numero: v })} />
              <Input label="Emisor" value={formCheque.emisor} onChange={(v) => setFormCheque({ ...formCheque, emisor: v })} />
              <Input label="Cliente" value={formCheque.cliente} onChange={(v) => setFormCheque({ ...formCheque, cliente: v })} />

              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">Tipo</span>
                <select
                  value={formCheque.banco}
                  onChange={(e) => setFormCheque({ ...formCheque, banco: e.target.value })}
                  className="input-base"
                >
                  <option>Físico</option>
                  <option>Electrónico</option>
                </select>
              </label>

              <Input label="Vencimiento" type="date" value={formCheque.vencimiento} onChange={(v) => setFormCheque({ ...formCheque, vencimiento: v })} />
              <Input label="Monto" type="number" value={formCheque.monto} onChange={(v) => setFormCheque({ ...formCheque, monto: v })} />
              <Input label="Monto entregado" type="number" value={formCheque.montoEntregado} onChange={(v) => setFormCheque({ ...formCheque, montoEntregado: v })} />
              <Input label="Entregado a" value={formCheque.entregadoA} onChange={(v) => setFormCheque({ ...formCheque, entregadoA: v })} />
              <Input label="Fecha entregado" type="date" value={formCheque.fechaEntregado} onChange={(v) => setFormCheque({ ...formCheque, fechaEntregado: v })} />

              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">Estado</span>
                <select
                  value={formCheque.estado}
                  onChange={(e) => setFormCheque({ ...formCheque, estado: e.target.value })}
                  className="input-base"
                >
                  <option>En cartera</option>
                  <option>Entregado</option>
                  <option>Vencido</option>
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="mb-1 block font-semibold text-[#1a3263]">Observación</span>
                <textarea
                  rows="3"
                  value={formCheque.observacion}
                  onChange={(e) => setFormCheque({ ...formCheque, observacion: e.target.value })}
                  className="input-base"
                  placeholder="Ej: aplicado a compra, entregado a proveedor, pendiente de confirmar..."
                />
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
              >
                Cancelar
              </button>

              <button
                onClick={guardarCheque}
                className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
              >
                Guardar cheque
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function MetricCard({ title, value, icon: Icon, highlight, warning, danger }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/40 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#357eb8]">{title}</p>
          <p
            className={`mt-2 text-2xl font-bold ${
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

function EstadoBadge({ estado }) {
  const styles = {
    "En cartera": "bg-yellow-100 text-yellow-700",
    Entregado: "bg-[#26aa9c]/15 text-[#1b7f75]",
    Vencido: "bg-red-100 text-red-700",
  };

  return (
    <span className={`rounded-lg px-3 py-1 text-sm font-semibold ${styles[estado] || "bg-[#acbac4]/25 text-[#1a3263]"}`}>
      {estado}
    </span>
  );
}

function TipoBadge({ tipo }) {
  const styles = {
    Físico: "bg-[#357eb8]/15 text-[#1a3263]",
    Electrónico: "bg-[#26aa9c]/15 text-[#1b7f75]",
  };

  return (
    <span className={`rounded-lg px-3 py-1 text-sm font-semibold ${styles[tipo] || "bg-[#acbac4]/25 text-[#1a3263]"}`}>
      {tipo}
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

function DatoSimple({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-[#f8fafc] px-4 py-3">
      <span className="text-sm text-[#357eb8]">{label}</span>
      <span className="text-right text-sm font-bold text-[#1a3263]">{value}</span>
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

function formatMoney(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value || 0);
}