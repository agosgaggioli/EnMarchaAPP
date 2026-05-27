import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Car,
  FileText,
  User,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function NuevaVentaPage() {
  const [step, setStep] = useState(1);
  const [tipoVenta, setTipoVenta] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState("");
  const [metodosPago, setMetodosPago] = useState([]);

  const [plazoFinanciacion, setPlazoFinanciacion] = useState({
    dias: "",
    monto: "",
    observacion: "",
  });

  const [plazosFinanciacion, setPlazosFinanciacion] = useState([]);

  const [vehiculoEntregado, setVehiculoEntregado] = useState({
    marca: "",
    modelo: "",
    version: "",
    anio: "",
    dominio: "",
    kilometraje: "",
    color: "",
    valorTomado: "",
    ubicacion: "A ingresar",
    observaciones: "",
  });

  const totalFinanciado = useMemo(
    () =>
      plazosFinanciacion.reduce(
        (acc, item) => acc + Number(item.monto || 0),
        0
      ),
    [plazosFinanciacion]
  );

  const agregarPlazoFinanciacion = () => {
    if (!plazoFinanciacion.dias || !plazoFinanciacion.monto) return;

    const nuevoPlazo = {
      id: `PLZ${Date.now()}`,
      ...plazoFinanciacion,
      dias: Number(plazoFinanciacion.dias),
      monto: Number(plazoFinanciacion.monto),
    };

    setPlazosFinanciacion([...plazosFinanciacion, nuevoPlazo]);

    setPlazoFinanciacion({
      dias: "",
      monto: "",
      observacion: "",
    });
  };

  const eliminarPlazoFinanciacion = (id) => {
    setPlazosFinanciacion(
      plazosFinanciacion.filter((item) => item.id !== id)
    );
  };

  const nextStep = () => {
    if (step === 1 && !tipoVenta) return;
    if (step === 2 && !clienteSeleccionado) return;
    if (step === 3 && !vehiculoSeleccionado && tipoVenta === "usado") return;
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleMetodoPago = (metodo) => {
    setMetodosPago((prev) =>
      prev.includes(metodo)
        ? prev.filter((item) => item !== metodo)
        : [...prev, metodo]
    );
  };

  const handleVehiculoEntregadoChange = (e) => {
    setVehiculoEntregado({
      ...vehiculoEntregado,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="w-full">
      <div className="mb-8">
        <Link
          to="/ventas"
          className="mb-3 inline-flex items-center gap-2 text-sm text-[#357eb8] hover:text-[#1a3263]"
        >
          <ArrowLeft size={16} />
          Volver a Ventas
        </Link>

        <h1 className="text-3xl font-bold text-[#1a3263]">Nueva Venta</h1>
        <p className="text-[#357eb8]">
          Registrá una operación de venta y generá el boleto correspondiente.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-5">
        <StepCard number="1" title="Tipo de venta" active={step === 1} done={step > 1} />
        <StepCard number="2" title="Cliente" active={step === 2} done={step > 2} />
        <StepCard number="3" title="Vehículo" active={step === 3} done={step > 3} />
        <StepCard number="4" title="Pago" active={step === 4} done={step > 4} />
        <StepCard number="5" title="Boleto" active={step === 5} done={false} />
      </div>

      <div className="w-full rounded-2xl border border-[#acbac4]/40 bg-white p-8 shadow-sm">
        {step === 1 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#1a3263]">
              Tipo de venta
            </h2>
            <p className="mb-6 text-[#357eb8]">
              Seleccioná si la operación corresponde a un usado o a un 0km.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <OptionCard
                selected={tipoVenta === "usado"}
                onClick={() => setTipoVenta("usado")}
                icon={Car}
                title="Venta de usado"
                description="Venta de un vehículo existente en stock o cargado manualmente."
              />

              <OptionCard
                selected={tipoVenta === "0km"}
                onClick={() => setTipoVenta("0km")}
                icon={Car}
                title="Venta de 0km"
                description="Venta de unidad nueva, con gestión posterior de compra a proveedor."
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#1a3263]">
              Cliente comprador
            </h2>
            <p className="mb-6 text-[#357eb8]">
              Buscá y seleccioná el cliente. Si no existe, podés cargarlo desde el atajo.
            </p>

            <div className="mb-5 flex gap-4">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#acbac4] px-4 py-3">
                <Search size={20} className="text-[#357eb8]" />
                <input
                  className="w-full outline-none"
                  placeholder="Buscar cliente por nombre, DNI/CUIT o email..."
                />
              </div>

              <Link
                to="/clientes/nuevo"
                className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
              >
                <Plus size={18} />
                Cargar cliente
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {clientes.map((cliente) => (
                <button
                  key={cliente.id}
                  onClick={() => setClienteSeleccionado(cliente.id)}
                  className={`rounded-2xl border p-5 text-left ${
                    clienteSeleccionado === cliente.id
                      ? "border-[#26aa9c] bg-[#26aa9c]/10"
                      : "border-[#acbac4]/60 hover:border-[#357eb8]"
                  }`}
                >
                  <User className="mb-3 text-[#26aa9c]" />
                  <p className="font-bold text-[#1a3263]">{cliente.nombre}</p>
                  <p className="text-sm text-[#357eb8]">{cliente.documento}</p>
                  <p className="text-sm text-[#357eb8]">{cliente.telefono}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#1a3263]">
              Vehículo vendido
            </h2>

            {tipoVenta === "usado" ? (
              <>
                <p className="mb-6 text-[#357eb8]">
                  Seleccioná un usado del stock. Si no está cargado, podés registrarlo.
                </p>

                <div className="mb-5 flex gap-4">
                  <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#acbac4] px-4 py-3">
                    <Search size={20} className="text-[#357eb8]" />
                    <input
                      className="w-full outline-none"
                      placeholder="Buscar vehículo por marca, modelo o dominio..."
                    />
                  </div>

                  <Link
                    to="/vehiculos/nuevo"
                    className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
                  >
                    <Plus size={18} />
                    Cargar usado
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {vehiculosUsados.map((vehiculo) => (
                    <button
                      key={vehiculo.id}
                      onClick={() => setVehiculoSeleccionado(vehiculo.id)}
                      className={`rounded-2xl border p-5 text-left ${
                        vehiculoSeleccionado === vehiculo.id
                          ? "border-[#26aa9c] bg-[#26aa9c]/10"
                          : "border-[#acbac4]/60 hover:border-[#357eb8]"
                      }`}
                    >
                      <Car className="mb-3 text-[#26aa9c]" />
                      <p className="font-bold text-[#1a3263]">{vehiculo.nombre}</p>
                      <p className="text-sm text-[#357eb8]">{vehiculo.dominio}</p>
                      <p className="text-sm text-[#357eb8]">{vehiculo.km}</p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="mb-6 text-[#357eb8]">
                  Para 0km se registran los datos de la unidad y luego se gestiona la compra.
                </p>

                <div className="rounded-xl border border-[#acbac4]/50 bg-[#acbac4]/10 p-5">
                  <p className="font-semibold text-[#1a3263]">
                    Próxima sección: datos del 0km + gestión de compra a proveedor.
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#1a3263]">
              Forma de pago
            </h2>
            <p className="mb-6 text-[#357eb8]">
              Seleccioná uno o más métodos de pago para la operación.
            </p>

            <div className="mb-6 grid gap-4 md:grid-cols-3">
              {[
                "Efectivo",
                "Transferencia",
                "Cheque",
                "Financiación propia",
                "Entrega vehículo usado",
              ].map((metodo) => (
                <button
                  key={metodo}
                  onClick={() => toggleMetodoPago(metodo)}
                  className={`rounded-2xl border p-4 text-left font-semibold transition ${
                    metodosPago.includes(metodo)
                      ? "border-[#26aa9c] bg-[#26aa9c]/10 text-[#1a3263]"
                      : "border-[#acbac4]/60 text-[#357eb8] hover:border-[#357eb8]"
                  }`}
                >
                  {metodo}
                </button>
              ))}
            </div>

            {metodosPago.includes("Financiación propia") && (
              <div className="mb-6 rounded-2xl border border-[#26aa9c]/40 bg-[#26aa9c]/5 p-6">
                <h3 className="mb-2 text-xl font-bold text-[#1a3263]">
                  Financiación propia
                </h3>

                <p className="mb-5 text-[#357eb8]">
                  Definí los pagos futuros indicando en cuántos días vence cada uno.
                </p>

                <div className="rounded-2xl border border-[#dbe4ee] bg-white p-5">
                  <div className="grid gap-5 md:grid-cols-[0.7fr_1fr_1.5fr_auto]">
                    <InputSimple
                      label="Plazo en días"
                      type="number"
                      value={plazoFinanciacion.dias}
                      onChange={(e) =>
                        setPlazoFinanciacion({
                          ...plazoFinanciacion,
                          dias: e.target.value,
                        })
                      }
                      placeholder="Ej: 30"
                    />

                    <InputSimple
                      label="Monto"
                      type="number"
                      value={plazoFinanciacion.monto}
                      onChange={(e) =>
                        setPlazoFinanciacion({
                          ...plazoFinanciacion,
                          monto: e.target.value,
                        })
                      }
                      placeholder="$ 0"
                    />

                    <InputSimple
                      label="Observación"
                      value={plazoFinanciacion.observacion}
                      onChange={(e) =>
                        setPlazoFinanciacion({
                          ...plazoFinanciacion,
                          observacion: e.target.value,
                        })
                      }
                      placeholder="Ej: entrega, refuerzo, saldo final..."
                    />

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={agregarPlazoFinanciacion}
                        className="h-12 rounded-xl bg-[#26aa9c] px-6 font-semibold text-white transition hover:bg-[#219b8f]"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>

                {plazosFinanciacion.length > 0 ? (
                  <div className="mt-5 space-y-3">
                    {plazosFinanciacion.map((plazo) => (
                      <div
                        key={plazo.id}
                        className="flex items-center justify-between rounded-2xl border border-[#dbe4ee] bg-white px-5 py-4 shadow-sm"
                      >
                        <div>
                          <span className="mb-1 inline-flex rounded-full bg-[#357eb8]/10 px-3 py-1 text-xs font-bold text-[#357eb8]">
                            Vence en {plazo.dias} días
                          </span>

                          <p className="mt-2 text-lg font-bold text-[#1a3263]">
                            {formatMoney(plazo.monto)}
                          </p>

                          <p className="text-sm text-[#357eb8]">
                            {plazo.observacion || "Sin observaciones"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => eliminarPlazoFinanciacion(plazo.id)}
                          className="rounded-xl border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl border border-dashed border-[#acbac4] bg-[#f8fafc] p-4 text-sm text-[#357eb8]">
                    Todavía no hay plazos cargados.
                  </div>
                )}

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <ResumenBox
                    label="Total financiado"
                    value={formatMoney(totalFinanciado)}
                    tone="dark"
                  />

                  <ResumenBox
                    label="Cantidad de plazos"
                    value={plazosFinanciacion.length}
                    tone="green"
                  />
                </div>
              </div>
            )}

            {metodosPago.includes("Entrega vehículo usado") && (
              <div className="rounded-2xl border border-[#acbac4]/50 bg-[#acbac4]/10 p-6">
                <h3 className="mb-2 text-xl font-bold text-[#1a3263]">
                  Vehículo entregado como parte de pago
                </h3>
                <p className="mb-5 text-[#357eb8]">
                  Este vehículo ingresará al stock con ubicación “A ingresar”.
                </p>

                <div className="grid gap-5 md:grid-cols-2">
                  <Input label="Marca" name="marca" value={vehiculoEntregado.marca} onChange={handleVehiculoEntregadoChange} />
                  <Input label="Modelo" name="modelo" value={vehiculoEntregado.modelo} onChange={handleVehiculoEntregadoChange} />
                  <Input label="Versión" name="version" value={vehiculoEntregado.version} onChange={handleVehiculoEntregadoChange} />
                  <Input label="Año" name="anio" value={vehiculoEntregado.anio} onChange={handleVehiculoEntregadoChange} />
                  <Input label="Dominio" name="dominio" value={vehiculoEntregado.dominio} onChange={handleVehiculoEntregadoChange} />
                  <Input label="Kilometraje" name="kilometraje" value={vehiculoEntregado.kilometraje} onChange={handleVehiculoEntregadoChange} />
                  <Input label="Color" name="color" value={vehiculoEntregado.color} onChange={handleVehiculoEntregadoChange} />
                  <Input label="Valor tomado" name="valorTomado" value={vehiculoEntregado.valorTomado} onChange={handleVehiculoEntregadoChange} />
                  <Input label="Ubicación" name="ubicacion" value={vehiculoEntregado.ubicacion} onChange={handleVehiculoEntregadoChange} disabled />
                  <TextArea label="Observaciones" name="observaciones" value={vehiculoEntregado.observaciones} onChange={handleVehiculoEntregadoChange} />
                </div>
              </div>
            )}
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-[#1a3263]">
              Boleto de compra venta
            </h2>
            <p className="mb-6 text-[#357eb8]">
              Previsualizá el boleto, editalo si hace falta y luego imprimilo.
            </p>

            <div className="rounded-xl border border-[#acbac4]/50 bg-white p-6">
              <div className="mb-4 flex items-center gap-2 text-[#1a3263]">
                <FileText />
                <p className="font-bold">Previsualización del boleto</p>
              </div>

              <textarea
                className="min-h-[300px] w-full rounded-xl border border-[#acbac4] p-4 text-[#1a3263] outline-none focus:border-[#357eb8]"
                defaultValue={boletoTextoBase}
              />
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

          {step < 5 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
            >
              Continuar
              <ArrowRight size={18} />
            </button>
          ) : (
            <button className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]">
              <Check size={18} />
              Imprimir boleto
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

function Input({ label, name, value, onChange, disabled = false, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-1 block font-medium text-[#1a3263]">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none placeholder:text-[#acbac4] focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20 disabled:bg-[#acbac4]/15 disabled:text-[#1a3263]/60"
      />
    </label>
  );
}

function InputSimple({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <label className="block">
      <span className="mb-1 block font-medium text-[#1a3263]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none placeholder:text-[#acbac4] focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
      />
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

function ResumenBox({ label, value, tone }) {
  const styles = {
    blue: "bg-[#357eb8]/10 text-[#357eb8]",
    green: "bg-[#26aa9c]/10 text-[#168f82]",
    dark: "bg-[#1a3263]/10 text-[#1a3263]",
  };

  return (
    <div className={`rounded-2xl p-4 ${styles[tone]}`}>
      <p className="text-xs font-bold uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-lg font-extrabold">{value}</p>
    </div>
  );
}

function formatMoney(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

const clientes = [
  {
    id: "CL001",
    nombre: "Juan Pérez",
    documento: "DNI 32.456.789",
    telefono: "+54 11 1234-5678",
  },
  {
    id: "CL002",
    nombre: "María García",
    documento: "DNI 28.789.456",
    telefono: "+54 11 2345-6789",
  },
];

const vehiculosUsados = [
  {
    id: "VH001",
    nombre: "Volkswagen Virtus Trendline 2018",
    dominio: "AD 120 VH",
    km: "85.000 km",
  },
  {
    id: "VH002",
    nombre: "Jeep Compass 2021 4x2 AT",
    dominio: "AF 019 PN",
    km: "62.000 km",
  },
];

const boletoTextoBase = `CONTRATO DE COMPRA VENTA DE AUTOMOTOR

Entre En Marcha Automotores, por una parte, en adelante denominado EL VENDEDOR, y por la otra parte el/la señor/a [CLIENTE], en adelante denominado EL COMPRADOR, convienen celebrar el presente contrato de compra venta de automotor.

PRIMERO: El vendedor enajena y el comprador adquiere un vehículo Marca/Modelo: [VEHICULO], Dominio: [DOMINIO].

SEGUNDO: El valor total del automóvil será abonado de la siguiente manera: [FORMA DE PAGO].

TERCERO: Las partes se comprometen a realizar todos los actos necesarios ante los organismos competentes para transferir la titularidad del dominio.

CUARTO: El comprador recibe el vehículo en el estado en que se encuentra, prestando conformidad sobre el mismo.

En la ciudad de [CIUDAD], a los [DIA] días del mes de [MES] de [AÑO], se firman dos ejemplares de un mismo tenor y a un solo efecto.

Firma Vendedor: ______________________

Firma Comprador: ______________________`;