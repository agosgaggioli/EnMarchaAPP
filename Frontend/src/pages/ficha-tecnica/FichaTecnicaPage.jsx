import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, X, Eye, Wrench } from "lucide-react";

const vehiculos = [
  {
    id: "1",
    modelo: "COMMANDER",
    version: "LIMITED",
    dominio: "AF678HL",
    ubicacion: "RUBIC CORDOBA",
    pendientes: 4,
    proceso: 1,
    finalizados: 1,
    estado: "Proceso",
  },
  {
    id: "2",
    modelo: "SAVEIRO",
    version: "C EXT",
    dominio: "JZJ895",
    ubicacion: "SALÓN",
    pendientes: 2,
    proceso: 1,
    finalizados: 0,
    estado: "Proceso",
  },
];

const vehiculosDisponibles = [
  "Toyota Corolla XEI 2024 - AB123CD",
  "Ford Ranger XLT 2022 - AF678HL",
  "Chevrolet Onix Premier 2024 - AE333XS",
];

const ordenesPorVehiculo = {
  "1": [
    {
      id: "OT001",
      trabajo: "Cambio de aceite",
      proveedor: "Leandro Olivera",
      estado: "En proceso",
    },
    {
      id: "OT002",
      trabajo: "Limpieza interior",
      proveedor: "Rubic Córdoba",
      estado: "Pendiente",
    },
  ],
  "2": [
    {
      id: "OT003",
      trabajo: "Pulido general",
      proveedor: "Chapa y Pintura Córdoba",
      estado: "Pendiente",
    },
  ],
};

export default function FichaTecnicaPage() {
  const navigate = useNavigate();

  const [showNuevaFicha, setShowNuevaFicha] = useState(false);
  const [ordenesModal, setOrdenesModal] = useState(null);

  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState("");
  const [items, setItems] = useState([{ nombre: "", tipo: "Estética" }]);

  const agregarItem = () => {
    setItems([...items, { nombre: "", tipo: "Estética" }]);
  };

  const actualizarItem = (index, field, value) => {
    const nuevosItems = [...items];
    nuevosItems[index][field] = value;
    setItems(nuevosItems);
  };

  const ordenesAsociadas = ordenesModal
    ? ordenesPorVehiculo[ordenesModal.id] || []
    : [];

  return (
    <section className="w-full">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3263]">Ficha Técnica</h1>
          <p className="text-[#357eb8]">
            Gestioná peritajes, trabajos pendientes y repuestos por vehículo.
          </p>
        </div>

        <button
          onClick={() => setShowNuevaFicha(true)}
          className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white shadow hover:bg-[#219b8f]"
        >
          <Plus size={18} />
          Nueva ficha
        </button>
      </div>

      <div className="mb-5 flex items-center gap-4">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
          <Search size={20} className="text-[#357eb8]" />
          <input
            className="w-full outline-none placeholder:text-[#acbac4]"
            placeholder="Buscar por modelo, dominio o ubicación..."
          />
        </div>

        <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
          <option>Todos los estados</option>
          <option>Proceso</option>
          <option>Finalizado</option>
          <option>Pendiente</option>
        </select>

        <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
          <option>Todas las ubicaciones</option>
          <option>SALÓN</option>
          <option>TALLER</option>
          <option>CHAPA Y PINTURA</option>
          <option>A INGRESAR</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#acbac4]/60 bg-white">
        <table className="w-full text-left">
          <thead className="bg-[#1a3263] text-white">
            <tr>
              <th className="p-4">Modelo</th>
              <th className="p-4">Versión</th>
              <th className="p-4">Dominio</th>
              <th className="p-4">Ubicación</th>
              <th className="p-4">Pendientes</th>
              <th className="p-4">En proceso</th>
              <th className="p-4">Finalizados</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody className="text-[#1a3263]">
            {vehiculos.map((v) => (
              <tr
                key={v.id}
                className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
              >
                <td className="p-4 font-semibold">{v.modelo}</td>
                <td className="p-4">{v.version}</td>
                <td className="p-4">{v.dominio}</td>
                <td className="p-4">{v.ubicacion}</td>
                <td className="p-4">{v.pendientes}</td>
                <td className="p-4">{v.proceso}</td>
                <td className="p-4">{v.finalizados}</td>

                <td className="p-4">
                  <span className="rounded-lg bg-[#357eb8]/15 px-3 py-1 text-sm font-semibold text-[#245f91]">
                    {v.estado}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <IconButton
                      title="Ver detalle"
                      onClick={() => navigate(`/ficha-tecnica/${v.id}`)}
                    >
                      <Eye size={18} />
                    </IconButton>

                    <IconButton
                      title="Ver órdenes"
                      variant="dark"
                      onClick={() => setOrdenesModal(v)}
                    >
                      <Wrench size={18} />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNuevaFicha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Nueva ficha técnica
                </h2>
                <p className="text-[#357eb8]">
                  Seleccioná el vehículo y cargá los ítems iniciales del
                  peritaje.
                </p>
              </div>

              <button
                onClick={() => setShowNuevaFicha(false)}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="mb-6">
              <label className="mb-1 block font-semibold text-[#1a3263]">
                Vehículo
              </label>

              <select
                value={vehiculoSeleccionado}
                onChange={(e) => setVehiculoSeleccionado(e.target.value)}
                className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
              >
                <option value="">Seleccionar vehículo</option>
                {vehiculosDisponibles.map((vehiculo) => (
                  <option key={vehiculo} value={vehiculo}>
                    {vehiculo}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1a3263]">
                Ítems a realizar
              </h3>

              <button
                onClick={agregarItem}
                className="flex items-center gap-2 rounded-xl bg-[#1a3263] px-4 py-2 font-semibold text-white hover:bg-[#14264c]"
              >
                <Plus size={16} />
                Agregar ítem
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid gap-4 rounded-xl border border-[#acbac4]/50 bg-[#acbac4]/10 p-4 md:grid-cols-[1fr_220px]"
                >
                  <div>
                    <label className="mb-1 block font-semibold text-[#1a3263]">
                      Ítem
                    </label>

                    <input
                      value={item.nombre}
                      onChange={(e) =>
                        actualizarItem(index, "nombre", e.target.value)
                      }
                      placeholder="Ej: Cambio de aceite"
                      className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-semibold text-[#1a3263]">
                      Tipo
                    </label>

                    <select
                      value={item.tipo}
                      onChange={(e) =>
                        actualizarItem(index, "tipo", e.target.value)
                      }
                      className="w-full rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
                    >
                      <option>Estética</option>
                      <option>Mecánica</option>
                      <option>Chapa y pintura</option>
                      <option>Electricidad</option>
                      <option>Gestoría</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#acbac4]/40 pt-6">
              <button
                onClick={() => setShowNuevaFicha(false)}
                className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  setShowNuevaFicha(false);
                  navigate("/ficha-tecnica/1");
                }}
                className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
              >
                Crear ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {ordenesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Órdenes asociadas
                </h2>

                <p className="text-[#357eb8]">
                  {ordenesModal.modelo} {ordenesModal.version} · Dominio{" "}
                  {ordenesModal.dominio}
                </p>
              </div>

              <button
                onClick={() => setOrdenesModal(null)}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-4">
              <ResumenOrden label="Pendientes" value={ordenesModal.pendientes} />
              <ResumenOrden label="En proceso" value={ordenesModal.proceso} />
              <ResumenOrden label="Finalizadas" value={ordenesModal.finalizados} />
            </div>

            <div className="overflow-hidden rounded-xl border border-[#acbac4]/60">
              <table className="w-full text-left">
                <thead className="bg-[#1a3263] text-white">
                  <tr>
                    <th className="p-4">Orden</th>
                    <th className="p-4">Trabajo</th>
                    <th className="p-4">Proveedor</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4">Acción</th>
                  </tr>
                </thead>

                <tbody className="text-[#1a3263]">
                  {ordenesAsociadas.length > 0 ? (
                    ordenesAsociadas.map((orden) => (
                      <tr
                        key={orden.id}
                        className="border-t border-[#acbac4]/40"
                      >
                        <td className="p-4 font-bold">{orden.id}</td>
                        <td className="p-4">{orden.trabajo}</td>
                        <td className="p-4">{orden.proveedor}</td>
                        <td className="p-4">
                          <EstadoOrden estado={orden.estado} />
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => navigate(`/ordenes-trabajo/${orden.id}`)}
                            className="rounded-lg border border-[#357eb8] px-3 py-2 text-sm font-semibold text-[#357eb8] hover:bg-[#357eb8]/10"
                          >
                            Abrir
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-6 text-center font-semibold text-[#357eb8]"
                      >
                        No hay órdenes asociadas a este vehículo.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => navigate("/ordenes-trabajo")}
                className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
              >
                Ver todas las órdenes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function IconButton({ children, title, onClick, variant = "blue" }) {
  const variants = {
    blue: "border-[#357eb8] text-[#357eb8] hover:bg-[#357eb8]/10",
    dark: "border-[#1a3263] text-[#1a3263] hover:bg-[#1a3263]/10",
  };

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={`group relative flex h-10 w-10 items-center justify-center rounded-lg border transition ${variants[variant]}`}
    >
      {children}

      <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1a3263] px-2 py-1 text-xs font-semibold text-white opacity-0 shadow transition group-hover:opacity-100">
        {title}
      </span>
    </button>
  );
}

function ResumenOrden({ label, value }) {
  return (
    <div className="rounded-xl border border-[#acbac4]/50 bg-[#f8fafc] p-4 text-center">
      <p className="text-2xl font-bold text-[#1a3263]">{value}</p>
      <p className="text-sm font-semibold text-[#357eb8]">{label}</p>
    </div>
  );
}

function EstadoOrden({ estado }) {
  const styles = {
    Pendiente: "bg-yellow-100 text-yellow-700",
    "En proceso": "bg-[#357eb8]/15 text-[#245f91]",
    Finalizada: "bg-[#26aa9c]/15 text-[#1b7f75]",
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