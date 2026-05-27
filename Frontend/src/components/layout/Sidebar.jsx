import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Car,
  ClipboardList,
  Wrench,
  ShoppingCart,
  FileCheck,
  Calculator,
  Settings,
  ChevronDown,
  ChevronRight,
  Building2,
  CalendarDays,
  BookOpen,
  Truck,
  WalletCards,
  BarChart3,
  ReceiptText,
  Wallet,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Clientes",
    path: "/clientes",
    icon: Users,
  },
  {
    label: "Gestoría",
    path: "/gestoria",
    icon: FileCheck,
  },
];

const vehiculosItems = [
  {
    label: "Inventario",
    path: "/vehiculos",
    icon: Car,
  },
  {
    label: "Ficha Técnica",
    path: "/ficha-tecnica",
    icon: ClipboardList,
  },
  {
    label: "Órdenes Trabajo",
    path: "/ordenes-trabajo",
    icon: Wrench,
  },
];

const comprasItems = [
  {
    label: "Compras",
    path: "/compras",
    icon: ShoppingCart,
  },
  {
    label: "Turnos búsqueda",
    path: "/busquedas",
    icon: Truck,
  },
];

const ventasItems = [
  {
    label: "Ventas",
    path: "/ventas",
    icon: ShoppingCart,
  },
  {
    label: "Turnos entrega",
    path: "/entregas",
    icon: CalendarDays,
  },
];

const estadosCuentaItems = [
  {
    label: "Dashboard",
    path: "/contabilidad/estados-cuenta",
    icon: BarChart3,
  },
  {
    label: "Clientes",
    path: "/contabilidad/estados-cuenta/clientes",
    icon: Users,
  },
  {
    label: "Proveedores",
    path: "/contabilidad/estados-cuenta/proveedores",
    icon: Building2,
  },
];

const contabilidadItems = [
  {
    label: "Libro Diario",
    path: "/contabilidad/libro-diario",
    icon: BookOpen,
  },
  {
    label: "Cheques",
    path: "/contabilidad/cheques",
    icon: ReceiptText,
  },
  {
    label: "Gastos Fijos",
    path: "/contabilidad/gastos-fijos",
    icon: Wallet,
  },
];

export default function Sidebar() {
  const [openVehiculos, setOpenVehiculos] = useState(true);
  const [openCompras, setOpenCompras] = useState(false);
  const [openVentas, setOpenVentas] = useState(false);
  const [openContabilidad, setOpenContabilidad] = useState(true);
  const [openEstadosCuenta, setOpenEstadosCuenta] = useState(true);

  return (
    <aside className="min-h-[calc(100vh-72px)] w-64 shrink-0 border-r border-[#acbac4] bg-[#1a3263] px-4 py-6 text-white">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#26aa9c]">
          <Car size={23} className="text-white" />
        </div>

        <div>
          <p className="font-bold">En Marcha</p>
          <p className="text-xs text-[#acbac4]">
            ERP Automotor
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        <NavList items={menu.slice(0, 2)} />

        <Dropdown
          label="Vehículos"
          icon={Car}
          open={openVehiculos}
          setOpen={setOpenVehiculos}
          items={vehiculosItems}
        />

        <Dropdown
          label="Compras"
          icon={Truck}
          open={openCompras}
          setOpen={setOpenCompras}
          items={comprasItems}
        />

        <Dropdown
          label="Ventas"
          icon={ShoppingCart}
          open={openVentas}
          setOpen={setOpenVentas}
          items={ventasItems}
        />

        <NavList items={menu.slice(2)} />

        <div>
          <button
            type="button"
            onClick={() =>
              setOpenContabilidad(!openContabilidad)
            }
            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
              openContabilidad
                ? "bg-[#357eb8] text-white"
                : "text-[#acbac4] hover:bg-[#357eb8]/35 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-3">
              <Calculator size={20} />
              Contabilidad
            </span>

            {openContabilidad ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {openContabilidad && (
            <div className="mt-2 space-y-2 pl-5">
              {contabilidadItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-[#26aa9c] text-white"
                          : "text-[#acbac4] hover:bg-[#357eb8]/25 hover:text-white"
                      }`
                    }
                  >
                    <Icon size={17} />
                    {item.label}
                  </NavLink>
                );
              })}

              <div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenEstadosCuenta(!openEstadosCuenta)
                  }
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    openEstadosCuenta
                      ? "bg-[#357eb8]/40 text-white"
                      : "text-[#acbac4] hover:bg-[#357eb8]/25 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <WalletCards size={17} />
                    Estados cuenta
                  </span>

                  {openEstadosCuenta ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>

                {openEstadosCuenta && (
                  <div className="mt-2 space-y-2 pl-5">
                    {estadosCuentaItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition ${
                              isActive
                                ? "bg-[#26aa9c] text-white"
                                : "text-[#acbac4] hover:bg-[#357eb8]/25 hover:text-white"
                            }`
                          }
                        >
                          <Icon size={15} />
                          {item.label}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <NavLink
          to="/configuracion"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-[#357eb8] text-white"
                : "text-[#acbac4] hover:bg-[#357eb8]/35 hover:text-white"
            }`
          }
        >
          <Settings size={20} />
          Configuración
        </NavLink>
      </nav>
    </aside>
  );
}

function NavList({ items }) {
  return (
    <>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-[#357eb8] text-white"
                  : "text-[#acbac4] hover:bg-[#357eb8]/35 hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            {item.label}
          </NavLink>
        );
      })}
    </>
  );
}

function Dropdown({
  label,
  icon: Icon,
  open,
  setOpen,
  items,
}) {
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
          open
            ? "bg-[#357eb8] text-white"
            : "text-[#acbac4] hover:bg-[#357eb8]/35 hover:text-white"
        }`}
      >
        <span className="flex items-center gap-3">
          <Icon size={20} />
          {label}
        </span>

        {open ? (
          <ChevronDown size={18} />
        ) : (
          <ChevronRight size={18} />
        )}
      </button>

      {open && (
        <div className="mt-2 space-y-2 pl-5">
          {items.map((item) => {
            const ItemIcon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#26aa9c] text-white"
                      : "text-[#acbac4] hover:bg-[#357eb8]/25 hover:text-white"
                  }`
                }
              >
                <ItemIcon size={17} />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}