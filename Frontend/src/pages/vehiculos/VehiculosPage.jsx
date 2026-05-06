import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Car,
  CircleDollarSign,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";

const vehiculos = [
  {
    dominio: "AF678HL",
    vehiculo: "Toyota Corolla",
    version: "XEI 2.0 CVT",
    tipo: "Auto",
    condicion: "0km",
    anio: "2024",
    color: "Blanco",
    kilometraje: "0 km",
    precio: "$285.000",
    estado: "Disponible",
    ubicacion: "En salón",
    peritado: true,
    fichaId: "1",
  },
  {
    dominio: "AD185BD",
    vehiculo: "Ford Ranger",
    version: "XLT 3.2",
    tipo: "Camioneta",
    condicion: "Usado",
    anio: "2022",
    color: "Gris",
    kilometraje: "68.000 km",
    precio: "$450.000",
    estado: "Disponible",
    ubicacion: "En taller",
    peritado: false,
  },
  {
    dominio: "AE333XS",
    vehiculo: "Chevrolet Onix",
    version: "Premier",
    tipo: "Auto",
    condicion: "0km",
    anio: "2024",
    color: "Rojo",
    kilometraje: "0 km",
    precio: "$195.000",
    estado: "Reservado",
    ubicacion: "A ingresar",
    peritado: false,
  },
];

export default function VehiculosPage() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [items, setItems] = useState([{ nombre: "", tipo: "Estética" }]);

  const handlePeritaje = (vehiculo) => {
    if (vehiculo.peritado) {
      navigate(`/ficha-tecnica/${vehiculo.fichaId}`);
    } else {
      setVehiculoSeleccionado(vehiculo);
      setItems([{ nombre: "", tipo: "Estética" }]);
      setOpenModal(true);
    }
  };

  const agregarItem = () => {
    setItems([...items, { nombre: "", tipo: "Estética" }]);
  };

  const actualizarItem = (index, field, value) => {
    const nuevosItems = [...items];
    nuevosItems[index][field] = value;
    setItems(nuevosItems);
  };

  const crearFicha = () => {
    console.log("Crear ficha:", {
      vehiculo: vehiculoSeleccionado,
      items,
    });

    setOpenModal(false);
    navigate("/ficha-tecnica/1");
  };

  return (
    <section className="w-full">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3263]">
            Gestión de Vehículos
          </h1>
          <p className="text-[#357eb8]">
            Administra el inventario de vehículos
          </p>
        </div>

        <Link
          to="/vehiculos/nuevo"
          className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white shadow hover:bg-[#219b8f]"
        >
          <Plus size={18} />
          Agregar Vehículo
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="Total Vehículos" value="8" icon={Car} />
        <MetricCard title="Disponibles" value="4" icon={CheckCircle} highlight />
        <MetricCard title="Reservados" value="2" icon={Clock} warning />
        <MetricCard title="Valor Total" value="$2.8M" icon={CircleDollarSign} />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#acbac4]/40 p-6">
          <h2 className="text-xl font-bold text-[#1a3263]">
            Inventario de Vehículos
          </h2>
        </div>

        <div className="p-6">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />
              <input
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar por dominio, marca o modelo..."
              />
            </div>

            <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
              <option>Todos los estados</option>
              <option>Disponible</option>
              <option>Reservado</option>
              <option>Vendido</option>
            </select>

            <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
              <option>Todas las ubicaciones</option>
              <option>A ingresar</option>
              <option>En salón</option>
              <option>En taller</option>
              <option>En chapa y pintura</option>
              <option>En gestoría</option>
            </select>

            <select className="rounded-xl border border-[#acbac4] bg-white px-4 py-3 text-[#1a3263] outline-none">
              <option>Todos los peritajes</option>
              <option>Peritado</option>
              <option>Sin peritar</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1200px] text-left">
              <thead className="bg-[#acbac4]/20 text-[#1a3263]">
                <tr>
                  <th className="p-4">Dominio</th>
                  <th className="p-4">Vehículo</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Condición</th>
                  <th className="p-4">Año</th>
                  <th className="p-4">Color</th>
                  <th className="p-4">Kilometraje</th>
                  <th className="p-4">Precio</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Ubicación</th>
                  <th className="p-4">Peritaje</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {vehiculos.map((vehiculo) => (
                  <tr
                    key={vehiculo.dominio}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-bold">{vehiculo.dominio}</td>

                    <td className="p-4">
                      <p className="font-semibold">{vehiculo.vehiculo}</p>
                      <p className="text-sm text-[#357eb8]">
                        {vehiculo.version}
                      </p>
                    </td>

                    <td className="p-4">{vehiculo.tipo}</td>
                    <td className="p-4">{vehiculo.condicion}</td>
                    <td className="p-4">{vehiculo.anio}</td>
                    <td className="p-4">{vehiculo.color}</td>
                    <td className="p-4">{vehiculo.kilometraje}</td>
                    <td className="p-4 font-semibold">{vehiculo.precio}</td>

                    <td className="p-4">
                      <EstadoBadge estado={vehiculo.estado} />
                    </td>

                    <td className="p-4">
                      <UbicacionBadge ubicacion={vehiculo.ubicacion} />
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handlePeritaje(vehiculo)}
                        className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                          vehiculo.peritado
                            ? "bg-[#26aa9c]/15 text-[#1b7f75] hover:bg-[#26aa9c]/25"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        }`}
                      >
                        {vehiculo.peritado ? "Sí" : "No"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openModal && vehiculoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1a3263]">
                  Nueva ficha técnica
                </h2>
                <p className="text-[#357eb8]">
                  Vehículo seleccionado desde inventario. Cargá los ítems iniciales del peritaje.
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="rounded-full p-2 hover:bg-[#acbac4]/20"
              >
                <X size={22} className="text-[#1a3263]" />
              </button>
            </div>

            <div className="mb-6 rounded-2xl border border-[#acbac4]/50 bg-[#acbac4]/10 p-5">
              <p className="text-sm text-[#357eb8]">Vehículo</p>
              <p className="text-xl font-bold text-[#1a3263]">
                {vehiculoSeleccionado.vehiculo} {vehiculoSeleccionado.version}
              </p>
              <p className="font-semibold text-[#1a3263]">
                Dominio: {vehiculoSeleccionado.dominio}
              </p>
              <p className="text-sm text-[#357eb8]">
                {vehiculoSeleccionado.anio} · {vehiculoSeleccionado.color} ·{" "}
                {vehiculoSeleccionado.kilometraje}
              </p>
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
                onClick={() => setOpenModal(false)}
                className="rounded-xl border border-[#acbac4] px-5 py-3 font-semibold text-[#1a3263]"
              >
                Cancelar
              </button>

              <button
                onClick={crearFicha}
                className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
              >
                Crear ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function MetricCard({ title, value, icon: Icon, highlight = false, warning = false }) {
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
    Disponible: "bg-[#26aa9c]/15 text-[#1b7f75]",
    Reservado: "bg-yellow-100 text-yellow-700",
    Vendido: "bg-[#acbac4]/25 text-[#1a3263]",
  };

  return (
    <span
      className={`rounded-lg px-3 py-1 text-sm font-medium ${
        styles[estado] || "bg-[#acbac4]/25 text-[#1a3263]"
      }`}
    >
      {estado}
    </span>
  );
}

function UbicacionBadge({ ubicacion }) {
  const styles = {
    "A ingresar": "bg-yellow-100 text-yellow-700",
    "En salón": "bg-[#26aa9c]/15 text-[#1b7f75]",
    "En taller": "bg-blue-100 text-blue-700",
    "En chapa y pintura": "bg-orange-100 text-orange-700",
    "En gestoría": "bg-purple-100 text-purple-700",
    Vendido: "bg-[#acbac4]/25 text-[#1a3263]",
  };

  return (
    <span
      className={`rounded-lg px-3 py-1 text-sm font-medium ${
        styles[ubicacion] || "bg-[#acbac4]/25 text-[#1a3263]"
      }`}
    >
      {ubicacion}
    </span>
  );
}