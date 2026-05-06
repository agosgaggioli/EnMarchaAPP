import { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  FileText,
  Car,
  Wrench,
  Package,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const proveedoresDetalle = {
  PV001: {
    nombre: "Toyota Argentina",
    tipo: "Vehículos 0KM",
    totalProveedor: "$85.000.000",
    saldoPendiente: "$35.000.000",
    operaciones: [
      {
        id: "CP001",
        tipo: "Compra 0KM",
        vehiculo: "Toyota Hilux SRV 2024",
        dominio: "Sin dominio",
        total: "$52.000.000",
        pagado: "$30.000.000",
        saldo: "$22.000.000",
        estado: "Parcial",
      },
      {
        id: "CP002",
        tipo: "Compra 0KM",
        vehiculo: "Toyota Corolla XEI 2024",
        dominio: "Sin dominio",
        total: "$33.000.000",
        pagado: "$20.000.000",
        saldo: "$13.000.000",
        estado: "Parcial",
      },
    ],
  },
  PV002: {
    nombre: "Volkswagen Oficial",
    tipo: "Vehículos 0KM",
    totalProveedor: "$48.000.000",
    saldoPendiente: "$18.000.000",
    operaciones: [
      {
        id: "CP003",
        tipo: "Compra 0KM",
        vehiculo: "Volkswagen Amarok 2024",
        dominio: "Sin dominio",
        total: "$48.000.000",
        pagado: "$30.000.000",
        saldo: "$18.000.000",
        estado: "Parcial",
      },
    ],
  },
  PS001: {
    nombre: "Leandro Olivera",
    tipo: "Servicios",
    totalProveedor: "$1.085.000",
    saldoPendiente: "$1.085.000",
    operaciones: [
      {
        id: "OT001",
        tipo: "Orden de trabajo",
        vehiculo: "Jeep Commander AF678HL",
        concepto: "Cambio de parabrisas + Pintar capot",
        total: "$180.000",
        pagado: "$0",
        saldo: "$180.000",
        estado: "Pendiente",
      },
      {
        id: "OT004",
        tipo: "Orden de trabajo",
        vehiculo: "Volkswagen Fox AA398VY",
        concepto: "Arreglo de volante + estética interior",
        total: "$905.000",
        pagado: "$0",
        saldo: "$905.000",
        estado: "Pendiente",
      },
    ],
  },
  PS002: {
    nombre: "Chapa y Pintura Córdoba",
    tipo: "Servicios",
    totalProveedor: "$420.000",
    saldoPendiente: "$420.000",
    operaciones: [
      {
        id: "OT006",
        tipo: "Orden de trabajo",
        vehiculo: "Ford Ranger AD185BD",
        concepto: "Chapa lateral derecha",
        total: "$420.000",
        pagado: "$0",
        saldo: "$420.000",
        estado: "Pendiente",
      },
    ],
  },
  PV003: {
    nombre: "Ferretería Malvinas",
    tipo: "Varios",
    totalProveedor: "$120.000",
    saldoPendiente: "$120.000",
    operaciones: [
      {
        id: "GV001",
        tipo: "Gasto varios",
        concepto: "Insumos de limpieza y oficina",
        total: "$120.000",
        pagado: "$0",
        saldo: "$120.000",
        estado: "Pendiente",
      },
    ],
  },
};

const chequesDisponibles = [
  {
    id: "CH001",
    tipo: "Tercero",
    banco: "Santander",
    numero: "123456",
    importe: "$500.000",
    titular: "Juan Pérez",
    fechaPago: "2026-05-30",
    estado: "En cartera",
  },
  {
    id: "CH002",
    tipo: "Propio",
    banco: "BBVA",
    numero: "789456",
    importe: "$300.000",
    titular: "En Marcha",
    fechaPago: "2026-06-10",
    estado: "Emitido",
  },
];

export default function ProveedorDetallePage() {
  const { id } = useParams();
  const proveedor = proveedoresDetalle[id] || proveedoresDetalle.PV001;

  const [operacionesSeleccionadas, setOperacionesSeleccionadas] = useState([]);
  const [operacionPago, setOperacionPago] = useState(null);
  const [origenCheque, setOrigenCheque] = useState("existente");

  const [pago, setPago] = useState({
    fecha: "",
    metodo: "",
    importe: "",
    observacion: "",
    origenCheque: "existente",
    tipoCheque: "",
    chequeId: "",
    banco: "",
    numeroCheque: "",
    fechaCheque: "",
    titularCheque: "",
    importeCheque: "",
  });

  const abrirPagoIndividual = (operacion) => {
    setOperacionesSeleccionadas([operacion.id]);
    setOperacionPago(operacion);
  };

  const abrirPagoMultiple = () => {
    const operaciones = proveedor.operaciones.filter((op) =>
      operacionesSeleccionadas.includes(op.id)
    );

    if (operaciones.length === 0) return;

    setOperacionPago({
      id: "Pago múltiple",
      tipo: "Pago múltiple",
      saldo: "Según operaciones seleccionadas",
      operaciones,
    });
  };

  const toggleOperacion = (operacionId) => {
    setOperacionesSeleccionadas((prev) =>
      prev.includes(operacionId)
        ? prev.filter((id) => id !== operacionId)
        : [...prev, operacionId]
    );
  };

  const cerrarModalPago = () => {
    setOperacionPago(null);
    setOrigenCheque("existente");
    setPago({
      fecha: "",
      metodo: "",
      importe: "",
      observacion: "",
      origenCheque: "existente",
      tipoCheque: "",
      chequeId: "",
      banco: "",
      numeroCheque: "",
      fechaCheque: "",
      titularCheque: "",
      importeCheque: "",
    });
  };

  return (
    <section className="w-full">
      <div className="mb-8">
        <Link
          to="/contabilidad/proveedores"
          className="mb-3 inline-flex items-center gap-2 text-sm text-[#357eb8] hover:text-[#1a3263]"
        >
          <ArrowLeft size={16} />
          Volver a Proveedores
        </Link>

        <h1 className="text-3xl font-bold text-[#1a3263]">
          {proveedor.nombre}
        </h1>
        <p className="text-[#357eb8]">
          Detalle de operaciones asociadas al proveedor.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <SummaryCard title="Tipo proveedor" value={proveedor.tipo} />
        <SummaryCard title="Total proveedor" value={proveedor.totalProveedor} />
        <SummaryCard
          title="Saldo pendiente"
          value={proveedor.saldoPendiente}
          highlight
        />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#1a3263]">
              Operaciones del proveedor
            </h2>
            <p className="text-sm text-[#357eb8]">
              Seleccioná una o varias operaciones para registrar un pago.
            </p>
          </div>

          <button
            onClick={abrirPagoMultiple}
            disabled={operacionesSeleccionadas.length === 0}
            className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f] disabled:opacity-40"
          >
            Registrar pago múltiple
          </button>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {proveedor.operaciones.map((operacion) => (
            <OperacionCard
              key={operacion.id}
              operacion={operacion}
              selected={operacionesSeleccionadas.includes(operacion.id)}
              onToggle={() => toggleOperacion(operacion.id)}
              onPago={() => abrirPagoIndividual(operacion)}
            />
          ))}
        </div>
      </div>

      {operacionPago && (
        <PagoModal
          operacionPago={operacionPago}
          pago={pago}
          setPago={setPago}
          origenCheque={origenCheque}
          setOrigenCheque={setOrigenCheque}
          onClose={cerrarModalPago}
        />
      )}
    </section>
  );
}

function OperacionCard({ operacion, selected, onToggle, onPago }) {
  const Icon =
    operacion.tipo === "Compra 0KM"
      ? Car
      : operacion.tipo === "Orden de trabajo"
      ? Wrench
      : Package;

  return (
    <div
      className={`rounded-2xl border p-5 ${
        selected
          ? "border-[#26aa9c] bg-[#26aa9c]/10"
          : "border-[#acbac4]/50 bg-[#f8fafc]"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggle}
            className="h-5 w-5 accent-[#26aa9c]"
          />

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#357eb8]/15 text-[#357eb8]">
            <Icon size={22} />
          </div>

          <div>
            <p className="font-bold text-[#1a3263]">{operacion.id}</p>
            <p className="text-sm text-[#357eb8]">{operacion.tipo}</p>
          </div>
        </div>

        <EstadoBadge estado={operacion.estado} />
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-2">
        {operacion.vehiculo && (
          <Data label="Vehículo" value={operacion.vehiculo} />
        )}
        {operacion.dominio && (
          <Data label="Dominio" value={operacion.dominio} />
        )}
        {operacion.concepto && (
          <Data label="Concepto" value={operacion.concepto} />
        )}
        <Data label="Total" value={operacion.total} />
        <Data label="Pagado" value={operacion.pagado} />
        <Data label="Saldo" value={operacion.saldo} strong />
      </div>

      <div className="flex flex-wrap gap-3 border-t border-[#acbac4]/40 pt-4">
        <button
          onClick={onPago}
          className="inline-flex items-center gap-2 rounded-lg bg-[#26aa9c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#219b8f]"
        >
          <CreditCard size={16} />
          Registrar pago
        </button>

        <Link
          to={`/contabilidad/proveedores/movimientos/${operacion.id}`}
          className="inline-flex items-center gap-2 rounded-lg border border-[#357eb8] px-4 py-2 text-sm font-semibold text-[#357eb8] hover:bg-[#357eb8]/10"
        >
          <FileText size={16} />
          Ver movimientos
        </Link>
      </div>
    </div>
  );
}

function PagoModal({
  operacionPago,
  pago,
  setPago,
  origenCheque,
  setOrigenCheque,
  onClose,
}) {
  const esMultiple = operacionPago.tipo === "Pago múltiple";

  const cambiarMetodo = (metodo) => {
    setPago({
      ...pago,
      metodo,
      origenCheque: metodo === "Cheque" ? origenCheque : "",
    });
  };

  const cambiarOrigenCheque = (origen) => {
    setOrigenCheque(origen);
    setPago({
      ...pago,
      origenCheque: origen,
      chequeId: "",
      tipoCheque: "",
      banco: "",
      numeroCheque: "",
      fechaCheque: "",
      titularCheque: "",
      importeCheque: "",
    });
  };

  const chequesFiltrados = pago.tipoCheque
    ? chequesDisponibles.filter((cheque) => cheque.tipo === pago.tipoCheque)
    : chequesDisponibles;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1a3263]">
              Registrar pago
            </h2>
            <p className="text-[#357eb8]">
              {operacionPago.id} · Saldo: {operacionPago.saldo}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-[#acbac4]/20"
          >
            <X size={22} className="text-[#1a3263]" />
          </button>
        </div>

        {esMultiple && (
          <div className="mb-6 rounded-2xl border border-[#acbac4]/50 bg-[#acbac4]/10 p-5">
            <h3 className="mb-3 font-bold text-[#1a3263]">
              Operaciones incluidas
            </h3>

            <div className="space-y-2">
              {operacionPago.operaciones.map((op) => (
                <div
                  key={op.id}
                  className="grid gap-3 rounded-xl bg-white p-3 text-[#1a3263] md:grid-cols-[100px_1fr_140px]"
                >
                  <span className="font-semibold">{op.id}</span>
                  <span>{op.vehiculo || op.concepto}</span>
                  <span className="font-bold">{op.saldo}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <InputPago
            label="Fecha"
            type="date"
            value={pago.fecha}
            onChange={(value) => setPago({ ...pago, fecha: value })}
          />

          <label className="block">
            <span className="mb-1 block font-semibold text-[#1a3263]">
              Método de pago
            </span>
            <select
              value={pago.metodo}
              onChange={(e) => cambiarMetodo(e.target.value)}
              className="w-full rounded-xl border border-[#acbac4] px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
            >
              <option value="">Seleccionar</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Cheque">Cheque</option>
            </select>
          </label>

          <InputPago
            label="Importe"
            value={pago.importe}
            onChange={(value) => setPago({ ...pago, importe: value })}
          />

          <InputPago
            label="Observación"
            value={pago.observacion}
            onChange={(value) => setPago({ ...pago, observacion: value })}
          />
        </div>

        {pago.metodo === "Cheque" && (
          <div className="mt-6 rounded-2xl border border-[#acbac4]/50 bg-[#f8fafc] p-5">
            <h3 className="mb-4 text-lg font-bold text-[#1a3263]">
              Cheque utilizado en el pago
            </h3>

            <div className="mb-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => cambiarOrigenCheque("existente")}
                className={`rounded-xl px-4 py-2 font-semibold transition ${
                  origenCheque === "existente"
                    ? "bg-[#357eb8] text-white"
                    : "border border-[#acbac4] bg-white text-[#1a3263] hover:bg-[#acbac4]/15"
                }`}
              >
                Usar cheque existente
              </button>

              <button
                type="button"
                onClick={() => cambiarOrigenCheque("nuevo")}
                className={`rounded-xl px-4 py-2 font-semibold transition ${
                  origenCheque === "nuevo"
                    ? "bg-[#26aa9c] text-white"
                    : "border border-[#acbac4] bg-white text-[#1a3263] hover:bg-[#acbac4]/15"
                }`}
              >
                Registrar nuevo cheque
              </button>
            </div>

            {origenCheque === "existente" && (
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block font-semibold text-[#1a3263]">
                    Tipo de cheque
                  </span>
                  <select
                    value={pago.tipoCheque}
                    onChange={(e) =>
                      setPago({ ...pago, tipoCheque: e.target.value, chequeId: "" })
                    }
                    className="w-full rounded-xl border border-[#acbac4] px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
                  >
                    <option value="">Todos</option>
                    <option value="Propio">Propio</option>
                    <option value="Tercero">Tercero</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block font-semibold text-[#1a3263]">
                    Seleccionar cheque
                  </span>
                  <select
                    value={pago.chequeId}
                    onChange={(e) =>
                      setPago({ ...pago, chequeId: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#acbac4] px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
                  >
                    <option value="">Seleccionar cheque</option>
                    {chequesFiltrados.map((cheque) => (
                      <option key={cheque.id} value={cheque.id}>
                        {cheque.tipo} · {cheque.numero} · {cheque.banco} ·{" "}
                        {cheque.importe}
                      </option>
                    ))}
                  </select>
                </label>

                {pago.chequeId && (
                  <div className="rounded-xl border border-[#357eb8]/30 bg-[#357eb8]/10 p-4 md:col-span-2">
                    <p className="font-semibold text-[#1a3263]">
                      Cheque seleccionado
                    </p>
                    <p className="text-sm text-[#357eb8]">
                      Se asociará este cheque al pago del proveedor.
                    </p>
                  </div>
                )}
              </div>
            )}

            {origenCheque === "nuevo" && (
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block font-semibold text-[#1a3263]">
                    Tipo de cheque
                  </span>
                  <select
                    value={pago.tipoCheque}
                    onChange={(e) =>
                      setPago({ ...pago, tipoCheque: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#acbac4] px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
                  >
                    <option value="">Seleccionar</option>
                    <option value="Propio">Propio</option>
                    <option value="Tercero">Tercero</option>
                  </select>
                </label>

                <InputPago
                  label="Banco"
                  value={pago.banco}
                  onChange={(value) => setPago({ ...pago, banco: value })}
                />

                <InputPago
                  label="Número de cheque"
                  value={pago.numeroCheque}
                  onChange={(value) =>
                    setPago({ ...pago, numeroCheque: value })
                  }
                />

                <InputPago
                  label="Fecha de pago"
                  type="date"
                  value={pago.fechaCheque}
                  onChange={(value) =>
                    setPago({ ...pago, fechaCheque: value })
                  }
                />

                <InputPago
                  label={
                    pago.tipoCheque === "Tercero"
                      ? "Titular / Recibido de"
                      : "Titular"
                  }
                  value={pago.titularCheque}
                  onChange={(value) =>
                    setPago({ ...pago, titularCheque: value })
                  }
                />

                <InputPago
                  label="Importe del cheque"
                  value={pago.importeCheque}
                  onChange={(value) =>
                    setPago({ ...pago, importeCheque: value })
                  }
                />
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
          <button
            onClick={onClose}
            className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              console.log("Pago registrado:", { operacionPago, pago });
              onClose();
            }}
            className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
          >
            Guardar pago
          </button>
        </div>
      </div>
    </div>
  );
}

function InputPago({ label, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold text-[#1a3263]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#acbac4] px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
      />
    </label>
  );
}

function SummaryCard({ title, value, highlight = false }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/40 bg-white p-6 shadow-sm">
      <p className="text-[#357eb8]">{title}</p>
      <p
        className={`mt-2 text-2xl font-bold ${
          highlight ? "text-[#26aa9c]" : "text-[#1a3263]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Data({ label, value, strong = false }) {
  return (
    <div>
      <p className="text-sm text-[#357eb8]">{label}</p>
      <p
        className={`text-[#1a3263] ${
          strong ? "text-lg font-bold" : "font-semibold"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function EstadoBadge({ estado }) {
  const styles = {
    Pendiente: "bg-yellow-100 text-yellow-700",
    Parcial: "bg-[#357eb8]/15 text-[#245f91]",
    Pagado: "bg-[#26aa9c]/15 text-[#1b7f75]",
    Vencido: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-lg px-3 py-1 text-sm font-semibold ${styles[estado]}`}
    >
      {estado}
    </span>
  );
}