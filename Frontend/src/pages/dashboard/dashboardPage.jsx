import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  Car,
  CircleDollarSign,
  CreditCard,
  Banknote,
  Wallet,
  AlertTriangle,
  Wrench,
  UserCheck,
} from "lucide-react";

const ventasPorMarca = [
  { marca: "Toyota", ventas: 12 },
  { marca: "Volkswagen", ventas: 9 },
  { marca: "Ford", ventas: 7 },
  { marca: "Chevrolet", ventas: 5 },
  { marca: "Jeep", ventas: 4 },
];

const ventasPorVendedor = [
  { vendedor: "Cesar", ventas: 14 },
  { vendedor: "Diane", ventas: 11 },
  { vendedor: "Leandro", ventas: 8 },
  { vendedor: "María", ventas: 5 },
];

const ventasMensuales = [
  { mes: "Ene", total: 18 },
  { mes: "Feb", total: 24 },
  { mes: "Mar", total: 20 },
  { mes: "Abr", total: 31 },
  { mes: "May", total: 27 },
];

const distribucionFondos = [
  { name: "Efectivo", value: 8200000 },
  { name: "Banco", value: 24800000 },
  { name: "Cheques", value: 17600000 },
  { name: "Dólares", value: 13200000 },
];

const COLORS = ["#26aa9c", "#357eb8", "#1a3263", "#f59e0b"];

export default function DashboardPage() {
  return (
    <section className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a3263]">
          Dashboard Ejecutivo
        </h1>
        <p className="text-[#357eb8]">
          Vista general para el dueño: ventas, stock, caja, cheques y alertas.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="Ventas del mes" value="27" icon={Car} />
        <MetricCard title="Cobros pendientes" value="$18.4M" icon={CircleDollarSign} warning />
        <MetricCard title="Deuda proveedores" value="$42.7M" icon={CreditCard} danger />
        <MetricCard title="Caja total" value="$63.8M" icon={Wallet} highlight />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
        <MetricCard title="Total en efectivo" value="$8.2M" icon={Banknote} highlight />
        <MetricCard title="Total en banco" value="$24.8M" icon={Wallet} />
        <MetricCard title="Total en cheques" value="$17.6M" icon={CreditCard} />
        <MetricCard title="Total en dólares" value="USD 12.300" icon={CircleDollarSign} warning />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ChartCard title="Ventas por marca">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ventasPorMarca}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="marca" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#357eb8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Ventas por vendedor">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ventasPorVendedor}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vendedor" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#26aa9c" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartCard title="Evolución de ventas mensuales">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ventasMensuales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#1a3263"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribución de fondos">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distribucionFondos}
                dataKey="value"
                nameKey="name"
                outerRadius={105}
                label
              >
                {distribucionFondos.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <AlertCard
          icon={AlertTriangle}
          title="Cheques por vencer"
          value="8 cheques"
          detail="$9.450.000 vencen esta semana"
          type="warning"
        />

        <AlertCard
          icon={Wrench}
          title="Órdenes atrasadas"
          value="5 órdenes"
          detail="3 en taller y 2 en chapa/pintura"
          type="danger"
        />

        <AlertCard
          icon={UserCheck}
          title="Entregas pendientes"
          value="6 entregas"
          detail="2 sin turno y 4 con recepción incompleta"
          type="info"
        />
      </div>
    </section>
  );
}

function MetricCard({ title, value, icon: Icon, highlight, warning, danger }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/40 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#357eb8]">{title}</p>
          <p
            className={`mt-2 text-3xl font-bold ${
              highlight
                ? "text-[#26aa9c]"
                : warning
                ? "text-yellow-600"
                : danger
                ? "text-red-600"
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

function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-[#acbac4]/50 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-[#1a3263]">{title}</h2>
      {children}
    </div>
  );
}

function AlertCard({ icon: Icon, title, value, detail, type }) {
  const styles = {
    warning: "border-yellow-200 bg-yellow-50 text-yellow-700",
    danger: "border-red-200 bg-red-50 text-red-700",
    info: "border-[#357eb8]/30 bg-[#357eb8]/10 text-[#245f91]",
  };

  return (
    <div className={`rounded-2xl border p-6 shadow-sm ${styles[type]}`}>
      <div className="mb-4 flex items-center gap-3">
        <Icon size={26} />
        <h3 className="text-lg font-bold">{title}</h3>
      </div>

      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-2 text-sm font-semibold">{detail}</p>
    </div>
  );
}