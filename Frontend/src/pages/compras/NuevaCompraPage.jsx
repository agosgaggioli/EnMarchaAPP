import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  X,
  Save,
  Building2,
  Car,
  CircleDollarSign,
  Trash2,
  Banknote,
  ReceiptText,
} from "lucide-react";

const proveedoresIniciales = [
  "Toyota Argentina",
  "Volkswagen Oficial",
  "Chevent SA",
  "Marwan Capital Autos",
];

const chequesTercerosIniciales = [
  {
    id: "CHT001",
    numero: "33565120",
    emisor: "TMSA",
    cliente: "Ariel Gaitán",
    banco: "Físico",
    vencimiento: "2026-06-20",
    monto: 1755028,
  },
  {
    id: "CHT002",
    numero: "9543",
    emisor: "Caminos al Puerto SRL",
    cliente: "Villareal Darío",
    banco: "Físico",
    vencimiento: "2026-08-30",
    monto: 1358510,
  },
];

const formInicial = {
  proveedor: "",
  tipoCompra: "0km",
  marca: "",
  modelo: "",
  version: "",
  dominio: "",
  anio: "",
  color: "",
  kilometros: "",
  montoCompra: "",
  observaciones: "",
};

const pagoInicial = {
  medio: "Efectivo",
  importe: "",
  detalle: "",
  chequeId: "",
  cantidadUsd: "",
  cotizacionUsd: "",
};

const caucionInicial = {
  importe: "",
  vencimiento: "",
  observacion: "",
};

export default function NuevaCompraPage() {
  const navigate = useNavigate();

  const [proveedores, setProveedores] = useState(proveedoresIniciales);
  const [chequesTerceros, setChequesTerceros] = useState(
    chequesTercerosIniciales
  );

  const [showProveedorModal, setShowProveedorModal] = useState(false);
  const [showChequeModal, setShowChequeModal] = useState(false);

  const [form, setForm] = useState(formInicial);
  const [pagos, setPagos] = useState([]);
  const [pagoForm, setPagoForm] = useState(pagoInicial);
  const [cauciones, setCauciones] = useState([]);
  const [caucionForm, setCaucionForm] = useState(caucionInicial);

  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: "",
    cuit: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const [nuevoCheque, setNuevoCheque] = useState({
    numero: "",
    emisor: "",
    cliente: "",
    banco: "Físico",
    vencimiento: "",
    monto: "",
  });

  const totalPagado = useMemo(
    () => pagos.reduce((acc, item) => acc + Number(item.importe || 0), 0),
    [pagos]
  );

  const totalUsd = useMemo(
    () =>
      pagos
        .filter((item) => item.medio === "USD")
        .reduce((acc, item) => acc + Number(item.cantidadUsd || 0), 0),
    [pagos]
  );

  const totalCaucion = useMemo(
    () => cauciones.reduce((acc, item) => acc + Number(item.importe || 0), 0),
    [cauciones]
  );

  const montoCompra = Number(form.montoCompra || 0);

  // El cheque en caución NO descuenta saldo porque todavía no se pagó.
  const saldoPendiente = Math.max(montoCompra - totalPagado, 0);

  const porcentajeCubierto = montoCompra
    ? Math.min((totalPagado / montoCompra) * 100, 100)
    : 0;

  const guardarProveedor = () => {
    if (!nuevoProveedor.nombre.trim()) return;

    setProveedores([...proveedores, nuevoProveedor.nombre]);
    setForm({ ...form, proveedor: nuevoProveedor.nombre });

    setNuevoProveedor({
      nombre: "",
      cuit: "",
      telefono: "",
      email: "",
      direccion: "",
    });

    setShowProveedorModal(false);
  };

  const agregarPago = () => {
    if (pagoForm.medio === "USD") {
      if (!pagoForm.cantidadUsd || !pagoForm.cotizacionUsd) return;
    } else {
      if (!pagoForm.importe) return;
    }

    const chequeSeleccionado = chequesTerceros.find(
      (cheque) => cheque.id === pagoForm.chequeId
    );

    const importeFinal =
      pagoForm.medio === "USD"
        ? Number(pagoForm.cantidadUsd || 0) *
          Number(pagoForm.cotizacionUsd || 0)
        : Number(pagoForm.importe || 0);

    const nuevoPago = {
      id: `PAG${Date.now()}`,
      ...pagoForm,
      importe: importeFinal,
      cheque:
        pagoForm.medio === "Cheque de tercero" ? chequeSeleccionado : null,
    };

    setPagos([...pagos, nuevoPago]);
    setPagoForm(pagoInicial);
  };

  const eliminarPago = (id) => {
    setPagos(pagos.filter((pago) => pago.id !== id));
  };

  const agregarCaucion = () => {
    if (!caucionForm.importe || !caucionForm.vencimiento) return;

    const nuevaCaucion = {
      id: `CAU${Date.now()}`,
      ...caucionForm,
      importe: Number(caucionForm.importe),
    };

    setCauciones([...cauciones, nuevaCaucion]);
    setCaucionForm(caucionInicial);
  };

  const eliminarCaucion = (id) => {
    setCauciones(cauciones.filter((item) => item.id !== id));
  };

  const guardarChequeTercero = () => {
    if (!nuevoCheque.numero || !nuevoCheque.emisor || !nuevoCheque.monto) return;

    const cheque = {
      id: `CHT${Date.now()}`,
      ...nuevoCheque,
      monto: Number(nuevoCheque.monto),
    };

    setChequesTerceros([cheque, ...chequesTerceros]);

    setPagoForm({
      ...pagoForm,
      medio: "Cheque de tercero",
      chequeId: cheque.id,
      importe: cheque.monto,
      detalle: `${cheque.numero} - ${cheque.emisor}`,
      cantidadUsd: "",
      cotizacionUsd: "",
    });

    setNuevoCheque({
      numero: "",
      emisor: "",
      cliente: "",
      banco: "Físico",
      vencimiento: "",
      monto: "",
    });

    setShowChequeModal(false);
  };

  const guardarCompra = () => {
    const compra = {
      ...form,
      pagos,
      cauciones,
      totalPagado,
      totalUsd,
      totalCaucion,
      saldoPendiente,
    };

    console.log("Compra guardada:", compra);
    navigate("/compras");
  };

  return (
    <section className="min-h-screen w-full bg-[#f4f7fb] px-1 pb-10">
      <button
        onClick={() => navigate("/compras")}
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#357eb8] hover:underline"
      >
        <ArrowLeft size={17} />
        Volver a compras
      </button>

      <div className="mb-6 rounded-3xl border border-[#dbe4ee] bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <span className="mb-3 inline-flex rounded-full bg-[#357eb8]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#357eb8]">
              Compras
            </span>

            <h1 className="text-3xl font-bold text-[#1a3263]">
              Nueva compra
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-[#357eb8]">
              Cargá la operación, los pagos iniciales y los compromisos a plazo.
            </p>
          </div>

          <button
            onClick={guardarCompra}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#26aa9c] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#219b8f]"
          >
            <Save size={18} />
            Guardar compra
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <Card
            title="Datos de la compra"
            subtitle="Información principal de la operación."
            icon={Building2}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#1a3263]">
                  Proveedor / vendedor
                </span>

                <div className="flex gap-2">
                  <select
                    value={form.proveedor}
                    onChange={(e) =>
                      setForm({ ...form, proveedor: e.target.value })
                    }
                    className="input-base"
                  >
                    <option value="">Seleccionar proveedor</option>
                    {proveedores.map((proveedor) => (
                      <option key={proveedor}>{proveedor}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => setShowProveedorModal(true)}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1a3263] text-white transition hover:bg-[#14264c]"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </label>

              <Select
                label="Tipo de compra"
                value={form.tipoCompra}
                onChange={(value) => setForm({ ...form, tipoCompra: value })}
                options={["0km", "Usado"]}
              />

              <Input
                label="Monto de compra"
                type="number"
                value={form.montoCompra}
                onChange={(value) => setForm({ ...form, montoCompra: value })}
                placeholder="$ 0"
              />
            </div>
          </Card>

          <Card
            title="Datos del vehículo"
            subtitle="Información de la unidad."
            icon={Car}
          >
            <div className="grid gap-5 md:grid-cols-3">
              <Input
                label="Marca"
                value={form.marca}
                onChange={(value) => setForm({ ...form, marca: value })}
              />

              <Input
                label="Modelo"
                value={form.modelo}
                onChange={(value) => setForm({ ...form, modelo: value })}
              />

              <Input
                label="Versión"
                value={form.version}
                onChange={(value) => setForm({ ...form, version: value })}
              />

              <Input
                label="Dominio"
                value={form.dominio}
                onChange={(value) => setForm({ ...form, dominio: value })}
              />

              <Input
                label="Año"
                value={form.anio}
                onChange={(value) => setForm({ ...form, anio: value })}
              />

              <Input
                label="Color"
                value={form.color}
                onChange={(value) => setForm({ ...form, color: value })}
              />

              <Input
                label="Kilómetros"
                value={form.kilometros}
                onChange={(value) => setForm({ ...form, kilometros: value })}
              />
            </div>
          </Card>

          <Card
            title="Pagos al cargar la compra"
            subtitle="Pagos aplicados al momento de registrar la operación."
            icon={Banknote}
          >
            <div className="rounded-2xl border border-[#dbe4ee] bg-[#f8fafc] p-5">
              <div
                className={`grid items-end gap-4 ${
                  pagoForm.medio === "USD"
                    ? "md:grid-cols-[1fr_1fr_1fr_auto]"
                    : "md:grid-cols-[1fr_1.6fr_1fr_auto]"
                }`}
              >
                <Select
                  label="Medio de pago"
                  value={pagoForm.medio}
                  onChange={(value) =>
                    setPagoForm({
                      ...pagoForm,
                      medio: value,
                      chequeId: "",
                      importe: "",
                      detalle: "",
                      cantidadUsd: "",
                      cotizacionUsd: "",
                    })
                  }
                  options={[
                    "Efectivo",
                    "Transferencia",
                    "Cheque de tercero",
                    "USD",
                    "Otro",
                  ]}
                />

                {pagoForm.medio === "Cheque de tercero" ? (
                  <label className="block min-w-0">
                    <span className="mb-1 block text-sm font-semibold text-[#1a3263]">
                      Cheque de tercero
                    </span>

                    <div className="grid grid-cols-[1fr_auto] gap-2">
                      <select
                        value={pagoForm.chequeId}
                        onChange={(e) => {
                          const cheque = chequesTerceros.find(
                            (item) => item.id === e.target.value
                          );

                          setPagoForm({
                            ...pagoForm,
                            chequeId: e.target.value,
                            importe: cheque ? cheque.monto : "",
                            detalle: cheque
                              ? `${cheque.numero} - ${cheque.emisor}`
                              : "",
                            cantidadUsd: "",
                            cotizacionUsd: "",
                          });
                        }}
                        className="h-12 w-full rounded-xl border border-[#acbac4]/70 bg-white px-4 text-sm font-medium text-[#1a3263] outline-none transition focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
                      >
                        <option value="">Seleccionar cheque</option>

                        {chequesTerceros.map((cheque) => (
                          <option key={cheque.id} value={cheque.id}>
                            {cheque.numero} - {cheque.emisor} -{" "}
                            {formatMoney(cheque.monto)}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => setShowChequeModal(true)}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a3263] text-white transition hover:bg-[#14264c]"
                        title="Cargar cheque de tercero"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </label>
                ) : pagoForm.medio === "USD" ? (
                  <>
                    <Input
                      label="Cantidad USD"
                      type="number"
                      value={pagoForm.cantidadUsd}
                      onChange={(value) =>
                        setPagoForm({
                          ...pagoForm,
                          cantidadUsd: value,
                          importe:
                            Number(value || 0) *
                            Number(pagoForm.cotizacionUsd || 0),
                        })
                      }
                      placeholder="USD 0"
                    />

                    <Input
                      label="Cotización"
                      type="number"
                      value={pagoForm.cotizacionUsd}
                      onChange={(value) =>
                        setPagoForm({
                          ...pagoForm,
                          cotizacionUsd: value,
                          importe:
                            Number(pagoForm.cantidadUsd || 0) *
                            Number(value || 0),
                        })
                      }
                      placeholder="$ 0"
                    />
                  </>
                ) : (
                  <Input
                    label="Detalle"
                    value={pagoForm.detalle}
                    onChange={(value) =>
                      setPagoForm({
                        ...pagoForm,
                        detalle: value,
                      })
                    }
                    placeholder="Ej: transferencia"
                  />
                )}

                {pagoForm.medio !== "USD" && (
                  <Input
                    label="Importe"
                    type="number"
                    value={pagoForm.importe}
                    onChange={(value) =>
                      setPagoForm({
                        ...pagoForm,
                        importe: value,
                      })
                    }
                    placeholder="$ 0"
                  />
                )}

                <button
                  type="button"
                  onClick={agregarPago}
                  className="h-12 rounded-xl bg-[#26aa9c] px-6 font-semibold text-white transition hover:bg-[#219b8f]"
                >
                  Agregar
                </button>
              </div>

              {pagoForm.medio === "USD" && (
                <div className="mt-4 rounded-2xl border border-[#dbe4ee] bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#357eb8]">
                    Total pesificado
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-[#1a3263]">
                    {formatMoney(pagoForm.importe)}
                  </p>
                </div>
              )}
            </div>

            <ListadoSimple
              items={pagos}
              empty="Todavía no se cargaron pagos."
              renderItem={(pago) => (
                <>
                  <div>
                    <span className="mb-1 inline-flex rounded-full bg-[#26aa9c]/10 px-3 py-1 text-xs font-bold text-[#168f82]">
                      {pago.medio}
                    </span>

                    <p className="text-sm text-[#357eb8]">
                      {pago.medio === "USD"
                        ? `Cotización: ${formatMoney(pago.cotizacionUsd)}`
                        : pago.cheque
                          ? `Cheque ${pago.cheque.numero} - ${pago.cheque.emisor}`
                          : pago.detalle || "-"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      {pago.medio === "USD" && (
                        <p className="text-xs font-bold text-[#357eb8]">
                          {formatUsd(pago.cantidadUsd)}
                        </p>
                      )}

                      <p className="font-bold text-[#1a3263]">
                        {formatMoney(pago.importe)}
                      </p>
                    </div>

                    <button
                      onClick={() => eliminarPago(pago.id)}
                      className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            />
          </Card>

          <Card
            title="Cheques en caución"
            subtitle="Compromisos futuros de pago. No descuentan el saldo hasta ser abonados."
            icon={ReceiptText}
          >
            <div className="rounded-2xl border border-[#dbe4ee] bg-[#f8fafc] p-4">
              <div className="grid gap-5 md:grid-cols-[1fr_1fr_1fr_auto]">
                <Input
                  label="Importe"
                  type="number"
                  value={caucionForm.importe}
                  onChange={(value) =>
                    setCaucionForm({
                      ...caucionForm,
                      importe: value,
                    })
                  }
                />

                <Input
                  label="Fecha a levantar"
                  type="date"
                  value={caucionForm.vencimiento}
                  onChange={(value) =>
                    setCaucionForm({
                      ...caucionForm,
                      vencimiento: value,
                    })
                  }
                />

                <Input
                  label="Observación"
                  value={caucionForm.observacion}
                  onChange={(value) =>
                    setCaucionForm({
                      ...caucionForm,
                      observacion: value,
                    })
                  }
                />

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={agregarCaucion}
                    className="h-12 rounded-xl bg-[#1a3263] px-5 font-semibold text-white transition hover:bg-[#14264c]"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>

            <ListadoSimple
              items={cauciones}
              empty="No hay cheques en caución cargados."
              renderItem={(item) => (
                <>
                  <div>
                    <span className="mb-1 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                      Compromiso futuro
                    </span>

                    <p className="font-bold text-[#1a3263]">
                      A levantar el {item.vencimiento}
                    </p>

                    <p className="text-sm text-[#357eb8]">
                      {item.observacion || "-"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="font-bold text-[#1a3263]">
                      {formatMoney(item.importe)}
                    </p>

                    <button
                      onClick={() => eliminarCaucion(item.id)}
                      className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            />
          </Card>

          <Card title="Observaciones">
            <textarea
              rows="5"
              value={form.observaciones}
              onChange={(e) =>
                setForm({ ...form, observaciones: e.target.value })
              }
              className="input-base"
              placeholder="Ej: unidad pendiente de retirar, documentación a revisar, coordinar búsqueda..."
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Resumen de operación" icon={CircleDollarSign}>
            <div className="mb-5 grid gap-3">
              <MiniResumen
                label="Monto compra"
                value={formatMoney(form.montoCompra)}
                tone="blue"
              />

              <MiniResumen
                label="Pagado"
                value={formatMoney(totalPagado)}
                tone="green"
              />

              <MiniResumen
                label="USD cargados"
                value={formatUsd(totalUsd)}
                tone="blue"
              />

              <MiniResumen
                label="Caución"
                value={formatMoney(totalCaucion)}
                tone="amber"
              />

              <MiniResumen
                label="Pendiente"
                value={formatMoney(saldoPendiente)}
                tone="dark"
              />
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-[#1a3263]">
                  Operación pagada
                </span>

                <span className="font-bold text-[#26aa9c]">
                  {porcentajeCubierto.toFixed(0)}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[#dbe4ee]">
                <div
                  className="h-full rounded-full bg-[#26aa9c]"
                  style={{ width: `${porcentajeCubierto}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <ResumenItem label="Proveedor" value={form.proveedor || "-"} />

              <ResumenItem
                label="Unidad"
                value={`${form.marca || "-"} ${form.modelo || ""} ${
                  form.version || ""
                }`}
              />

              <ResumenItem label="Tipo" value={form.tipoCompra} />

              <ResumenItem label="Dominio" value={form.dominio || "-"} />

              <ResumenItem
                label="Saldo pendiente"
                value={formatMoney(saldoPendiente)}
                strong
              />
            </div>
          </Card>
        </div>
      </div>

      {showProveedorModal && (
        <ProveedorModal
          nuevoProveedor={nuevoProveedor}
          setNuevoProveedor={setNuevoProveedor}
          onClose={() => setShowProveedorModal(false)}
          onSave={guardarProveedor}
        />
      )}

      {showChequeModal && (
        <ChequeModal
          nuevoCheque={nuevoCheque}
          setNuevoCheque={setNuevoCheque}
          onClose={() => setShowChequeModal(false)}
          onSave={guardarChequeTercero}
        />
      )}
    </section>
  );
}

function Card({ title, subtitle, icon: Icon, children }) {
  return (
    <div className="rounded-3xl border border-[#dbe4ee] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#357eb8]/10 text-[#357eb8]">
            <Icon size={22} />
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold text-[#1a3263]">{title}</h2>

          {subtitle && (
            <p className="mt-1 text-sm text-[#357eb8]">{subtitle}</p>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

function Input({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-[#1a3263]">
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

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-[#1a3263]">
        {label}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-[#acbac4]/70 bg-white px-4 text-sm font-medium text-[#1a3263] outline-none transition focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function MiniResumen({ label, value, tone }) {
  const styles = {
    blue: "bg-[#357eb8]/10 text-[#357eb8]",
    green: "bg-[#26aa9c]/10 text-[#168f82]",
    amber: "bg-yellow-50 text-yellow-700",
    dark: "bg-[#1a3263]/10 text-[#1a3263]",
  };

  return (
    <div className={`rounded-2xl p-4 ${styles[tone]}`}>
      <p className="text-xs font-bold uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-lg font-extrabold">{value}</p>
    </div>
  );
}

function ResumenItem({ label, value, strong }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#dbe4ee] pb-3">
      <p className="text-sm text-[#357eb8]">{label}</p>

      <p
        className={`text-right font-bold ${
          strong ? "text-[#26aa9c]" : "text-[#1a3263]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ListadoSimple({ items, empty, renderItem }) {
  if (!items.length) {
    return (
      <div className="mt-5 rounded-2xl border border-dashed border-[#acbac4] bg-[#f8fafc] p-4 text-sm text-[#357eb8]">
        {empty}
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-4 rounded-2xl border border-[#dbe4ee] bg-white px-4 py-3 shadow-sm"
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

function Modal({ title, description, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1a3263]">{title}</h2>
            <p className="text-[#357eb8]">{description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-[#acbac4]/20"
          >
            <X size={22} className="text-[#1a3263]" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function ModalActions({ onClose, onSave, saveText }) {
  return (
    <div className="mt-8 flex justify-end gap-3 border-t border-[#dbe4ee] pt-6">
      <button
        type="button"
        onClick={onClose}
        className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
      >
        Cancelar
      </button>

      <button
        type="button"
        onClick={onSave}
        className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white transition hover:bg-[#219b8f]"
      >
        {saveText}
      </button>
    </div>
  );
}

function ProveedorModal({
  nuevoProveedor,
  setNuevoProveedor,
  onClose,
  onSave,
}) {
  return (
    <Modal
      title="Nuevo proveedor"
      description="Alta rápida para asociarlo a la compra."
      onClose={onClose}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Nombre / razón social"
          value={nuevoProveedor.nombre}
          onChange={(value) =>
            setNuevoProveedor({ ...nuevoProveedor, nombre: value })
          }
        />

        <Input
          label="CUIT"
          value={nuevoProveedor.cuit}
          onChange={(value) =>
            setNuevoProveedor({ ...nuevoProveedor, cuit: value })
          }
        />

        <Input
          label="Teléfono"
          value={nuevoProveedor.telefono}
          onChange={(value) =>
            setNuevoProveedor({ ...nuevoProveedor, telefono: value })
          }
        />

        <Input
          label="Email"
          value={nuevoProveedor.email}
          onChange={(value) =>
            setNuevoProveedor({ ...nuevoProveedor, email: value })
          }
        />

        <Input
          label="Dirección"
          value={nuevoProveedor.direccion}
          onChange={(value) =>
            setNuevoProveedor({ ...nuevoProveedor, direccion: value })
          }
        />
      </div>

      <ModalActions
        onClose={onClose}
        onSave={onSave}
        saveText="Crear proveedor"
      />
    </Modal>
  );
}

function ChequeModal({ nuevoCheque, setNuevoCheque, onClose, onSave }) {
  return (
    <Modal
      title="Nuevo cheque de tercero"
      description="Cargá el cheque para aplicarlo como pago."
      onClose={onClose}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="N° cheque"
          value={nuevoCheque.numero}
          onChange={(value) =>
            setNuevoCheque({ ...nuevoCheque, numero: value })
          }
        />

        <Input
          label="Emisor"
          value={nuevoCheque.emisor}
          onChange={(value) =>
            setNuevoCheque({ ...nuevoCheque, emisor: value })
          }
        />

        <Input
          label="Cliente asociado"
          value={nuevoCheque.cliente}
          onChange={(value) =>
            setNuevoCheque({ ...nuevoCheque, cliente: value })
          }
        />

        <Select
          label="Tipo"
          value={nuevoCheque.banco}
          onChange={(value) =>
            setNuevoCheque({ ...nuevoCheque, banco: value })
          }
          options={["Físico", "Electrónico"]}
        />

        <Input
          label="Vencimiento"
          type="date"
          value={nuevoCheque.vencimiento}
          onChange={(value) =>
            setNuevoCheque({ ...nuevoCheque, vencimiento: value })
          }
        />

        <Input
          label="Monto"
          type="number"
          value={nuevoCheque.monto}
          onChange={(value) =>
            setNuevoCheque({ ...nuevoCheque, monto: value })
          }
        />
      </div>

      <ModalActions
        onClose={onClose}
        onSave={onSave}
        saveText="Guardar cheque"
      />
    </Modal>
  );
}

function formatMoney(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatUsd(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}