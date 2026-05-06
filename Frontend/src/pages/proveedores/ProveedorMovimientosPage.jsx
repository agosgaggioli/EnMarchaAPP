import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  CreditCard,
  Banknote,
  Receipt,
  Eye,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const movimientosMock = {
  CP001: {
    proveedor: "Toyota Argentina",
    operacion: "CP001",
    tipo: "Compra 0KM",
    concepto: "Toyota Hilux SRV 2024",
    total: "$52.000.000",
    pagado: "$30.000.000",
    saldo: "$22.000.000",
    movimientos: [
      {
        id: "MOV001",
        fecha: "10/04/2026",
        tipo: "Pago",
        metodo: "Transferencia",
        importe: "$20.000.000",
        observacion: "Pago inicial por unidad 0KM.",
      },
      {
        id: "MOV002",
        fecha: "20/04/2026",
        tipo: "Pago",
        metodo: "Cheque",
        importe: "$10.000.000",
        observacion: "Cheque entregado a proveedor oficial.",
        cheques: [
          {
            numero: "00012345",
            banco: "Banco Nación",
            fechaPago: "30/05/2026",
            importe: "$10.000.000",
            estado: "En cartera",
            titular: "Toyota Argentina",
          },
        ],
      },
    ],
  },

  OT001: {
    proveedor: "Leandro Olivera",
    operacion: "OT001",
    tipo: "Orden de trabajo",
    concepto: "Jeep Commander AF678HL - Cambio de parabrisas + Pintar capot",
    total: "$180.000",
    pagado: "$0",
    saldo: "$180.000",
    movimientos: [],
  },
};

export default function ProveedorMovimientosPage() {
  const { operacionId } = useParams();
  const data = movimientosMock[operacionId] || movimientosMock.CP001;

  const [chequesSeleccionados, setChequesSeleccionados] = useState(null);

  return (
    <section className="w-full">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <Link
            to="/contabilidad/proveedores"
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#357eb8] hover:text-[#1a3263]"
          >
            <ArrowLeft size={16} />
            Volver a proveedores
          </Link>

          <h1 className="text-3xl font-bold text-[#1a3263]">
            Movimientos {data.operacion}
          </h1>

          <p className="text-[#357eb8]">
            {data.proveedor} · {data.tipo}
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white shadow hover:bg-[#219b8f]">
          <Plus size={18} />
          Registrar pago
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <SummaryCard title="Concepto" value={data.concepto} />
        <SummaryCard title="Total" value={data.total} />
        <SummaryCard title="Pagado" value={data.pagado} />
        <SummaryCard title="Saldo" value={data.saldo} highlight />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Historial de movimientos
          </h2>
          <p className="text-sm text-[#357eb8]">
            Pagos registrados sobre esta compra, orden o gasto.
          </p>
        </div>

        <div className="p-6">
          {data.movimientos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#acbac4] bg-[#acbac4]/10 p-10 text-center">
              <Receipt className="mx-auto mb-3 text-[#357eb8]" size={36} />
              <p className="text-lg font-bold text-[#1a3263]">
                No hay movimientos registrados
              </p>
              <p className="text-[#357eb8]">
                Registrá un pago para comenzar a saldar esta operación.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
              <table className="w-full min-w-[950px] text-left">
                <thead className="bg-[#1a3263] text-white">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Fecha</th>
                    <th className="p-4">Tipo</th>
                    <th className="p-4">Método</th>
                    <th className="p-4">Importe</th>
                    <th className="p-4">Observación</th>
                  </tr>
                </thead>

                <tbody className="text-[#1a3263]">
                  {data.movimientos.map((mov) => (
                    <tr
                      key={mov.id}
                      className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                    >
                      <td className="p-4 font-semibold">{mov.id}</td>
                      <td className="p-4">{mov.fecha}</td>
                      <td className="p-4">
                        <span className="rounded-lg bg-[#26aa9c]/15 px-3 py-1 text-sm font-semibold text-[#1b7f75]">
                          {mov.tipo}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Metodo metodo={mov.metodo} />

                          {mov.metodo === "Cheque" && (
                            <button
                              type="button"
                              onClick={() =>
                                setChequesSeleccionados(mov.cheques || [])
                              }
                              className="rounded-lg border border-[#357eb8] p-2 text-[#357eb8] hover:bg-[#357eb8]/10"
                              title="Ver cheques"
                            >
                              <Eye size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-bold">{mov.importe}</td>
                      <td className="p-4 text-[#357eb8]">
                        {mov.observacion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {chequesSeleccionados && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Cheques asociados
                </h2>
                <p className="text-[#357eb8]">
                  Detalle de cheques utilizados en este movimiento.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setChequesSeleccionados(null)}
                className="rounded-full p-2 text-[#1a3263] hover:bg-[#acbac4]/20"
              >
                <X size={22} />
              </button>
            </div>

            {chequesSeleccionados.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#acbac4] bg-[#acbac4]/10 p-8 text-center">
                <p className="font-bold text-[#1a3263]">
                  No hay cheques cargados
                </p>
                <p className="text-[#357eb8]">
                  Este movimiento no tiene detalle de cheques asociado.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#acbac4]/60">
                <table className="w-full text-left">
                  <thead className="bg-[#1a3263] text-white">
                    <tr>
                      <th className="p-4">Número</th>
                      <th className="p-4">Banco</th>
                      <th className="p-4">Fecha pago</th>
                      <th className="p-4">Importe</th>
                      <th className="p-4">Estado</th>
                      <th className="p-4">Titular</th>
                    </tr>
                  </thead>

                  <tbody className="text-[#1a3263]">
                    {chequesSeleccionados.map((cheque) => (
                      <tr
                        key={cheque.numero}
                        className="border-t border-[#acbac4]/40"
                      >
                        <td className="p-4 font-semibold">{cheque.numero}</td>
                        <td className="p-4">{cheque.banco}</td>
                        <td className="p-4">{cheque.fechaPago}</td>
                        <td className="p-4 font-bold">{cheque.importe}</td>
                        <td className="p-4">
                          <ChequeEstadoBadge estado={cheque.estado} />
                        </td>
                        <td className="p-4">{cheque.titular}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setChequesSeleccionados(null)}
                className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263] hover:bg-[#acbac4]/15"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function SummaryCard({ title, value, highlight = false }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/40 bg-white p-6 shadow-sm">
      <p className="text-[#357eb8]">{title}</p>
      <p
        className={`mt-2 font-bold ${
          highlight ? "text-2xl text-[#26aa9c]" : "text-xl text-[#1a3263]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Metodo({ metodo }) {
  const Icon = metodo === "Cheque" ? CreditCard : Banknote;

  return (
    <span className="inline-flex items-center gap-2 rounded-lg bg-[#357eb8]/10 px-3 py-1 text-sm font-semibold text-[#357eb8]">
      <Icon size={15} />
      {metodo}
    </span>
  );
}

function ChequeEstadoBadge({ estado }) {
  const styles = {
    "En cartera": "bg-yellow-100 text-yellow-700",
    Depositado: "bg-[#357eb8]/15 text-[#245f91]",
    Cobrado: "bg-[#26aa9c]/15 text-[#1b7f75]",
    Rechazado: "bg-red-100 text-red-700",
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