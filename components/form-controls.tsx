'use client'

import { Minus, Plus } from 'lucide-react'

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#72b01d] focus:ring-2 focus:ring-[#72b01d]/20"
    />
  )
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#72b01d] focus:ring-2 focus:ring-[#72b01d]/20"
    />
  )
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: readonly string[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-all focus:border-[#72b01d] focus:ring-2 focus:ring-[#72b01d]/20"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

export function OptionGrid({
  value,
  onChange,
  options,
  columns = 2,
}: {
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  columns?: number
}) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map((o) => {
        const active = o === value
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
              active
                ? 'border-[#72b01d] bg-[#f0f7e4] text-[#5c8f16] shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

export function Toggle({
  value,
  onChange,
  labelOn = 'Sí',
  labelOff = 'No',
}: {
  value: boolean
  onChange: (v: boolean) => void
  labelOn?: string
  labelOff?: string
}) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`rounded-md px-5 py-1.5 text-sm font-medium transition-all ${
          value ? 'bg-[#72b01d] text-white shadow-sm' : 'text-slate-500'
        }`}
      >
        {labelOn}
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`rounded-md px-5 py-1.5 text-sm font-medium transition-all ${
          !value ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500'
        }`}
      >
        {labelOff}
      </button>
    </div>
  )
}

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 20,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="inline-flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex size-9 items-center justify-center rounded-md bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 disabled:opacity-40"
        disabled={value <= min}
        aria-label="Restar"
      >
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center text-base font-semibold text-slate-800 tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex size-9 items-center justify-center rounded-md bg-[#f0f7e4] text-[#5c8f16] transition-colors hover:bg-[#e3f0d0] disabled:opacity-40"
        disabled={value >= max}
        aria-label="Sumar"
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}

export function RangeSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
}: {
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  unit?: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-slate-800 tabular-nums">
          {value}
          <span className="ml-1 text-sm font-medium text-slate-400">{unit}</span>
        </span>
        <span className="text-xs text-slate-400">
          {min} – {max} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#72b01d] [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#72b01d] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
        style={{
          background: `linear-gradient(to right, #72b01d 0%, #72b01d ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
        }}
      />
    </div>
  )
}
