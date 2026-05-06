import { useState } from "react";
import {
  Plus,
  Download,
  Search,
  Wallet,
  TrendingUp,
  TrendingDown,
  Receipt,
  X,
  ArrowUp,
  ArrowDown,
  ArrowRightLeft,
  CreditCard,
} from "lucide-react";

const movimientosIniciales = [
  {
    fecha: "14/05/2026",
    hora: "09:12",
    tipo: "Cobro",
    origen: "Venta #1248",
    concepto: "Cobro Hilux SRV 2024",
    cuenta: "Banco Galicia",
    debe: "-",
    haber: "$20.000.000",
    saldo: "$25.000.000",
  },
  {
    fecha: "14/05/2026",
    hora: "10:45",
    tipo: "Pago",
    origen: "Proveedor Toyota",
    concepto: "Pago compra unidad 0KM",
    cuenta: "Banco Santander",
    debe: "$10.000.000",
    haber: "-",
    saldo: "$15.000.000",
  },
  {
    fecha: "14/05/2026",
    hora: "11:30",
    tipo: "Gasto",
    origen: "Operativo",
    concepto: "Luz agencia",
    cuenta: "Caja",
    debe: "$120.000",
    haber: "-",
    saldo: "$14.880.000",
  },
];

const formInicial = {
  venta: "",
  cliente: "",
  proveedor: "",
  concepto: "",
  monto: "",
  moneda: "ARS",
  cuenta: "",
  fecha: "",
  medio: "",
  observacion: "",
  tipoGasto: "Único",
  frecuencia: "Mensual",
  tipoPago: "Proveedor",
};

export default function LibroDiarioPage() {
  const [modal, setModal] = useState(null);
  const [movimientos, setMovimientos] = useState(movimientosIniciales);
  const [form, setForm] = useState(formInicial);

  const abrirModal = (tipo) => {
    setModal(tipo);
    setForm(formInicial);
  };

  const cerrarModal = () => setModal(null);

  const guardarMovimiento = (tipo) => {
    const nuevo = {
      fecha: form.fecha || "14/05/2026",
      hora: "12:30",
      tipo,
      origen:
        tipo === "Cobro"
          ? form.venta || "Venta asociada"
          : tipo === "Pago"
          ? form.proveedor || form.tipoPago
          : tipo === "Transferencia"
          ? "Transferencia interna"
          : "Operativo",
      concepto: form.concepto || "Movimiento sin concepto",
      cuenta: form.cuenta || "Caja",
      debe: tipo === "Cobro" ? "-" : `$${form.monto || "0"}`,
      haber: tipo === "Cobro" ? `$${form.monto || "0"}` : "-",
      saldo: "$14.880.000",
    };

    setMovimientos([nuevo, ...movimientos]);
    cerrarModal();
  };

  return (
    <section className="w-full">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-sm font-semibold text-[#357eb8]">
            Contabilidad &gt; Libro Diario
          </p>
          <h1 className="text-3xl font-bold text-[#1a3263]">Libro Diario</h1>
          <p className="text-[#357eb8]">
            Registro cronológico de todos los movimientos contables de la empresa.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-5 py-3 font-semibold text-[#1a3263] hover:bg-[#acbac4]/15">
            <Download size={18} />
            Exportar a Excel
          </button>

          <button
            onClick={() => abrirModal("selector")}
            className="inline-flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
          >
            <Plus size={18} />
            Nuevo movimiento
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="Saldo actual" value="$14.880.000" icon={Wallet} />
        <MetricCard
          title="Ingresos (Haber)"
          value="$45.250.000"
          icon={TrendingUp}
          green
        />
        <MetricCard
          title="Egresos (Debe)"
          value="$30.370.000"
          icon={TrendingDown}
          red
        />
        <MetricCard
          title="Cheques pendientes"
          value="8"
          icon={Receipt}
          purple
        />
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-[180px_180px_1fr_120px]">
        <input type="date" className="input-base" />

        <select className="input-base">
          <option>Todos los tipos</option>
          <option>Cobro</option>
          <option>Pago</option>
          <option>Gasto</option>
          <option>Transferencia</option>
        </select>

        <div className="flex items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4">
          <Search size={18} className="text-[#357eb8]" />
          <input
            className="w-full py-3 outline-none placeholder:text-[#acbac4]"
            placeholder="Buscar por concepto, origen, referencia..."
          />
        </div>

        <button className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 font-semibold text-[#1a3263]">
          Filtros
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <table className="w-full min-w-[1200px] text-left">
          <thead className="bg-[#1a3263] text-white">
            <tr>
              <th className="p-4">Fecha</th>
              <th className="p-4">Hora</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">Origen / Referencia</th>
              <th className="p-4">Concepto</th>
              <th className="p-4">Cuenta</th>
              <th className="p-4">Debe</th>
              <th className="p-4">Haber</th>
              <th className="p-4">Saldo</th>
            </tr>
          </thead>

          <tbody className="text-[#1a3263]">
            {movimientos.map((mov, index) => (
              <tr
                key={index}
                className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
              >
                <td className="p-4">{mov.fecha}</td>
                <td className="p-4">{mov.hora}</td>
                <td className="p-4">
                  <TipoBadge tipo={mov.tipo} />
                </td>
                <td className="p-4 font-semibold">{mov.origen}</td>
                <td className="p-4">{mov.concepto}</td>
                <td className="p-4">{mov.cuenta}</td>
                <td className="p-4 font-bold text-red-600">{mov.debe}</td>
                <td className="p-4 font-bold text-[#26aa9c]">{mov.haber}</td>
                <td className="p-4 font-bold">{mov.saldo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between border-t border-[#acbac4]/40 p-4 text-sm text-[#1a3263]">
          <span>Mostrando 1 a {movimientos.length} movimientos</span>
          <span>
            Totales del período:{" "}
            <b className="text-red-600">Debe $30.370.000</b> ·{" "}
            <b className="text-[#26aa9c]">Haber $45.250.000</b>
          </span>
        </div>
      </div>

      {modal === "selector" && (
        <ModalBase
          title="Nuevo movimiento"
          onClose={cerrarModal}
          maxWidth="max-w-3xl"
        >
          <p className="mb-5 text-[#357eb8]">¿Qué querés registrar?</p>

          <div className="grid gap-4 md:grid-cols-2">
            <OptionCard
              icon={ArrowUp}
              title="Cobro (Ingreso)"
              description="Registrar ingresos asociados a ventas."
              color="green"
              onClick={() => abrirModal("Cobro")}
            />

            <OptionCard
              icon={ArrowDown}
              title="Pago (Egreso)"
              description="Registrar pagos a proveedores, compras o servicios."
              color="red"
              onClick={() => abrirModal("Pago")}
            />

            <OptionCard
              icon={CreditCard}
              title="Gasto"
              description="Registrar gastos operativos o administrativos."
              color="orange"
              onClick={() => abrirModal("Gasto")}
            />

            <OptionCard
              icon={ArrowRightLeft}
              title="Transferencia"
              description="Mover dinero entre cuentas internas."
              color="blue"
              onClick={() => abrirModal("Transferencia")}
            />
          </div>
        </ModalBase>
      )}

      {modal === "Cobro" && (
        <ModalCobro
          form={form}
          setForm={setForm}
          onClose={cerrarModal}
          onSave={() => guardarMovimiento("Cobro")}
        />
      )}

      {modal === "Pago" && (
        <ModalPago
          form={form}
          setForm={setForm}
          onClose={cerrarModal}
          onSave={() => guardarMovimiento("Pago")}
        />
      )}

      {modal === "Gasto" && (
        <ModalGasto
          form={form}
          setForm={setForm}
          onClose={cerrarModal}
          onSave={() => guardarMovimiento("Gasto")}
        />
      )}

      {modal === "Transferencia" && (
        <ModalTransferencia
          form={form}
          setForm={setForm}
          onClose={cerrarModal}
          onSave={() => guardarMovimiento("Transferencia")}
        />
      )}
    </section>
  );
}

function ModalCobro({ form, setForm, onClose, onSave }) {
  return (
    <ModalBase
      title="Registrar cobro (Ingreso)"
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="grid gap-5 md:grid-cols-[1fr_180px]">
        <Input
          label="Venta asociada"
          value={form.venta}
          onChange={(v) => setForm({ ...form, venta: v })}
          placeholder="Buscar venta..."
          required
        />

        <Input
          label="Fecha"
          type="date"
          value={form.fecha}
          onChange={(v) => setForm({ ...form, fecha: v })}
          required
        />

        <Input
          label="Cliente"
          value={form.cliente}
          onChange={(v) => setForm({ ...form, cliente: v })}
          placeholder="Juan Pérez"
        />

        <div />

        <Input
          label="Monto"
          value={form.monto}
          onChange={(v) => setForm({ ...form, monto: v })}
          placeholder="$ 20.000.000,00"
          required
        />

        <SelectBase
          label="Moneda"
          value={form.moneda}
          onChange={(v) => setForm({ ...form, moneda: v })}
          options={["ARS", "USD"]}
          required
        />

        <Input
          label="Cotización"
          value={form.observacion}
          onChange={(v) => setForm({ ...form, observacion: v })}
          placeholder="1,00"
        />

        <SelectBase
          label="Medio de cobro"
          value={form.medio}
          onChange={(v) => setForm({ ...form, medio: v })}
          options={["Transferencia", "Efectivo", "Cheque tercero", "Tarjeta"]}
          placeholder="Seleccionar"
          required
        />

        <SelectBase
          label="Cuenta destino"
          value={form.cuenta}
          onChange={(v) => setForm({ ...form, cuenta: v })}
          options={[
            "Banco Galicia (Alias: Principal)",
            "Caja",
            "Mercado Pago",
            "Banco Santander",
          ]}
          placeholder="Seleccionar cuenta"
          required
          full
        />

        <TextareaBase
          label="Concepto"
          value={form.concepto}
          onChange={(v) => setForm({ ...form, concepto: v })}
          placeholder="Cobro Hilux SRV 2024 - Transferencia recibida"
          required
          full
        />
      </div>

      <ImpactBox color="green" text="Impacto contable: HABER (Ingreso)" />

      <ModalActions
        onClose={onClose}
        onSave={onSave}
        saveLabel="Registrar cobro"
        color="green"
      />
    </ModalBase>
  );
}

function ModalPago({ form, setForm, onClose, onSave }) {
  return (
    <ModalBase
      title="Registrar pago (Egreso)"
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="mb-5">
        <p className="mb-2 font-semibold text-[#1a3263]">
          Este pago corresponde a
        </p>

        <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-red-200">
          {["Proveedor", "Compra de vehículo", "Otro"].map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => setForm({ ...form, tipoPago: tipo })}
              className={`px-4 py-3 text-sm font-semibold transition ${
                form.tipoPago === tipo
                  ? "bg-red-50 text-red-700"
                  : "bg-white text-[#357eb8] hover:bg-red-50/50"
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label={form.tipoPago === "Proveedor" ? "Proveedor" : "Referencia"}
          value={form.proveedor}
          onChange={(v) => setForm({ ...form, proveedor: v })}
          placeholder={
            form.tipoPago === "Proveedor"
              ? "Toyota Argentina S.A."
              : "Compra / movimiento asociado"
          }
          required
        />

        <Input
          label="Factura / Referencia"
          value={form.venta}
          onChange={(v) => setForm({ ...form, venta: v })}
          placeholder="0001-00002345"
        />

        <Input
          label="Monto"
          value={form.monto}
          onChange={(v) => setForm({ ...form, monto: v })}
          placeholder="$ 10.000.000,00"
          required
        />

        <SelectBase
          label="Moneda"
          value={form.moneda}
          onChange={(v) => setForm({ ...form, moneda: v })}
          options={["ARS", "USD"]}
          required
        />

        <Input
          label="Cotización"
          value={form.observacion}
          onChange={(v) => setForm({ ...form, observacion: v })}
          placeholder="1,00"
        />

        <SelectBase
          label="Medio de pago"
          value={form.medio}
          onChange={(v) => setForm({ ...form, medio: v })}
          options={[
            "Transferencia",
            "Efectivo",
            "Cheque propio",
            "Cheque tercero",
          ]}
          placeholder="Seleccionar"
          required
        />

        <SelectBase
          label="Cuenta origen"
          value={form.cuenta}
          onChange={(v) => setForm({ ...form, cuenta: v })}
          options={[
            "Banco Santander (Alias: Pago Proveedores)",
            "Caja",
            "Banco Galicia",
            "Mercado Pago",
          ]}
          placeholder="Seleccionar cuenta"
          required
          full
        />

        <TextareaBase
          label="Concepto"
          value={form.concepto}
          onChange={(v) => setForm({ ...form, concepto: v })}
          placeholder="Pago compra unidad OKM - Hilux SRV 2024"
          required
          full
        />
      </div>

      <ImpactBox color="red" text="Impacto contable: DEBE (Egreso)" />

      <ModalActions
        onClose={onClose}
        onSave={onSave}
        saveLabel="Registrar pago"
        color="red"
      />
    </ModalBase>
  );
}

function ModalGasto({ form, setForm, onClose, onSave }) {
  return (
    <ModalBase title="Registrar gasto" onClose={onClose} maxWidth="max-w-4xl">
      <div className="mb-6">
        <p className="mb-3 font-semibold text-[#1a3263]">Tipo de gasto</p>

        <div className="flex gap-8">
          {["Único", "Recurrente"].map((tipo) => (
            <label key={tipo} className="flex items-center gap-2 text-[#1a3263]">
              <input
                type="radio"
                name="tipoGasto"
                checked={form.tipoGasto === tipo}
                onChange={() => setForm({ ...form, tipoGasto: tipo })}
                className="accent-orange-500"
              />
              {tipo}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-[1fr_220px]">
        <Input
          label="Concepto"
          value={form.concepto}
          onChange={(v) => setForm({ ...form, concepto: v })}
          placeholder="Luz agencia"
          required
        />

        <Input
          label="Monto"
          value={form.monto}
          onChange={(v) => setForm({ ...form, monto: v })}
          placeholder="$ 120.000,00"
          required
        />

        <SelectBase
          label="Moneda"
          value={form.moneda}
          onChange={(v) => setForm({ ...form, moneda: v })}
          options={["ARS", "USD"]}
          required
        />

        <SelectBase
          label="Cuenta"
          value={form.cuenta}
          onChange={(v) => setForm({ ...form, cuenta: v })}
          options={["Caja", "Banco Galicia", "Banco Santander", "Mercado Pago"]}
          placeholder="Seleccionar cuenta"
          required
        />

        {form.tipoGasto === "Recurrente" && (
          <>
            <SelectBase
              label="Frecuencia"
              value={form.frecuencia}
              onChange={(v) => setForm({ ...form, frecuencia: v })}
              options={["Mensual", "Quincenal", "Semanal"]}
              required
            />

            <Input
              label="Próxima ejecución"
              type="date"
              value={form.fecha}
              onChange={(v) => setForm({ ...form, fecha: v })}
            />
          </>
        )}
      </div>

      <ImpactBox color="orange" text="Impacto contable: DEBE (Egreso)" />

      <ModalActions
        onClose={onClose}
        onSave={onSave}
        saveLabel="Registrar gasto"
        color="orange"
      />
    </ModalBase>
  );
}

function ModalTransferencia({ form, setForm, onClose, onSave }) {
  return (
    <ModalBase
      title="Transferencia entre cuentas"
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <SelectBase
          label="Cuenta origen"
          value={form.proveedor}
          onChange={(v) => setForm({ ...form, proveedor: v })}
          options={["Caja", "Banco Galicia", "Banco Santander", "Mercado Pago"]}
          placeholder="Seleccionar cuenta origen"
          required
        />

        <SelectBase
          label="Cuenta destino"
          value={form.cliente}
          onChange={(v) => setForm({ ...form, cliente: v })}
          options={["Caja", "Banco Galicia", "Banco Santander", "Mercado Pago"]}
          placeholder="Seleccionar cuenta destino"
          required
        />

        <Input
          label="Monto"
          value={form.monto}
          onChange={(v) => setForm({ ...form, monto: v })}
          placeholder="$ 0"
          required
        />

        <Input
          label="Fecha"
          type="date"
          value={form.fecha}
          onChange={(v) => setForm({ ...form, fecha: v })}
          required
        />

        <TextareaBase
          label="Concepto"
          value={form.concepto}
          onChange={(v) => setForm({ ...form, concepto: v })}
          placeholder="Transferencia interna - De caja a cuenta bancaria"
          full
        />
      </div>

      <ImpactBox
        color="blue"
        text="Impacto contable: DEBE / HABER entre cuentas"
      />

      <ModalActions
        onClose={onClose}
        onSave={onSave}
        saveLabel="Transferir"
        color="blue"
      />
    </ModalBase>
  );
}

function ModalBase({ title, children, onClose, maxWidth = "max-w-4xl" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div
        className={`max-h-[90vh] w-full ${maxWidth} overflow-y-auto rounded-2xl bg-white p-8 shadow-xl`}
      >
        <div className="mb-6 flex items-start justify-between">
          <h2 className="text-2xl font-bold text-[#1a3263]">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-[#acbac4]/20"
          >
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
    <button
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition hover:scale-[1.01] ${styles[color]}`}
    >
      <Icon size={28} />
      <p className="mt-3 font-bold">{title}</p>
      <p className="mt-1 text-sm">{description}</p>
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold text-[#1a3263]">
        {label} {required && <span className="text-red-500">*</span>}
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

function SelectBase({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  full = false,
}) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="mb-1 block font-semibold text-[#1a3263]">
        {label} {required && <span className="text-red-500">*</span>}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-base"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function TextareaBase({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  full = false,
}) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="mb-1 block font-semibold text-[#1a3263]">
        {label} {required && <span className="text-red-500">*</span>}
      </span>

      <textarea
        rows="3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-base"
      />
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

  return (
    <div className={`mt-6 rounded-xl border p-4 font-bold ${styles[color]}`}>
      {text}
    </div>
  );
}

function ModalActions({ onClose, onSave, saveLabel, color }) {
  const colors = {
    green: "bg-[#26aa9c] hover:bg-[#219b8f]",
    red: "bg-red-600 hover:bg-red-700",
    orange: "bg-orange-500 hover:bg-orange-600",
    blue: "bg-[#357eb8] hover:bg-[#2f6ea0]",
  };

  return (
    <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
      <button
        onClick={onClose}
        className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
      >
        Cancelar
      </button>

      <button
        onClick={onSave}
        className={`rounded-xl px-5 py-3 font-semibold text-white ${colors[color]}`}
      >
        {saveLabel}
      </button>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, green, red, purple }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/40 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${
            green
              ? "bg-[#26aa9c]/15 text-[#1b7f75]"
              : red
              ? "bg-red-100 text-red-700"
              : purple
              ? "bg-purple-100 text-purple-700"
              : "bg-[#357eb8]/15 text-[#245f91]"
          }`}
        >
          <Icon size={25} />
        </div>

        <div>
          <p className="text-sm text-[#357eb8]">{title}</p>
          <p
            className={`text-2xl font-bold ${
              green ? "text-[#26aa9c]" : red ? "text-red-600" : "text-[#1a3263]"
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function TipoBadge({ tipo }) {
  const styles = {
    Cobro: "bg-[#26aa9c]/15 text-[#1b7f75]",
    Pago: "bg-red-100 text-red-700",
    Gasto: "bg-orange-100 text-orange-700",
    Transferencia: "bg-[#357eb8]/15 text-[#245f91]",
  };

  return (
    <span
      className={`rounded-lg px-3 py-1 text-sm font-semibold ${styles[tipo]}`}
    >
      {tipo}
    </span>
  );
}