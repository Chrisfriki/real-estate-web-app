'use client'

import { Check, MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { normalizeMunicipality, searchMunicipalities, type Municipality } from '@/lib/valencia-municipalities'

export function MunicipioCombobox({
  value,
  onChange,
  placeholder = 'Escribe tu municipio',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const results = open ? searchMunicipalities(value) : []
  const isValid = !!normalizeMunicipality(value)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function select(m: Municipality) {
    onChange(m.officialName)
    setOpen(false)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      select(results[highlighted])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
            setHighlighted(0)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#72b01d] focus:ring-2 focus:ring-[#72b01d]/20"
        />
        {isValid && (
          <Check className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#72b01d]" />
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1.5 max-h-60 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white py-1.5 shadow-lg">
          {results.map((m, i) => (
            <li key={m.slug}>
              <button
                type="button"
                onClick={() => select(m)}
                onMouseEnter={() => setHighlighted(i)}
                className={`flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm ${
                  i === highlighted ? 'bg-[#f0f7e4] text-[#5c8f16]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <MapPin className="size-3.5 shrink-0 text-slate-400" />
                <span className="flex-1 truncate">{m.officialName}</span>
                {m.aliases.length > 0 && (
                  <span className="shrink-0 truncate text-xs text-slate-400">{m.aliases[0]}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
