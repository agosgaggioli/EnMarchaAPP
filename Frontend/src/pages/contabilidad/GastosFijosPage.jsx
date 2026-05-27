import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Wallet,
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
    importe: 2500000,
    vencimiento: "2026-05-10",
    estado: "Pendiente",
    observacion: "Alquiler oficina principal",
  },
  {
    id: "GF002",
    concepto: "Internet y telefonía",
    importe: 320000,
    vencimiento: "2026-05-15",
    estado: "Pendiente",
    observacion: "Sucursal central",
  },
  {
    id: "GF003",
    concepto: "Sistema de gestión",
    importe: 580000,
    vencimiento: "2026-05-20",
    estado: "Pagado",
    observacion: "Licencia ERP",
  },
  {
    id: "GF004",
    concepto: "Seguro flota",
    importe: 1750000,
    vencimiento: "2026-05-25",
    estado: "Pendiente",
    observacion: "Cobertura total",
  },
];

const formInicial = {
  concepto: "",
  importe: "",
  vencimiento: "",
  observacion: "",
};

export default function GastosFijosPage() {
  const [gastos, setGastos] = useState(gastosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [gastoSeleccionado, setGastoSeleccionado] = useState(null);
  const [form, setForm] = useState(formInicial);

  const registrosPorPagina = 6;

  const gastosFiltrados = gastos.filter((gasto) => {
    const texto =
      `${gasto.concepto} ${gasto.observacion} ${gasto.estado}`.toLowerCase();

    return texto.includes(busqueda.toLowerCase());
  });

  const totalPaginas = Math.ceil(
    gastosFiltrados.length / registrosPorPagina
  );

  const gastosPaginados = gastosFiltrados.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  );

  const metricas = useMemo(() => {
    const total = gastos.reduce(
      (acc, item) => acc + item.importe,
      0
    );

    const pagadoMes = gastos
      .filter((item) => item.estado === "Pagado")
      .reduce((acc, item) => acc + item.importe, 0);

    const saldoPendiente = gastos
      .filter((item) => item.estado === "Pendiente")
      .reduce((acc, item) => acc + item.importe, 0);

    const conVencimiento = gastos.filter(
      (item) =>
        item.vencimiento &&
        item.vencimiento !== "-"
    ).length;

    return {
      total,
      pagadoMes,
      saldoPendiente,
      cantidad: gastos.length,
      conVencimiento,
    };
  }, [gastos]);

  const abrirNuevo = () => {
    setGastoSeleccionado(null);
    setForm(formInicial);
    setShowModal(true);
  };

  const editarGasto = (gasto) => {
    setGastoSeleccionado(gasto);

    setForm({
      concepto: gasto.concepto,
      importe: gasto.importe,
      vencimiento:
        gasto.vencimiento === "-"
          ? ""
          : gasto.vencimiento,
      observacion: gasto.observacion || "",
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
                concepto: form.concepto,
                importe: Number(form.importe),
                vencimiento:
                  form.vencimiento || "-",
                observacion: form.observacion,
              }
            : item
        )
      );
    } else {
      const nuevo = {
        id: `GF${Date.now()
          .toString()
          .slice(-5)}`,
        concepto: form.concepto,
        importe: Number(form.importe),
        vencimiento:
          form.vencimiento || "-",
        estado: "Pendiente",
        observacion: form.observacion,
      };

      setGastos([nuevo, ...gastos]);
    }

    setShowModal(false);
    setForm(formInicial);
    setGastoSeleccionado(null);
  };

  const eliminarGasto = (id) => {
    setGastos((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <section className="w-full">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3263]">
            Gastos fijos
          </h1>

          <p className="text-[#357eb8]">
            Cargá y administrá los gastos recurrentes de la empresa.
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

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-5">
        <MetricCard
          title="Total estimado"
          value={formatMoney(metricas.total)}
          icon={Wallet}
        />

        <MetricCard
          title="Pagado este mes"
          value={formatMoney(metricas.pagadoMes)}
          icon={CheckCircle}
          highlight
        />

        <MetricCard
          title="Saldo pendiente"
          value={formatMoney(metricas.saldoPendiente)}
          icon={AlertTriangle}
          danger
        />

        <MetricCard
          title="Gastos cargados"
          value={metricas.cantidad}
          icon={Receipt}
          highlight
        />

        <MetricCard
          title="Con vencimiento"
          value={metricas.conVencimiento}
          icon={CalendarDays}
          warning
        />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Listado de gastos fijos
          </h2>

          <p className="text-sm text-[#357eb8]">
            Visualizá los gastos cargados,
            sus importes, vencimientos y
            estado de pago actualizado automáticamente.
          </p>
        </div>

        <div className="p-6">
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
            <Search
              size={20}
              className="text-[#357eb8]"
            />

            <input
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPagina(1);
              }}
              className="w-full outline-none placeholder:text-[#acbac4]"
              placeholder="Buscar gasto, observación o estado..."
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">Gasto</th>
                  <th className="p-4">Importe</th>
                  <th className="p-4">Vencimiento</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Observación</th>
                  <th className="p-4 text-center">
                    Acciones
                  </th>
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

                    <td className="p-4 font-bold text-[#26aa9c]">
                      {formatMoney(gasto.importe)}
                    </td>

                    <td className="p-4">
                      {gasto.vencimiento &&
                      gasto.vencimiento !== "-" ? (
                        <VencimientoBadge
                          value={gasto.vencimiento}
                        />
                      ) : (
                        <span className="text-sm text-[#acbac4]">
                          Sin fecha
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <EstadoBadge
                        estado={gasto.estado}
                      />
                    </td>

                    <td className="p-4">
                      {gasto.observacion || (
                        <span className="text-sm text-[#acbac4]">
                          -
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <IconButton
                          title="Editar"
                          onClick={() =>
                            editarGasto(gasto)
                          }
                        >
                          <Pencil size={16} />
                        </IconButton>

                        <IconButton
                          title="Eliminar"
                          danger
                          onClick={() =>
                            eliminarGasto(gasto.id)
                          }
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}

                {gastosPaginados.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-6 text-center text-sm text-[#357eb8]"
                    >
                      No se encontraron gastos fijos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-[#357eb8]">
              Mostrando{" "}
              {gastosPaginados.length} de{" "}
              {gastosFiltrados.length} gastos
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={pagina === 1}
                onClick={() =>
                  setPagina(pagina - 1)
                }
                className="rounded-lg border border-[#acbac4] p-2 text-[#1a3263] disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-sm font-bold text-[#1a3263]">
                Página {pagina} de{" "}
                {totalPaginas || 1}
              </span>

              <button
                disabled={
                  pagina === totalPaginas ||
                  totalPaginas === 0
                }
                onClick={() =>
                  setPagina(pagina + 1)
                }
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
          <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  {gastoSeleccionado
                    ? "Editar gasto fijo"
                    : "Nuevo gasto fijo"}
                </h2>

                <p className="text-[#357eb8]">
                  Cargá el gasto, importe y vencimiento si corresponde.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X
                  size={22}
                  className="text-[#1a3263]"
                />
              </button>
            </div>

            <div className="grid gap-5">
              <Input
                label="Gasto"
                value={form.concepto}
                onChange={(v) =>
                  setForm({
                    ...form,
                    concepto: v,
                  })
                }
                placeholder="Ej: Alquiler, luz, internet..."
              />

              <Input
                label="Importe"
                type="number"
                value={form.importe}
                onChange={(v) =>
                  setForm({
                    ...form,
                    importe: v,
                  })
                }
                placeholder="$ 0"
              />

              <Input
                label="Vencimiento"
                type="date"
                value={form.vencimiento}
                onChange={(v) =>
                  setForm({
                    ...form,
                    vencimiento: v,
                  })
                }
              />

              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Observación
                </span>

                <textarea
                  rows="3"
                  value={form.observacion}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      observacion:
                        e.target.value,
                    })
                  }
                  className="input-base"
                  placeholder="Notas internas opcionales..."
                />
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
              <button
                onClick={() =>
                  setShowModal(false)
                }
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
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[#357eb8]">
            {title}
          </p>

          <p
            className={`mt-2 text-xl font-bold ${
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
  const pagado =
    estado === "Pagado";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-semibold ${
        pagado
          ? "bg-[#26aa9c]/15 text-[#1a3263]"
          : "bg-red-50 text-red-600"
      }`}
    >
      {pagado ? (
        <CheckCircle size={15} />
      ) : (
        <AlertTriangle size={15} />
      )}

      {estado}
    </span>
  );
}

function VencimientoBadge({ value }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg bg-[#357eb8]/15 px-3 py-1 text-sm font-semibold text-[#1a3263]">
      <CalendarDays size={15} />
      {value}
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
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="input-base"
      />
    </label>
  );
}

function formatMoney(value) {
  return new Intl.NumberFormat(
    "es-AR",
    {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }
  ).format(value || 0);
}