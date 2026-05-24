"use client";

import { useState, useId, type FormEvent } from "react";
import { Button } from "./Button";
import { CondorMark } from "./CondorMark";
import { MountainIcon, FlameIcon, CrystalIcon } from "./Icons";

type Seating = "terraza" | "hogar" | "cava";

const SEATING_OPTIONS: {
  id: Seating;
  label: string;
  description: string;
  Icon: typeof MountainIcon;
}[] = [
  {
    id: "terraza",
    label: "La Terraza",
    description:
      "Vista panorámica de los Andes. Aire abierto con piso de pizarra calefaccionada.",
    Icon: MountainIcon,
  },
  {
    id: "hogar",
    label: "El Hogar",
    description:
      "Junto a la parrilla abierta. Atmósfera cálida, íntima, catedral del fuego.",
    Icon: FlameIcon,
  },
  {
    id: "cava",
    label: "La Cava Privada",
    description:
      "Sala subterránea para 6+ invitados. Maridaje exclusivo con sommelier.",
    Icon: CrystalIcon,
  },
];

const PARTY_SIZES = ["2 personas", "4 personas", "6 personas", "Cava Privada (8+)"];

export function ReservationForm() {
  const formId = useId();
  const [seating, setSeating] = useState<Seating>("terraza");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: Hook up to real reservation backend (email, CRM, etc.)
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-surface-container border border-gold/30 p-12 md:p-20 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center mx-auto bg-gold/5">
          <CondorMark size={36} className="text-gold" />
        </div>
        <div>
          <span className="eyebrow">Reserva Confirmada</span>
          <h2 className="font-display italic text-4xl md:text-5xl text-bone mt-4">
            Tu Mesa Te Espera
          </h2>
        </div>
        <p className="text-bone-muted max-w-md mx-auto font-light leading-relaxed">
          Hemos enviado la confirmación a tu cava digital. Esperamos recibirte
          bajo las cumbres de los Andes.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1 hover:text-gold-bright hover:border-gold transition-colors"
        >
          Reservar Otra Mesa
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10" id={formId}>
      {/* Step 1: Date + Party */}
      <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Field label="Fecha">
          <input
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            className="reservation-input"
          />
        </Field>
        <Field label="Hora">
          <select required defaultValue="" className="reservation-input appearance-none">
            <option value="" disabled>Seleccionar horario</option>
            <option className="bg-surface-high">19:00</option>
            <option className="bg-surface-high">19:30</option>
            <option className="bg-surface-high">20:00</option>
            <option className="bg-surface-high">20:30</option>
            <option className="bg-surface-high">21:00</option>
            <option className="bg-surface-high">21:30</option>
            <option className="bg-surface-high">22:00</option>
          </select>
        </Field>
      </fieldset>

      <Field label="Cantidad de Comensales">
        <select required defaultValue="" className="reservation-input appearance-none">
          <option value="" disabled>Seleccionar</option>
          {PARTY_SIZES.map((size) => (
            <option key={size} className="bg-surface-high">{size}</option>
          ))}
        </select>
      </Field>

      {/* Step 2: Seating preference (radio cards) */}
      <fieldset className="space-y-4">
        <legend className="text-[10px] font-semibold tracking-[0.3em] uppercase text-bone-muted mb-3">
          Ambiente Preferido
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SEATING_OPTIONS.map((opt) => {
            const active = seating === opt.id;
            const { Icon } = opt;
            return (
              <label
                key={opt.id}
                className={`relative cursor-pointer block p-5 rounded-2xl border transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  active
                    ? "border-gold/60 bg-gold/[0.04]"
                    : "border-slate-deep hover:border-slate hover:bg-surface-high/40"
                }`}
              >
                <input
                  type="radio"
                  name="seating"
                  value={opt.id}
                  checked={active}
                  onChange={() => setSeating(opt.id)}
                  className="sr-only"
                />
                <div className="flex items-center gap-3 mb-2">
                  <Icon
                    size={20}
                    className={
                      active
                        ? "text-gold transition-colors duration-300"
                        : "text-slate transition-colors duration-300"
                    }
                  />
                  <span
                    className={`font-display text-lg transition-colors duration-300 ${
                      active ? "text-gold" : "text-bone"
                    }`}
                  >
                    {opt.label}
                  </span>
                </div>
                <p className="text-xs text-bone-muted leading-relaxed font-light">
                  {opt.description}
                </p>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Step 3: Contact */}
      <fieldset className="space-y-8 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Field label="Nombre Completo">
            <input
              type="text"
              required
              placeholder="ALEXANDRO GARCÍA"
              className="reservation-input placeholder:opacity-30"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              required
              placeholder="HUESPED@DOMINIO.COM"
              className="reservation-input placeholder:opacity-30"
            />
          </Field>
        </div>
        <Field label="Teléfono">
          <input
            type="tel"
            required
            placeholder="+54 9 261 ..."
            className="reservation-input placeholder:opacity-30"
          />
        </Field>
        <Field label="Ocasión Especial / Preferencias">
          <textarea
            rows={3}
            placeholder="Aniversario, restricciones alimentarias, maridaje sugerido..."
            className="reservation-input placeholder:opacity-30 resize-none"
          />
        </Field>
      </fieldset>

      {/* Submit */}
      <div className="pt-6">
        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full md:w-auto"
          disabled={submitting}
        >
          {submitting ? "Confirmando..." : "Confirmar Reserva"}
        </Button>
        <p className="text-[10px] tracking-[0.2em] uppercase text-slate mt-6">
          Te confirmaremos por email en menos de 24hs
        </p>
      </div>

      <style jsx>{`
        :global(.reservation-input) {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid var(--color-slate-deep);
          padding: 0.75rem 0;
          color: var(--color-bone);
          font-family: var(--font-display);
          font-size: 1.125rem;
          letter-spacing: -0.005em;
          transition:
            border-color var(--duration-hover) var(--ease-out-strong),
            color var(--duration-hover) var(--ease-out-strong),
            padding-left var(--duration-hover) var(--ease-out-strong);
          outline: none;
          appearance: none;
        }
        :global(.reservation-input:hover) {
          border-bottom-color: var(--color-slate);
        }
        :global(.reservation-input:focus) {
          border-bottom-color: var(--color-gold);
          padding-left: 0.5rem;
        }
        :global(.reservation-input::-webkit-calendar-picker-indicator) {
          filter: invert(0.7) sepia(1) saturate(2) hue-rotate(20deg);
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 200ms ease;
        }
        :global(.reservation-input::-webkit-calendar-picker-indicator:hover) {
          opacity: 1;
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-bone-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
