import { useState } from "react";
import {
  Search,
  Eye,
  X,
  Users,
  CircleDollarSign,
  CheckCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Plus,
  ReceiptText,
} from "lucide-react";

const clientesIniciales = [
  {
    id: "CL001",
    nombre: "Juan Pérez",
    dni: "28.345.789",
    telefono: "353 456789",
    totalVentas: "$72.000.000",
    totalPagado: "$58.000.000",
    saldo: "$14.000.000",
    estado: "Con deuda",
    ventas: [
      {
        id: "VT001",
        vehiculo: "Jeep Compass 2021 4x2 AT",
        fecha: "28/02/2026",
        total: "$24.000.000",
        pagado: "$20.000.000",
        saldo: "$4.000.000",
        pagos: [
          {
            id: "PG001",
            fecha: "01/03/2026",
            medio: "Transferencia",
            cuenta: "Banco Galicia",
            importe: "$12.000.000",
            observacion: "Seña inicial",
          },
          {
            id: "PG002",
            fecha: "05/03/2026",
            medio: "Cheque tercero",
            cuenta: "Cheques",
            importe: "$8.000.000",
            observacion: "Cheque recibido",
            cheque: {
              banco: "Banco Nación",
              numero: "CH-000245",
              titular: "Juan Pérez",
              fechaPago: "20/03/2026",
              estado: "Pendiente",
            },
          },
        ],
      },
      {
        id: "VT004",
        vehiculo: "Ford Ranger 2022",
        fecha: "12/04/2026",
        total: "$30.000.000",
        pagado: "$24.000.000",
        saldo: "$6.000.000",
        pagos: [
          {
            id: "PG006",
            fecha: "12/04/2026",
            medio: "Efectivo",
            cuenta: "Caja",
            importe: "$5.000.000",
            observacion: "Seña",
          },
          {
            id: "PG007",
            fecha: "15/04/2026",
            medio: "Transferencia",
            cuenta: "Banco Galicia",
            importe: "$6.000.000",
            observacion: "Pago parcial",
          },
          {
            id: "PG008",
            fecha: "18/04/2026",
            medio: "Cheque tercero",
            cuenta: "Cheques",
            importe: "$7.000.000",
            observacion: "Cheque 1",
            cheque: {
              banco: "Banco Macro",
              numero: "CH-000901",
              titular: "Juan Pérez",
              fechaPago: "30/04/2026",
              estado: "Pendiente",
            },
          },
          {
            id: "PG009",
            fecha: "20/04/2026",
            medio: "Transferencia",
            cuenta: "Banco Santander",
            importe: "$6.000.000",
            observacion: "Refuerzo",
          },
        ],
      },
      {
        id: "VT005",
        vehiculo: "Fiat Toro Volcano 2020",
        fecha: "02/05/2026",
        total: "$18.000.000",
        pagado: "$14.000.000",
        saldo: "$4.000.000",
        pagos: [
          {
            id: "PG010",
            fecha: "02/05/2026",
            medio: "Transferencia",
            cuenta: "Banco Galicia",
            importe: "$8.000.000",
            observacion: "Pago inicial",
          },
          {
            id: "PG011",
            fecha: "07/05/2026",
            medio: "Cheque tercero",
            cuenta: "Cheques",
            importe: "$6.000.000",
            observacion: "Cheque recibido",
            cheque: {
              banco: "Banco Nación",
              numero: "CH-000666",
              titular: "Juan Pérez",
              fechaPago: "25/05/2026",
              estado: "Pendiente",
            },
          },
        ],
      },
    ],
  },
  {
    id: "CL002",
    nombre: "Transportes ABC S.A.",
    dni: "30-71234567-8",
    telefono: "351 555555",
    totalVentas: "$52.000.000",
    totalPagado: "$52.000.000",
    saldo: "$0",
    estado: "Sin deuda",
    ventas: [
      {
        id: "VT002",
        vehiculo: "Toyota Hilux 0km",
        fecha: "12/03/2026",
        total: "$52.000.000",
        pagado: "$52.000.000",
        saldo: "$0",
        pagos: [
          {
            id: "PG003",
            fecha: "12/03/2026",
            medio: "Transferencia",
            cuenta: "Banco Santander",
            importe: "$52.000.000",
            observacion: "Cancelación total",
          },
        ],
      },
    ],
  },
  {
    id: "CL003",
    nombre: "María García",
    dni: "31.456.982",
    telefono: "353 777888",
    totalVentas: "$18.500.000",
    totalPagado: "$10.000.000",
    saldo: "$8.500.000",
    estado: "Con deuda",
    ventas: [
      {
        id: "VT003",
        vehiculo: "Volkswagen Amarok 2020",
        fecha: "15/04/2026",
        total: "$18.500.000",
        pagado: "$10.000.000",
        saldo: "$8.500.000",
        pagos: [
          {
            id: "PG004",
            fecha: "15/04/2026",
            medio: "Cheque tercero",
            cuenta: "Cheques",
            importe: "$6.000.000",
            observacion: "Cheque recibido",
            cheque: {
              banco: "Banco Galicia",
              numero: "CH-000881",
              titular: "María García",
              fechaPago: "30/04/2026",
              estado: "Pendiente",
            },
          },
          {
            id: "PG005",
            fecha: "20/04/2026",
            medio: "Efectivo",
            cuenta: "Caja",
            importe: "$4.000.000",
            observacion: "Refuerzo de pago",
          },
        ],
      },
    ],
  },
];

const formInicial = {
  ventaId: "",
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

export default function EstadosCuentaClientesPage() {
  const [clientes, setClientes] = useState(clientesIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [ventaActivaId, setVentaActivaId] = useState(null);
  const [busquedaVenta, setBusquedaVenta] = useState("");
  const [paginaPagos, setPaginaPagos] = useState(1);
  const [chequeSeleccionado, setChequeSeleccionado] = useState(null);
  const [showCobroModal, setShowCobroModal] = useState(false);
  const [formCobro, setFormCobro] = useState(formInicial);
  const [pagina, setPagina] = useState(1);

  const registrosPorPagina = 5;
  const pagosPorPagina = 5;

  const clientesFiltrados = clientes.filter((cliente) => {
    const texto =
      `${cliente.id} ${cliente.nombre} ${cliente.dni} ${cliente.telefono}`.toLowerCase();

    const coincideBusqueda = texto.includes(busqueda.toLowerCase());
    const coincideEstado =
      estadoFiltro === "Todos" || cliente.estado === estadoFiltro;

    return coincideBusqueda && coincideEstado;
  });

  const totalPaginas = Math.ceil(clientesFiltrados.length / registrosPorPagina);

  const clientesPaginados = clientesFiltrados.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  );

  const ventasFiltradas = clienteSeleccionado
    ? clienteSeleccionado.ventas.filter((venta) => {
        const texto = `${venta.id} ${venta.vehiculo} ${venta.fecha}`.toLowerCase();
        return texto.includes(busquedaVenta.toLowerCase());
      })
    : [];

  const ventaActiva = clienteSeleccionado?.ventas.find(
    (venta) => venta.id === ventaActivaId
  );

  const pagosPaginados = ventaActiva
    ? ventaActiva.pagos.slice(
        (paginaPagos - 1) * pagosPorPagina,
        paginaPagos * pagosPorPagina
      )
    : [];

  const totalPaginasPagos = ventaActiva
    ? Math.ceil(ventaActiva.pagos.length / pagosPorPagina)
    : 1;

  const abrirCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setVentaActivaId(cliente.ventas?.[0]?.id || null);
    setPaginaPagos(1);
    setBusquedaVenta("");
  };

  const cerrarCliente = () => {
    setClienteSeleccionado(null);
    setVentaActivaId(null);
    setPaginaPagos(1);
    setBusquedaVenta("");
  };

  const abrirCobro = (ventaId = "") => {
    setFormCobro({
      ...formInicial,
      ventaId,
      fecha: new Date().toISOString().slice(0, 10),
    });
    setShowCobroModal(true);
  };

  const guardarCobro = () => {
    if (!clienteSeleccionado || !formCobro.ventaId || !formCobro.importe) return;

    const nuevoPago = {
      id: `PG${Date.now().toString().slice(-5)}`,
      fecha: formCobro.fecha || "-",
      medio: formCobro.medio,
      cuenta: formCobro.cuenta || "-",
      importe: formCobro.importe,
      observacion: formCobro.observacion || "-",
      cheque: formCobro.medio.includes("Cheque")
        ? {
            banco: formCobro.banco,
            numero: formCobro.numeroCheque,
            titular: formCobro.titular,
            fechaPago: formCobro.fechaPagoCheque,
            estado: "Pendiente",
          }
        : null,
    };

    const clientesActualizados = clientes.map((cliente) => {
      if (cliente.id !== clienteSeleccionado.id) return cliente;

      return {
        ...cliente,
        ventas: cliente.ventas.map((venta) =>
          venta.id === formCobro.ventaId
            ? {
                ...venta,
                pagos: [...venta.pagos, nuevoPago],
              }
            : venta
        ),
      };
    });

    const clienteActualizado = clientesActualizados.find(
      (cliente) => cliente.id === clienteSeleccionado.id
    );

    setClientes(clientesActualizados);
    setClienteSeleccionado(clienteActualizado);
    setVentaActivaId(formCobro.ventaId);
    setShowCobroModal(false);
    setPaginaPagos(1);
  };

  return (
    <section className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a3263]">
          Estados de cuenta - Clientes
        </h1>
        <p className="text-[#357eb8]">
          Consultá saldos, ventas asociadas y pagos realizados por cada cliente.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="Clientes" value={clientes.length} icon={Users} />

        <MetricCard
          title="Clientes con deuda"
          value={clientes.filter((c) => c.estado === "Con deuda").length}
          icon={AlertTriangle}
          danger
        />

        <MetricCard
          title="Clientes al día"
          value={clientes.filter((c) => c.estado === "Sin deuda").length}
          icon={CheckCircle}
          highlight
        />

        <MetricCard
          title="Total a cobrar"
          value="$22.500.000"
          icon={CircleDollarSign}
          warning
        />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Listado de clientes
          </h2>
          <p className="text-sm text-[#357eb8]">
            Cada cliente puede tener varias ventas y cada pago queda asociado a
            una venta puntual.
          </p>
        </div>

        <div className="p-6">
          <div className="mb-5 grid gap-4 md:grid-cols-[1fr_220px]">
            <div className="flex items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />
              <input
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setPagina(1);
                }}
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar por cliente, DNI, teléfono o ID..."
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
              <option>Con deuda</option>
              <option>Sin deuda</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">DNI / CUIT</th>
                  <th className="p-4">Teléfono</th>
                  <th className="p-4">Total ventas</th>
                  <th className="p-4">Pagado</th>
                  <th className="p-4">Saldo</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-center">Acción</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {clientesPaginados.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-bold">{cliente.id}</td>
                    <td className="p-4 font-semibold">{cliente.nombre}</td>
                    <td className="p-4">{cliente.dni}</td>
                    <td className="p-4">{cliente.telefono}</td>
                    <td className="p-4 font-semibold">{cliente.totalVentas}</td>
                    <td className="p-4">{cliente.totalPagado}</td>
                    <td className="p-4 font-bold">{cliente.saldo}</td>
                    <td className="p-4">
                      <EstadoBadge estado={cliente.estado} />
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <IconButton
                          title="Ver estado de cuenta"
                          onClick={() => abrirCliente(cliente)}
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
              Mostrando {clientesPaginados.length} de {clientesFiltrados.length}{" "}
              clientes
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

      {clienteSeleccionado && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[92vh] w-[96vw] max-w-[1400px] overflow-y-auto overflow-x-hidden rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Estado de cuenta
                </h2>
                <p className="text-[#357eb8]">
                  {clienteSeleccionado.nombre} · {clienteSeleccionado.dni}
                </p>
              </div>

              <button
                onClick={cerrarCliente}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-4">
              <InfoCard
                label="Total ventas"
                value={clienteSeleccionado.totalVentas}
              />
              <InfoCard
                label="Total pagado"
                value={clienteSeleccionado.totalPagado}
              />
              <InfoCard
                label="Saldo pendiente"
                value={clienteSeleccionado.saldo}
              />
              <InfoCard label="Estado" value={clienteSeleccionado.estado} />
            </div>

            <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
              <div className="rounded-2xl border border-[#acbac4]/50 bg-[#f8fafc] p-4">
                <div className="mb-4">
                  <h3 className="font-bold text-[#1a3263]">
                    Ventas del cliente
                  </h3>
                  <p className="text-sm text-[#357eb8]">
                    Buscá y seleccioná una venta.
                  </p>
                </div>

                <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-3 py-2">
                  <Search size={17} className="text-[#357eb8]" />
                  <input
                    value={busquedaVenta}
                    onChange={(e) => setBusquedaVenta(e.target.value)}
                    className="w-full text-sm outline-none placeholder:text-[#acbac4]"
                    placeholder="Buscar vehículo, venta o fecha..."
                  />
                </div>

                <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
                  {ventasFiltradas.map((venta) => (
                    <button
                      key={venta.id}
                      type="button"
                      onClick={() => {
                        setVentaActivaId(venta.id);
                        setPaginaPagos(1);
                      }}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        ventaActivaId === venta.id
                          ? "border-[#357eb8] bg-white shadow-sm"
                          : "border-[#acbac4]/50 bg-white hover:bg-[#acbac4]/10"
                      }`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-[#1a3263]">{venta.id}</p>
                          <p className="text-sm text-[#357eb8]">{venta.fecha}</p>
                        </div>

                        <span className="shrink-0 rounded-lg bg-[#acbac4]/20 px-2 py-1 text-xs font-bold text-[#1a3263]">
                          {venta.pagos.length} pagos
                        </span>
                      </div>

                      <p className="mb-3 text-sm font-semibold text-[#1a3263]">
                        {venta.vehiculo}
                      </p>

                      <div className="space-y-1 border-t border-[#acbac4]/30 pt-3 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-[#357eb8]">Total</span>
                          <span className="font-bold text-[#1a3263]">
                            {venta.total}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-[#357eb8]">Pagado</span>
                          <span className="font-bold text-[#1a3263]">
                            {venta.pagado}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-[#357eb8]">Saldo</span>
                          <span className="font-bold text-[#1a3263]">
                            {venta.saldo}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}

                  {ventasFiltradas.length === 0 && (
                    <div className="rounded-xl border border-dashed border-[#acbac4] bg-white p-4 text-sm text-[#357eb8]">
                      No se encontraron ventas.
                    </div>
                  )}
                </div>
              </div>

              {ventaActiva && (
                <div className="min-w-0 rounded-2xl border border-[#acbac4]/50 bg-white">
                  <div className="border-b border-[#acbac4]/40 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold text-[#1a3263]">
                          {ventaActiva.vehiculo}
                        </h3>
                        <p className="text-sm text-[#357eb8]">
                          Venta {ventaActiva.id} · Fecha: {ventaActiva.fecha}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => abrirCobro(ventaActiva.id)}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#26aa9c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#219b8f]"
                      >
                        <Plus size={16} />
                        Registrar cobro
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      <InfoCard label="Total venta" value={ventaActiva.total} />
                      <InfoCard label="Pagado" value={ventaActiva.pagado} />
                      <InfoCard label="Saldo" value={ventaActiva.saldo} />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-[#1a3263]">
                          Pagos asociados
                        </h4>
                        <p className="text-sm text-[#357eb8]">
                          Se muestran de a {pagosPorPagina} pagos para evitar
                          una vista muy larga.
                        </p>
                      </div>

                      <span className="rounded-lg bg-[#acbac4]/20 px-3 py-1 text-sm font-semibold text-[#1a3263]">
                        {ventaActiva.pagos.length} pagos
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
                                    <span className="text-sm text-[#acbac4]">
                                      -
                                    </span>
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
                        Mostrando {pagosPaginados.length} de{" "}
                        {ventaActiva.pagos.length} pagos
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
                          disabled={
                            paginaPagos === totalPaginasPagos ||
                            totalPaginasPagos === 0
                          }
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
                onClick={cerrarCliente}
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
              <DatoSimple
                label="Banco"
                value={chequeSeleccionado.cheque.banco}
              />
              <DatoSimple
                label="Número"
                value={chequeSeleccionado.cheque.numero}
              />
              <DatoSimple
                label="Titular"
                value={chequeSeleccionado.cheque.titular}
              />
              <DatoSimple
                label="Fecha de pago"
                value={chequeSeleccionado.cheque.fechaPago}
              />
              <DatoSimple
                label="Estado"
                value={chequeSeleccionado.cheque.estado}
              />
            </div>

            <div className="mt-6 flex justify-between gap-3 border-t border-[#acbac4]/40 pt-5">
              <button
                onClick={() => {
                  setChequeSeleccionado(null);
                  abrirCobro(ventaActivaId);
                }}
                className="rounded-xl border border-[#26aa9c] px-4 py-2 text-sm font-semibold text-[#26aa9c] hover:bg-[#26aa9c]/10"
              >
                Generar cobro
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

      {showCobroModal && clienteSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Registrar cobro
                </h2>
                <p className="text-[#357eb8]">
                  {clienteSeleccionado.nombre} · Asociar cobro a una venta
                </p>
              </div>

              <button
                onClick={() => setShowCobroModal(false)}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Venta asociada
                </span>
                <select
                  value={formCobro.ventaId}
                  onChange={(e) =>
                    setFormCobro({ ...formCobro, ventaId: e.target.value })
                  }
                  className="input-base"
                >
                  <option value="">Seleccionar venta</option>
                  {clienteSeleccionado.ventas.map((venta) => (
                    <option key={venta.id} value={venta.id}>
                      {venta.id} · {venta.vehiculo} · Saldo {venta.saldo}
                    </option>
                  ))}
                </select>
              </label>

              <Input
                label="Fecha"
                type="date"
                value={formCobro.fecha}
                onChange={(value) =>
                  setFormCobro({ ...formCobro, fecha: value })
                }
              />

              <Input
                label="Importe"
                value={formCobro.importe}
                onChange={(value) =>
                  setFormCobro({ ...formCobro, importe: value })
                }
                placeholder="$ 0"
              />

              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">
                  Medio de cobro
                </span>
                <select
                  value={formCobro.medio}
                  onChange={(e) =>
                    setFormCobro({ ...formCobro, medio: e.target.value })
                  }
                  className="input-base"
                >
                  <option>Transferencia</option>
                  <option>Efectivo</option>
                  <option>Cheque tercero</option>
                  <option>Tarjeta</option>
                </select>
              </label>

              <Input
                label="Cuenta destino"
                value={formCobro.cuenta}
                onChange={(value) =>
                  setFormCobro({ ...formCobro, cuenta: value })
                }
                placeholder="Caja / Banco / Cheques"
              />

              {formCobro.medio.includes("Cheque") && (
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
                      value={formCobro.banco}
                      onChange={(value) =>
                        setFormCobro({ ...formCobro, banco: value })
                      }
                      placeholder="Banco Nación"
                    />

                    <Input
                      label="Número de cheque"
                      value={formCobro.numeroCheque}
                      onChange={(value) =>
                        setFormCobro({
                          ...formCobro,
                          numeroCheque: value,
                        })
                      }
                      placeholder="CH-000000"
                    />

                    <Input
                      label="Titular"
                      value={formCobro.titular}
                      onChange={(value) =>
                        setFormCobro({ ...formCobro, titular: value })
                      }
                      placeholder="Titular del cheque"
                    />

                    <Input
                      label="Fecha de pago"
                      type="date"
                      value={formCobro.fechaPagoCheque}
                      onChange={(value) =>
                        setFormCobro({
                          ...formCobro,
                          fechaPagoCheque: value,
                        })
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
                  value={formCobro.observacion}
                  onChange={(e) =>
                    setFormCobro({
                      ...formCobro,
                      observacion: e.target.value,
                    })
                  }
                  className="input-base"
                  placeholder="Ej: pago parcial, seña, refuerzo de pago..."
                />
              </label>
            </div>

            <div className="mt-6 rounded-xl border border-[#26aa9c]/30 bg-[#26aa9c]/10 p-4 font-bold text-[#1b7f75]">
              Impacto contable: HABER - Ingreso
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
              <button
                onClick={() => setShowCobroModal(false)}
                className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
              >
                Cancelar
              </button>

              <button
                onClick={guardarCobro}
                className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
              >
                Guardar cobro
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

function DatoSimple({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-[#f8fafc] px-4 py-3">
      <span className="text-sm text-[#357eb8]">{label}</span>
      <span className="text-right text-sm font-bold text-[#1a3263]">
        {value}
      </span>
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
