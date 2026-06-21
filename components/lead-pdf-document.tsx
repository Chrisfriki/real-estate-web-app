'use client'

import { Document, Image, Page, StyleSheet, Text, View, pdf } from '@react-pdf/renderer'
import type { LeadRow } from '@/lib/db/schema'
import { buildLeadExportData } from '@/lib/lead-export'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, color: '#1e293b' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#72b01d',
    paddingBottom: 12,
  },
  logo: { width: 90 },
  title: { fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 2, textAlign: 'right' },
  metaText: { fontSize: 9, color: '#64748b', textAlign: 'right' },
  section: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#5c8f16',
    backgroundColor: '#f0f7e4',
    padding: 6,
    marginBottom: 6,
  },
  row: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#e2e8f0', paddingVertical: 4 },
  label: { width: '40%', color: '#64748b' },
  value: { width: '60%', fontWeight: 700 },
  adviceBox: { backgroundColor: '#fdeaea', padding: 10, borderRadius: 4, marginTop: 4 },
  notesLabel: { color: '#64748b', fontSize: 9, marginBottom: 2 },
  notesText: { fontStyle: 'italic' },
})

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{String(value)}</Text>
    </View>
  )
}

export function LeadPdfDocument({ lead }: { lead: LeadRow }) {
  const d = buildLeadExportData(lead)
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const generatedAt = new Date().toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <Image src={`${base}/logo.png`} style={styles.logo} />
          <View>
            <Text style={styles.title}>Informe de valoración</Text>
            <Text style={styles.metaText}>Generado el {generatedAt}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del propietario</Text>
          <Row label="Nombre" value={d.propietario.nombre} />
          <Row label="Email" value={d.propietario.email} />
          <Row label="Teléfono" value={d.propietario.telefono} />
          <Row label="Localidad" value={d.propietario.localidad} />
          <Row label="Fecha de entrada" value={d.propietario.fechaEntrada} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación de la propiedad</Text>
          <Row label="Provincia" value={d.ubicacion.provincia} />
          <Row label="Municipio" value={d.ubicacion.municipio} />
          <Row label="Dirección" value={d.ubicacion.direccion} />
          <Row label="Código postal" value={d.ubicacion.codigoPostal} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos de la propiedad</Text>
          <Row label="Tipo de inmueble" value={d.inmueble.tipo} />
          <Row label="Metros aproximados" value={`${d.inmueble.metros} m²`} />
          <Row label="Habitaciones" value={d.inmueble.habitaciones} />
          <Row label="Baños" value={d.inmueble.banos} />
          <Row label="Planta" value={d.inmueble.planta} />
          <Row label="Ascensor" value={d.inmueble.ascensor} />
          <Row label="Garaje" value={d.inmueble.garaje} />
          <Row label="Trastero" value={d.inmueble.trastero} />
          <Row label="Balcón / terraza / jardín" value={d.inmueble.exteriores} />
          <Row label="Piscina" value={d.inmueble.piscina} />
          <Row label="Orientación" value={d.inmueble.orientacion} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calidades y conservación</Text>
          <Row label="Estado de conservación" value={d.calidades.estado} />
          <Row label="Año de construcción" value={d.calidades.anio} />
          <Row label="Vistas" value={d.calidades.vistas} />
          <Row label="Climatización" value={d.calidades.climatizacion} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen para el agente</Text>
          <Row label="Estado del lead" value={d.recomendacion_agente.temperatura} />
          <View style={styles.adviceBox}>
            <Text>{d.recomendacion_agente.recomendacion}</Text>
          </View>
          {lead.comentarios && (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.notesLabel}>Observaciones del propietario:</Text>
              <Text style={styles.notesText}>{d.recomendacion_agente.observaciones}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

export async function generateLeadPdfBlob(lead: LeadRow): Promise<Blob> {
  return pdf(<LeadPdfDocument lead={lead} />).toBlob()
}
