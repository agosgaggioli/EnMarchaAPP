import { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function OrdenTrabajoDetallePage() {
  const { id } = useParams();

  const [estado, setEstado] = useState("En proceso");
  const [costoFinal, setCostoFinal] = useState("");
  const [observacionFinal, setObservacionFinal] = useState("");

  const finalizarOrden = () => {
    if (!costoFinal) return;
    setEstado("Finalizada");
    alert("Orden finalizada. Se generó deuda al proveedor y se actualizó el costo del vehículo.");
  };

  return (
    <section className="w-full">
      <div className="mb-8">
        <Link
          to="/ordenes-trabajo"
          className="mb-3 inline-flex items-center gap-2 text-sm text-[#357eb8] hover:text-[#1a3263]"
        >
          <ArrowLeft size={16} />
          Volver a Órdenes de Trabajo
        </Link>

        <h1 className="text-3xl font-bold text-[#1a3263]">
          Orden de Trabajo {id}
        </h1>
        <p className="text-[#357eb8]">
          Revisá el detalle de la orden y finalizala cargando el costo final.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <Card title="Datos del vehículo">
            <div className="grid gap-4 md:grid-cols-3">
              <Data label="Vehículo" value="Jeep Commander Limited" />
              <Data label="Dominio" value="AF678HL" />
              <Data label="Ubicación" value="En taller" />
              <Data label="Marca" value="Jeep" />
              <Data label="Modelo" value="Commander" />
              <Data label="Versión" value="Limited" />
            </div>
          </Card>

          <Card title="Ítems incluidos">
            <div className="space-y-3">
              {["Cambio de parabrisas", "Pintar capot"].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[#acbac4]/50 bg-[#acbac4]/10 p-4"
                >
                  <p className="font-semibold text-[#1a3263]">{item}</p>
                  <p className="text-sm text-[#357eb8]">Derivado de ficha técnica</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Proveedor y responsable">
            <div className="grid gap-4 md:grid-cols-2">
              <Data label="Proveedor / taller" value="Leandro Olivera" />
              <Data label="Responsable interno" value="Cesar Fandiño" />
              <Data label="Costo estimado" value="$180.000" />
              <Data label="Estado actual" value={estado} />
            </div>
          </Card>
        </div>

        <aside className="rounded-2xl border border-[#acbac4]/50 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <p className="text-sm text-[#357eb8]">Estado</p>
            <EstadoBadge estado={estado} />
          </div>

          <h2 className="mb-4 text-xl font-bold text-[#1a3263]">
            Finalizar orden
          </h2>

          <label className="mb-4 block">
            <span className="mb-1 block font-semibold text-[#1a3263]">
              Costo final
            </span>
            <input
              value={costoFinal}
              onChange={(e) => setCostoFinal(e.target.value)}
              disabled={estado === "Finalizada"}
              placeholder="Ej: 195000"
              className="w-full rounded-xl border border-[#acbac4] px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20 disabled:bg-[#acbac4]/20"
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-1 block font-semibold text-[#1a3263]">
              Observación de cierre
            </span>
            <textarea
              rows="4"
              value={observacionFinal}
              onChange={(e) => setObservacionFinal(e.target.value)}
              disabled={estado === "Finalizada"}
              placeholder="Ej: Trabajo realizado, se reemplazó parabrisas y se pintó capot."
              className="w-full rounded-xl border border-[#acbac4] px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20 disabled:bg-[#acbac4]/20"
            />
          </label>

          <button
            onClick={finalizarOrden}
            disabled={estado === "Finalizada" || !costoFinal}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f] disabled:opacity-40"
          >
            <CheckCircle size={18} />
            Finalizar orden
          </button>

          {estado === "Finalizada" && (
            <div className="mt-5 rounded-xl border border-[#26aa9c]/40 bg-[#26aa9c]/10 p-4 text-sm text-[#1b7f75]">
              Orden finalizada. El costo final se suma al costo del vehículo y genera deuda pendiente al proveedor.
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/50 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-[#1a3263]">{title}</h2>
      {children}
    </div>
  );
}

function Data({ label, value }) {
  return (
    <div>
      <p className="text-sm text-[#357eb8]">{label}</p>
      <p className="font-semibold text-[#1a3263]">{value}</p>
    </div>
  );
}

function EstadoBadge({ estado }) {
  const styles = {
    Pendiente: "bg-[#acbac4]/30 text-[#1a3263]",
    "En proceso": "bg-[#357eb8]/15 text-[#245f91]",
    Finalizada: "bg-[#26aa9c]/15 text-[#1b7f75]",
    Cancelada: "bg-red-100 text-red-700",
  };

  return (
    <span className={`inline-flex rounded-lg px-3 py-1 text-sm font-semibold ${styles[estado]}`}>
      {estado}
    </span>
  );
}