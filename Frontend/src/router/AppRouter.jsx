import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

import ClientesPage from "../pages/clientes/ClientesPage";
import NuevoClientePage from "../pages/clientes/NuevoClientePage";

import VehiculosPage from "../pages/vehiculos/VehiculosPage";
import NuevoVehiculoPage from "../pages/vehiculos/NuevoVehiculoPage";

import VentasPage from "../pages/ventas/VentasPage";
import NuevaVentaPage from "../pages/ventas/NuevaVentaPage";
import BoletoVentaPage from "../pages/ventas/BoletoVentaPage";

import FichaTecnicaPage from "../pages/ficha-tecnica/FichaTecnicaPage";
import FichaTecnicaDetallePage from "../pages/ficha-tecnica/FichaTecnicaDetallePage";

import OrdenesTrabajoPage from "../pages/ordenes-trabajo/OrdenesTrabajoPage";
import OrdenTrabajoDetallePage from "../pages/ordenes-trabajo/OrdenTrabajoDetallePage";

import ProveedoresPage from "../pages/proveedores/ProveedoresPage";
import ProveedorDetallePage from "../pages/proveedores/ProveedorDetallePage";
import ProveedorMovimientosPage from "../pages/proveedores/ProveedorMovimientosPage";

import TurnosEntregasPage from "../pages/entregas/TurnosEntregasPage";
import EntregaChecklistPage from "../pages/entregas/EntregaChecklistPage";

import GestoriaPage from "../pages/gestoria/GestoriaPage";

import LibroDiarioPage from "../pages/contabilidad/libro-diario";
import EstadosCuentaPage from "../pages/contabilidad/EstadosCuentaPage";
import EstadosCuentaClientesPage from "../pages/contabilidad/EstadosCuentaClientes";
import EstadosCuentaProveedoresPage from "../pages/contabilidad/EstadosCuentaProveedores";
import ChequesPage from "../pages/contabilidad/ChequesPage";
import GastosFijosPage from "../pages/contabilidad/GastosFijosPage";

import DashboardPage from "../pages/dashboard/dashboardPage";

import ComprasPage from "../pages/compras/ComprasPage";
import NuevaCompraPage from "../pages/compras/NuevaCompraPage";
import BusquedasPage from "../pages/compras/BusquedasPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/clientes" />} />

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/clientes/nuevo" element={<NuevoClientePage />} />

          <Route path="/vehiculos" element={<VehiculosPage />} />
          <Route path="/vehiculos/nuevo" element={<NuevoVehiculoPage />} />

          <Route path="/ventas" element={<VentasPage />} />
          <Route path="/ventas/nueva" element={<NuevaVentaPage />} />
          <Route path="/ventas/:id/boleto" element={<BoletoVentaPage />} />

          <Route path="/compras" element={<ComprasPage />} />
          <Route path="/compras/nueva" element={<NuevaCompraPage />} />
          <Route path="/busquedas" element={<BusquedasPage />} />

          <Route path="/ficha-tecnica" element={<FichaTecnicaPage />} />
          <Route
            path="/ficha-tecnica/:id"
            element={<FichaTecnicaDetallePage />}
          />

          <Route path="/ordenes-trabajo" element={<OrdenesTrabajoPage />} />
          <Route
            path="/ordenes-trabajo/:id"
            element={<OrdenTrabajoDetallePage />}
          />

          <Route path="/gestoria" element={<GestoriaPage />} />

          <Route path="/entregas" element={<TurnosEntregasPage />} />
          <Route path="/entregas/:id" element={<EntregaChecklistPage />} />

          <Route
            path="/contabilidad/libro-diario"
            element={<LibroDiarioPage />}
          />

          <Route
            path="/contabilidad/proveedores"
            element={<ProveedoresPage />}
          />

          <Route
            path="/contabilidad/proveedores/movimientos/:operacionId"
            element={<ProveedorMovimientosPage />}
          />

          <Route
            path="/contabilidad/proveedores/:id"
            element={<ProveedorDetallePage />}
          />

          <Route
            path="/contabilidad/estados-cuenta"
            element={<EstadosCuentaPage />}
          />

          <Route
            path="/contabilidad/estados-cuenta/clientes"
            element={<EstadosCuentaClientesPage />}
          />

          <Route
            path="/contabilidad/estados-cuenta/proveedores"
            element={<EstadosCuentaProveedoresPage />}
          />

          <Route path="/contabilidad/cheques" element={<ChequesPage />} />
          <Route
  path="/contabilidad/gastos-fijos"
  element={<GastosFijosPage />}
/>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}