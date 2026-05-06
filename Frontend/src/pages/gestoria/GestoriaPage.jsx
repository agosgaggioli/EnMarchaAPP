import { useState } from "react";
import {
  Folder,
  Car,
  CheckCircle,
  Clock,
  Search,
  FileText,
} from "lucide-react";

const tramitesIniciales = [
  {
    id: "GT001",
    venta: "VT250",
    cliente: "Arreche Fernando Gabriel",
    vehiculo: "Chevrolet Montana",
    dominio: "Sin dominio",
    tipoUnidad: "0KM",
    tramite: "Patentamiento",
    estado: "A presentar",
  },
  {
    id: "GT002",
    venta: "VT241",
    cliente: "Marchisio Leandro Daniel",
    vehiculo: "Volkswagen Saveiro",
    dominio: "JZJ895",
    tipoUnidad: "Usado",
    tramite: "Transferencia",
    estado: "Transferido",
  },
  {
    id: "GT003",
    venta: "VT245",
    cliente: "Caseres Ariel Agustin",
    vehiculo: "Volkswagen Taos",
    dominio: "Sin dominio",
    tipoUnidad: "0KM",
    tramite: "Carpeta 0KM",
    estado: "A presentar",
   
  },
];

const estados = [
  "A presentar",
  "Presentado",
  "Observado",
  "Transferido",
  "Finalizado",
];

export default function GestoriaPage() {
  const [tramites, setTramites] = useState(tramitesIniciales);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const cambiarEstado = (id, nuevoEstado) => {
    setTramites((prev) =>
      prev.map((tramite) =>
        tramite.id === id ? { ...tramite, estado: nuevoEstado } : tramite
      )
    );
  };

  const tramitesFiltrados = tramites.filter((tramite) => {
    const coincideTipo =
      filtroTipo === "Todos" || tramite.tipoUnidad === filtroTipo;

    const texto = `${tramite.venta} ${tramite.cliente} ${tramite.vehiculo} ${tramite.dominio}`.toLowerCase();

    const coincideBusqueda = texto.includes(busqueda.toLowerCase());

    return coincideTipo && coincideBusqueda;
  });

  return (
    <section className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a3263]">
          Panel de Gestoría
        </h1>
        <p className="text-[#357eb8]">
          Gestioná trámites, documentación y estados de unidades vendidas.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="Trámites totales" value={tramites.length} icon={Folder} />
        <MetricCard
          title="A presentar"
          value={tramites.filter((t) => t.estado === "A presentar").length}
          icon={Clock}
          warning
        />
        <MetricCard
          title="Transferidos"
          value={tramites.filter((t) => t.estado === "Transferido").length}
          icon={CheckCircle}
          highlight
        />
        <MetricCard
          title="Unidades 0KM"
          value={tramites.filter((t) => t.tipoUnidad === "0KM").length}
          icon={Car}
        />
      </div>

      <div className="rounded-2xl border border-[#acbac4]/50 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#acbac4]/40 p-6">
          <div>
            <h2 className="text-xl font-bold text-[#1a3263]">
              Trámites de gestoría
            </h2>
            <p className="text-sm text-[#357eb8]">
              Cambiá el estado del trámite desde la misma grilla.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]">
            <FileText size={18} />
            Ver todos
          </button>
        </div>

        <div className="p-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {["Todos", "0KM", "Usado"].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFiltroTipo(tipo)}
                className={`rounded-xl px-4 py-2 font-semibold transition ${
                  filtroTipo === tipo
                    ? "bg-[#1a3263] text-white"
                    : "border border-[#acbac4] bg-white text-[#1a3263] hover:bg-[#acbac4]/15"
                }`}
              >
                {tipo}
              </button>
            ))}

            <div className="ml-auto flex min-w-[360px] flex-1 items-center gap-2 rounded-xl border border-[#acbac4] bg-white px-4 py-3">
              <Search size={20} className="text-[#357eb8]" />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full outline-none placeholder:text-[#acbac4]"
                placeholder="Buscar por N° venta, cliente, vehículo o dominio..."
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#acbac4]/60">
            <table className="w-full min-w-[1200px] text-left">
              <thead className="bg-[#1a3263] text-white">
                <tr>
                  <th className="p-4">Venta</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Unidad</th>
                  <th className="p-4">Dominio</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Trámite</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Cambiar estado</th>
                </tr>
              </thead>

              <tbody className="text-[#1a3263]">
                {tramitesFiltrados.map((tramite) => (
                  <tr
                    key={tramite.id}
                    className="border-t border-[#acbac4]/40 hover:bg-[#acbac4]/10"
                  >
                    <td className="p-4 font-bold">{tramite.venta}</td>
                    <td className="p-4 font-semibold">{tramite.cliente}</td>
                    <td className="p-4">
                      <p className="font-semibold">{tramite.vehiculo}</p>
                      <p className="text-sm text-[#357eb8]">
                        {tramite.observacion}
                      </p>
                    </td>
                    <td className="p-4">{tramite.dominio}</td>
                    <td className="p-4">
                      <TipoBadge tipo={tramite.tipoUnidad} />
                    </td>
                    <td className="p-4">{tramite.tramite}</td>
                    <td className="p-4">
                      <EstadoBadge estado={tramite.estado} />
                    </td>
                    <td className="p-4">
                      <select
                        value={tramite.estado}
                        onChange={(e) =>
                          cambiarEstado(tramite.id, e.target.value)
                        }
                        className="rounded-xl border border-[#acbac4] bg-white px-4 py-2 text-[#1a3263] outline-none focus:border-[#357eb8] focus:ring-2 focus:ring-[#357eb8]/20"
                      >
                        {estados.map((estado) => (
                          <option key={estado}>{estado}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
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

function TipoBadge({ tipo }) {
  const styles = {
    "0KM": "bg-[#357eb8]/15 text-[#245f91]",
    Usado: "bg-[#26aa9c]/15 text-[#1b7f75]",
  };

  return (
    <span
      className={`rounded-lg px-3 py-1 text-sm font-semibold ${
        styles[tipo] || "bg-[#acbac4]/25 text-[#1a3263]"
      }`}
    >
      {tipo}
    </span>
  );
}

function EstadoBadge({ estado }) {
  const styles = {
    "A presentar": "bg-yellow-100 text-yellow-700",
    Presentado: "bg-[#357eb8]/15 text-[#245f91]",
    Observado: "bg-orange-100 text-orange-700",
    Transferido: "bg-[#26aa9c]/15 text-[#1b7f75]",
    Finalizado: "bg-green-100 text-green-700",
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