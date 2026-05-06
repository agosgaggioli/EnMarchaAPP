import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Car, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const marcas = ["Toyota", "Ford", "Chevrolet", "Volkswagen", "Fiat", "Renault", "Peugeot", "Citroën", "Honda"];
const anios = Array.from({ length: 35 }, (_, i) => String(2026 - i));
const tiposVehiculo = ["Auto", "Camioneta", "Moto", "Utilitario", "Camión"];

export default function NuevoVehiculoPage() {
  const [step, setStep] = useState(1);
  const [condicion, setCondicion] = useState("");

  const [form, setForm] = useState({
    tipoVehiculo: "",
    marca: "",
    modelo: "",
    version: "",
    anio: "",
    color: "",
    kilometraje: "",
    precioVenta: "",
    dominio: "",
    chasis: "",
    motor: "",
    observaciones: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1 && !condicion) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const guardarVehiculo = () => {
    console.log("Vehículo guardado:", { condicion, ...form });
    alert("Vehículo guardado correctamente");
  };

  return (
    <section className="w-full">
      <div className="mb-8">
        <Link
          to="/vehiculos"
          className="mb-3 inline-flex items-center gap-2 text-sm text-[#357eb8] hover:text-[#1a3263]"
        >
          <ArrowLeft size={16} />
          Volver a Vehículos
        </Link>

        <h1 className="text-3xl font-bold text-[#1a3263]">Nuevo Vehículo</h1>
        <p className="text-[#357eb8]">
          Cargá un vehículo al inventario de En Marcha.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <StepCard number="1" title="Condición" active={step === 1} done={step > 1} />
        <StepCard number="2" title="Datos del vehículo" active={step === 2} done={step > 2} />
        <StepCard number="3" title="Identificación" active={step === 3} done={step > 3} />
        <StepCard number="4" title="Confirmación" active={step === 4} done={false} />
      </div>

      <div className="w-full rounded-2xl border border-[#acbac4]/40 bg-white p-8 shadow-sm">
        {step === 1 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#1a3263]">
              Condición del vehículo
            </h2>
            <p className="mb-6 text-[#357eb8]">
              Seleccioná si vas a cargar un vehículo 0km o usado.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <OptionCard
                selected={condicion === "0km"}
                onClick={() => {
                  setCondicion("0km");
                  setForm({ ...form, kilometraje: "0" });
                }}
                icon={Car}
                title="Vehículo 0km"
                description="Unidad nueva proveniente de agencia oficial o proveedor."
              />

              <OptionCard
                selected={condicion === "Usado"}
                onClick={() => setCondicion("Usado")}
                icon={RotateCcw}
                title="Vehículo usado"
                description="Unidad tomada, comprada o ingresada con kilometraje."
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#1a3263]">
              Datos del vehículo
            </h2>
            <p className="mb-6 text-[#357eb8]">
              Completá los datos principales. La versión se carga manualmente.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <Select label="Tipo de vehículo" name="tipoVehiculo" value={form.tipoVehiculo} onChange={handleChange} options={tiposVehiculo} />
              <Select label="Marca" name="marca" value={form.marca} onChange={handleChange} options={marcas} />
              <Input label="Modelo" name="modelo" value={form.modelo} onChange={handleChange} placeholder="Ej: Corolla" />
              <Input label="Versión" name="version" value={form.version} onChange={handleChange} placeholder="Ej: XEI 2.0 CVT" />
              <Select label="Año" name="anio" value={form.anio} onChange={handleChange} options={anios} />
              <Input label="Color" name="color" value={form.color} onChange={handleChange} placeholder="Ej: Blanco" />
              <Input
                label="Kilometraje"
                name="kilometraje"
                value={form.kilometraje}
                onChange={handleChange}
                placeholder="Ej: 68000"
                disabled={condicion === "0km"}
              />
              <Input label="Precio de venta" name="precioVenta" value={form.precioVenta} onChange={handleChange} placeholder="Ej: 28500000" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#1a3263]">
              Identificación y observaciones
            </h2>
            <p className="mb-6 text-[#357eb8]">
              Cargá datos identificatorios del vehículo si ya se encuentran disponibles.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Dominio / Patente" name="dominio" value={form.dominio} onChange={handleChange} placeholder="Ej: AB123CD" />
              <Input label="Número de chasis" name="chasis" value={form.chasis} onChange={handleChange} />
              <Input label="Número de motor" name="motor" value={form.motor} onChange={handleChange} />
              <TextArea label="Observaciones" name="observaciones" value={form.observaciones} onChange={handleChange} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#1a3263]">
              Confirmación
            </h2>
            <p className="mb-6 text-[#357eb8]">
              Revisá los datos antes de guardar el vehículo.
            </p>

            <div className="grid gap-4 rounded-xl border border-[#acbac4]/50 bg-[#acbac4]/10 p-5 md:grid-cols-2">
              <Data label="Condición" value={condicion} />
              <Data label="Tipo" value={form.tipoVehiculo} />
              <Data label="Marca" value={form.marca} />
              <Data label="Modelo" value={form.modelo} />
              <Data label="Versión" value={form.version} />
              <Data label="Año" value={form.anio} />
              <Data label="Color" value={form.color} />
              <Data label="Kilometraje" value={`${form.kilometraje || "-"} km`} />
              <Data label="Precio de venta" value={form.precioVenta ? `$${form.precioVenta}` : "-"} />
              <Data label="Dominio" value={form.dominio} />
              <Data label="Chasis" value={form.chasis} />
              <Data label="Motor" value={form.motor} />
              <Data label="Observaciones" value={form.observaciones} />
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between border-t border-[#acbac4]/40 pt-6">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="rounded-xl border border-[#acbac4] px-5 py-3 text-[#1a3263] disabled:opacity-40"
          >
            Volver
          </button>

          {step < 4 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
            >
              Continuar
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={guardarVehiculo}
              className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
            >
              <Check size={18} />
              Guardar Vehículo
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function StepCard({ number, title, active, done }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        active
          ? "border-[#26aa9c] bg-[#26aa9c]/10"
          : done
          ? "border-[#357eb8] bg-[#357eb8]/10"
          : "border-[#acbac4]/50 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${
            done || active ? "bg-[#1a3263]" : "bg-[#acbac4]"
          }`}
        >
          {done ? "✓" : number}
        </span>
        <p className="font-medium text-[#1a3263]">{title}</p>
      </div>
    </div>
  );
}

function OptionCard({ selected, onClick, icon: Icon, title, description }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-6 text-left transition ${
        selected
          ? "border-[#26aa9c] bg-[#26aa9c]/10"
          : "border-[#acbac4]/60 hover:border-[#357eb8]"
      }`}
    >
      <Icon className="mb-4 text-[#26aa9c]" size={32} />
      <h3 className="text-xl font-semibold text-[#1a3263]">{title}</h3>
      <p className="text-[#357eb8]">{description}</p>
    </button>
  );
}

function Input({ label, name, value, onChange, type = "text", placeholder = "", disabled = false }) {
  return (
    <label className="block">
      <span className="mb-1 block font-medium text-[#1a3263]">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none placeholder:text-[#acbac4] focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20 disabled:bg-[#acbac4]/15 disabled:text-[#1a3263]/60"
      />
    </label>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1 block font-medium text-[#1a3263]">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
      >
        <option value="">Seleccionar</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, name, value, onChange }) {
  return (
    <label className="block md:col-span-2">
      <span className="mb-1 block font-medium text-[#1a3263]">{label}</span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="4"
        className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none placeholder:text-[#acbac4] focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
      />
    </label>
  );
}

function Data({ label, value }) {
  return (
    <div>
      <p className="text-sm text-[#357eb8]">{label}</p>
      <p className="font-semibold text-[#1a3263]">{value || "-"}</p>
    </div>
  );
}