import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  X,
  Save,
  Building2,
  Car,
  CircleDollarSign,
} from "lucide-react";

const proveedoresIniciales = [
  "Toyota Argentina",
  "Volkswagen Oficial",
  "Chevent SA",
  "Marwan Capital Autos",
];

export default function NuevaCompraPage() {
  const navigate = useNavigate();

  const [proveedores, setProveedores] = useState(proveedoresIniciales);
  const [showProveedorModal, setShowProveedorModal] = useState(false);

  const [form, setForm] = useState({
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
  });

  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: "",
    cuit: "",
    telefono: "",
    email: "",
    direccion: "",
  });

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

  const guardarCompra = () => {
    navigate("/compras");
  };

  return (
    <section className="w-full">
      <button
        onClick={() => navigate("/compras")}
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#357eb8] hover:underline"
      >
        <ArrowLeft size={17} />
        Volver a compras
      </button>

      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3263]">Nueva compra</h1>
          <p className="text-[#357eb8]">
            Registrá la compra de una unidad y dejá preparada su búsqueda.
          </p>
        </div>

        <button
          onClick={guardarCompra}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white shadow hover:bg-[#219b8f]"
        >
          <Save size={18} />
          Guardar compra
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Card title="Datos de la compra" icon={Building2}>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block font-semibold text-[#1a3263]">
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
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1a3263] text-white hover:bg-[#14264c]"
                    title="Crear proveedor"
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
                value={form.montoCompra}
                onChange={(value) => setForm({ ...form, montoCompra: value })}
                placeholder="$ 0"
              />
            </div>
          </Card>

          <Card title="Datos del vehículo" icon={Car}>
            <div className="grid gap-5 md:grid-cols-3">
              <Input
                label="Marca"
                value={form.marca}
                onChange={(value) => setForm({ ...form, marca: value })}
                placeholder="Toyota"
              />

              <Input
                label="Modelo"
                value={form.modelo}
                onChange={(value) => setForm({ ...form, modelo: value })}
                placeholder="Hilux"
              />

              <Input
                label="Versión"
                value={form.version}
                onChange={(value) => setForm({ ...form, version: value })}
                placeholder="SRV"
              />

              <Input
                label="Dominio"
                value={form.dominio}
                onChange={(value) => setForm({ ...form, dominio: value })}
                placeholder={
                  form.tipoCompra === "0km" ? "Sin dominio" : "AF175KD"
                }
              />

              <Input
                label="Año"
                value={form.anio}
                onChange={(value) => setForm({ ...form, anio: value })}
                placeholder="2024"
              />

              <Input
                label="Color"
                value={form.color}
                onChange={(value) => setForm({ ...form, color: value })}
                placeholder="Blanco"
              />

              <Input
                label="Kilómetros"
                value={form.kilometros}
                onChange={(value) => setForm({ ...form, kilometros: value })}
                placeholder={form.tipoCompra === "0km" ? "0" : "113000"}
              />
            </div>
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
              <ResumenItem label="Monto" value={form.montoCompra || "$ 0"} />
            </div>
          </Card>

          <div className="rounded-2xl border border-[#357eb8]/30 bg-[#357eb8]/10 p-5 text-[#1a3263]">
            <p className="font-bold">Impacto funcional</p>
            <p className="mt-2 text-sm">
              Al guardar la compra, se genera una operación pendiente con deuda
              asociada al proveedor/vendedor y se podrá gestionar el turno de
              búsqueda desde el submódulo de búsquedas.
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-yellow-800">
            <p className="font-bold">Estado inicial sugerido</p>
            <p className="mt-2 text-sm">
              Compra: <b>Pendiente de búsqueda</b>
              <br />
              Vehículo: <b>A ingresar</b>
              <br />
              Cuenta: <b>Deuda generada automáticamente</b>
            </p>
          </div>
        </div>
      </div>

      {showProveedorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Nuevo proveedor
                </h2>
                <p className="text-[#357eb8]">
                  Alta rápida para asociarlo a la compra actual.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowProveedorModal(false)}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Nombre / razón social"
                value={nuevoProveedor.nombre}
                onChange={(value) =>
                  setNuevoProveedor({ ...nuevoProveedor, nombre: value })
                }
                placeholder="Ej: Toyota Argentina"
              />

              <Input
                label="CUIT"
                value={nuevoProveedor.cuit}
                onChange={(value) =>
                  setNuevoProveedor({ ...nuevoProveedor, cuit: value })
                }
                placeholder="30-00000000-0"
              />

              <Input
                label="Teléfono"
                value={nuevoProveedor.telefono}
                onChange={(value) =>
                  setNuevoProveedor({ ...nuevoProveedor, telefono: value })
                }
                placeholder="Ej: 353..."
              />

              <Input
                label="Email"
                value={nuevoProveedor.email}
                onChange={(value) =>
                  setNuevoProveedor({ ...nuevoProveedor, email: value })
                }
                placeholder="proveedor@mail.com"
              />

              <Input
                label="Dirección"
                value={nuevoProveedor.direccion}
                onChange={(value) =>
                  setNuevoProveedor({ ...nuevoProveedor, direccion: value })
                }
                placeholder="Córdoba"
              />
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
              <button
                type="button"
                onClick={() => setShowProveedorModal(false)}
                className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={guardarProveedor}
                className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
              >
                Crear proveedor
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Card({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/50 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#357eb8]/10 text-[#357eb8]">
            <Icon size={21} />
          </div>
        )}

        <h2 className="text-xl font-bold text-[#1a3263]">{title}</h2>
      </div>

      {children}
    </div>
  );
}

function Input({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold text-[#1a3263]">{label}</span>
      <input
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
      <span className="mb-1 block font-semibold text-[#1a3263]">{label}</span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-base"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ResumenItem({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#acbac4]/40 pb-3">
      <p className="text-sm text-[#357eb8]">{label}</p>
      <p className="text-right font-bold text-[#1a3263]">{value}</p>
    </div>
  );
}