import { useMemo, useState } from "react";
import {
  Plus,
  Download,
  Search,
  TrendingUp,
  TrendingDown,
  Receipt,
  X,
  ArrowUp,
  ArrowDown,
  ArrowRightLeft,
  CreditCard,
  CheckCircle,
  Eye,
  CalendarDays,
  Banknote,
  Building2,
  ShieldCheck,
  Filter,
  Wallet,
  ChevronRight,
} from "lucide-react";

const cuentasFinancieras = [
  { id: "EFE001", tipo: "Efectivo", cuenta: "Caja principal", fecha: "2026-05-14", monto: 5200000 },
  { id: "EFE002", tipo: "Efectivo", cuenta: "Caja salón", fecha: "2026-05-15", monto: 1800000 },
  { id: "BAN001", tipo: "Banco", cuenta: "Banco Galicia", fecha: "2026-05-14", monto: 14880000 },
  { id: "BAN002", tipo: "Banco", cuenta: "Banco Santander", fecha: "2026-05-16", monto: 9400000 },
  { id: "USD001", tipo: "USD", cuenta: "Caja USD", fecha: "2026-05-15", monto: 18000 },
];

const cheques = [
  { id: "CH001", estado: "En cartera", tipo: "Tercero", banco: "Banco Nación", numero: "00012345", firmante: "Juan Pérez", fechaCobro: "2026-05-20", monto: 4000000 },
  { id: "CH002", estado: "En cartera", tipo: "Tercero", banco: "Banco Galicia", numero: "00045678", firmante: "María González", fechaCobro: "2026-05-25", monto: 2800000 },
  { id: "CH003", estado: "En caución", tipo: "Propio", banco: "Banco Santander", numero: "00098765", firmante: "Degra Automotores", fechaCobro: "2026-05-30", monto: 6500000 },
];

const cobrosPrevistos = [
  { id: "COB001", cliente: "Juan Pérez", venta: "VT001", vehiculo: "Jeep Compass 2021", fecha: "2026-05-18", monto: 4000000, estado: "Pendiente" },
  { id: "COB002", cliente: "María González", venta: "VT006", vehiculo: "Toyota Corolla 2020", fecha: "2026-05-22", monto: 12000000, estado: "Pendiente" },
];

const pagosProveedores = [
  { id: "PAG001", proveedor: "Toyota Argentina S.A.", factura: "0001-00002345", fecha: "2026-05-19", monto: 10000000, estado: "Pendiente" },
  { id: "PAG002", proveedor: "Taller Mecánico El Rápido", factura: "0003-00000412", fecha: "2026-05-21", monto: 1000000, estado: "Pendiente" },
];

const gastosFijos = [
  { id: "GF001", nombre: "Alquiler local", categoria: "Administrativo", vencimiento: "2026-05-10", monto: 1200000 },
  { id: "GF002", nombre: "Internet", categoria: "Servicios", vencimiento: "2026-05-12", monto: 85000 },
  { id: "GF003", nombre: "Luz agencia", categoria: "Servicios", vencimiento: "2026-05-18", monto: 220000 },
];

const vehiculos = [
  { id: "VEH001", nombre: "Jeep Compass 2021 4x2 AT", dominio: "AB123CD" },
  { id: "VEH002", nombre: "Ford Ranger 2022", dominio: "AC456EF" },
  { id: "VEH003", nombre: "Toyota Corolla 2020", dominio: "AD789GH" },
];

const clientes = [
  { id: "CLI001", nombre: "Juan Pérez", dni: "28.345.789" },
  { id: "CLI002", nombre: "María González", dni: "31.222.444" },
  { id: "CLI003", nombre: "Carlos Medina", dni: "25.987.123" },
];

const ventasCliente = [
  { id: "VT001", clienteId: "CLI001", fecha: "28/02/2026", vehiculo: "Jeep Compass 2021 4x2 AT", total: 24000000, pagado: 20000000, pagos: 2 },
  { id: "VT004", clienteId: "CLI001", fecha: "12/04/2026", vehiculo: "Ford Ranger 2022", total: 30000000, pagado: 24000000, pagos: 4 },
  { id: "VT006", clienteId: "CLI002", fecha: "18/05/2026", vehiculo: "Toyota Corolla 2020", total: 22000000, pagado: 10000000, pagos: 1 },
];

const proveedores = [
  { id: "PROV001", nombre: "Toyota Argentina S.A.", cuit: "30-67894512-1" },
  { id: "PROV002", nombre: "Taller Mecánico El Rápido", cuit: "20-14587963-4" },
];

const comprasProveedor = [
  { id: "COMP001", proveedorId: "PROV001", fecha: "05/03/2026", factura: "0001-00002345", concepto: "Compra Toyota Hilux SRV 0KM", total: 28000000, pagado: 18000000, pagos: 2 },
  { id: "COMP003", proveedorId: "PROV002", fecha: "10/04/2026", factura: "0003-00000412", concepto: "Reparación Ford Ranger 2022", total: 1500000, pagado: 500000, pagos: 1 },
];

const movimientosIniciales = [
  {
    fecha: "01/05/2026",
    hora: "09:12",
    tipo: "Cobro",
    origen: "Caja diaria",
    concepto: "Ingreso de caja",
    cuenta: "Caja",
    medio: "Efectivo",
    moneda: "ARS",
    cotizacion: "",
    importe: 1000000,
    saldo: "$1.000.000",
  },
  {
    fecha: "01/05/2026",
    hora: "10:45",
    tipo: "Pago",
    origen: "Gasto operativo",
    concepto: "Pago de luz agencia",
    cuenta: "Caja",
    medio: "Efectivo",
    moneda: "ARS",
    cotizacion: "",
    importe: 155931,
    saldo: "$844.069",
  },
  {
    fecha: "02/05/2026",
    hora: "11:30",
    tipo: "Pago",
    origen: "Gasto operativo",
    concepto: "Pago de internet",
    cuenta: "Caja",
    medio: "Efectivo",
    moneda: "ARS",
    cotizacion: "",
    importe: 149239,
    saldo: "$694.830",
  },
  {
    fecha: "03/05/2026",
    hora: "09:05",
    tipo: "Cobro",
    origen: "Venta #1260",
    concepto: "Cobro por venta de vehículo",
    cuenta: "Banco Galicia",
    medio: "Transferencia",
    moneda: "ARS",
    cotizacion: "",
    importe: 2500000,
    saldo: "$3.194.830",
  },
  {
    fecha: "04/05/2026",
    hora: "10:10",
    tipo: "Pago",
    origen: "Proveedor",
    concepto: "Pago a proveedor con cheque",
    cuenta: "Cheques en cartera",
    medio: "Cheques",
    moneda: "ARS",
    cotizacion: "",
    importe: 950000,
    saldo: "$2.244.830",
  },
  {
    fecha: "05/05/2026",
    hora: "09:00",
    tipo: "Cobro",
    origen: "Caja USD",
    concepto: "Ingreso en dólares",
    cuenta: "Caja USD",
    medio: "Dólares",
    moneda: "USD",
    cotizacion: "1200",
    importe: 8000,
    saldo: "USD 8.000",
  },
  {
    fecha: "06/05/2026",
    hora: "12:20",
    tipo: "Cobro",
    origen: "Venta #1268",
    concepto: "Cobro con cheque",
    cuenta: "Cheques en cartera",
    medio: "Cheques",
    moneda: "ARS",
    cotizacion: "",
    importe: 2500000,
    saldo: "$4.744.830",
  },
  {
    fecha: "07/05/2026",
    hora: "13:00",
    tipo: "Gasto",
    origen: "Gasto fijo",
    concepto: "Pago alquiler local",
    cuenta: "Banco Santander",
    medio: "Transferencia",
    moneda: "ARS",
    cotizacion: "",
    importe: 1200000,
    saldo: "$3.544.830",
  },
  {
    fecha: "08/05/2026",
    hora: "15:40",
    tipo: "Cobro",
    origen: "Cobro financiación",
    concepto: "Cobro cuota financiación propia",
    cuenta: "Banco Galicia",
    medio: "Transferencia",
    moneda: "ARS",
    cotizacion: "",
    importe: 850000,
    saldo: "$4.394.830",
  },
  {
    fecha: "10/05/2026",
    hora: "09:30",
    tipo: "Pago",
    origen: "Taller mecánico",
    concepto: "Pago reparación Ford Ranger",
    cuenta: "Banco Galicia",
    medio: "Transferencia",
    moneda: "ARS",
    cotizacion: "",
    importe: 480000,
    saldo: "$3.914.830",
  },
  {
    fecha: "12/05/2026",
    hora: "11:10",
    tipo: "Cobro",
    origen: "Venta #1270",
    concepto: "Entrega efectivo cliente",
    cuenta: "Caja",
    medio: "Efectivo",
    moneda: "ARS",
    cotizacion: "",
    importe: 3200000,
    saldo: "$7.114.830",
  },
  {
    fecha: "15/05/2026",
    hora: "16:20",
    tipo: "Pago",
    origen: "Proveedor",
    concepto: "Pago Toyota Argentina",
    cuenta: "Banco Santander",
    medio: "Transferencia",
    moneda: "ARS",
    cotizacion: "",
    importe: 2100000,
    saldo: "$5.014.830",
  },
  {
    fecha: "18/05/2026",
    hora: "10:00",
    tipo: "Cobro",
    origen: "Caja diaria",
    concepto: "Ingreso por venta usada",
    cuenta: "Caja",
    medio: "Efectivo",
    moneda: "ARS",
    cotizacion: "",
    importe: 1750000,
    saldo: "$6.764.830",
  },
  {
    fecha: "20/05/2026",
    hora: "14:15",
    tipo: "Pago",
    origen: "Gasto operativo",
    concepto: "Pago publicidad Meta Ads",
    cuenta: "Mercado Pago",
    medio: "Transferencia",
    moneda: "ARS",
    cotizacion: "",
    importe: 320000,
    saldo: "$6.444.830",
  },
  {
    fecha: "22/05/2026",
    hora: "17:00",
    tipo: "Cobro",
    origen: "Venta #1275",
    concepto: "Cobro transferencia cliente",
    cuenta: "Banco Galicia",
    medio: "Transferencia",
    moneda: "ARS",
    cotizacion: "",
    importe: 4100000,
    saldo: "$10.544.830",
  },
];

const formInicial = {
  cliente: "",
  clienteId: "",
  venta: "",
  ventaId: "",
  proveedor: "",
  proveedorId: "",
  compra: "",
  compraId: "",
  concepto: "",
  monto: "",
  moneda: "ARS",
  cotizacion: "",
  cuenta: "",
  fecha: "",
  medio: "",
  tipoGasto: "Único",
  gastoFijoId: "",
  gastosRecurrentesIds: [],
  origenCheque: "",
  chequeId: "",
  chequeBanco: "",
  chequeNumero: "",
  chequeFirmante: "",
  chequeFechaCobro: "",
  chequeMonto: "",
  impactaVehiculo: "No",
  vehiculoId: "",
};

export default function LibroDiarioPage() {
  const [modal, setModal] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const [movimientos, setMovimientos] = useState(movimientosIniciales);
  const [form, setForm] = useState(formInicial);

  const [filtros, setFiltros] = useState({
    desde: "2026-04-29",
    hasta: "2026-05-31",
    tipo: "Todos los tipos",
    busqueda: "",
  });

  const abrirModal = (tipo) => {
    setModal(tipo);
    setForm(formInicial);
  };

  const cerrarModal = () => setModal(null);

  const dentroDelRango = (fecha) => {
    if (!fecha) return true;
    const desde = filtros.desde || "0000-01-01";
    const hasta = filtros.hasta || "9999-12-31";
    return fecha >= desde && fecha <= hasta;
  };

  const movimientosFiltrados = useMemo(() => {
    return movimientos.filter((mov) => {
      const fechaISO = convertirFechaISO(mov.fecha);
      const cumpleDesde = !filtros.desde || fechaISO >= filtros.desde;
      const cumpleHasta = !filtros.hasta || fechaISO <= filtros.hasta;
      const cumpleTipo = filtros.tipo === "Todos los tipos" || mov.tipo === filtros.tipo;
      const texto = [mov.fecha, mov.hora, mov.tipo, mov.origen, mov.concepto, mov.cuenta, mov.medio, mov.moneda].join(" ").toLowerCase();
      const cumpleBusqueda = texto.includes(filtros.busqueda.toLowerCase());

      return cumpleDesde && cumpleHasta && cumpleTipo && cumpleBusqueda;
    });
  }, [movimientos, filtros]);

  const resumenFinanciero = useMemo(() => {
    const sum = (arr) => arr.reduce((acc, item) => acc + (item.monto || 0), 0);

    const efectivoItems = cuentasFinancieras.filter((i) => i.tipo === "Efectivo" && dentroDelRango(i.fecha));
    const bancoItems = cuentasFinancieras.filter((i) => i.tipo === "Banco" && dentroDelRango(i.fecha));
    const usdItems = cuentasFinancieras.filter((i) => i.tipo === "USD" && dentroDelRango(i.fecha));
    const chequesCarteraItems = cheques.filter((i) => i.estado === "En cartera" && dentroDelRango(i.fechaCobro));
    const cobrosItems = cobrosPrevistos.filter((i) => dentroDelRango(i.fecha));
    const pagosItems = pagosProveedores.filter((i) => dentroDelRango(i.fecha));
    const gastosItems = gastosFijos.filter((i) => dentroDelRango(i.vencimiento));
    const caucionItems = cheques.filter((i) => i.estado === "En caución" && dentroDelRango(i.fechaCobro));

    return [
      { id: "efectivo", title: "Efectivo disponible", value: sum(efectivoItems), subtitle: "Caja y efectivo físico", icon: Banknote, color: "green", items: efectivoItems },
      { id: "bancos", title: "Bancos", value: sum(bancoItems), subtitle: "Saldos bancarios disponibles", icon: Building2, color: "blue", items: bancoItems },
      { id: "usd", title: "USD disponibles", value: sum(usdItems), subtitle: "Caja y cuentas en dólares", icon: Banknote, color: "emerald", items: usdItems, currency: "USD" },
      { id: "cheques-cartera", title: "Cheques en cartera", value: sum(chequesCarteraItems), subtitle: "Detalle por fecha de cobro", icon: Receipt, color: "purple", items: chequesCarteraItems },
      { id: "cobros-previstos", title: "Cobros previstos", value: sum(cobrosItems), subtitle: "Ingresos esperados por ventas", icon: TrendingUp, color: "green", items: cobrosItems },
      { id: "pagos-proveedores", title: "Pagos a proveedores", value: sum(pagosItems), subtitle: "Egresos pendientes", icon: TrendingDown, color: "red", items: pagosItems },
      { id: "gastos-fijos", title: "Gastos fijos por pagar", value: sum(gastosItems), subtitle: "Vencimientos administrativos", icon: CreditCard, color: "orange", items: gastosItems },
      { id: "cheques-caucion", title: "Cheques en caución", value: sum(caucionItems), subtitle: "Cheques caucionados", icon: ShieldCheck, color: "purple", items: caucionItems },
    ];
  }, [filtros]);

  const guardarMovimiento = (tipo) => {
    const vehiculo = vehiculos.find((v) => v.id === form.vehiculoId);
    const gastosSeleccionados = gastosFijos.filter((gasto) => form.gastosRecurrentesIds?.includes(gasto.id));
    const totalGastosRecurrentes = gastosSeleccionados.reduce((acc, gasto) => acc + Number(gasto.monto || 0), 0);
    const importeMovimiento = tipo === "Gasto" && form.tipoGasto === "Recurrente" ? totalGastosRecurrentes : Number(form.monto || 0);

    const chequeSeleccionado = cheques.find((cheque) => cheque.id === form.chequeId);
    const detalleCheque =
      form.origenCheque === "cartera" && chequeSeleccionado
        ? `${chequeSeleccionado.banco} Nº ${chequeSeleccionado.numero}`
        : form.origenCheque === "nuevo" && form.chequeNumero
        ? `${form.chequeBanco || "Banco"} Nº ${form.chequeNumero}`
        : "";

    const conceptoGastoRecurrente = gastosSeleccionados.map((gasto) => gasto.nombre).join(" + ");

    const nuevo = {
      fecha: form.fecha ? form.fecha.split("-").reverse().join("/") : "14/05/2026",
      hora: "12:30",
      tipo,
      origen:
        tipo === "Cobro"
          ? form.venta || "Venta asociada"
          : tipo === "Pago"
          ? form.compra || form.proveedor || "Compra asociada"
          : tipo === "Transferencia"
          ? "Transferencia interna"
          : form.tipoGasto === "Recurrente"
          ? "Gastos fijos recurrentes"
          : form.impactaVehiculo === "Sí"
          ? `Gasto vehículo ${vehiculo?.nombre || ""}`
          : "Operativo",
      concepto:
        form.concepto ||
        (tipo === "Gasto" && form.tipoGasto === "Recurrente" ? `Pago de ${conceptoGastoRecurrente}` : "Movimiento sin concepto"),
      cuenta: form.cuenta || (form.medio?.includes("Cheque") ? "Cheques en cartera" : "Caja"),
      medio: form.moneda === "USD" ? "Dólares" : form.medio || "Otros",
      moneda: form.moneda,
      cotizacion: form.cotizacion || "",
      importe: importeMovimiento,
      saldo: form.moneda === "USD" ? "USD 18.000" : "$14.880.000",
      detalleCheque,
    };

    setMovimientos([nuevo, ...movimientos]);
    cerrarModal();
  };

  return (
    <section className="w-full">
      <div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <p className="mb-1 text-sm font-semibold text-[#357eb8]">Contabilidad &gt; Libro Diario</p>
          <h1 className="text-3xl font-bold text-[#1a3263]">Disponibilidad financiera diaria</h1>
          <p className="text-[#357eb8]">Vista consolidada de efectivo, bancos, USD, cheques, cobros previstos, pagos y gastos.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#acbac4] bg-white px-5 py-3 font-semibold text-[#1a3263] transition hover:bg-[#f8fafc]">
            <Download size={18} />
            Exportar
          </button>

          <button onClick={() => abrirModal("selector")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white transition hover:bg-[#219b8f]">
            <Plus size={18} />
            Nuevo movimiento
          </button>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-[#acbac4]/40 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Filter size={19} className="text-[#357eb8]" />
          <h2 className="text-lg font-bold text-[#1a3263]">Filtros generales</h2>
        </div>

        <div className="grid gap-3 xl:grid-cols-[170px_170px_190px_1fr_120px]">
          <Input label="Desde" type="date" value={filtros.desde} onChange={(v) => setFiltros((prev) => ({ ...prev, desde: v }))} />
          <Input label="Hasta" type="date" value={filtros.hasta} onChange={(v) => setFiltros((prev) => ({ ...prev, hasta: v }))} />

          <SelectBase label="Tipo" value={filtros.tipo} onChange={(v) => setFiltros((prev) => ({ ...prev, tipo: v }))} options={["Todos los tipos", "Cobro", "Pago", "Gasto", "Transferencia"]} />

          <div>
            <span className="mb-1 block font-semibold text-[#1a3263]">Buscar</span>
            <SearchInput value={filtros.busqueda} onChange={(v) => setFiltros((prev) => ({ ...prev, busqueda: v }))} placeholder="Buscar por concepto, origen, cuenta o medio..." />
          </div>

          <div className="flex items-end">
            <button onClick={() => setFiltros({ desde: "", hasta: "", tipo: "Todos los tipos", busqueda: "" })} className="h-[48px] w-full rounded-xl border border-[#acbac4] bg-white px-4 font-semibold text-[#1a3263] transition hover:bg-[#f8fafc]">
              Limpiar
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {resumenFinanciero.map((card) => (
          <FinancialCard key={card.id} card={card} onClick={() => setDrawer(card)} />
        ))}
      </div>

      <LibroDiarioSistemaTable movimientos={movimientosFiltrados} />

      {drawer && <DetailDrawer card={drawer} onClose={() => setDrawer(null)} />}

      {modal === "selector" && (
        <ModalBase title="Nuevo movimiento" onClose={cerrarModal} maxWidth="max-w-3xl">
          <p className="mb-5 text-[#357eb8]">¿Qué querés registrar?</p>

          <div className="grid gap-4 md:grid-cols-2">
            <OptionCard icon={ArrowUp} title="Cobro" description="Seleccionar cliente, venta y registrar ingreso." color="green" onClick={() => abrirModal("Cobro")} />
            <OptionCard icon={ArrowDown} title="Pago" description="Seleccionar proveedor, compra/factura y registrar egreso." color="red" onClick={() => abrirModal("Pago")} />
            <OptionCard icon={CreditCard} title="Gasto" description="Registrar gasto fijo o gasto único." color="orange" onClick={() => abrirModal("Gasto")} />
            <OptionCard icon={ArrowRightLeft} title="Transferencia" description="Mover dinero entre cuentas internas." color="blue" onClick={() => abrirModal("Transferencia")} />
          </div>
        </ModalBase>
      )}

      {modal === "Cobro" && <ModalCobro form={form} setForm={setForm} onClose={cerrarModal} onSave={() => guardarMovimiento("Cobro")} />}
      {modal === "Pago" && <ModalPago form={form} setForm={setForm} onClose={cerrarModal} onSave={() => guardarMovimiento("Pago")} />}
      {modal === "Gasto" && <ModalGasto form={form} setForm={setForm} onClose={cerrarModal} onSave={() => guardarMovimiento("Gasto")} />}
      {modal === "Transferencia" && <ModalTransferencia form={form} setForm={setForm} onClose={cerrarModal} onSave={() => guardarMovimiento("Transferencia")} />}
    </section>
  );
}

function LibroDiarioSistemaTable({ movimientos }) {
  const totales = useMemo(() => {
    const base = {
      ingresos: { Dolares: 0, Efectivo: 0, Cheques: 0, Transferencias: 0, Otros: 0 },
      egresos: { Dolares: 0, Efectivo: 0, Cheques: 0, Transferencias: 0, Otros: 0 },
    };

    movimientos.forEach((mov) => {
      const medio = normalizarMedio(mov.medio);
      const grupo = mov.tipo === "Cobro" ? "ingresos" : "egresos";
      base[grupo][medio] += Number(mov.importe || 0);
    });

    return base;
  }, [movimientos]);

  const totalIngresos = totalGrupo(totales.ingresos);
  const totalEgresos = totalGrupo(totales.egresos);
  const ultimoSaldo = movimientos?.length ? movimientos[movimientos.length - 1].saldo : "$0";

  return (
    <div className="overflow-hidden rounded-2xl border border-[#acbac4]/40 bg-white shadow-sm">
      {movimientos.length === 0 ? (
        <div className="p-5">
          <EmptyState text="No se encontraron movimientos para los filtros seleccionados." />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1070px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="bg-[#142b63] text-white">
                <th className="min-w-[120px] border-r border-white/15 p-4 text-center font-bold">Fecha</th>
                <th className="min-w-[320px] border-r border-white/15 p-4 font-bold">Movimiento</th>
                <th className="min-w-[165px] border-r border-white/15 p-4 font-bold">Cuenta</th>
                <th className="min-w-[300px] border-r border-white/15 p-4 text-center font-bold">Debe / Ingresos</th>
                <th className="min-w-[300px] border-r border-white/15 p-4 text-center font-bold">Haber / Egresos</th>
                <th className="min-w-[170px] p-4 text-center font-bold">Saldo</th>
              </tr>
            </thead>

            <tbody className="text-[#1a3263]">
              {movimientos.map((mov, index) => {
                const esIngreso = mov.tipo === "Cobro";
                const medio = normalizarMedio(mov.medio);

                return (
                  <tr key={index} className="group hover:bg-[#f8fafc]">
                    <td className="border-b border-r border-[#acbac4]/25 p-4 align-top">
                      <div className="rounded-xl bg-[#eef3f9] px-3 py-3 text-center shadow-sm">
                        <p className="font-bold text-[#1a3263]">{mov.fecha}</p>
                        <p className="mt-1 text-xs font-bold text-[#357eb8]">{mov.hora}</p>
                      </div>
                    </td>

                    <td className="border-b border-r border-[#acbac4]/25 p-4 align-top">
                      <div className="flex gap-3">
                        <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${esIngreso ? "bg-[#26aa9c]/12 text-[#1b7f75]" : "bg-red-50 text-red-700"}`}>
                          {esIngreso ? <ArrowUp size={22} /> : <ArrowDown size={22} />}
                        </div>

                        <div className="min-w-0">
                          <p className="font-bold text-[#1a3263]">{mov.concepto}</p>
                          <p className="mt-1 text-xs font-semibold text-[#357eb8]">{mov.origen}</p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <TipoBadge tipo={mov.tipo} />
                            <MedioPill medio={medio} />
                            <span className="rounded-lg bg-[#eef3f9] px-3 py-1 text-xs font-bold text-[#6b7a90]">{mov.moneda}</span>
                            {mov.detalleCheque && <span className="rounded-lg bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">{mov.detalleCheque}</span>}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="border-b border-r border-[#acbac4]/25 p-4 align-top">
                      <p className="font-bold text-[#1a3263]">{mov.cuenta}</p>
                      <p className="mt-1 text-xs text-[#6b7a90]">Cuenta asociada</p>
                    </td>


                    <td className="border-b border-r border-[#26aa9c]/10 bg-[#f3fbf9]/60 p-4 align-middle">
                      {esIngreso ? <MovimientoImporteBox medio={medio} value={mov.importe} moneda={mov.moneda} cotizacion={mov.cotizacion} type="ingreso" /> : <EmptyAmount />}
                    </td>

                    <td className="border-b border-r border-red-100 bg-red-50/30 p-4 align-middle">
                      {!esIngreso ? <MovimientoImporteBox medio={medio} value={mov.importe} moneda={mov.moneda} cotizacion={mov.cotizacion} type="egreso" /> : <EmptyAmount />}
                    </td>

                    <td className="border-b border-[#acbac4]/25 p-4 text-center align-middle">
                      <span className="inline-flex rounded-xl bg-[#1a3263]/10 px-4 py-2 text-base font-bold text-[#1a3263] shadow-sm">{mov.saldo}</span>
                    </td>
                  </tr>
                );
              })}

              <tr className="bg-white">
                <td colSpan={3} className="border-t-2 border-[#357eb8] bg-[#f8fafc] p-4 text-right text-base font-bold text-[#1a3263]">
                  Totales del libro
                </td>

                <td className="border-t-2 border-[#357eb8] bg-[#effaf7] p-4">
                  <TotalesLibroBox totales={totales.ingresos} total={totalIngresos} type="ingreso" />
                </td>

                <td className="border-t-2 border-[#357eb8] bg-red-50 p-4">
                  <TotalesLibroBox totales={totales.egresos} total={totalEgresos} type="egreso" />
                </td>

                <td className="border-t-2 border-[#357eb8] p-4 text-center">
                  <span className="inline-flex rounded-xl bg-[#1a3263]/10 px-4 py-2 text-lg font-bold text-[#1a3263] shadow-sm">{ultimoSaldo}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function MovimientoImporteBox({ medio, value, moneda = "ARS", cotizacion, type }) {
  const esIngreso = type === "ingreso";
  const label = moneda === "USD" ? "USD" : medio;
  const amount = moneda === "USD" ? formatUSD(value) : formatCurrency(value);

  return (
    <div className={`mx-auto w-full max-w-[230px] overflow-hidden rounded-xl border bg-white shadow-sm ${esIngreso ? "border-[#26aa9c]/25" : "border-red-200"}`}>
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="font-bold text-[#1f2937]">{label}:</span>
        <span className={`font-extrabold ${esIngreso ? "text-[#1b7f75]" : "text-red-700"}`}>{amount}</span>
      </div>

      {moneda === "USD" && cotizacion && (
        <div className="flex items-center justify-between border-t border-[#acbac4]/25 px-4 py-2 text-xs font-bold text-[#1a3263]">
          <span>Cotización:</span>
          <span>${cotizacion}</span>
        </div>
      )}
    </div>
  );
}

function EmptyAmount() {
  return <div className="text-center text-lg font-bold text-[#6b7a90]">-</div>;
}

function TotalesLibroBox({ totales, total, type }) {
  const esIngreso = type === "ingreso";
  const color = esIngreso ? "text-[#1b7f75]" : "text-red-700";
  const label = esIngreso ? "TOTAL DEBE" : "TOTAL HABER";

  const rows = [
    ["Efectivo", totales.Efectivo],
    ["Cheques", totales.Cheques],
    ["Transfer.", totales.Transferencias],
    ["Otros", totales.Otros],
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-end">
      <div className="space-y-1 text-sm">
        {rows.filter(([, value]) => Number(value || 0) > 0).map(([name, value]) => (
          <div key={name} className="flex justify-between gap-4 font-bold text-[#1a3263]">
            <span>{name}:</span>
            <span className={color}>{formatCurrency(value)}</span>
          </div>
        ))}
        {Number(totales.Dolares || 0) > 0 && (
          <div className="flex justify-between gap-4 font-bold text-[#1a3263]">
            <span>USD:</span>
            <span className={color}>{formatUSD(totales.Dolares)}</span>
          </div>
        )}
      </div>

      <div className="text-right">
        <p className={`text-xs font-extrabold uppercase tracking-wide ${color}`}>{label}</p>
        <p className={`mt-1 text-xl font-extrabold ${color}`}>{formatCurrency(total)}</p>
      </div>
    </div>
  );
}


function ModalCobro({ form, setForm, onClose, onSave }) {
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [busquedaVenta, setBusquedaVenta] = useState("");

  const clienteSeleccionado = clientes.find((c) => c.id === form.clienteId);
  const ventaSeleccionada = ventasCliente.find((v) => v.id === form.ventaId);

  const clientesFiltrados = clientes.filter((cliente) => `${cliente.nombre} ${cliente.dni}`.toLowerCase().includes(busquedaCliente.toLowerCase()));

  const ventasFiltradas = ventasCliente.filter((venta) => {
    const coincideCliente = venta.clienteId === form.clienteId;
    const coincideBusqueda = `${venta.id} ${venta.fecha} ${venta.vehiculo}`.toLowerCase().includes(busquedaVenta.toLowerCase());
    return coincideCliente && coincideBusqueda;
  });

  const seleccionarCliente = (cliente) => {
    setForm((prev) => ({
      ...prev,
      clienteId: cliente.id,
      cliente: `${cliente.nombre} - ${cliente.dni}`,
      ventaId: "",
      venta: "",
      monto: "",
      moneda: "ARS",
      cotizacion: "",
      concepto: "",
    }));
  };

  const seleccionarVenta = (venta) => {
    setForm((prev) => ({
      ...prev,
      ventaId: venta.id,
      venta: `${venta.id} - ${venta.vehiculo}`,
      monto: "",
      moneda: "ARS",
      cotizacion: "",
      concepto: `Cobro ${venta.vehiculo} - Venta ${venta.id}`,
    }));
  };

  return (
    <ModalBase title="Registrar cobro" onClose={onClose} maxWidth="max-w-[1500px]">
      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <aside className="rounded-2xl border border-[#acbac4]/50 bg-[#f8fafc] p-5">
          <h3 className="text-lg font-bold text-[#1a3263]">Cliente</h3>
          <p className="mb-4 text-sm text-[#357eb8]">Buscá y seleccioná el cliente.</p>

          <SearchInput value={busquedaCliente} onChange={setBusquedaCliente} placeholder="Buscar cliente..." />

          <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto pr-1">
            {clientesFiltrados.map((cliente) => (
              <button key={cliente.id} type="button" onClick={() => seleccionarCliente(cliente)} className={`w-full rounded-xl border p-4 text-left ${form.clienteId === cliente.id ? "border-[#357eb8] bg-white shadow-sm" : "border-[#acbac4]/50 bg-white"}`}>
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-bold text-[#1a3263]">{cliente.nombre}</p>
                    <p className="text-sm text-[#357eb8]">{cliente.dni}</p>
                  </div>

                  {form.clienteId === cliente.id && <CheckCircle size={20} className="text-[#26aa9c]" />}
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="min-w-0 rounded-2xl border border-[#acbac4]/50 bg-white">
          {!clienteSeleccionado ? (
            <EmptyState text="Seleccioná un cliente para visualizar sus ventas." />
          ) : (
            <>
              <div className="border-b border-[#acbac4]/40 p-5">
                <div className="flex flex-col justify-between gap-4 2xl:flex-row 2xl:items-center">
                  <div>
                    <h3 className="text-xl font-bold text-[#1a3263]">Ventas de {clienteSeleccionado.nombre}</h3>
                    <p className="text-sm text-[#357eb8]">Buscá y seleccioná una venta para generar el cobro.</p>
                  </div>

                  <div className="w-full 2xl:w-[380px]">
                    <SearchInput value={busquedaVenta} onChange={setBusquedaVenta} placeholder="Buscar venta..." />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-5 2xl:grid-cols-[320px_minmax(640px,1fr)]">
                <div className="max-h-[560px] space-y-3 overflow-y-auto pr-1">
                  {ventasFiltradas.map((venta) => (
                    <VentaCard key={venta.id} venta={venta} selected={form.ventaId === venta.id} onClick={() => seleccionarVenta(venta)} />
                  ))}
                </div>

                {!ventaSeleccionada ? (
                  <EmptyState text="Seleccioná una venta para cargar el cobro." />
                ) : (
                  <DetalleOperacion tipo="Cobro" titulo={ventaSeleccionada.vehiculo} subtitulo={`Venta ${ventaSeleccionada.id} · Fecha: ${ventaSeleccionada.fecha}`} totalLabel="Total venta" pagadoLabel="Pagado" saldoLabel="Saldo" total={ventaSeleccionada.total} pagado={ventaSeleccionada.pagado} saldo={ventaSeleccionada.total - ventaSeleccionada.pagado} badge={`${ventaSeleccionada.pagos} pagos`}>
                    <FormularioMovimiento tipo="Cobro" form={form} setForm={setForm} onClose={onClose} onSave={onSave} />
                  </DetalleOperacion>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </ModalBase>
  );
}

function ModalPago({ form, setForm, onClose, onSave }) {
  const [busquedaProveedor, setBusquedaProveedor] = useState("");
  const [busquedaCompra, setBusquedaCompra] = useState("");

  const proveedorSeleccionado = proveedores.find((p) => p.id === form.proveedorId);
  const compraSeleccionada = comprasProveedor.find((c) => c.id === form.compraId);

  const proveedoresFiltrados = proveedores.filter((proveedor) => `${proveedor.nombre} ${proveedor.cuit}`.toLowerCase().includes(busquedaProveedor.toLowerCase()));

  const comprasFiltradas = comprasProveedor.filter((compra) => {
    const coincideProveedor = compra.proveedorId === form.proveedorId;
    const coincideBusqueda = `${compra.id} ${compra.fecha} ${compra.factura} ${compra.concepto}`.toLowerCase().includes(busquedaCompra.toLowerCase());
    return coincideProveedor && coincideBusqueda;
  });

  const seleccionarProveedor = (proveedor) => {
    setForm((prev) => ({
      ...prev,
      proveedorId: proveedor.id,
      proveedor: `${proveedor.nombre} - ${proveedor.cuit}`,
      compraId: "",
      compra: "",
      monto: "",
      moneda: "ARS",
      cotizacion: "",
      concepto: "",
    }));
  };

  const seleccionarCompra = (compra) => {
    setForm((prev) => ({
      ...prev,
      compraId: compra.id,
      compra: `${compra.id} - ${compra.factura}`,
      monto: "",
      moneda: "ARS",
      cotizacion: "",
      concepto: `Pago ${compra.concepto} - Factura ${compra.factura}`,
    }));
  };

  return (
    <ModalBase title="Registrar pago" onClose={onClose} maxWidth="max-w-[1500px]">
      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <aside className="rounded-2xl border border-[#acbac4]/50 bg-[#f8fafc] p-5">
          <h3 className="text-lg font-bold text-[#1a3263]">Proveedor</h3>
          <p className="mb-4 text-sm text-[#357eb8]">Buscá y seleccioná el proveedor.</p>

          <SearchInput value={busquedaProveedor} onChange={setBusquedaProveedor} placeholder="Buscar proveedor..." />

          <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto pr-1">
            {proveedoresFiltrados.map((proveedor) => (
              <button key={proveedor.id} type="button" onClick={() => seleccionarProveedor(proveedor)} className={`w-full rounded-xl border p-4 text-left ${form.proveedorId === proveedor.id ? "border-red-300 bg-white shadow-sm" : "border-[#acbac4]/50 bg-white"}`}>
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-bold text-[#1a3263]">{proveedor.nombre}</p>
                    <p className="text-sm text-[#357eb8]">{proveedor.cuit}</p>
                  </div>

                  {form.proveedorId === proveedor.id && <CheckCircle size={20} className="text-red-600" />}
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="min-w-0 rounded-2xl border border-[#acbac4]/50 bg-white">
          {!proveedorSeleccionado ? (
            <EmptyState text="Seleccioná un proveedor para visualizar sus compras/facturas." />
          ) : (
            <>
              <div className="border-b border-[#acbac4]/40 p-5">
                <div className="flex flex-col justify-between gap-4 2xl:flex-row 2xl:items-center">
                  <div>
                    <h3 className="text-xl font-bold text-[#1a3263]">Compras / facturas de {proveedorSeleccionado.nombre}</h3>
                    <p className="text-sm text-[#357eb8]">Buscá y seleccioná una compra o factura para generar el pago.</p>
                  </div>

                  <div className="w-full 2xl:w-[380px]">
                    <SearchInput value={busquedaCompra} onChange={setBusquedaCompra} placeholder="Buscar compra..." />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-5 2xl:grid-cols-[320px_minmax(640px,1fr)]">
                <div className="max-h-[560px] space-y-3 overflow-y-auto pr-1">
                  {comprasFiltradas.map((compra) => (
                    <CompraCard key={compra.id} compra={compra} selected={form.compraId === compra.id} onClick={() => seleccionarCompra(compra)} />
                  ))}
                </div>

                {!compraSeleccionada ? (
                  <EmptyState text="Seleccioná una compra/factura para cargar el pago." />
                ) : (
                  <DetalleOperacion tipo="Pago" titulo={compraSeleccionada.concepto} subtitulo={`Compra ${compraSeleccionada.id} · Factura ${compraSeleccionada.factura} · Fecha: ${compraSeleccionada.fecha}`} totalLabel="Total compra" pagadoLabel="Pagado" saldoLabel="Saldo" total={compraSeleccionada.total} pagado={compraSeleccionada.pagado} saldo={compraSeleccionada.total - compraSeleccionada.pagado} badge={`${compraSeleccionada.pagos} pagos`}>
                    <FormularioMovimiento tipo="Pago" form={form} setForm={setForm} onClose={onClose} onSave={onSave} />
                  </DetalleOperacion>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </ModalBase>
  );
}

function FormularioMovimiento({ tipo, form, setForm, onClose, onSave }) {
  const esCobro = tipo === "Cobro";
  const esPago = tipo === "Pago";
  const idOperacion = esCobro ? form.ventaId : form.compraId;
  const usaCheque = form.medio === "Cheque tercero" || form.medio === "Cheque propio";

  return (
    <>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Input label="Fecha" type="date" value={form.fecha} onChange={(v) => setForm((prev) => ({ ...prev, fecha: v }))} required />

        <SelectBase label="Moneda" value={form.moneda} onChange={(v) => setForm((prev) => ({ ...prev, moneda: v, cotizacion: v === "ARS" ? "" : prev.cotizacion, monto: "" }))} options={["ARS", "USD"]} required />

        {form.moneda === "USD" && <Input key={`cotizacion-${idOperacion}`} label="Cotización" value={form.cotizacion} onChange={(v) => setForm((prev) => ({ ...prev, cotizacion: v }))} placeholder="Ej: 1200" required />}

        <Input key={`monto-${tipo}-${idOperacion}-${form.moneda}`} label={`${esCobro ? "Monto a cobrar" : "Monto a pagar"} en ${form.moneda}`} value={form.monto || ""} onChange={(v) => setForm((prev) => ({ ...prev, monto: v }))} placeholder={form.moneda === "USD" ? "USD 0" : "$ 0"} required />

        <SelectBase
          label={esCobro ? "Medio de cobro" : "Medio de pago"}
          value={form.medio}
          onChange={(v) =>
            setForm((prev) => ({
              ...prev,
              medio: v,
              origenCheque: v.includes("Cheque") ? prev.origenCheque : "",
              chequeId: v.includes("Cheque") ? prev.chequeId : "",
              chequeBanco: v.includes("Cheque") ? prev.chequeBanco : "",
              chequeNumero: v.includes("Cheque") ? prev.chequeNumero : "",
              chequeFirmante: v.includes("Cheque") ? prev.chequeFirmante : "",
              chequeFechaCobro: v.includes("Cheque") ? prev.chequeFechaCobro : "",
              chequeMonto: v.includes("Cheque") ? prev.chequeMonto : "",
            }))
          }
          options={esCobro ? ["Transferencia", "Efectivo", "Cheque tercero", "Tarjeta"] : ["Transferencia", "Efectivo", "Cheque propio", "Cheque tercero"]}
          placeholder="Seleccionar"
          required
        />

        <SelectBase label={esCobro ? "Cuenta destino" : "Cuenta origen"} value={form.cuenta} onChange={(v) => setForm((prev) => ({ ...prev, cuenta: v }))} options={usaCheque ? ["Cheques en cartera", "Banco Galicia", "Caja", "Mercado Pago", "Banco Santander"] : ["Banco Galicia", "Caja", "Mercado Pago", "Banco Santander"]} placeholder="Seleccionar cuenta" required />

        {esPago && usaCheque && (
          <div className="lg:col-span-2">
            <ChequePaymentBox form={form} setForm={setForm} />
          </div>
        )}

        <TextareaBase label="Concepto" value={form.concepto} onChange={(v) => setForm((prev) => ({ ...prev, concepto: v }))} placeholder={esCobro ? "Detalle del cobro..." : "Detalle del pago..."} required full />
      </div>

      <ImpactBox color={esCobro ? "green" : "red"} text={esCobro ? "Impacto contable: HABER / Ingreso por venta" : usaCheque ? "Impacto contable: DEBE / Egreso por compra o factura pagado con cheque." : "Impacto contable: DEBE / Egreso por compra o factura"} />
      <ModalActions onClose={onClose} onSave={onSave} saveLabel={esCobro ? "Registrar cobro" : "Registrar pago"} color={esCobro ? "green" : "red"} />
    </>
  );
}

function ModalGasto({ form, setForm, onClose, onSave }) {
  const [busquedaGasto, setBusquedaGasto] = useState("");

  const gastosSeleccionados = gastosFijos.filter((gasto) => form.gastosRecurrentesIds?.includes(gasto.id));
  const totalSeleccionado = gastosSeleccionados.reduce((acc, gasto) => acc + Number(gasto.monto || 0), 0);
  const usaCheque = form.medio === "Cheque tercero" || form.medio === "Cheque propio";

  const gastosFiltrados = gastosFijos.filter((gasto) => `${gasto.nombre} ${gasto.categoria} ${gasto.vencimiento}`.toLowerCase().includes(busquedaGasto.toLowerCase()));

  const toggleGastoRecurrente = (gasto) => {
    const yaSeleccionado = form.gastosRecurrentesIds?.includes(gasto.id);
    const nuevosIds = yaSeleccionado ? form.gastosRecurrentesIds.filter((id) => id !== gasto.id) : [...(form.gastosRecurrentesIds || []), gasto.id];
    const nuevosGastos = gastosFijos.filter((item) => nuevosIds.includes(item.id));
    const total = nuevosGastos.reduce((acc, item) => acc + Number(item.monto || 0), 0);

    setForm((prev) => ({
      ...prev,
      gastosRecurrentesIds: nuevosIds,
      gastoFijoId: nuevosIds.join(","),
      concepto: nuevosGastos.length ? `Pago gastos recurrentes: ${nuevosGastos.map((item) => item.nombre).join(" + ")}` : "",
      monto: total ? String(total) : "",
      fecha: prev.fecha || gasto.vencimiento || "",
      impactaVehiculo: "No",
      vehiculoId: "",
    }));
  };

  const resetTipoGasto = (tipo) => {
    setForm((prev) => ({
      ...prev,
      tipoGasto: tipo,
      gastoFijoId: "",
      gastosRecurrentesIds: [],
      concepto: "",
      monto: "",
      fecha: "",
      medio: "",
      cuenta: "",
      origenCheque: "",
      chequeId: "",
      chequeBanco: "",
      chequeNumero: "",
      chequeFirmante: "",
      chequeFechaCobro: "",
      chequeMonto: "",
      impactaVehiculo: "No",
      vehiculoId: "",
    }));
  };

  return (
    <ModalBase title="Registrar gasto" onClose={onClose} maxWidth="max-w-[1500px]">
      <div className="mb-6">
        <p className="mb-3 font-semibold text-[#1a3263]">Tipo de gasto</p>

        <div className="grid overflow-hidden rounded-xl border border-[#acbac4]/50 md:grid-cols-2">
          {["Recurrente", "Único"].map((tipo) => (
            <button key={tipo} type="button" onClick={() => resetTipoGasto(tipo)} className={`px-4 py-3 font-semibold ${form.tipoGasto === tipo ? "bg-orange-50 text-orange-700" : "bg-white text-[#357eb8]"}`}>
              {tipo === "Recurrente" ? "Gasto recurrente" : "Gasto único"}
            </button>
          ))}
        </div>
      </div>

      {form.tipoGasto === "Recurrente" ? (
        <div className="grid gap-5 xl:grid-cols-[minmax(620px,1fr)_520px]">
          <div className="rounded-2xl border border-[#acbac4]/50 bg-[#f8fafc] p-5">
            <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
              <div>
                <h3 className="text-lg font-bold text-[#1a3263]">Gastos recurrentes pendientes</h3>
                <p className="text-sm text-[#357eb8]">Seleccioná uno o varios ítems para pagarlos juntos.</p>
              </div>
              <div className="w-full lg:w-[320px]">
                <SearchInput value={busquedaGasto} onChange={setBusquedaGasto} placeholder="Buscar gasto..." />
              </div>
            </div>

            <div className="grid max-h-[430px] gap-3 overflow-y-auto pr-1 lg:grid-cols-2">
              {gastosFiltrados.map((gasto) => {
                const selected = form.gastosRecurrentesIds?.includes(gasto.id);
                return (
                  <button key={gasto.id} type="button" onClick={() => toggleGastoRecurrente(gasto)} className={`rounded-2xl border p-4 text-left transition ${selected ? "border-orange-300 bg-orange-50 shadow-sm" : "border-[#acbac4]/50 bg-white hover:border-orange-300"}`}>
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-[#1a3263]">{gasto.nombre}</p>
                        <p className="text-sm text-[#357eb8]">{gasto.categoria} · Vence {gasto.vencimiento}</p>
                      </div>
                      {selected && <CheckCircle size={20} className="text-orange-600" />}
                    </div>
                    <p className="text-lg font-bold text-orange-700">{formatCurrency(gasto.monto)}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
            <h3 className="text-lg font-bold text-orange-700">Resumen de pago</h3>
            <p className="mb-4 text-sm text-[#1a3263]">{gastosSeleccionados.length} gasto/s seleccionado/s</p>

            <div className="mb-4 space-y-2">
              {gastosSeleccionados.length === 0 ? (
                <p className="rounded-xl bg-white p-4 text-sm font-semibold text-[#357eb8]">Todavía no seleccionaste gastos recurrentes.</p>
              ) : (
                gastosSeleccionados.map((gasto) => (
                  <div key={gasto.id} className="flex justify-between gap-3 rounded-xl bg-white p-3 text-sm">
                    <span className="font-semibold text-[#1a3263]">{gasto.nombre}</span>
                    <span className="font-bold text-orange-700">{formatCurrency(gasto.monto)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mb-5 rounded-2xl bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[#357eb8]">Total a pagar</p>
              <p className="mt-1 text-2xl font-bold text-[#1a3263]">{formatCurrency(totalSeleccionado)}</p>
            </div>

            <div className="grid gap-4">
              <Input label="Fecha de pago" type="date" value={form.fecha} onChange={(v) => setForm((prev) => ({ ...prev, fecha: v }))} required />
              <SelectBase
                label="Medio de pago"
                value={form.medio}
                onChange={(v) =>
                  setForm((prev) => ({
                    ...prev,
                    medio: v,
                    origenCheque: v.includes("Cheque") ? prev.origenCheque : "",
                    chequeId: v.includes("Cheque") ? prev.chequeId : "",
                    chequeBanco: v.includes("Cheque") ? prev.chequeBanco : "",
                    chequeNumero: v.includes("Cheque") ? prev.chequeNumero : "",
                    chequeFirmante: v.includes("Cheque") ? prev.chequeFirmante : "",
                    chequeFechaCobro: v.includes("Cheque") ? prev.chequeFechaCobro : "",
                    chequeMonto: v.includes("Cheque") ? prev.chequeMonto : "",
                  }))
                }
                options={["Efectivo", "Transferencia", "Cheque propio", "Cheque tercero"]}
                placeholder="Seleccionar medio"
                required
              />
              <SelectBase label="Cuenta" value={form.cuenta} onChange={(v) => setForm((prev) => ({ ...prev, cuenta: v }))} options={usaCheque ? ["Cheques en cartera", "Caja", "Banco Galicia", "Banco Santander", "Mercado Pago"] : ["Caja", "Banco Galicia", "Banco Santander", "Mercado Pago"]} placeholder="Seleccionar cuenta" required />
              {usaCheque && <ChequePaymentBox form={form} setForm={setForm} />}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Concepto del gasto" value={form.concepto} onChange={(v) => setForm((prev) => ({ ...prev, concepto: v }))} placeholder="Ej: Reparación, limpieza..." required />
          <Input label="Importe" value={form.monto} onChange={(v) => setForm((prev) => ({ ...prev, monto: v }))} placeholder="$ 0" required />
          <Input label="Fecha" type="date" value={form.fecha} onChange={(v) => setForm((prev) => ({ ...prev, fecha: v }))} required />
          <SelectBase
            label="Medio de pago"
            value={form.medio}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                medio: v,
                origenCheque: v.includes("Cheque") ? prev.origenCheque : "",
                chequeId: v.includes("Cheque") ? prev.chequeId : "",
                chequeBanco: v.includes("Cheque") ? prev.chequeBanco : "",
                chequeNumero: v.includes("Cheque") ? prev.chequeNumero : "",
                chequeFirmante: v.includes("Cheque") ? prev.chequeFirmante : "",
                chequeFechaCobro: v.includes("Cheque") ? prev.chequeFechaCobro : "",
                chequeMonto: v.includes("Cheque") ? prev.chequeMonto : "",
              }))
            }
            options={["Efectivo", "Transferencia", "Cheque propio", "Cheque tercero"]}
            placeholder="Seleccionar medio"
            required
          />
          <SelectBase label="Cuenta" value={form.cuenta} onChange={(v) => setForm((prev) => ({ ...prev, cuenta: v }))} options={usaCheque ? ["Cheques en cartera", "Caja", "Banco Galicia", "Banco Santander", "Mercado Pago"] : ["Caja", "Banco Galicia", "Banco Santander", "Mercado Pago"]} placeholder="Seleccionar cuenta" required />
          <SelectBase label="¿Impacta en un vehículo?" value={form.impactaVehiculo} onChange={(v) => setForm((prev) => ({ ...prev, impactaVehiculo: v, vehiculoId: v === "No" ? "" : prev.vehiculoId }))} options={["No", "Sí"]} required />

          {usaCheque && <ChequePaymentBox form={form} setForm={setForm} />}
          {form.impactaVehiculo === "Sí" && <SelectBase label="Vehículo asociado" value={form.vehiculoId} onChange={(v) => setForm((prev) => ({ ...prev, vehiculoId: v }))} options={vehiculos.map((vehiculo) => ({ value: vehiculo.id, label: `${vehiculo.nombre} - ${vehiculo.dominio}` }))} placeholder="Seleccionar vehículo" />}
        </div>
      )}

      <ImpactBox color="orange" text={form.tipoGasto === "Recurrente" ? "Gasto recurrente: permite seleccionar varios ítems y pagarlos juntos, incluso con cheques en cartera o cheque cargado en el momento." : form.impactaVehiculo === "Sí" ? "Gasto único con impacto opcional en costo de vehículo." : "Gasto único operativo sin impacto en vehículo."} />
      <ModalActions onClose={onClose} onSave={onSave} saveLabel="Registrar gasto" color="orange" />
    </ModalBase>
  );
}

function ChequePaymentBox({ form, setForm }) {
  const [mostrarModalCheque, setMostrarModalCheque] = useState(false);
  const esChequePropio = form.medio === "Cheque propio";
  const chequesDisponibles = cheques.filter((cheque) => cheque.estado === "En cartera" && (esChequePropio ? cheque.tipo === "Propio" : cheque.tipo === "Tercero"));
  const chequeSeleccionado = cheques.find((cheque) => cheque.id === form.chequeId);
  const tituloCheque = esChequePropio ? "Cheque propio" : "Cheque de tercero";

  const resetCheque = () => ({
    origenCheque: "",
    chequeId: "",
    chequeBanco: "",
    chequeNumero: "",
    chequeFirmante: "",
    chequeFechaCobro: "",
    chequeMonto: "",
  });

  const seleccionarCheque = (chequeId) => {
    const cheque = cheques.find((item) => item.id === chequeId);

    if (!cheque) {
      setForm((prev) => ({ ...prev, ...resetCheque() }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      origenCheque: "cartera",
      chequeId: cheque.id,
      chequeBanco: "",
      chequeNumero: "",
      chequeFirmante: "",
      chequeFechaCobro: "",
      chequeMonto: "",
      monto: String(cheque.monto || ""),
      cuenta: prev.cuenta || "Cheques en cartera",
    }));
  };

  const guardarChequeNuevo = () => {
    const idTemporal = `CH-NUEVO-${Date.now()}`;

    setForm((prev) => ({
      ...prev,
      origenCheque: "nuevo",
      chequeId: idTemporal,
      chequeFirmante: esChequePropio ? prev.chequeFirmante || "Degra Automotores" : prev.chequeFirmante,
      monto: prev.chequeMonto || prev.monto,
      cuenta: prev.cuenta || "Cheques en cartera",
    }));

    setMostrarModalCheque(false);
  };

  const limpiarChequeNuevo = () => {
    setForm((prev) => ({
      ...prev,
      chequeBanco: "",
      chequeNumero: "",
      chequeFirmante: esChequePropio ? "Degra Automotores" : "",
      chequeFechaCobro: "",
      chequeMonto: "",
    }));
  };

  const importeVisible =
    chequeSeleccionado && form.origenCheque === "cartera"
      ? chequeSeleccionado.monto
      : form.chequeMonto
      ? Number(form.chequeMonto)
      : 0;

  return (
    <>
      <div className="rounded-2xl border border-[#acbac4]/40 bg-[#f8fafc] p-4">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_56px_170px] xl:items-end">
          <SelectBase
            label={tituloCheque}
            value={form.origenCheque === "nuevo" ? "" : form.chequeId}
            onChange={seleccionarCheque}
            options={chequesDisponibles.map((cheque) => ({
              value: cheque.id,
              label: `${cheque.banco} · Nº ${cheque.numero}`,
            }))}
            placeholder={chequesDisponibles.length ? "Seleccionar cheque" : "No hay cheques cargados"}
            required={!form.origenCheque}
          />

          <button
            type="button"
            onClick={() => {
              limpiarChequeNuevo();
              setMostrarModalCheque(true);
            }}
            className="flex h-[48px] w-full items-center justify-center rounded-xl bg-[#1a3263] font-bold text-white transition hover:bg-[#14264d] xl:w-[56px]"
            title="Cargar cheque si no está en cartera"
          >
            <Plus size={24} />
          </button>

          <div className="rounded-xl border border-[#acbac4]/30 bg-white px-4 py-3">
            <p className="text-sm font-bold text-[#1a3263]">Importe</p>
            <p className="mt-1 text-lg font-semibold text-[#6b7a90]">{formatCurrency(importeVisible)}</p>
          </div>
        </div>

        {chequeSeleccionado && form.origenCheque === "cartera" && (
          <div className="mt-4 rounded-xl border border-[#acbac4]/30 bg-white px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-[#357eb8]">Cheque seleccionado</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-[#1a3263]">
              {chequeSeleccionado.banco} · Nº {chequeSeleccionado.numero} · {esChequePropio ? "Emisor" : "Firmante"}: {chequeSeleccionado.firmante} · Cobro: {chequeSeleccionado.fechaCobro}
            </p>
          </div>
        )}

        {form.origenCheque === "nuevo" && form.chequeNumero && (
          <div className="mt-4 rounded-xl border border-[#357eb8]/20 bg-white px-4 py-3">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#357eb8]">Cheque cargado manualmente</p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-[#1a3263]">
                  {form.chequeBanco || "Banco sin cargar"} · Nº {form.chequeNumero || "-"} · {esChequePropio ? "Emisor" : "Firmante"}: {form.chequeFirmante || (esChequePropio ? "Degra Automotores" : "-")} · Vencimiento: {form.chequeFechaCobro || "-"}
                </p>
              </div>
              <button type="button" onClick={() => setMostrarModalCheque(true)} className="rounded-lg border border-[#acbac4] px-3 py-2 text-sm font-bold text-[#1a3263] hover:bg-[#f8fafc]">
                Editar
              </button>
            </div>
          </div>
        )}
      </div>

      {mostrarModalCheque && (
        <ModalBase title={`Nuevo ${tituloCheque.toLowerCase()}`} onClose={() => setMostrarModalCheque(false)} maxWidth="max-w-4xl">
          <p className="-mt-4 mb-6 text-lg text-[#357eb8]">Cargá el cheque para aplicarlo como pago.</p>

          <div className="grid gap-5 md:grid-cols-2">
            <Input label="N° cheque" value={form.chequeNumero} onChange={(v) => setForm((prev) => ({ ...prev, chequeNumero: v }))} required />
            <Input label="Banco" value={form.chequeBanco} onChange={(v) => setForm((prev) => ({ ...prev, chequeBanco: v }))} placeholder="Ej: Banco Nación" required />

            {esChequePropio ? (
              <Input label="Emisor" value={form.chequeFirmante || "Degra Automotores"} onChange={(v) => setForm((prev) => ({ ...prev, chequeFirmante: v }))} required />
            ) : (
              <Input label="Firmante / emisor" value={form.chequeFirmante} onChange={(v) => setForm((prev) => ({ ...prev, chequeFirmante: v }))} placeholder="Ej: Juan Pérez" required />
            )}

            <SelectBase label="Tipo" value={esChequePropio ? "Propio" : "Tercero"} onChange={() => {}} options={esChequePropio ? ["Propio"] : ["Tercero"]} />
            <Input label="Vencimiento" type="date" value={form.chequeFechaCobro} onChange={(v) => setForm((prev) => ({ ...prev, chequeFechaCobro: v }))} required />
            <Input label="Monto" value={form.chequeMonto} onChange={(v) => setForm((prev) => ({ ...prev, chequeMonto: v }))} placeholder="$ 0" required />
          </div>

          <div className="mt-6 rounded-xl border border-[#357eb8]/20 bg-[#f8fafc] p-4 text-sm font-semibold text-[#357eb8]">
            {esChequePropio
              ? "Este cheque se registra como propio de la agencia. No requiere cliente asociado."
              : "Este cheque se registra como cheque de tercero para aplicarlo como medio de pago."}
          </div>

          <div className="mt-8 flex flex-col justify-end gap-3 border-t border-[#acbac4]/40 pt-6 sm:flex-row">
            <button onClick={() => setMostrarModalCheque(false)} className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]">Cancelar</button>
            <button onClick={guardarChequeNuevo} className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white transition hover:bg-[#219b8f]">Guardar cheque</button>
          </div>
        </ModalBase>
      )}
    </>
  );
}

function ChequeResumenCard({ items, compact = false }) {
  return (
    <div className={`${compact ? "mt-0" : "mt-4"} rounded-2xl border border-[#acbac4]/30 bg-white p-4`}>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="min-w-0 rounded-xl bg-[#f8fafc] px-3 py-2">
            <p className="text-xs font-bold uppercase tracking-wide text-[#357eb8]">{item.label}</p>
            <p className="mt-1 break-words text-sm font-bold text-[#1a3263]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModalTransferencia({ form, setForm, onClose, onSave }) {
  return (
    <ModalBase title="Transferencia entre cuentas" onClose={onClose} maxWidth="max-w-3xl">
      <div className="grid gap-5 md:grid-cols-2">
        <SelectBase label="Cuenta origen" value={form.proveedor} onChange={(v) => setForm((prev) => ({ ...prev, proveedor: v }))} options={["Caja", "Banco Galicia", "Banco Santander", "Mercado Pago"]} placeholder="Seleccionar cuenta origen" required />
        <SelectBase label="Cuenta destino" value={form.cliente} onChange={(v) => setForm((prev) => ({ ...prev, cliente: v }))} options={["Caja", "Banco Galicia", "Banco Santander", "Mercado Pago"]} placeholder="Seleccionar cuenta destino" required />
        <Input label="Monto" value={form.monto} onChange={(v) => setForm((prev) => ({ ...prev, monto: v }))} placeholder="$ 0" required />
        <Input label="Fecha" type="date" value={form.fecha} onChange={(v) => setForm((prev) => ({ ...prev, fecha: v }))} required />
        <TextareaBase label="Concepto" value={form.concepto} onChange={(v) => setForm((prev) => ({ ...prev, concepto: v }))} placeholder="Transferencia interna" full />
      </div>

      <ImpactBox color="blue" text="Impacto contable: movimiento entre cuentas internas" />
      <ModalActions onClose={onClose} onSave={onSave} saveLabel="Transferir" color="blue" />
    </ModalBase>
  );
}

function DetalleOperacion({ tipo, titulo, subtitulo, totalLabel, pagadoLabel, saldoLabel, total, pagado, saldo, badge, children }) {
  const esCobro = tipo === "Cobro";

  return (
    <div className="rounded-2xl border border-[#acbac4]/50 bg-[#f8fafc] p-5">
      <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
        <div>
          <span className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${esCobro ? "bg-[#26aa9c]/10 text-[#1b7f75]" : "bg-red-50 text-red-700"}`}>{badge}</span>
          <h3 className="text-xl font-bold text-[#1a3263]">{titulo}</h3>
          <p className="text-sm text-[#357eb8]">{subtitulo}</p>
        </div>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <OperacionMontoCard label={totalLabel} value={total} />
        <OperacionMontoCard label={pagadoLabel} value={pagado} />
        <OperacionMontoCard label={saldoLabel} value={saldo} highlight />
      </div>

      <div className="rounded-2xl bg-white p-5">{children}</div>
    </div>
  );
}

function VentaCard({ venta, selected, onClick }) {
  const saldo = venta.total - venta.pagado;

  return (
    <button type="button" onClick={onClick} className={`w-full rounded-2xl border p-4 text-left transition ${selected ? "border-[#26aa9c] bg-[#26aa9c]/10 shadow-sm" : "border-[#acbac4]/50 bg-white hover:border-[#357eb8]"}`}>
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-[#1a3263]">{venta.id}</p>
          <p className="text-sm text-[#357eb8]">{venta.fecha}</p>
        </div>
        {selected && <CheckCircle size={19} className="text-[#26aa9c]" />}
      </div>
      <p className="text-sm font-semibold text-[#1a3263]">{venta.vehiculo}</p>
      <div className="mt-3 flex justify-between text-sm">
        <span className="text-[#357eb8]">Saldo</span>
        <span className="font-bold text-[#1a3263]">{formatCurrency(saldo)}</span>
      </div>
    </button>
  );
}

function CompraCard({ compra, selected, onClick }) {
  const saldo = compra.total - compra.pagado;

  return (
    <button type="button" onClick={onClick} className={`w-full rounded-2xl border p-4 text-left transition ${selected ? "border-red-300 bg-red-50 shadow-sm" : "border-[#acbac4]/50 bg-white hover:border-red-300"}`}>
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-[#1a3263]">{compra.id}</p>
          <p className="text-sm text-[#357eb8]">{compra.factura}</p>
        </div>
        {selected && <CheckCircle size={19} className="text-red-600" />}
      </div>
      <p className="text-sm font-semibold text-[#1a3263]">{compra.concepto}</p>
      <div className="mt-3 flex justify-between text-sm">
        <span className="text-[#357eb8]">Saldo</span>
        <span className="font-bold text-[#1a3263]">{formatCurrency(saldo)}</span>
      </div>
    </button>
  );
}

function OperacionMontoCard({ label, value, highlight = false }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? "border-[#26aa9c]/30 bg-[#26aa9c]/10" : "border-[#acbac4]/40 bg-white"}`}>
      <p className="text-xs font-bold uppercase tracking-wide text-[#357eb8]">{label}</p>
      <p className={`mt-1 text-lg font-bold ${highlight ? "text-[#1b7f75]" : "text-[#1a3263]"}`}>{formatCurrency(value)}</p>
    </div>
  );
}

function FinancialCard({ card, onClick }) {
  const Icon = card.icon;

  const styles = {
    green: "bg-[#26aa9c]/10 text-[#1b7f75]",
    blue: "bg-[#357eb8]/10 text-[#245f91]",
    red: "bg-red-50 text-red-700",
    orange: "bg-orange-50 text-orange-700",
    purple: "bg-purple-50 text-purple-700",
    emerald: "bg-emerald-50 text-emerald-700",
  };

  return (
    <button type="button" onClick={onClick} className="rounded-2xl border border-[#acbac4]/40 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles[card.color]}`}>
          <Icon size={24} />
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-bold text-[#357eb8]">
          Ver detalle <ChevronRight size={14} />
        </span>
      </div>

      <p className="text-sm font-semibold text-[#357eb8]">{card.title}</p>
      <p className="mt-1 text-2xl font-bold text-[#1a3263]">{card.currency === "USD" ? formatUSD(card.value) : formatCurrency(card.value)}</p>
      <p className="mt-2 text-sm text-[#6b7a90]">{card.subtitle}</p>
    </button>
  );
}

function DetailDrawer({ card, onClose }) {
  const [busqueda, setBusqueda] = useState("");
  const itemsFiltrados = card.items.filter((item) => Object.values(item).join(" ").toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/40">
      <aside className="h-full w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#357eb8]">Detalle financiero</p>
            <h2 className="text-2xl font-bold text-[#1a3263]">{card.title}</h2>
            <p className="text-[#357eb8]">{card.currency === "USD" ? formatUSD(card.value) : formatCurrency(card.value)}</p>
          </div>

          <button onClick={onClose} className="rounded-full p-2 hover:bg-[#acbac4]/20">
            <X size={22} className="text-[#1a3263]" />
          </button>
        </div>

        <div className="mb-5">
          <SearchInput value={busqueda} onChange={setBusqueda} placeholder="Buscar..." />
        </div>

        <div className="space-y-3">
          {itemsFiltrados.map((item, index) => (
            <div key={item.id || index} className="rounded-2xl border border-[#acbac4]/40 bg-[#f8fafc] p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-[#1a3263]">{item.cliente || item.proveedor || item.cuenta || item.banco || item.nombre || item.concepto || item.id}</p>
                  <p className="text-sm text-[#357eb8]">{item.fecha || item.fechaCobro || item.vencimiento || "Sin fecha"}</p>
                </div>

                <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-[#1a3263]">{item.estado || item.tipo || item.categoria || "Detalle"}</span>
              </div>

              <div className="grid gap-2 text-sm text-[#1a3263]">
                {item.numero && <InfoRow label="Nro. cheque" value={item.numero} />}
                {item.firmante && <InfoRow label="Firmante" value={item.firmante} />}
                {item.fechaCobro && <InfoRow label="Fecha de cobro" value={item.fechaCobro} />}
                {item.factura && <InfoRow label="Factura" value={item.factura} />}
                {item.vehiculo && <InfoRow label="Vehículo" value={item.vehiculo} />}
                {item.banco && <InfoRow label="Banco" value={item.banco} />}
                {item.monto && <InfoRow label="Importe" value={card.currency === "USD" ? formatUSD(item.monto) : formatCurrency(item.monto)} />}
              </div>
            </div>
          ))}

          {itemsFiltrados.length === 0 && <EmptyState text="No se encontraron registros." />}
        </div>
      </aside>
    </div>
  );
}

function ModalBase({ title, children, onClose, maxWidth = "max-w-4xl" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 md:p-6">
      <div className={`my-6 max-h-none w-full ${maxWidth} rounded-2xl bg-white p-5 shadow-xl md:p-8`}>
        <div className="mb-6 flex items-start justify-between">
          <h2 className="text-2xl font-bold text-[#1a3263]">{title}</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-[#acbac4]/20">
            <X size={22} className="text-[#1a3263]" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function OptionCard({ icon: Icon, title, description, color, onClick }) {
  const styles = {
    green: "border-[#26aa9c]/40 bg-[#26aa9c]/10 text-[#1b7f75]",
    red: "border-red-200 bg-red-50 text-red-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    blue: "border-[#357eb8]/40 bg-[#357eb8]/10 text-[#245f91]",
  };

  return (
    <button onClick={onClick} className={`rounded-2xl border p-5 text-left transition hover:scale-[1.01] ${styles[color]}`}>
      <Icon size={28} />
      <p className="mt-3 font-bold">{title}</p>
      <p className="mt-1 text-sm">{description}</p>
    </button>
  );
}

function SearchInput({ value = "", onChange = () => {}, placeholder = "Buscar..." }) {
  return (
    <div className="flex h-[48px] items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4">
      <Search size={18} className="shrink-0 text-[#357eb8]" />
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full min-w-0 outline-none placeholder:text-[#acbac4]" placeholder={placeholder} autoComplete="off" />
    </div>
  );
}

function Input({ label, value, onChange, placeholder = "", type = "text", required = false }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block font-semibold text-[#1a3263]">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="input-base w-full" autoComplete="off" />
    </label>
  );
}

function SelectBase({ label, value, onChange, options, placeholder, required = false, full = false }) {
  return (
    <label className={`block min-w-0 ${full ? "lg:col-span-2" : ""}`}>
      <span className="mb-1 block font-semibold text-[#1a3263]">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <select value={value || ""} onChange={(e) => onChange(e.target.value)} className="input-base w-full">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) =>
          typeof option === "string" ? (
            <option key={option} value={option}>{option}</option>
          ) : (
            <option key={option.value} value={option.value}>{option.label}</option>
          )
        )}
      </select>
    </label>
  );
}

function TextareaBase({ label, value, onChange, placeholder, required = false, full = false }) {
  return (
    <label className={`block min-w-0 ${full ? "lg:col-span-2" : ""}`}>
      <span className="mb-1 block font-semibold text-[#1a3263]">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <textarea rows="3" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="input-base w-full" autoComplete="off" />
    </label>
  );
}

function ImpactBox({ color, text }) {
  const styles = {
    green: "border-[#26aa9c]/30 bg-[#26aa9c]/10 text-[#1b7f75]",
    red: "border-red-200 bg-red-50 text-red-700",
    orange: "border-orange-200 bg-orange-50 text-orange-600",
    blue: "border-[#357eb8]/30 bg-[#357eb8]/10 text-[#245f91]",
  };

  return <div className={`mt-6 rounded-xl border p-4 font-bold ${styles[color]}`}>{text}</div>;
}

function ModalActions({ onClose, onSave, saveLabel, color }) {
  const colors = {
    green: "bg-[#26aa9c] hover:bg-[#219b8f]",
    red: "bg-red-600 hover:bg-red-700",
    orange: "bg-orange-500 hover:bg-orange-600",
    blue: "bg-[#357eb8] hover:bg-[#2f6ea0]",
  };

  return (
    <div className="mt-8 flex flex-col justify-end gap-3 border-t border-[#acbac4]/40 pt-6 sm:flex-row">
      <button onClick={onClose} className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]">Cancelar</button>
      <button onClick={onSave} className={`rounded-xl px-5 py-3 font-semibold text-white ${colors[color]}`}>{saveLabel}</button>
    </div>
  );
}

function TableSubHeader({ label, type }) {
  return (
    <th className="min-w-[130px] p-3 text-center text-xs font-bold uppercase tracking-wide">
      <span className={type === "ingreso" ? "text-[#9ee9dd]" : "text-red-100"}>{label}</span>
    </th>
  );
}

function AmountCell({ active, value, moneda = "ARS", type }) {
  if (!active) {
    return <td className="border-b border-[#acbac4]/25 p-4 text-center text-[#acbac4]">—</td>;
  }

  const style = type === "ingreso" ? "border-[#26aa9c]/30 bg-[#26aa9c]/10 text-[#1b7f75]" : "border-red-200 bg-red-50 text-red-700";

  return (
    <td className="border-b border-[#acbac4]/25 p-4 text-right">
      <span className={`inline-flex rounded-xl border px-3 py-2 font-bold ${style}`}>{formatMovimiento(value, moneda)}</span>
    </td>
  );
}

function TotalAmountCell({ value, moneda = "ARS", type }) {
  const style = type === "ingreso" ? "bg-[#26aa9c]/10 text-[#1b7f75]" : "bg-red-50 text-red-700";

  return <td className={`border-t-2 border-[#1a3263] p-4 text-right font-bold ${style}`}>{formatMovimiento(value, moneda)}</td>;
}

function MiniTotalCard({ title, value, type }) {
  const style = type === "ingreso" ? "border-[#26aa9c]/30 bg-[#26aa9c]/10 text-[#1b7f75]" : "border-red-200 bg-red-50 text-red-700";

  return (
    <div className={`rounded-2xl border px-5 py-3 ${style}`}>
      <p className="text-xs font-bold uppercase tracking-wide">{title}</p>
      <p className="mt-1 text-xl font-bold">{formatCurrency(value)}</p>
    </div>
  );
}

function ResumenMedioCard({ label, ingreso, egreso, moneda = "ARS" }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/30 bg-[#f8fafc] p-4">
      <div className="mb-3 flex items-center gap-2">
        <Wallet size={17} className="text-[#357eb8]" />
        <p className="font-bold text-[#1a3263]">{label}</p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between gap-3">
          <span className="font-semibold text-[#1b7f75]">Debe</span>
          <span className="font-bold text-[#1b7f75]">{formatMovimiento(ingreso, moneda)}</span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="font-semibold text-red-700">Haber</span>
          <span className="font-bold text-red-700">{formatMovimiento(egreso, moneda)}</span>
        </div>
      </div>
    </div>
  );
}

function MedioPill({ medio }) {
  const styles = {
    Dolares: "bg-emerald-50 text-emerald-700",
    Efectivo: "bg-[#26aa9c]/10 text-[#1b7f75]",
    Cheques: "bg-purple-50 text-purple-700",
    Transferencias: "bg-[#357eb8]/10 text-[#245f91]",
    Otros: "bg-orange-50 text-orange-700",
  };

  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${styles[medio] || styles.Otros}`}>{medio}</span>;
}

function TipoBadge({ tipo }) {
  const styles = {
    Cobro: "bg-[#26aa9c]/15 text-[#1b7f75]",
    Pago: "bg-red-100 text-red-700",
    Gasto: "bg-orange-100 text-orange-700",
    Transferencia: "bg-[#357eb8]/15 text-[#245f91]",
  };

  return <span className={`rounded-lg px-3 py-1 text-sm font-semibold ${styles[tipo]}`}>{tipo}</span>;
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-[#357eb8]">{label}</span>
      <span className="font-bold text-[#1a3263]">{value}</span>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#acbac4] bg-[#f8fafc] p-8 text-center">
      <Eye size={34} className="mb-3 text-[#357eb8]" />
      <p className="max-w-md font-semibold text-[#1a3263]">{text}</p>
    </div>
  );
}

function normalizarMedio(medio) {
  if (!medio) return "Otros";

  const value = medio.toLowerCase();

  if (value.includes("dolar") || value.includes("dólar") || value.includes("usd")) return "Dolares";
  if (value.includes("efectivo")) return "Efectivo";
  if (value.includes("cheque")) return "Cheques";
  if (value.includes("transferencia")) return "Transferencias";

  return "Otros";
}

function totalGrupo(data) {
  return Object.values(data).reduce((acc, value) => acc + Number(value || 0), 0);
}

function formatMovimiento(value, moneda) {
  if (!value) return "-";
  if (moneda === "USD") return formatUSD(value);
  return formatCurrency(value);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatUSD(value) {
  return `USD ${new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 0,
  }).format(value || 0)}`;
}

function convertirFechaISO(fechaDDMMYYYY) {
  if (!fechaDDMMYYYY) return "";
  const [dd, mm, yyyy] = fechaDDMMYYYY.split("/");
  return `${yyyy}-${mm}-${dd}`;
}
