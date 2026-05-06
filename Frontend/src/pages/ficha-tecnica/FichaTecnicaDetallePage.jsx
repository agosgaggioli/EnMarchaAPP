import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Package,
  Wrench,
  X,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";

const vehiculoFicha = {
  marca: "JEEP",
  modelo: "COMMANDER",
  version: "LIMITED",
  dominio: "AF678HL",
  color: "NEGRO",
  kilometros: "68700",
};

export default function FichaTecnicaDetallePage() {
  const [showOrdenModal, setShowOrdenModal] = useState(false);
  const [showRepuestoModal, setShowRepuestoModal] = useState(false);

  const [items, setItems] = useState([
    { nombre: "LAVAR MOTOR", tipo: "Estética", estado: "Pendiente" },
    { nombre: "Limpieza interior", tipo: "Estética", estado: "Pendiente" },
    { nombre: "PINTAR CAPOT", tipo: "Estética", estado: "Finalizado" },
    { nombre: "CAMBIO DE ACEITE", tipo: "Mecánica", estado: "Pendiente" },
    { nombre: "Cambio de parabrisas", tipo: "Estética", estado: "En proceso" },
  ]);

  const [repuestos, setRepuestos] = useState([
    { nombre: "Filtro de aceite", estado: "Pendiente" },
  ]);

  const [orden, setOrden] = useState({
    proveedor: "",
    responsable: "",
    costoEstimado: "",
    observaciones: "",
    itemsSeleccionados: [],
  });

  const [compraRepuesto, setCompraRepuesto] = useState({
    repuesto: "",
    proveedor: "",
    costoEstimado: "",
    observaciones: "",
  });

  const itemsPendientes = items.filter((item) => item.estado === "Pendiente");

  const resumen = useMemo(() => {
    return {
      pendientes: items.filter((i) => i.estado === "Pendiente").length,
      proceso: items.filter((i) => i.estado === "En proceso").length,
      finalizados: items.filter((i) => i.estado === "Finalizado").length,
      esteticaPendiente: items.filter(
        (i) => i.tipo === "Estética" && i.estado === "Pendiente"
      ).length,
      mecanicaPendiente: items.filter(
        (i) => i.tipo === "Mecánica" && i.estado === "Pendiente"
      ).length,
    };
  }, [items]);

  const agregarItem = () => {
    setItems([
      ...items,
      { nombre: "Nuevo item", tipo: "Mecánica", estado: "Pendiente" },
    ]);
  };

  const agregarRepuesto = () => {
    setRepuestos([
      ...repuestos,
      { nombre: "Nuevo repuesto", estado: "Pendiente" },
    ]);
  };

  const toggleItemOrden = (itemNombre) => {
    const yaExiste = orden.itemsSeleccionados.includes(itemNombre);

    setOrden({
      ...orden,
      itemsSeleccionados: yaExiste
        ? orden.itemsSeleccionados.filter((item) => item !== itemNombre)
        : [...orden.itemsSeleccionados, itemNombre],
    });
  };

  const crearOrden = () => {
    console.log("Orden creada:", {
      vehiculo: vehiculoFicha,
      orden,
    });

    setShowOrdenModal(false);
    setOrden({
      proveedor: "",
      responsable: "",
      costoEstimado: "",
      observaciones: "",
      itemsSeleccionados: [],
    });
  };

  const registrarCompraRepuesto = () => {
    console.log("Compra repuesto:", {
      vehiculo: vehiculoFicha,
      compraRepuesto,
    });

    setRepuestos([
      ...repuestos,
      { nombre: compraRepuesto.repuesto, estado: "Pendiente" },
    ]);

    setShowRepuestoModal(false);
    setCompraRepuesto({
      repuesto: "",
      proveedor: "",
      costoEstimado: "",
      observaciones: "",
    });
  };

  return (
    <section className="w-full">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <Link
            to="/ficha-tecnica"
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#357eb8] hover:text-[#1a3263]"
          >
            <ArrowLeft size={16} />
            Volver a Ficha Técnica
          </Link>

          <h1 className="text-4xl font-bold text-[#1a3263]">
            Hoja peritaje #38
          </h1>

          <p className="mt-2 text-2xl font-semibold text-[#1a3263]">
            Encargado: Cesar Fandiño
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => setShowOrdenModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#357eb8] px-5 py-3 font-semibold text-white hover:bg-[#2f6ea0]"
            >
              <ClipboardList size={18} />
              Crear orden
            </button>

            <button
              onClick={() => setShowRepuestoModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
            >
              <Package size={18} />
              Comprar repuesto
            </button>
          </div>
        </div>

        <p className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#357eb8] shadow-sm">
          Modificado 06/01/2026, 05:25 p. m.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div>
          <div className="rounded-[2rem] border border-[#acbac4] bg-white p-8 shadow-sm">
            <div className="grid grid-cols-3 gap-8 text-center">
              <Info label="Marca" value={vehiculoFicha.marca} />
              <Info label="Modelo" value={vehiculoFicha.modelo} />
              <Info label="Versión" value={vehiculoFicha.version} />
              <Info label="Dominio" value={vehiculoFicha.dominio} />
              <Info label="Color" value={vehiculoFicha.color} />
              <Info label="Kilómetros" value={vehiculoFicha.kilometros} />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={agregarItem}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1a3263] px-5 py-3 font-semibold text-white hover:bg-[#14264c]"
            >
              <Plus size={18} />
              Agregar item
            </button>

            <button
              onClick={agregarRepuesto}
              className="inline-flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
            >
              <Package size={18} />
              Agregar repuesto
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-[#acbac4]/20 text-[#1a3263]">
                <tr>
                  <th className="p-4">Ítem</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Estado</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-[#acbac4]/30 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-semibold">{item.nombre}</td>
                    <td className="p-4">{item.tipo}</td>
                    <td className="p-4">
                      <EstadoBadge estado={item.estado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="mb-8 grid grid-cols-3 gap-4">
            <ResumenCard
              value={resumen.proceso}
              label="En proceso"
              className="bg-[#26aa9c] text-white"
            />
            <ResumenCard
              value={resumen.pendientes}
              label="Pendientes"
              className="border border-[#acbac4] bg-white text-[#1a3263]"
            />
            <ResumenCard
              value={resumen.finalizados}
              label="Finalizados"
              className="bg-[#357eb8] text-white"
            />
          </div>

          <div className="mb-8 rounded-2xl bg-white p-6 text-center shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#1a3263]">
              Pendientes
            </h2>

            <div className="flex justify-center gap-3">
              <span className="rounded-xl border border-[#357eb8] px-4 py-2 font-bold text-[#357eb8]">
                {resumen.esteticaPendiente} estética
              </span>
              <span className="rounded-xl border border-[#1a3263] px-4 py-2 font-bold text-[#1a3263]">
                {resumen.mecanicaPendiente} mecánica
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#acbac4]/40 p-5">
              <Wrench size={20} className="text-[#1a3263]" />
              <h2 className="text-xl font-bold text-[#1a3263]">Repuestos</h2>
            </div>

            <table className="w-full text-left">
              <thead className="bg-[#acbac4]/15 text-[#1a3263]">
                <tr>
                  <th className="p-4">Repuesto</th>
                  <th className="p-4">Estado</th>
                </tr>
              </thead>

              <tbody>
                {repuestos.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="p-5 italic text-[#357eb8]">
                      No hay repuestos cargados.
                    </td>
                  </tr>
                ) : (
                  repuestos.map((repuesto, index) => (
                    <tr key={index} className="border-t border-[#acbac4]/30">
                      <td className="p-4 font-semibold text-[#1a3263]">
                        {repuesto.nombre}
                      </td>
                      <td className="p-4">
                        <EstadoBadge estado={repuesto.estado} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showOrdenModal && (
        <ModalNuevaOrden
          vehiculo={vehiculoFicha}
          itemsPendientes={itemsPendientes}
          orden={orden}
          setOrden={setOrden}
          toggleItemOrden={toggleItemOrden}
          onClose={() => setShowOrdenModal(false)}
          onSave={crearOrden}
        />
      )}

      {showRepuestoModal && (
        <ModalCompraRepuesto
          vehiculo={vehiculoFicha}
          compraRepuesto={compraRepuesto}
          setCompraRepuesto={setCompraRepuesto}
          onClose={() => setShowRepuestoModal(false)}
          onSave={registrarCompraRepuesto}
        />
      )}
    </section>
  );
}

function ModalNuevaOrden({
  vehiculo,
  itemsPendientes,
  orden,
  setOrden,
  toggleItemOrden,
  onClose,
  onSave,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
        <ModalHeader
          title="Nueva orden de trabajo"
          subtitle="El vehículo ya viene asociado desde la ficha técnica."
          onClose={onClose}
        />

        <VehiculoSeleccionado vehiculo={vehiculo} />

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block font-semibold text-[#1a3263]">
              Proveedor / taller
            </span>
            <select
              value={orden.proveedor}
              onChange={(e) =>
                setOrden({ ...orden, proveedor: e.target.value })
              }
              className="input-base"
            >
              <option value="">Seleccionar</option>
              <option>Leandro Olivera</option>
              <option>Chapa y Pintura Córdoba</option>
              <option>Taller El Rápido</option>
            </select>
          </label>

          <InputBase
            label="Responsable interno"
            placeholder="Ej: Cesar Fandiño"
            value={orden.responsable}
            onChange={(value) => setOrden({ ...orden, responsable: value })}
          />

          <InputBase
            label="Costo estimado"
            placeholder="Ej: 180000"
            value={orden.costoEstimado}
            onChange={(value) => setOrden({ ...orden, costoEstimado: value })}
          />
        </div>

        <div className="mt-7">
          <h3 className="mb-3 text-xl font-bold text-[#1a3263]">
            Ítems pendientes de esta ficha
          </h3>

          <div className="rounded-2xl border border-[#acbac4]/50 bg-[#f8fafc] p-4">
            {itemsPendientes.length === 0 ? (
              <p className="text-[#357eb8]">
                No hay ítems pendientes para generar una orden.
              </p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {itemsPendientes.map((item) => (
                  <label
                    key={item.nombre}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-[#acbac4]/50 bg-white p-4"
                  >
                    <div>
                      <p className="font-semibold text-[#1a3263]">
                        {item.nombre}
                      </p>
                      <p className="text-sm text-[#357eb8]">{item.tipo}</p>
                    </div>

                    <input
                      type="checkbox"
                      checked={orden.itemsSeleccionados.includes(item.nombre)}
                      onChange={() => toggleItemOrden(item.nombre)}
                      className="h-5 w-5 accent-[#26aa9c]"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <label className="mt-6 block">
          <span className="mb-1 block font-semibold text-[#1a3263]">
            Observaciones
          </span>
          <textarea
            rows="4"
            value={orden.observaciones}
            onChange={(e) =>
              setOrden({ ...orden, observaciones: e.target.value })
            }
            placeholder="Ej: Coordinar retiro del vehículo, revisar repuesto antes de aprobar..."
            className="input-base"
          />
        </label>

        <ModalFooter
          onClose={onClose}
          onSave={onSave}
          saveLabel="Crear orden"
        />
      </div>
    </div>
  );
}

function ModalCompraRepuesto({
  vehiculo,
  compraRepuesto,
  setCompraRepuesto,
  onClose,
  onSave,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
        <ModalHeader
          title="Comprar repuesto"
          subtitle="La compra queda asociada al vehículo y puede generar deuda al proveedor."
          onClose={onClose}
        />

        <VehiculoSeleccionado vehiculo={vehiculo} />

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <InputBase
            label="Repuesto"
            placeholder="Ej: Filtro de aceite"
            value={compraRepuesto.repuesto}
            onChange={(value) =>
              setCompraRepuesto({ ...compraRepuesto, repuesto: value })
            }
          />

          <label className="block">
            <span className="mb-1 block font-semibold text-[#1a3263]">
              Proveedor
            </span>
            <select
              value={compraRepuesto.proveedor}
              onChange={(e) =>
                setCompraRepuesto({
                  ...compraRepuesto,
                  proveedor: e.target.value,
                })
              }
              className="input-base"
            >
              <option value="">Seleccionar</option>
              <option>Birocco Repuestos</option>
              <option>Ferretería Malvinas</option>
              <option>Repuestos Córdoba</option>
            </select>
          </label>

          <InputBase
            label="Costo estimado"
            placeholder="Ej: 45000"
            value={compraRepuesto.costoEstimado}
            onChange={(value) =>
              setCompraRepuesto({
                ...compraRepuesto,
                costoEstimado: value,
              })
            }
          />
        </div>

        <label className="mt-6 block">
          <span className="mb-1 block font-semibold text-[#1a3263]">
            Observaciones
          </span>
          <textarea
            rows="4"
            value={compraRepuesto.observaciones}
            onChange={(e) =>
              setCompraRepuesto({
                ...compraRepuesto,
                observaciones: e.target.value,
              })
            }
            placeholder="Ej: Confirmar disponibilidad antes de aprobar la compra..."
            className="input-base"
          />
        </label>

        <ModalFooter
          onClose={onClose}
          onSave={onSave}
          saveLabel="Guardar compra"
        />
      </div>
    </div>
  );
}

function VehiculoSeleccionado({ vehiculo }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/50 bg-[#acbac4]/10 p-5">
      <p className="text-sm text-[#357eb8]">Vehículo asociado</p>
      <p className="text-xl font-bold text-[#1a3263]">
        {vehiculo.marca} {vehiculo.modelo} {vehiculo.version}
      </p>
      <p className="font-semibold text-[#1a3263]">
        Dominio: {vehiculo.dominio}
      </p>
      <p className="text-sm text-[#357eb8]">
        Color {vehiculo.color} · {vehiculo.kilometros} km
      </p>
    </div>
  );
}

function ModalHeader({ title, subtitle, onClose }) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h2 className="text-3xl font-bold text-[#1a3263]">{title}</h2>
        <p className="text-[#357eb8]">{subtitle}</p>
      </div>

      <button
        onClick={onClose}
        className="rounded-full p-2 hover:bg-[#acbac4]/20"
      >
        <X size={24} className="text-[#1a3263]" />
      </button>
    </div>
  );
}

function ModalFooter({ onClose, onSave, saveLabel }) {
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
        className="rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
      >
        {saveLabel}
      </button>
    </div>
  );
}

function InputBase({ label, value, onChange, placeholder = "" }) {
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

function Info({ label, value }) {
  return (
    <div>
      <p className="text-lg font-bold text-[#357eb8]">{label}</p>
      <p className="mt-1 font-bold text-[#1a3263]">{value}</p>
    </div>
  );
}

function ResumenCard({ value, label, className }) {
  return (
    <div className={`rounded-3xl p-7 text-center shadow-sm ${className}`}>
      <p className="text-4xl font-bold">{value}</p>
      <p className="mt-2 text-lg font-bold uppercase">{label}</p>
    </div>
  );
}

function EstadoBadge({ estado }) {
  const styles = {
    Pendiente: "bg-[#acbac4]/30 text-[#1a3263]",
    "En proceso": "bg-[#357eb8]/15 text-[#245f91]",
    Finalizado: "bg-[#26aa9c]/15 text-[#1b7f75]",
    Riesgo: "bg-yellow-100 text-yellow-700",
    Retrasada: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-4 py-1 text-sm font-bold uppercase ${
        styles[estado] || "bg-[#acbac4]/25 text-[#1a3263]"
      }`}
    >
      {estado}
    </span>
  );
}