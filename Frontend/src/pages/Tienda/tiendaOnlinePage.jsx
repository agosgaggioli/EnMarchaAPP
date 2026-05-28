import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Share2,
  Trash2,
  X,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const unidades = [
  {
    id: 1,
    marca: "BAIC",
    modelo: "X55",
    version: "X55 II",
    anio: 2026,
    tipo: "SUV",
    color: "A consultar",
    precio: 0,
    imagen:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=1200",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
    ],
  },
  {
    id: 2,
    marca: "JEEP",
    modelo: "Commander",
    version: "1.3T 270",
    anio: 2022,
    tipo: "SUV",
    color: "Negro",
    precio: 0,
    imagen:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200",
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?q=80&w=1200",
    ],
  },
  {
    id: 3,
    marca: "CITROEN",
    modelo: "C4 Lounge",
    version: "1.6 THP Shine AT6",
    anio: 2019,
    tipo: "Sedan 4 puertas",
    color: "Rojo",
    precio: 0,
    imagen:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200",
    ],
  },
  {
    id: 4,
    marca: "FORD",
    modelo: "Ranger",
    version: "2.0 DC 4X4 XLT",
    anio: 2026,
    tipo: "Pickup",
    color: "Gris",
    precio: 0,
    imagen:
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?q=80&w=1200",
    imagenes: [
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?q=80&w=1200",
    ],
  },
];

const marcas = [
  "Todas las marcas",
  ...new Set(unidades.map((u) => u.marca)),
];

const tipos = [
  "Sedan 5 puertas",
  "Sedan 4 puertas",
  "Pickup",
  "Utilitario",
  "SUV",
  "Todo terreno",
];

const formatMoney = (value) =>
  value === 0
    ? "$ 0"
    : new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }).format(value);

export default function TiendaOnlinePage() {
  const [busqueda, setBusqueda] = useState("");
  const [marca, setMarca] = useState("Todas las marcas");
  const [tipoSeleccionado, setTipoSeleccionado] = useState([]);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);

  const unidadesFiltradas = useMemo(() => {
    return unidades.filter((unidad) => {
      const coincideBusqueda =
        `${unidad.marca} ${unidad.modelo} ${unidad.version} ${unidad.anio}`
          .toLowerCase()
          .includes(busqueda.toLowerCase());

      const coincideMarca =
        marca === "Todas las marcas" || unidad.marca === marca;

      const coincideTipo =
        tipoSeleccionado.length === 0 ||
        tipoSeleccionado.includes(unidad.tipo);

      return coincideBusqueda && coincideMarca && coincideTipo;
    });
  }, [busqueda, marca, tipoSeleccionado]);

  const toggleTipo = (tipo) => {
    setTipoSeleccionado((prev) =>
      prev.includes(tipo)
        ? prev.filter((item) => item !== tipo)
        : [...prev, tipo]
    );
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setMarca("Todas las marcas");
    setTipoSeleccionado([]);
  };

  return (
    <section className="min-h-screen bg-[#f4f7f8]">
      <header className="sticky top-0 z-20 border-b border-[#acbac4]/30 bg-white/95 px-8 py-5 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1a3263] text-sm font-bold text-white shadow">
              degrá
            </div>

            <div>
              <p className="font-semibold text-[#26aa9c]">Tienda online</p>
              <h1 className="text-2xl font-bold text-[#1a3263]">
                Unidades publicadas
              </h1>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-[#acbac4]/60 bg-[#f8fafc] px-5 py-3">
              <Search size={20} className="text-[#357eb8]" />

              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar marca, modelo o versión"
                className="w-full bg-transparent text-[#1a3263] outline-none placeholder:text-[#8a99ad]"
              />
            </div>

            <button className="inline-flex items-center gap-2 rounded-2xl border border-[#357eb8]/40 bg-white px-5 py-3 font-semibold text-[#357eb8] hover:bg-[#357eb8]/10">
              <Share2 size={18} />
              Compartir
            </button>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-6 p-8 xl:grid-cols-[290px_1fr]">
        <aside className="h-fit rounded-3xl border border-[#acbac4]/40 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-[#26aa9c]" />

            <h2 className="text-xl font-bold text-[#1a3263]">
              Filtrar unidades
            </h2>
          </div>

          <div className="mb-5 border-t border-[#acbac4]/30 pt-5">
            <label className="mb-2 block text-sm font-bold uppercase text-[#6b7c93]">
              Marca
            </label>

            <select
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="w-full rounded-xl border border-[#acbac4]/60 bg-white px-4 py-3 text-[#1a3263] outline-none focus:border-[#357eb8]"
            >
              {marcas.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="mb-3 block text-sm font-bold uppercase text-[#6b7c93]">
              Tipo de vehículo
            </label>

            <div className="space-y-3 rounded-xl border border-[#acbac4]/40 bg-[#f8fafc] p-3">
              {tipos.map((tipo) => (
                <label
                  key={tipo}
                  className="flex cursor-pointer items-center gap-3 text-sm font-semibold uppercase text-[#4b5563]"
                >
                  <input
                    type="checkbox"
                    checked={tipoSeleccionado.includes(tipo)}
                    onChange={() => toggleTipo(tipo)}
                    className="h-4 w-4"
                  />
                  {tipo}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={limpiarFiltros}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-300 px-4 py-3 font-semibold text-red-600 hover:bg-red-50"
          >
            <Trash2 size={17} />
            Limpiar filtros
          </button>
        </aside>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#1a3263]">
                Stock disponible
              </h2>

              <p className="text-sm text-[#357eb8]">
                {unidadesFiltradas.length} unidades publicadas
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-4">
            {unidadesFiltradas.map((unidad) => (
              <div
                key={unidad.id}
                onClick={() => setUnidadSeleccionada(unidad)}
                className="cursor-pointer"
              >
                <UnidadCard unidad={unidad} />
              </div>
            ))}
          </div>
        </section>
      </main>

      {unidadSeleccionada && (
        <DetalleUnidadModal
          unidad={unidadSeleccionada}
          onClose={() => setUnidadSeleccionada(null)}
        />
      )}
    </section>
  );
}

function UnidadCard({ unidad }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-[#acbac4]/30 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden bg-[#e8eef3]">
        <img
          src={unidad.imagen}
          alt={`${unidad.marca} ${unidad.modelo}`}
          className="h-full w-full object-cover"
        />

        <span className="absolute right-3 top-3 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#1a3263] shadow">
          {unidad.anio}
        </span>

        <span className="absolute left-3 top-3 rounded-full bg-[#1a3263] px-3 py-1 text-xs font-bold uppercase text-white">
          {unidad.tipo}
        </span>
      </div>

      <div className="p-5">
        <p className="mb-2 text-xs font-bold uppercase text-[#6b7c93]">
          {unidad.tipo}
        </p>

        <h3 className="min-h-[56px] text-lg font-extrabold uppercase leading-tight text-[#1a3263]">
          {unidad.marca} {unidad.modelo} {unidad.version}
        </h3>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-2xl font-bold text-[#357eb8]">
            {formatMoney(unidad.precio)}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#357eb8]/40 text-[#357eb8]">
            <Search size={18} />
          </div>
        </div>
      </div>
    </article>
  );
}

function DetalleUnidadModal({ unidad, onClose }) {
  const [imagenActual, setImagenActual] = useState(0);

  const siguiente = () => {
    setImagenActual((prev) =>
      prev === unidad.imagenes.length - 1 ? 0 : prev + 1
    );
  };

  const anterior = () => {
    setImagenActual((prev) =>
      prev === 0 ? unidad.imagenes.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-5">
      <div className="relative max-h-[92vh] w-full max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full bg-white p-2 text-[#6b7c93] shadow hover:text-[#1a3263]"
        >
          <X size={26} />
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr]">
          <div className="flex gap-4 bg-[#f8fafc] p-6">
            <div className="hidden w-20 space-y-3 xl:block">
              {unidad.imagenes.map((img, index) => (
                <button
                  key={img}
                  onClick={() => setImagenActual(index)}
                  className={`h-20 w-20 overflow-hidden rounded-xl border-2 bg-white ${
                    imagenActual === index
                      ? "border-[#357eb8]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="relative flex-1 overflow-hidden rounded-2xl bg-white">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-[#1a3263] px-4 py-2 text-sm font-bold uppercase text-white shadow">
                {unidad.tipo}
              </span>

              <img
                src={unidad.imagenes[imagenActual]}
                alt={unidad.modelo}
                className="h-[560px] w-full object-cover"
              />

              <button
                onClick={anterior}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={siguiente}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="p-8 xl:p-10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold uppercase text-[#1a3263]">
                  {unidad.marca} {unidad.modelo}
                </h2>

                <p className="mt-2 text-xl text-[#6b7c93]">
                  {unidad.version}
                </p>
              </div>

              <button className="rounded-full border border-[#357eb8]/30 p-3 text-[#357eb8] hover:bg-[#357eb8]/10">
                <Share2 size={22} />
              </button>
            </div>

            <div className="mb-8 grid grid-cols-2 divide-x divide-[#acbac4]/50 border-y border-[#acbac4]/40 py-5">
              <div>
                <p className="text-sm font-bold uppercase text-[#6b7c93]">
                  Año
                </p>
                <p className="text-2xl font-bold text-[#1a3263]">
                  {unidad.anio}
                </p>
              </div>

              <div className="pl-8">
                <p className="text-sm font-bold uppercase text-[#6b7c93]">
                  Color
                </p>
                <p className="text-2xl font-bold uppercase text-[#1a3263]">
                  {unidad.color}
                </p>
              </div>
            </div>

            <h3 className="mb-4 text-xl font-bold text-[#1a3263]">
              ¿Consultar por esta unidad?
            </h3>

            <div className="space-y-3">
              <input
                placeholder="Nombre completo"
                className="w-full rounded-2xl border border-transparent bg-[#f4f7f8] px-5 py-4 text-[#1a3263] outline-none focus:border-[#357eb8]"
              />

              <input
                placeholder="Apellido"
                className="w-full rounded-2xl border border-transparent bg-[#f4f7f8] px-5 py-4 text-[#1a3263] outline-none focus:border-[#357eb8]"
              />

              <input
                placeholder="WhatsApp / Teléfono"
                className="w-full rounded-2xl border border-transparent bg-[#f4f7f8] px-5 py-4 text-[#1a3263] outline-none focus:border-[#357eb8]"
              />

              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#357eb8] px-5 py-4 text-lg font-bold text-white shadow hover:bg-[#1a3263]">
                Solicitar información
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}