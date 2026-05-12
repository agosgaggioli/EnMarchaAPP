import { useState } from "react";
import {
  Search,
  Eye,
  X,
  Building2,
  Wrench,
  Car,
  CircleDollarSign,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  ReceiptText,
} from "lucide-react";

const proveedoresIniciales = [
  {
    id: "PR001",
    nombre: "Autos Centro S.A.",
    tipo: "Autos",
    cuit: "30-71234567-8",
    telefono: "353 456789",
    totalOperaciones: "$85.000.000",
    totalPagado: "$70.000.000",
    saldo: "$15.000.000",
    estado: "Con deuda",
    operaciones: [
      {
        id: "OP001",
        tipo: "Compra de vehículo",
        detalle: "Toyota Hilux SRX 2021",
        fecha: "10/04/2026",
        total: "$42.000.000",
        pagado: "$35.000.000",
        saldo: "$7.000.000",
        pagos: [
          {
            id: "PG001",
            fecha: "11/04/2026",
            medio: "Transferencia",
            cuenta: "Banco Galicia",
            importe: "$20.000.000",
            observacion: "Pago inicial",
          },
          {
            id: "PG002",
            fecha: "18/04/2026",
            medio: "Cheque propio",
            cuenta: "Cheques",
            importe: "$15.000.000",
            observacion: "Cheque entregado",
            cheque: {
              banco: "Banco Nación",
              numero: "CH-001245",
              titular: "Degra Automotores",
              fechaPago: "30/04/2026",
              estado: "Pendiente",
            },
          },
        ],
      },
      {
        id: "OP002",
        tipo: "Compra de vehículo",
        detalle: "Volkswagen Amarok 2020",
        fecha: "02/05/2026",
        total: "$43.000.000",
        pagado: "$35.000.000",
        saldo: "$8.000.000",
        pagos: [
          {
            id: "PG003",
            fecha: "03/05/2026",
            medio: "Transferencia",
            cuenta: "Banco Santander",
            importe: "$25.000.000",
            observacion: "Pago parcial",
          },
          {
            id: "PG004",
            fecha: "08/05/2026",
            medio: "Efectivo",
            cuenta: "Caja",
            importe: "$10.000.000",
            observacion: "Refuerzo",
          },
        ],
      },
    ],
  },
  {
    id: "PR002",
    nombre: "Taller El Rápido",
    tipo: "Taller",
    cuit: "20-30111222-9",
    telefono: "353 777888",
    totalOperaciones: "$3.800.000",
    totalPagado: "$2.300.000",
    saldo: "$1.500.000",
    estado: "Con deuda",
    operaciones: [
      {
        id: "OP003",
        tipo: "Trabajo de taller",
        detalle: "Service completo - Ford Ranger 2022",
        fecha: "18/04/2026",
        total: "$1.800.000",
        pagado: "$1.000.000",
        saldo: "$800.000",
        pagos: [
          {
            id: "PG005",
            fecha: "18/04/2026",
            medio: "Efectivo",
            cuenta: "Caja",
            importe: "$1.000.000",
            observacion: "Pago parcial",
          },
        ],
      },
      {
        id: "OP004",
        tipo: "Chapa y pintura",
        detalle: "Fiat Toro Volcano 2020",
        fecha: "05/05/2026",
        total: "$2.000.000",
        pagado: "$1.300.000",
        saldo: "$700.000",
        pagos: [
          {
            id: "PG006",
            fecha: "06/05/2026",
            medio: "Transferencia",
            cuenta: "Banco Galicia",
            importe: "$1.300.000",
            observacion: "Pago parcial",
          },
        ],
      },
    ],
  },
  {
    id: "PR003",
    nombre: "Lavadero Premium",
    tipo: "Taller",
    cuit: "27-33444555-1",
    telefono: "353 222333",
    totalOperaciones: "$650.000",
    totalPagado: "$650.000",
    saldo: "$0",
    estado: "Sin deuda",
    operaciones: [
      {
        id: "OP005",
        tipo: "Servicio",
        detalle: "Lavado y detailing - Jeep Compass",
        fecha: "22/04/2026",
        total: "$650.000",
        pagado: "$650.000",
        saldo: "$0",
        pagos: [
          {
            id: "PG007",
            fecha: "22/04/2026",
            medio: "Efectivo",
            cuenta: "Caja",
            importe: "$650.000",
            observacion: "Cancelado",
          },
        ],
      },
    ],
  },
];

const formInicial = {
  operacionId: "",
  fecha: "",
  medio: "Transferencia",
  cuenta: "",
  importe: "",
  observacion: "",
  banco: "",
  numeroCheque: "",
  titular: "",
  fechaPagoCheque: "",
};

export default function EstadosCuentaProveedoresPage() {
  const [proveedores, setProveedores] = useState(proveedoresIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("Todos");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [operacionActivaId, setOperacionActivaId] = useState(null);
  const [busquedaOperacion, setBusquedaOperacion] = useState("");
  const [paginaPagos, setPaginaPagos] = useState(1);
  const [chequeSeleccionado, setChequeSeleccionado] = useState(null);
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [formPago, setFormPago] = useState(formInicial);
  const [pagina, setPagina] = useState(1);

  const registrosPorPagina = 5;
  const pagosPorPagina = 5;

  const proveedoresFiltrados = proveedores.filter((proveedor) => {
    const texto =
      `${proveedor.id} ${proveedor.nombre} ${proveedor.cuit} ${proveedor.telefono} ${proveedor.tipo}`.toLowerCase();

    const coincideBusqueda = texto.includes(busqueda.toLowerCase());
    const coincideTipo = tipoFiltro === "Todos" || proveedor.tipo === tipoFiltro;
    const coincideEstado =
      estadoFiltro === "Todos" || proveedor.estado === estadoFiltro;

    return coincideBusqueda && coincideTipo && coincideEstado;
  });

  const totalPaginas = Math.ceil(proveedoresFiltrados.length / registrosPorPagina);

  const proveedoresPaginados = proveedoresFiltrados.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  );

  const operacionesFiltradas = proveedorSeleccionado
    ? proveedorSeleccionado.operaciones.filter((operacion) => {
        const texto =
          `${operacion.id} ${operacion.tipo} ${operacion.detalle} ${operacion.fecha}`.toLowerCase();

        return texto.includes(busquedaOperacion.toLowerCase());
      })
    : [];

  const operacionActiva = proveedorSeleccionado?.operaciones.find(
    (operacion) => operacion.id === operacionActivaId
  );

  const pagosPaginados = operacionActiva
    ? operacionActiva.pagos.slice(
        (paginaPagos - 1) * pagosPorPagina,
        paginaPagos * pagosPorPagina
      )
    : [];

  const totalPaginasPagos = operacionActiva
    ? Math.ceil(operacionActiva.pagos.length / pagosPorPagina)
    : 1;

  const abrirProveedor = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    setOperacionActivaId(proveedor.operaciones?.[0]?.id || null);
    setBusquedaOperacion("");
    setPaginaPagos(1);
  };

  const cerrarProveedor = () => {
    setProveedorSeleccionado(null);
    setOperacionActivaId(null);
    setBusquedaOperacion("");
    setPaginaPagos(1);
  };

  const abrirPago = (operacionId = "") => {
    setFormPago({
      ...formInicial,
      operacionId,
      fecha: new Date().toISOString().slice(0, 10),
    });
    setShowPagoModal(true);
  };

  const guardarPago = () => {
    if (!proveedorSeleccionado || !formPago.operacionId || !formPago.importe) return;

    const nuevoPago = {
      id: `PG${Date.now().toString().slice(-5)}`,
      fecha: formPago.fecha || "-",
      medio: formPago.medio,
      cuenta: formPago.cuenta || "-",
      importe: formPago.importe,
      observacion: formPago.observacion || "-",
      cheque: formPago.medio.includes("Cheque")
        ? {
            banco: formPago.banco,
            numero: formPago.numeroCheque,
            titular: formPago.titular,
            fechaPago: formPago.fechaPagoCheque,
            estado: "Pendiente",
          }
        : null,
    };

    const proveedoresActualizados = proveedores.map((proveedor) => {
      if (proveedor.id !== proveedorSeleccionado.id) return proveedor;

      return {
        ...proveedor,
        operaciones: proveedor.operaciones.map((operacion) =>
          operacion.id === formPago.operacionId
            ? {
                ...operacion,
                pagos: [...operacion.pagos, nuevoPago],
              }
            : operacion
        ),
      };
    });

    const proveedorActualizado = proveedoresActualizados.find(
      (proveedor) => proveedor.id === proveedorSeleccionado.id
    );

    setProveedores(proveedoresActualizados);
    setProveedorSeleccionado(proveedorActualizado);
    setOperacionActivaId(formPago.operacionId);
    setShowPagoModal(false);
    setPaginaPagos(1);
  };

  return (
    <section className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a3263]">
          Estados de cuenta - Proveedores
        </h1>
        <p className="text-[#357eb8]">
          Consultá saldos, operaciones, trabajos, compras y pagos asociados a cada proveedor.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="Proveedores" value={proveedores.length} icon={Building2} />

        <MetricCard
          title="Proveedores de autos"
          value={proveedores.filter((p) => p.tipo === "Autos").length}
          icon={Car}
          highlight
        />

        <MetricCard
          title="Talleres"
          value={proveedores.filter((p) => p.tipo === "Taller").length}
          icon={Wrench}
          warning
        />

        <MetricCard
          title="Con deuda"
          value={proveedores.filter((p) => p.estado === "Con deuda").length}
          icon={AlertTriangle}
          danger
        />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Listado de proveedores
          </h2>
          <p className="text-sm text-[#357eb8]">
            Cada proveedor puede tener varias operaciones y cada pago queda asociado a una operación puntual.
          </p>
        </div>

        <div className="p-6">
          <div className="mb-5 grid gap-4 md:grid-cols-[1fr_180px_180px]">
            <div className="flex items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />
              <input
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setPagina(1);
                }}
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar proveedor, CUIT, teléfono o tipo..."
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
              <option>Autos</option>
              <option>Taller</option>
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
              <option>Con deuda</option>
              <option>Sin deuda</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Proveedor</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">CUIT</th>
                  <th className="p-4">Teléfono</th>
                  <th className="p-4">Total operaciones</th>
                  <th className="p-4">Pagado</th>
                  <th className="p-4">Saldo</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-center">Acción</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {proveedoresPaginados.map((proveedor) => (
                  <tr
                    key={proveedor.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-bold">{proveedor.id}</td>
                    <td className="p-4 font-semibold">{proveedor.nombre}</td>
                    <td className="p-4">
                      <TipoBadge tipo={proveedor.tipo} />
                    </td>
                    <td className="p-4">{proveedor.cuit}</td>
                    <td className="p-4">{proveedor.telefono}</td>
                    <td className="p-4 font-semibold">{proveedor.totalOperaciones}</td>
                    <td className="p-4">{proveedor.totalPagado}</td>
                    <td className="p-4 font-bold">{proveedor.saldo}</td>
                    <td className="p-4">
                      <EstadoBadge estado={proveedor.estado} />
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <IconButton
                          title="Ver estado de cuenta"
                          onClick={() => abrirProveedor(proveedor)}
                        >
                          <Eye size={18} />
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
              Mostrando {proveedoresPaginados.length} de {proveedoresFiltrados.length} proveedores
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

      {proveedorSeleccionado && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[92vh] w-[96vw] max-w-[1400px] overflow-y-auto overflow-x-hidden rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Estado de cuenta
                </h2>
                <p className="text-[#357eb8]">
                  {proveedorSeleccionado.nombre} · {proveedorSeleccionado.cuit}
                </p>
              </div>

              <button
                onClick={cerrarProveedor}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-4">
              <InfoCard label="Total operaciones" value={proveedorSeleccionado.totalOperaciones} />
              <InfoCard label="Total pagado" value={proveedorSeleccionado.totalPagado} />
              <InfoCard label="Saldo pendiente" value={proveedorSeleccionado.saldo} />
              <InfoCard label="Estado" value={proveedorSeleccionado.estado} />
            </div>

            <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
              <div className="rounded-2xl border border-[#acbac4]/50 bg-[#f8fafc] p-4">
                <div className="mb-4">
                  <h3 className="font-bold text-[#1a3263]">
                    Operaciones del proveedor
                  </h3>
                  <p className="text-sm text-[#357eb8]">
                    Buscá por vehículo, trabajo, compra o fecha.
                  </p>
                </div>

                <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-3 py-2">
                  <Search size={17} className="text-[#357eb8]" />
                  <input
                    value={busquedaOperacion}
                    onChange={(e) => setBusquedaOperacion(e.target.value)}
                    className="w-full text-sm outline-none placeholder:text-[#acbac4]"
                    placeholder="Buscar operación..."
                  />
                </div>

                <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
                  {operacionesFiltradas.map((operacion) => (
                    <button
                      key={operacion.id}
                      type="button"
                      onClick={() => {
                        setOperacionActivaId(operacion.id);
                        setPaginaPagos(1);
                      }}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        operacionActivaId === operacion.id
                          ? "border-[#357eb8] bg-white shadow-sm"
                          : "border-[#acbac4]/50 bg-white hover:bg-[#acbac4]/10"
                      }`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-[#1a3263]">{operacion.id}</p>
                          <p className="text-sm text-[#357eb8]">{operacion.fecha}</p>
                        </div>

                        <span className="shrink-0 rounded-lg bg-[#acbac4]/20 px-2 py-1 text-xs font-bold text-[#1a3263]">
                          {operacion.pagos.length} pagos
                        </span>
                      </div>

                      <p className="text-xs font-bold uppercase tracking-wide text-[#26aa9c]">
                        {operacion.tipo}
                      </p>

                      <p className="mb-3 text-sm font-semibold text-[#1a3263]">
                        {operacion.detalle}
                      </p>

                      <div className="space-y-1 border-t border-[#acbac4]/30 pt-3 text-sm">
                        <FilaResumen label="Total" value={operacion.total} />
                        <FilaResumen label="Pagado" value={operacion.pagado} />
                        <FilaResumen label="Saldo" value={operacion.saldo} />
                      </div>
                    </button>
                  ))}

                  {operacionesFiltradas.length === 0 && (
                    <div className="rounded-xl border border-dashed border-[#acbac4] bg-white p-4 text-sm text-[#357eb8]">
                      No se encontraron operaciones.
                    </div>
                  )}
                </div>
              </div>

              {operacionActiva && (
                <div className="min-w-0 rounded-2xl border border-[#acbac4]/50 bg-white">
                  <div className="border-b border-[#acbac4]/40 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wide text-[#26aa9c]">
                          {operacionActiva.tipo}
                        </p>
                        <h3 className="text-xl font-bold text-[#1a3263]">
                          {operacionActiva.detalle}
                        </h3>
                        <p className="text-sm text-[#357eb8]">
                          Operación {operacionActiva.id} · Fecha: {operacionActiva.fecha}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => abrirPago(operacionActiva.id)}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#26aa9c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#219b8f]"
                      >
                        <Plus size={16} />
                        Registrar pago
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      <InfoCard label="Total operación" value={operacionActiva.total} />
                      <InfoCard label="Pagado" value={operacionActiva.pagado} />
                      <InfoCard label="Saldo" value={operacionActiva.saldo} />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-[#1a3263]">
                          Pagos asociados
                        </h4>
                        <p className="text-sm text-[#357eb8]">
                          Se muestran de a {pagosPorPagina} pagos para evitar una vista muy larga.
                        </p>
                      </div>

                      <span className="rounded-lg bg-[#acbac4]/20 px-3 py-1 text-sm font-semibold text-[#1a3263]">
                        {operacionActiva.pagos.length} pagos
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
                      <table className="w-full min-w-[760px] text-left">
                        <thead className="bg-[#acbac4]/20 text-[#1a3263]">
                          <tr>
                            <th className="p-3">Pago</th>
                            <th className="p-3">Fecha</th>
                            <th className="p-3">Medio</th>
                            <th className="p-3">Cuenta</th>
                            <th className="p-3">Importe</th>
                            <th className="p-3 text-center">Cheque</th>
                          </tr>
                        </thead>

                        <tbody>
                          {pagosPaginados.map((pago) => (
                            <tr
                              key={pago.id}
                              className="border-t border-[#acbac4]/40 text-[#1a3263]"
                            >
                              <td className="p-3 font-bold">{pago.id}</td>
                              <td className="p-3">{pago.fecha}</td>
                              <td className="p-3">{pago.medio}</td>
                              <td className="p-3">{pago.cuenta}</td>
                              <td className="p-3 font-bold text-[#26aa9c]">
                                {pago.importe}
                              </td>
                              <td className="p-3">
                                <div className="flex justify-center">
                                  {pago.cheque ? (
                                    <IconButton
                                      title="Ver cheque"
                                      onClick={() => setChequeSeleccionado(pago)}
                                    >
                                      <Eye size={18} />
                                    </IconButton>
                                  ) : (
                                    <span className="text-sm text-[#acbac4]">-</span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-[#357eb8]">
                        Mostrando {pagosPaginados.length} de {operacionActiva.pagos.length} pagos
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          disabled={paginaPagos === 1}
                          onClick={() => setPaginaPagos(paginaPagos - 1)}
                          className="rounded-lg border border-[#acbac4] p-2 text-[#1a3263] disabled:opacity-40"
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <span className="text-sm font-bold text-[#1a3263]">
                          Página {paginaPagos} de {totalPaginasPagos || 1}
                        </span>

                        <button
                          disabled={paginaPagos === totalPaginasPagos || totalPaginasPagos === 0}
                          onClick={() => setPaginaPagos(paginaPagos + 1)}
                          className="rounded-lg border border-[#acbac4] p-2 text-[#1a3263] disabled:opacity-40"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end border-t border-[#acbac4]/40 pt-6">
              <button
                onClick={cerrarProveedor}
                className="rounded-xl bg-[#1a3263] px-5 py-3 font-semibold text-white hover:bg-[#14264c]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {chequeSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#1a3263]">
                  Cheque asociado
                </h2>
                <p className="text-sm text-[#357eb8]">
                  Pago {chequeSeleccionado.id} · {chequeSeleccionado.importe}
                </p>
              </div>

              <button
                onClick={() => setChequeSeleccionado(null)}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={20} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="space-y-3">
              <DatoSimple label="Banco" value={chequeSeleccionado.cheque.banco} />
              <DatoSimple label="Número" value={chequeSeleccionado.cheque.numero} />
              <DatoSimple label="Titular" value={chequeSeleccionado.cheque.titular} />
              <DatoSimple label="Fecha de pago" value={chequeSeleccionado.cheque.fechaPago} />
              <DatoSimple label="Estado" value={chequeSeleccionado.cheque.estado} />
            </div>

            <div className="mt-6 flex justify-between gap-3 border-t border-[#acbac4]/40 pt-5">
              <button
                onClick={() => {
                  setChequeSeleccionado(null);
                  abrirPago(operacionActivaId);
                }}
                className="rounded-xl border border-[#26aa9c] px-4 py-2 text-sm font-semibold text-[#26aa9c] hover:bg-[#26aa9c]/10"
              >
                Registrar pago
              </button>

              <button
                onClick={() => setChequeSeleccionado(null)}
                className="rounded-xl bg-[#1a3263] px-4 py-2 text-sm font-semibold text-white hover:bg-[#14264c]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {showPagoModal && proveedorSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Registrar pago a proveedor
                </h2>
                <p className="text-[#357eb8]">
                  {proveedorSeleccionado.nombre} · Asociar pago a una operación
                </p>
              </div>

              <button
                onClick={() => setShowPagoModal(false)}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Operación asociada
                </span>
                <select
                  value={formPago.operacionId}
                  onChange={(e) =>
                    setFormPago({ ...formPago, operacionId: e.target.value })
                  }
                  className="input-base"
                >
                  <option value="">Seleccionar operación</option>
                  {proveedorSeleccionado.operaciones.map((operacion) => (
                    <option key={operacion.id} value={operacion.id}>
                      {operacion.id} · {operacion.detalle} · Saldo {operacion.saldo}
                    </option>
                  ))}
                </select>
              </label>

              <Input
                label="Fecha"
                type="date"
                value={formPago.fecha}
                onChange={(value) => setFormPago({ ...formPago, fecha: value })}
              />

              <Input
                label="Importe"
                value={formPago.importe}
                onChange={(value) => setFormPago({ ...formPago, importe: value })}
                placeholder="$ 0"
              />

              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Medio de pago
                </span>
                <select
                  value={formPago.medio}
                  onChange={(e) => setFormPago({ ...formPago, medio: e.target.value })}
                  className="input-base"
                >
                  <option>Transferencia</option>
                  <option>Efectivo</option>
                  <option>Cheque propio</option>
                  <option>Tarjeta</option>
                </select>
              </label>

              <Input
                label="Cuenta origen"
                value={formPago.cuenta}
                onChange={(value) => setFormPago({ ...formPago, cuenta: value })}
                placeholder="Caja / Banco / Cheques"
              />

              {formPago.medio.includes("Cheque") && (
                <div className="md:col-span-2 rounded-2xl border border-[#acbac4]/50 bg-[#f8fafc] p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <ReceiptText size={20} className="text-[#357eb8]" />
                    <h3 className="font-bold text-[#1a3263]">
                      Datos del cheque
                    </h3>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Input
                      label="Banco"
                      value={formPago.banco}
                      onChange={(value) => setFormPago({ ...formPago, banco: value })}
                      placeholder="Banco Nación"
                    />

                    <Input
                      label="Número de cheque"
                      value={formPago.numeroCheque}
                      onChange={(value) =>
                        setFormPago({ ...formPago, numeroCheque: value })
                      }
                      placeholder="CH-000000"
                    />

                    <Input
                      label="Titular"
                      value={formPago.titular}
                      onChange={(value) => setFormPago({ ...formPago, titular: value })}
                      placeholder="Titular del cheque"
                    />

                    <Input
                      label="Fecha de pago"
                      type="date"
                      value={formPago.fechaPagoCheque}
                      onChange={(value) =>
                        setFormPago({ ...formPago, fechaPagoCheque: value })
                      }
                    />
                  </div>
                </div>
              )}

              <label className="block md:col-span-2">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Observación
                </span>
                <textarea
                  rows="3"
                  value={formPago.observacion}
                  onChange={(e) =>
                    setFormPago({ ...formPago, observacion: e.target.value })
                  }
                  className="input-base"
                  placeholder="Ej: pago parcial, cancelación, adelanto, cheque entregado..."
                />
              </label>
            </div>

            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 font-bold text-red-700">
              Impacto contable: DEBE - Egreso
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
              <button
                onClick={() => setShowPagoModal(false)}
                className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
              >
                Cancelar
              </button>

              <button
                onClick={guardarPago}
                className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
              >
                Guardar pago
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
            className={`mt-2 text-3xl font-bold ${
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
    "Con deuda": "bg-red-100 text-red-700",
    "Sin deuda": "bg-[#26aa9c]/15 text-[#1b7f75]",
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

function TipoBadge({ tipo }) {
  const styles = {
    Autos: "bg-[#357eb8]/15 text-[#1a3263]",
    Taller: "bg-yellow-100 text-yellow-700",
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

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-[#acbac4]/50 bg-[#f8fafc] p-4">
      <p className="text-sm text-[#357eb8]">{label}</p>
      <p className="mt-1 break-words font-bold text-[#1a3263]">{value}</p>
    </div>
  );
}

function FilaResumen({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[#357eb8]">{label}</span>
      <span className="font-bold text-[#1a3263]">{value}</span>
    </div>
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