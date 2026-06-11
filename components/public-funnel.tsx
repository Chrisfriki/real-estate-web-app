'use client'

import { useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  Home,
  MapPin,
  Phone,
  Settings2,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  X,
} from 'lucide-react'
import {
  CLIMATIZACION,
  EMPTY_FORM,
  ESTADOS,
  EXTERIORES,
  GARAJES,
  type LeadForm,
  MUNICIPIOS_SUGERIDOS,
  ORIENTACIONES,
  PLANTAS,
  PLAZOS,
  PROVINCIAS,
  STEP_TITLES,
  TIPOS_INMUEBLE,
  VISTAS,
} from '@/lib/casa-facil-data'
import {
  Field,
  OptionGrid,
  RangeSlider,
  Select,
  Stepper,
  TextArea,
  TextInput,
  Toggle,
} from './form-controls'
import { useToast } from './toast'

const STEP_ICONS = [MapPin, Building2, Home, Settings2, UserRound]

export function PublicFunnel() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<LeadForm>(EMPTY_FORM)
  const [rgpd, setRgpd] = useState(false)
  const [catastralDoc, setCatastralDoc] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { notify } = useToast()

  const set = <K extends keyof LeadForm>(key: K, value: LeadForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  function validateStep(): boolean {
    if (step === 0) {
      if (!form.municipio.trim() || !form.direccion.trim() || !form.codigoPostal.trim()) {
        notify({
          tone: 'error',
          title: 'Faltan datos de ubicación',
          description: 'Completa municipio, dirección y código postal.',
        })
        return false
      }
    }
    if (step === 4) {
      if (!form.nombre.trim() || !form.telefono.trim() || !form.email.trim()) {
        notify({
          tone: 'error',
          title: 'Revisa tus datos de contacto',
          description: 'Nombre, teléfono y correo son obligatorios.',
        })
        return false
      }
      if (!rgpd) {
        notify({
          tone: 'error',
          title: 'Consentimiento requerido',
          description: 'Debes aceptar la política de privacidad para continuar.',
        })
        return false
      }
    }
    return true
  }

  async function next() {
    if (!validateStep()) return
    if (step < 4) {
      setStep((s) => s + 1)
      return
    }
    // Submit to API
    setSubmitting(true)
    try {
      const fd = new FormData()
      // Append all form fields
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)))
      if (catastralDoc) fd.append('catastralDoc', catastralDoc)

      const res = await fetch('/api/leads', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Submit failed')

      setDone(true)
      notify({
        tone: 'success',
        title: '¡Solicitud enviada!',
        description: 'Un asesor de Casa Fácil te contactará en menos de 24h.',
      })
    } catch {
      notify({
        tone: 'error',
        title: 'Error al enviar',
        description: 'Ha ocurrido un error. Por favor inténtalo de nuevo.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  function restart() {
    setForm(EMPTY_FORM)
    setRgpd(false)
    setCatastralDoc(null)
    setStep(0)
    setDone(false)
  }

  if (done) {
    return <SuccessScreen municipio={form.municipio} onRestart={restart} />
  }

  const progress = ((step + 1) / 5) * 100

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-14">
      {/* Hero copy */}
      <div className="mb-8 rounded-2xl bg-white/80 px-6 py-7 text-center shadow-sm backdrop-blur-sm">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f7e4] px-3 py-1 text-xs font-semibold text-[#5c8f16]">
          <Sparkles className="size-3.5" />
          Informe de mercado real · sin valoraciones automáticas
        </span>
        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
          ¿Cuánto vale tu vivienda en la{' '}
          <span className="text-[#72b01d]">Comunidad Valenciana</span>?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
          Olvídate de las estimaciones erróneas de los robots. Un asesor de tu
          zona cruzará los datos catastrales de tu calle y preparará un informe
          personalizado y preciso.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          {STEP_TITLES.map((t, i) => {
            const Icon = STEP_ICONS[i]
            const active = i === step
            const complete = i < step
            return (
              <div key={t} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={`flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                    complete
                      ? 'bg-[#72b01d] text-white'
                      : active
                        ? 'bg-[#72b01d] text-white ring-4 ring-[#72b01d]/15'
                        : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {complete ? <CheckCircle2 className="size-5" /> : <Icon className="size-4" />}
                </div>
                <span
                  className={`hidden text-center text-[10px] font-medium leading-tight sm:block ${
                    active ? 'text-slate-700' : 'text-slate-400'
                  }`}
                >
                  {t}
                </span>
              </div>
            )
          })}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#72b01d] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#72b01d]">
            Paso {step + 1} de 5
          </span>
          <span className="h-px flex-1 bg-slate-100" />
          <span className="text-sm font-semibold text-slate-700">
            {STEP_TITLES[step]}
          </span>
        </div>

        <div key={step} className="animate-fade-up">
          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Provincia">
                <Select
                  value={form.provincia}
                  onChange={(v) => set('provincia', v)}
                  options={PROVINCIAS}
                />
              </Field>
              <Field label="Municipio / Pueblo" hint="Ej: Silla, Alcàsser, Beniparrell">
                <TextInput
                  list="municipios"
                  value={form.municipio}
                  onChange={(e) => set('municipio', e.target.value)}
                  placeholder="Escribe tu municipio"
                />
                <datalist id="municipios">
                  {MUNICIPIOS_SUGERIDOS.map((m) => (
                    <option key={m} value={m} />
                  ))}
                </datalist>
              </Field>
              <Field label="Dirección exacta" hint="Calle, número, piso y puerta">
                <TextInput
                  value={form.direccion}
                  onChange={(e) => set('direccion', e.target.value)}
                  placeholder="C/ Mayor 12, 4º A"
                />
              </Field>
              <Field label="Código postal">
                <TextInput
                  inputMode="numeric"
                  value={form.codigoPostal}
                  onChange={(e) => set('codigoPostal', e.target.value)}
                  placeholder="46460"
                />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-6">
              <Field label="Tipo de inmueble">
                <OptionGrid
                  value={form.tipo}
                  onChange={(v) => set('tipo', v)}
                  options={TIPOS_INMUEBLE}
                  columns={3}
                />
              </Field>
              <Field label="Metros cuadrados útiles construidos">
                <RangeSlider
                  value={form.metros}
                  onChange={(v) => set('metros', v)}
                  min={20}
                  max={500}
                  step={5}
                  unit="m²"
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Habitaciones">
                  <Stepper
                    value={form.habitaciones}
                    onChange={(v) => set('habitaciones', v)}
                    min={0}
                    max={12}
                  />
                </Field>
                <Field label="Baños">
                  <Stepper
                    value={form.banos}
                    onChange={(v) => set('banos', v)}
                    min={0}
                    max={8}
                  />
                </Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <Field label="Estado de conservación">
                <OptionGrid
                  value={form.estado}
                  onChange={(v) => set('estado', v)}
                  options={ESTADOS}
                  columns={2}
                />
              </Field>
              <Field label="Altura / planta real">
                <OptionGrid
                  value={form.planta}
                  onChange={(v) => set('planta', v)}
                  options={PLANTAS}
                  columns={2}
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Ascensor">
                  <Toggle value={form.ascensor} onChange={(v) => set('ascensor', v)} />
                </Field>
                <Field label="Año de edificación">
                  <TextInput
                    inputMode="numeric"
                    value={form.anio}
                    onChange={(e) => set('anio', e.target.value)}
                    placeholder="1998"
                  />
                </Field>
              </div>
              <Field label="Vistas">
                <OptionGrid
                  value={form.vistas}
                  onChange={(v) => set('vistas', v)}
                  options={VISTAS}
                  columns={2}
                />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-5">
              <Field label="Plazas de garaje">
                <OptionGrid
                  value={form.garaje}
                  onChange={(v) => set('garaje', v)}
                  options={GARAJES}
                  columns={3}
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Trastero">
                  <Toggle value={form.trastero} onChange={(v) => set('trastero', v)} />
                </Field>
                <Field label="Piscina / zonas comunes">
                  <Toggle value={form.piscina} onChange={(v) => set('piscina', v)} />
                </Field>
              </div>
              <Field label="Salidas / exteriores">
                <OptionGrid
                  value={form.exteriores}
                  onChange={(v) => set('exteriores', v)}
                  options={EXTERIORES}
                  columns={2}
                />
              </Field>
              <Field label="Climatización">
                <OptionGrid
                  value={form.climatizacion}
                  onChange={(v) => set('climatizacion', v)}
                  options={CLIMATIZACION}
                  columns={2}
                />
              </Field>
              <Field label="Orientación">
                <OptionGrid
                  value={form.orientacion}
                  onChange={(v) => set('orientacion', v)}
                  options={ORIENTACIONES}
                  columns={4}
                />
              </Field>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3 rounded-xl bg-[#f0f7e4] p-4">
                <ClipboardList className="mt-0.5 size-5 shrink-0 text-[#5c8f16]" />
                <p className="text-sm leading-relaxed text-[#4a7212]">
                  Último paso. Deja tus datos y un asesor especialista preparará
                  tu informe de valoración manual y te lo explicará sin compromiso.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nombre completo">
                  <TextInput
                    value={form.nombre}
                    onChange={(e) => set('nombre', e.target.value)}
                    placeholder="Nombre y apellidos"
                  />
                </Field>
                <Field label="Teléfono móvil">
                  <TextInput
                    inputMode="tel"
                    value={form.telefono}
                    onChange={(e) => set('telefono', e.target.value)}
                    placeholder="600 00 00 00"
                  />
                </Field>
              </div>
              <Field label="Correo electrónico">
                <TextInput
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="tucorreo@email.com"
                />
              </Field>
              <Field label="¿En qué plazo deseas vender?">
                <OptionGrid
                  value={form.plazo}
                  onChange={(v) => set('plazo', v)}
                  options={PLAZOS}
                  columns={2}
                />
              </Field>

              {/* Catastral document upload */}
              <Field
                label="Documento catastral (opcional)"
                hint="Adjunta la referencia catastral de tu inmueble en PDF, imagen u otro formato"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null
                    setCatastralDoc(f)
                  }}
                />
                {catastralDoc ? (
                  <div className="flex items-center gap-3 rounded-lg border border-[#72b01d]/30 bg-[#f0f7e4] px-4 py-3">
                    <FileText className="size-5 shrink-0 text-[#5c8f16]" />
                    <span className="flex-1 truncate text-sm font-medium text-[#4a7212]">
                      {catastralDoc.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCatastralDoc(null)
                        if (fileInputRef.current) fileInputRef.current.value = ''
                      }}
                      className="shrink-0 rounded p-0.5 text-[#5c8f16] hover:bg-[#72b01d]/20"
                      aria-label="Eliminar archivo"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-500 transition-colors hover:border-[#72b01d]/50 hover:bg-[#f0f7e4] hover:text-[#5c8f16]"
                  >
                    <Upload className="size-4" />
                    Adjuntar documento catastral
                  </button>
                )}
              </Field>

              <Field label="Comentarios adicionales">
                <TextArea
                  rows={3}
                  value={form.comentarios}
                  onChange={(e) => set('comentarios', e.target.value)}
                  placeholder="Cuéntanos cualquier detalle relevante de tu vivienda…"
                />
              </Field>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3.5">
                <input
                  type="checkbox"
                  checked={rgpd}
                  onChange={(e) => setRgpd(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[#72b01d]"
                />
                <span className="text-xs leading-relaxed text-slate-500">
                  He leído y acepto la{' '}
                  <span className="font-medium text-[#5c8f16]">
                    política de privacidad
                  </span>{' '}
                  y el tratamiento de mis datos por Casa Fácil para gestionar mi
                  solicitud de valoración. (RGPD)
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 disabled:invisible"
          >
            <ArrowLeft className="size-4" />
            Atrás
          </button>
          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 rounded-lg bg-[#72b01d] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#5c8f16] hover:shadow"
            >
              Continuar
              <ArrowRight className="size-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-[#e62020] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#c41616] hover:shadow-md disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                  </svg>
                  Enviando…
                </>
              ) : (
                <>
                  <ShieldCheck className="size-4" />
                  Solicitar mi informe gratis
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
        <Phone className="size-3.5" />
        Sin compromiso · Te llamamos en menos de 24 horas
      </p>
    </div>
  )
}

function SuccessScreen({
  municipio,
  onRestart,
}: {
  municipio: string
  onRestart: () => void
}) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-16 text-center">
      <div className="animate-pop flex size-24 items-center justify-center rounded-full bg-[#f0f7e4]">
        <CheckCircle2 className="size-14 text-[#72b01d]" strokeWidth={2.2} />
      </div>
      <h2 className="animate-fade-up mt-7 text-balance text-3xl font-bold tracking-tight text-slate-800">
        ¡Solicitud recibida con éxito!
      </h2>
      <p className="animate-fade-up mt-4 text-pretty leading-relaxed text-slate-500">
        Gracias por confiar en <strong className="text-slate-700">Casa Fácil</strong>.
        Un <strong className="text-[#5c8f16]">asesor especialista de tu zona</strong>
        {municipio ? ` (${municipio} y alrededores)` : ''} ya ha recibido tu
        ficha y se pondrá manos a la obra.
      </p>

      <div className="animate-fade-up mt-7 w-full rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-700">
          ¿Qué ocurre ahora?
        </h3>
        <ul className="flex flex-col gap-4">
          {[
            {
              t: 'Cruzamos datos catastrales',
              d: 'Tu asesor contrastará la información real de tu calle y edificio con el catastro.',
            },
            {
              t: 'Analizamos el mercado de tu zona',
              d: 'Estudiamos ventas recientes en Silla, Alcàsser, Picassent y municipios cercanos.',
            },
            {
              t: 'Te llamamos en menos de 24h',
              d: 'Recibirás un informe de mercado real personalizado, sin estimaciones automáticas.',
            },
          ].map((item, i) => (
            <li key={item.t} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#72b01d] text-xs font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">{item.t}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                  {item.d}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="animate-fade-up mt-8 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
      >
        <Home className="size-4" />
        Valorar otra vivienda
      </button>
    </div>
  )
}
