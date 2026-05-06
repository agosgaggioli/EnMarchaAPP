import { useState } from "react";
import { ArrowLeft, Printer, Save } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function BoletoVentaPage() {
  const { id } = useParams();

  const [boleto, setBoleto] = useState(boletoTextoBase);

  const imprimir = () => {
    window.print();
  };

  return (
    <section className="w-full">
      <div className="mb-8 flex items-center justify-between gap-4 print:hidden">
        <div>
          <Link
            to="/ventas"
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#357eb8] hover:text-[#1a3263]"
          >
            <ArrowLeft size={16} />
            Volver a Ventas
          </Link>

          <h1 className="text-3xl font-bold text-[#1a3263]">
            Boleto de Compra Venta
          </h1>
          <p className="text-[#357eb8]">
            Venta {id} — Previsualizá, editá e imprimí el boleto.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-[#357eb8] px-5 py-3 font-semibold text-[#357eb8] hover:bg-[#357eb8]/10">
            <Save size={18} />
            Guardar cambios
          </button>

          <button
            onClick={imprimir}
            className="flex items-center gap-2 rounded-xl bg-[#26aa9c] px-5 py-3 font-semibold text-white hover:bg-[#219b8f]"
          >
            <Printer size={18} />
            Imprimir
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px] print:block">
        <div className="rounded-2xl border border-[#acbac4]/40 bg-white p-8 shadow-sm print:border-0 print:shadow-none">
          <div className="mb-6 border-b border-[#acbac4]/40 pb-4 print:hidden">
            <h2 className="text-xl font-bold text-[#1a3263]">
              Previsualización editable
            </h2>
            <p className="text-[#357eb8]">
              Podés modificar el texto antes de imprimirlo.
            </p>
          </div>

          <textarea
            value={boleto}
            onChange={(e) => setBoleto(e.target.value)}
            className="min-h-[900px] w-full resize-none whitespace-pre-wrap rounded-xl border border-[#acbac4] bg-white p-6 font-serif text-[15px] leading-7 text-slate-900 outline-none focus:border-[#357eb8] print:hidden"
          />

          <article className="hidden whitespace-pre-wrap font-serif text-[15px] leading-7 text-black print:block">
            {boleto}
          </article>
        </div>

        <aside className="rounded-2xl border border-[#acbac4]/40 bg-white p-6 shadow-sm print:hidden">
          <h3 className="mb-4 text-lg font-bold text-[#1a3263]">
            Datos de referencia
          </h3>

          <div className="space-y-4">
            <Data label="Cliente" value="Juan Pérez" />
            <Data label="Tipo de venta" value="Usado" />
            <Data label="Vehículo" value="Jeep Compass 2021 4x2 AT" />
            <Data label="Dominio" value="AF 019 PN" />
            <Data label="Forma de pago" value="Efectivo + cheques + usado en parte de pago" />
          </div>
        </aside>
      </div>
    </section>
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

const boletoTextoBase = `CONTRATO DE COMPRA VENTA DE AUTOMOTOR.-

Entre EN MARCHA AUTOMOTORES, domiciliado en la ciudad de Canals, en adelante denominado EL VENDEDOR, y por la otra parte el/la señor/a JUAN PÉREZ, domiciliado en calle __________________________, quien se identifica con DNI __________________, CUIT/CUIL __________________, teléfono __________________, email __________________, en adelante denominado EL COMPRADOR, convienen celebrar el presente contrato de compra venta de automotor, sujeto a las siguientes cláusulas y condiciones:

PRIMERO: EL VENDEDOR enajena y EL COMPRADOR adquiere un vehículo marca JEEP COMPASS 2021 4X2 AT, dominio AF 019 PN.

SEGUNDO: El valor total del automóvil será abonado de la siguiente manera: efectivo, cheques, transferencia y/o entrega de vehículo usado como parte de pago, según lo acordado entre las partes.

Detalle de pago:
____________________________________________________________________
____________________________________________________________________
____________________________________________________________________

TERCERO: Las partes se comprometen a realizar todos los actos necesarios ante los organismos competentes para transferir la titularidad del dominio correspondiente.

CUARTO: EL VENDEDOR declara no adeudar suma alguna en concepto de patentes, multas, gravámenes prendarios, impuestos, tasas o contribuciones hasta la fecha, salvo expresa aclaración en contrario.

QUINTO: EL COMPRADOR recibe el automotor en el estado en que se encuentra, prestando conformidad sobre el mismo.

SEXTO: Desde la firma del presente contrato, EL COMPRADOR se hace responsable por los daños, perjuicios, infracciones o responsabilidades que pudieran derivarse del uso y tenencia del automotor.

SÉPTIMO: Las partes constituyen como válidos los domicilios declarados en el presente contrato para toda notificación judicial o extrajudicial.

En la ciudad de Canals, a los ____ días del mes de ______________ de ______, se firman dos ejemplares de un mismo tenor y a un solo efecto.


Firma Vendedor: ______________________________


Aclaración: __________________________________


Firma Comprador: _____________________________


Aclaración: __________________________________`;