import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Wallet,
  Building2,
  Receipt,
  CalendarDays,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const gastosIniciales = [
  {
    id: "GF001",
    concepto: "Alquiler salón",
    categoria: "Infraestructura",
    proveedor: "Inmobiliaria Centro",
    importe: 2500000,
    frecuencia: "Mensual",
    vencimiento: "2026-05-10",
    estado: "Pendiente",
    medioPago: "Transferencia",
    observacion: "Alquiler oficina principal",
  },
  {
    id: "GF002",
    concepto: "Internet y telefonía",
    categoria: "Servicios",
    proveedor: "Personal Empresas",
    importe: 320000,
    frecuencia: "Mensual",
    vencimiento: "2026-05-15",
    estado: "Pagado",
    medioPago: "Débito automático",
    observacion: "Sucursal central",
  },
  {
    id: "GF003",
    concepto: "Sistema de gestión",
    categoria: "Software",
    proveedor: "PMIT Software",
    importe: 580000,
    frecuencia: "Mensual",
    vencimiento: "2026-05-20",
    estado: "Pendiente",
    medioPago: "Transferencia",
    observacion: "Licencia ERP",
  },
  {
    id: "GF004",
    concepto: "Seguro flota",
    categoria: "Seguros",
    proveedor: "La Caja",
    importe: 1750000,
    frecuencia: "Mensual",
    vencimiento: "2026-05-25",
    estado: "Vencido",
    medioPago: "Cheque",
    observacion: "Cobertura total",
  },
];

const formInicial = {
  concepto: "",
  categoria: "Servicios",
  proveedor: "",
  importe: "",
  frecuencia: "Mensual",
  vencimiento: "",
  estado: "Pendiente",
  medioPago: "Transferencia",
  observacion: "",
};

export default function GastosFijosPage() {
  const [gastos, setGastos] = useState(gastosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [showModal, setShowModal] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [gastoSeleccionado, setGastoSeleccionado] = useState(null);
  const [form, setForm] = useState(formInicial);

  const registrosPorPagina = 6;

  const gastosFiltrados = gastos.filter((gasto) => {
    const texto =
      `${gasto.concepto} ${gasto.categoria} ${gasto.proveedor}`.toLowerCase();

    const coincideBusqueda = texto.includes(busqueda.toLowerCase());
    const coincideEstado =
      estadoFiltro === "Todos" || gasto.estado === estadoFiltro;

    return coincideBusqueda && coincideEstado;
  });

  const totalPaginas = Math.ceil(
    gastosFiltrados.length / registrosPorPagina
  );

  const gastosPaginados = gastosFiltrados.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  );

  const metricas = useMemo(() => {
    const total = gastos.reduce((acc, item) => acc + item.importe, 0);

    const pendientes = gastos
      .filter((item) => item.estado === "Pendiente")
      .reduce((acc, item) => acc + item.importe, 0);

    const pagados = gastos
      .filter((item) => item.estado === "Pagado")
      .reduce((acc, item) => acc + item.importe, 0);

    const vencidos = gastos.filter(
      (item) => item.estado === "Vencido"
    ).length;

    return {
      total,
      pendientes,
      pagados,
      vencidos,
    };
  }, [gastos]);

  const abrirNuevo = () => {
    setGastoSeleccionado(null);

    setForm({
      ...formInicial,
      vencimiento: new Date().toISOString().slice(0, 10),
    });

    setShowModal(true);
  };

  const editarGasto = (gasto) => {
    setGastoSeleccionado(gasto);

    setForm({
      concepto: gasto.concepto,
      categoria: gasto.categoria,
      proveedor: gasto.proveedor,
      importe: gasto.importe,
      frecuencia: gasto.frecuencia,
      vencimiento: gasto.vencimiento,
      estado: gasto.estado,
      medioPago: gasto.medioPago,
      observacion: gasto.observacion,
    });

    setShowModal(true);
  };

  const guardarGasto = () => {
    if (!form.concepto || !form.importe) return;

    if (gastoSeleccionado) {
      setGastos((prev) =>
        prev.map((item) =>
          item.id === gastoSeleccionado.id
            ? {
                ...item,
                ...form,
                importe: Number(form.importe),
              }
            : item
        )
      );
    } else {
      const nuevo = {
        id: `GF${Date.now().toString().slice(-5)}`,
        ...form,
        importe: Number(form.importe),
      };

      setGastos([nuevo, ...gastos]);
    }

    setShowModal(false);
    setForm(formInicial);
  };

  const eliminarGasto = (id) => {
    setGastos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="w-full">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3263]">
            Gastos fijos
          </h1>

          <p className="text-[#357eb8]">
            Gestioná alquileres, servicios, seguros, sistemas y gastos
            recurrentes de la empresa.
          </p>
        </div>

        <button
          onClick={abrirNuevo}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
        >
          <Plus size={18} />
          Nuevo gasto
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard
          title="Total mensual"
          value={formatMoney(metricas.total)}
          icon={Wallet}
        />

        <MetricCard
          title="Pendientes"
          value={formatMoney(metricas.pendientes)}
          icon={AlertTriangle}
          warning
        />

        <MetricCard
          title="Pagados"
          value={formatMoney(metricas.pagados)}
          icon={CheckCircle}
          highlight
        />

        <MetricCard
          title="Vencidos"
          value={metricas.vencidos}
          icon={Receipt}
          danger
        />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Listado de gastos fijos
          </h2>

          <p className="text-sm text-[#357eb8]">
            Controlá vencimientos, pagos recurrentes y servicios activos.
          </p>
        </div>

        <div className="p-6">
          <div className="mb-5 grid gap-4 xl:grid-cols-[1fr_220px]">
            <div className="flex items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />

              <input
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setPagina(1);
                }}
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar concepto, categoría o proveedor..."
              />
            </div>

            <select
              value={estadoFiltro}
              onChange={(e) => {
                setEstadoFiltro(e.target.value);
                setPagina(1);
              }}
              className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none"
            >
              <option>Todos</option>
              <option>Pendiente</option>
              <option>Pagado</option>
              <option>Vencido</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1200px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">Concepto</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Proveedor</th>
                  <th className="p-4">Frecuencia</th>
                  <th className="p-4">Vencimiento</th>
                  <th className="p-4">Importe</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {gastosPaginados.map((gasto) => (
                  <tr
                    key={gasto.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-semibold">
                      {gasto.concepto}
                    </td>

                    <td className="p-4">
                      <CategoriaBadge categoria={gasto.categoria} />
                    </td>

                    <td className="p-4">{gasto.proveedor}</td>

                    <td className="p-4">{gasto.frecuencia}</td>

                    <td className="p-4">{gasto.vencimiento}</td>

                    <td className="p-4 font-bold text-[#26aa9c]">
                      {formatMoney(gasto.importe)}
                    </td>

                    <td className="p-4">
                      <EstadoBadge estado={gasto.estado} />
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <IconButton
                          title="Editar"
                          onClick={() => editarGasto(gasto)}
                        >
                          <Pencil size={16} />
                        </IconButton>

                        <IconButton
                          title="Eliminar"
                          danger
                          onClick={() => eliminarGasto(gasto.id)}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-[#357eb8]">
              Mostrando {gastosPaginados.length} de{" "}
              {gastosFiltrados.length} gastos
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
                disabled={
                  pagina === totalPaginas || totalPaginas === 0
                }
                onClick={() => setPagina(pagina + 1)}
                className="rounded-lg border border-[#acbac4] p-2 text-[#1a3263] disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  {gastoSeleccionado
                    ? "Editar gasto fijo"
                    : "Nuevo gasto fijo"}
                </h2>

                <p className="text-[#357eb8]">
                  Configurá servicios, alquileres y gastos recurrentes.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Concepto"
                value={form.concepto}
                onChange={(v) =>
                  setForm({ ...form, concepto: v })
                }
              />

              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Categoría
                </span>

                <select
                  value={form.categoria}
                  onChange={(e) =>
                    setForm({ ...form, categoria: e.target.value })
                  }
                  className="input-base"
                >
                  <option>Servicios</option>
                  <option>Infraestructura</option>
                  <option>Software</option>
                  <option>Seguros</option>
                  <option>Marketing</option>
                  <option>Sueldos</option>
                </select>
              </label>

              <Input
                label="Proveedor"
                value={form.proveedor}
                onChange={(v) =>
                  setForm({ ...form, proveedor: v })
                }
              />

              <Input
                label="Importe"
                type="number"
                value={form.importe}
                onChange={(v) =>
                  setForm({ ...form, importe: v })
                }
              />

              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Frecuencia
                </span>

                <select
                  value={form.frecuencia}
                  onChange={(e) =>
                    setForm({ ...form, frecuencia: e.target.value })
                  }
                  className="input-base"
                >
                  <option>Mensual</option>
                  <option>Bimestral</option>
                  <option>Trimestral</option>
                  <option>Anual</option>
                </select>
              </label>

              <Input
                label="Vencimiento"
                type="date"
                value={form.vencimiento}
                onChange={(v) =>
                  setForm({ ...form, vencimiento: v })
                }
              />

              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Estado
                </span>

                <select
                  value={form.estado}
                  onChange={(e) =>
                    setForm({ ...form, estado: e.target.value })
                  }
                  className="input-base"
                >
                  <option>Pendiente</option>
                  <option>Pagado</option>
                  <option>Vencido</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Medio pago
                </span>

                <select
                  value={form.medioPago}
                  onChange={(e) =>
                    setForm({ ...form, medioPago: e.target.value })
                  }
                  className="input-base"
                >
                  <option>Transferencia</option>
                  <option>Efectivo</option>
                  <option>Cheque</option>
                  <option>Débito automático</option>
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Observación
                </span>

                <textarea
                  rows="3"
                  value={form.observacion}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      observacion: e.target.value,
                    })
                  }
                  className="input-base"
                  placeholder="Notas internas..."
                />
              </label>
            </div>

            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 font-bold text-red-700">
              Impacto contable: DEBE - Egreso fijo mensual
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
              >
                Cancelar
              </button>

              <button
                onClick={guardarGasto}
                className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
              >
                Guardar gasto
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  highlight,
  warning,
  danger,
}) {
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
    Pendiente: "bg-yellow-100 text-yellow-700",
    Pagado: "bg-[#26aa9c]/15 text-[#1b7f75]",
    Vencido: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-lg px-3 py-1 text-sm font-semibold ${
        styles[estado]
      }`}
    >
      {estado}
    </span>
  );
}

function CategoriaBadge({ categoria }) {
  return (
    <span className="rounded-lg bg-[#357eb8]/15 px-3 py-1 text-sm font-semibold text-[#1a3263]">
      {categoria}
    </span>
  );
}

function IconButton({
  children,
  title,
  onClick,
  danger,
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
        danger
          ? "border-red-300 text-red-600 hover:bg-red-50"
          : "border-[#357eb8] text-[#357eb8] hover:bg-[#357eb8]/10"
      }`}
    >
      {children}
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold text-[#1a3263]">
        {label}
      </span>

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