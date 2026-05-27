import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Wallet,
  Landmark,
  X,
} from "lucide-react";

const movimientosIniciales = [
  {
    id: 1,
    fecha: "2026-05-27",
    hora: "09:15",
    tipo: "Ingreso",
    concepto: "Transferencia interna a caja gestoría",
    tramite: "Movimiento interno",
    medioPago: "Efectivo",
    importe: 150000,
    origen: "Libro diario general",
    observacion:
      "Ingreso automático desde cuentas internas.",
  },

  {
    id: 2,
    fecha: "2026-05-27",
    hora: "09:40",
    tipo: "Ingreso",
    concepto: "Transferencia interna a banco gestoría",
    tramite: "Movimiento interno",
    medioPago: "Transferencia",
    importe: 220000,
    origen: "Libro diario general",
    observacion:
      "Ingreso automático desde cuenta bancaria general.",
  },

  {
    id: 3,
    fecha: "2026-05-27",
    hora: "10:40",
    tipo: "Egreso",
    concepto: "Pago formulario inscripción",
    tramite: "VT250 · Chevrolet Montana",
    medioPago: "Efectivo",
    importe: 18500,
    origen: "Caja gestoría",
    observacion:
      "Formulario para inscripción 0KM.",
  },

  {
    id: 4,
    fecha: "2026-05-27",
    hora: "11:20",
    tipo: "Egreso",
    concepto: "Verificación policial",
    tramite: "VT241 · Volkswagen Saveiro",
    medioPago: "Transferencia",
    importe: 42000,
    origen: "Caja gestoría",
    observacion:
      "Pago asociado a transferencia.",
  },
];

const tramites = [
  "VT250 · Chevrolet Montana",
  "VT241 · Volkswagen Saveiro",
  "VT248 · Fiat Cronos",
];

const formatMoney = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);

export default function CajaGestoriaPage() {
  const [movimientos, setMovimientos] =
    useState(movimientosIniciales);

  const [busqueda, setBusqueda] =
    useState("");

  const [modalAbierto, setModalAbierto] =
    useState(false);

  const movimientosFiltrados =
    useMemo(() => {
      return movimientos.filter((m) => {
        const texto =
          `${m.tipo} ${m.concepto} ${m.tramite} ${m.medioPago} ${m.origen} ${m.observacion}`.toLowerCase();

        return texto.includes(
          busqueda.toLowerCase()
        );
      });
    }, [movimientos, busqueda]);

  const ingresos = movimientos
    .filter((m) => m.tipo === "Ingreso")
    .reduce(
      (acc, m) => acc + m.importe,
      0
    );

  const egresos = movimientos
    .filter((m) => m.tipo === "Egreso")
    .reduce(
      (acc, m) => acc + m.importe,
      0
    );

  const saldo = ingresos - egresos;

  const saldoEfectivo =
    movimientos.reduce((acc, m) => {
      if (m.medioPago !== "Efectivo")
        return acc;

      return m.tipo === "Ingreso"
        ? acc + m.importe
        : acc - m.importe;
    }, 0);

  const saldoTransferencia =
    movimientos.reduce((acc, m) => {
      if (
        m.medioPago !==
        "Transferencia"
      )
        return acc;

      return m.tipo === "Ingreso"
        ? acc + m.importe
        : acc - m.importe;
    }, 0);

  const agregarGasto = (
    nuevoGasto
  ) => {
    setMovimientos((prev) => [
      {
        ...nuevoGasto,
        id: Date.now(),
        tipo: "Egreso",
        origen: "Caja gestoría",
        hora: new Date().toLocaleTimeString(
          "es-AR",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
      },

      ...prev,
    ]);
  };

  return (
    <section className="w-full">
      <div className="mb-6 rounded-2xl border border-[#acbac4]/50 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="font-semibold text-[#357eb8]">
              Caja gestoría
            </p>

            <h1 className="text-3xl font-bold text-[#1a3263]">
              Libro de caja
            </h1>

            <p className="text-[#6b7c93]">
              Control de ingresos
              internos y gastos
              operativos de gestoría.
            </p>
          </div>

          <button
            onClick={() =>
              setModalAbierto(true)
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a3263] px-5 py-3 font-semibold text-white hover:bg-[#16284f]"
          >
            <Plus size={18} />
            Nuevo gasto
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <ResumenCard
            title="Ingresos internos"
            value={formatMoney(
              ingresos
            )}
          />

          <ResumenCard
            title="Egresos gestoría"
            value={formatMoney(
              egresos
            )}
            negative
          />

          <ResumenCard
            title="Saldo caja gestoría"
            value={formatMoney(
              saldo
            )}
            positive={
              saldo >= 0
            }
          />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <MedioCard
          title="Saldo efectivo"
          value={formatMoney(
            saldoEfectivo
          )}
          icon={Wallet}
        />

        <MedioCard
          title="Saldo banco / transferencia"
          value={formatMoney(
            saldoTransferencia
          )}
          icon={Landmark}
        />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#acbac4]/40 p-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1a3263]">
              Movimientos de caja
            </h2>

            <p className="text-sm text-[#357eb8]">
              Ingresos automáticos y
              gastos registrados por
              gestoría.
            </p>
          </div>

          <div className="flex min-w-[320px] items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
            <Search
              size={20}
              className="text-[#357eb8]"
            />

            <input
              value={busqueda}
              onChange={(e) =>
                setBusqueda(
                  e.target.value
                )
              }
              className="w-full outline-none placeholder:text-[#acbac4]"
              placeholder="Buscar movimiento..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px] text-left">
            <thead className="bg-[#1a3263] text-white">
              <tr>
                <th className="p-4">
                  Fecha
                </th>

                <th className="p-4">
                  Movimiento
                </th>

                <th className="p-4">
                  Referencia
                </th>

                <th className="p-4">
                  Medio
                </th>

                <th className="p-4">
                  Debe /
                  Ingreso
                </th>

                <th className="p-4">
                  Haber /
                  Egreso
                </th>

                <th className="p-4">
                  Origen
                </th>

                <th className="p-4">
                  Observación
                </th>
              </tr>
            </thead>

            <tbody className="text-[#1a3263]">
              {movimientosFiltrados.map(
                (mov) => (
                  <tr
                    key={mov.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4">
                      <div className="rounded-xl bg-[#eef3f8] px-4 py-3 text-center font-bold">
                        {mov.fecha}

                        <p className="text-sm font-medium text-[#357eb8]">
                          {
                            mov.hora
                          }
                        </p>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                            mov.tipo ===
                            "Ingreso"
                              ? "bg-[#26aa9c]/15 text-[#1b7f75]"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {mov.tipo ===
                          "Ingreso" ? (
                            <ArrowUp
                              size={
                                20
                              }
                            />
                          ) : (
                            <ArrowDown
                              size={
                                20
                              }
                            />
                          )}
                        </div>

                        <div>
                          <p className="font-bold">
                            {
                              mov.concepto
                            }
                          </p>

                          <p className="text-sm text-[#357eb8]">
                            {
                              mov.tipo
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-semibold">
                      {
                        mov.tramite
                      }
                    </td>

                    <td className="p-4">
                      <MedioBadge
                        medio={
                          mov.medioPago
                        }
                      />
                    </td>

                    <td className="p-4 font-bold text-[#1b7f75]">
                      {mov.tipo ===
                      "Ingreso"
                        ? formatMoney(
                            mov.importe
                          )
                        : "-"}
                    </td>

                    <td className="p-4 font-bold text-red-700">
                      {mov.tipo ===
                      "Egreso"
                        ? formatMoney(
                            mov.importe
                          )
                        : "-"}
                    </td>

                    <td className="p-4 text-[#357eb8]">
                      {
                        mov.origen
                      }
                    </td>

                    <td className="p-4 text-[#6b7c93]">
                      {mov.observacion ||
                        "-"}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {movimientosFiltrados.length ===
            0 && (
            <div className="p-8 text-center text-[#357eb8]">
              No se encontraron
              movimientos.
            </div>
          )}
        </div>
      </div>

      {modalAbierto && (
        <NuevoGastoModal
          onClose={() =>
            setModalAbierto(false)
          }
          onGuardar={
            agregarGasto
          }
        />
      )}
    </section>
  );
}

function NuevoGastoModal({
  onClose,
  onGuardar,
}) {
  const [form, setForm] = useState({
    fecha: new Date()
      .toISOString()
      .slice(0, 10),

    concepto: "",

    tramite: tramites[0],

    medioPago: "Efectivo",

    importe: "",

    observacion: "",
  });

  const guardar = () => {
    if (
      !form.concepto ||
      !form.importe
    )
      return;

    onGuardar({
      ...form,
      importe: Number(
        form.importe
      ),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-[#acbac4]/40 p-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a3263]">
              Nuevo gasto
            </h2>

            <p className="text-sm text-[#357eb8]">
              Registrar egreso
              de caja
              gestoría.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-[#acbac4] p-2 text-[#1a3263] hover:bg-[#acbac4]/15"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
          <Input label="Fecha">
            <input
              type="date"
              value={form.fecha}
              onChange={(e) =>
                setForm({
                  ...form,
                  fecha:
                    e.target
                      .value,
                })
              }
              className="input"
            />
          </Input>

          <Input label="Trámite asociado">
            <select
              value={form.tramite}
              onChange={(e) =>
                setForm({
                  ...form,
                  tramite:
                    e.target
                      .value,
                })
              }
              className="input"
            >
              {tramites.map(
                (t) => (
                  <option
                    key={t}
                  >
                    {t}
                  </option>
                )
              )}
            </select>
          </Input>

          <Input label="Medio de pago">
            <select
              value={
                form.medioPago
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  medioPago:
                    e.target
                      .value,
                })
              }
              className="input"
            >
              <option>
                Efectivo
              </option>

              <option>
                Transferencia
              </option>
            </select>
          </Input>

          <Input label="Importe">
            <input
              type="number"
              value={
                form.importe
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  importe:
                    e.target
                      .value,
                })
              }
              placeholder="$0"
              className="input"
            />
          </Input>

          <div className="md:col-span-2">
            <Input label="Concepto">
              <input
                value={
                  form.concepto
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    concepto:
                      e.target
                        .value,
                  })
                }
                placeholder="Ej: Formulario, verificación, sellado..."
                className="input"
              />
            </Input>
          </div>

          <div className="md:col-span-2">
            <Input label="Observación">
              <textarea
                value={
                  form.observacion
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    observacion:
                      e.target
                        .value,
                  })
                }
                placeholder="Detalle opcional..."
                className="input h-24 resize-none"
              />
            </Input>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#acbac4]/40 p-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-[#acbac4] px-5 py-2 font-semibold text-[#1a3263] hover:bg-[#acbac4]/15"
          >
            Cancelar
          </button>

          <button
            onClick={guardar}
            className="rounded-xl bg-[#1a3263] px-5 py-2 font-semibold text-white hover:bg-[#16284f]"
          >
            Guardar gasto
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  children,
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-[#1a3263]">
        {label}
      </span>

      {children}
    </label>
  );
}

function ResumenCard({
  title,
  value,
  negative,
  positive,
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        negative
          ? "border-red-200 bg-red-50 text-red-700"
          : positive
          ? "border-[#26aa9c]/25 bg-[#26aa9c]/10 text-[#1b7f75]"
          : "border-[#357eb8]/20 bg-[#357eb8]/10 text-[#245f91]"
      }`}
    >
      <p className="text-sm font-bold uppercase">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

function MedioCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/40 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <Icon
          size={20}
          className="text-[#357eb8]"
        />

        <h3 className="text-lg font-bold text-[#1a3263]">
          {title}
        </h3>
      </div>

      <p className="text-2xl font-bold text-[#1a3263]">
        {value}
      </p>
    </div>
  );
}

function MedioBadge({
  medio,
}) {
  const styles = {
    Efectivo:
      "bg-[#26aa9c]/15 text-[#1b7f75]",

    Transferencia:
      "bg-[#357eb8]/15 text-[#245f91]",
  };

  return (
    <span
      className={`rounded-lg px-3 py-1 text-sm font-semibold ${
        styles[
          medio
        ] ||
        "bg-[#acbac4]/25 text-[#1a3263]"
      }`}
    >
      {medio}
    </span>
  );
}