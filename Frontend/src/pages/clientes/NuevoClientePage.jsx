import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, User, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function NuevoClientePage() {
  const [step, setStep] = useState(1);
  const [tipoPersona, setTipoPersona] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    cuit: "",
    fechaNacimiento: "",
    razonSocial: "",
    condicionFiscal: "",
    telefono: "",
    email: "",
    domicilio: "",
    representante: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1 && !tipoPersona) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const guardarCliente = () => {
    console.log("Cliente guardado:", { tipoPersona, ...form });
    alert("Cliente guardado correctamente");
  };

  return (
    <section className="w-full">
      <div className="mb-8">
        <Link
          to="/clientes"
          className="mb-3 inline-flex items-center gap-2 text-sm text-[#357eb8] hover:text-[#1a3263]"
        >
          <ArrowLeft size={16} />
          Volver a Clientes
        </Link>

        <h1 className="text-3xl font-bold text-[#1a3263]">Nuevo Cliente</h1>
        <p className="text-[#357eb8]">
          Complete la información necesaria para registrar un nuevo cliente.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StepCard number="1" title="Tipo de persona" active={step === 1} done={step > 1} />
        <StepCard number="2" title="Datos principales" active={step === 2} done={step > 2} />
        <StepCard number="3" title="Confirmación" active={step === 3} done={false} />
      </div>

      <div className="w-full rounded-2xl border border-[#acbac4]/40 bg-white p-8 shadow-sm">
        {step === 1 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#1a3263]">
              Tipo de persona
            </h2>
            <p className="mb-6 text-[#357eb8]">
              Seleccioná si el cliente corresponde a una persona Humana o jurídica.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <PersonTypeButton
                selected={tipoPersona === "Humana"}
                onClick={() => setTipoPersona("Humana")}
                icon={User}
                title="Persona Humana"
                description="Cliente particular con DNI, CUIT/CUIL y datos personales."
              />

              <PersonTypeButton
                selected={tipoPersona === "juridica"}
                onClick={() => setTipoPersona("juridica")}
                icon={Building2}
                title="Persona Jurídica"
                description="Empresa, sociedad o razón social con CUIT y datos fiscales."
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#1a3263]">
              Datos principales
            </h2>
            <p className="mb-6 text-[#357eb8]">
              Los campos se adaptan según el tipo de persona seleccionado.
            </p>

            {tipoPersona === "Humana" && (
              <div className="grid gap-5 md:grid-cols-2">
                <Input label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />
                <Input label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} />
                <Input label="DNI" name="dni" value={form.dni} onChange={handleChange} />
                <Input label="CUIT/CUIL" name="cuit" value={form.cuit} onChange={handleChange} />
                <Input label="Fecha de nacimiento" name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} />
                <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
                <Input label="Email" name="email" value={form.email} onChange={handleChange} />
                <Input label="Domicilio" name="domicilio" value={form.domicilio} onChange={handleChange} />
              </div>
            )}

            {tipoPersona === "juridica" && (
              <div className="grid gap-5 md:grid-cols-2">
                <Input label="Razón Social" name="razonSocial" value={form.razonSocial} onChange={handleChange} />
                <Input label="CUIT" name="cuit" value={form.cuit} onChange={handleChange} />
                <Input label="Condición fiscal" name="condicionFiscal" value={form.condicionFiscal} onChange={handleChange} />
                <Input label="Representante / contacto principal" name="representante" value={form.representante} onChange={handleChange} />
                <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
                <Input label="Email" name="email" value={form.email} onChange={handleChange} />
                <Input label="Domicilio legal" name="domicilio" value={form.domicilio} onChange={handleChange} />
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#1a3263]">
              Confirmación
            </h2>
            <p className="mb-6 text-[#357eb8]">
              Revisá los datos antes de guardar el cliente.
            </p>

            <div className="grid gap-4 rounded-xl border border-[#acbac4]/50 bg-[#acbac4]/10 p-5 md:grid-cols-2">
              <Data label="Tipo" value={tipoPersona === "Humana" ? "Persona Humana" : "Persona Jurídica"} />

              {tipoPersona === "Humana" ? (
                <>
                  <Data label="Nombre" value={`${form.nombre} ${form.apellido}`} />
                  <Data label="DNI" value={form.dni} />
                  <Data label="CUIT/CUIL" value={form.cuit} />
                </>
              ) : (
                <>
                  <Data label="Razón Social" value={form.razonSocial} />
                  <Data label="CUIT" value={form.cuit} />
                  <Data label="Representante" value={form.representante} />
                </>
              )}

              <Data label="Teléfono" value={form.telefono} />
              <Data label="Email" value={form.email} />
              <Data label="Domicilio" value={form.domicilio} />
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

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
            >
              Continuar
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={guardarCliente}
              className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
            >
              <Check size={18} />
              Guardar Cliente
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

function PersonTypeButton({ selected, onClick, icon: Icon, title, description }) {
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

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-1 block font-medium text-[#1a3263]">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
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