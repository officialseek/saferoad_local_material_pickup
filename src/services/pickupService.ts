import type { PickupReport } from '../types/material'

export interface SubmitResult {
  success: boolean
  message: string
}

function formatReportForEmail(report: PickupReport): string {
  const lines = [
    `Plats: ${report.locationName} (${report.locationId})`,
    `Tidpunkt: ${new Date(report.pickedUpAt).toLocaleString('sv-SE')}`,
    `Rapporterad av: ${report.reporterName}`,
  ]

  if (report.reporterPhone) {
    lines.push(`Telefon: ${report.reporterPhone}`)
  }

  lines.push('', 'Avhämtat material:')

  for (const item of report.items) {
    lines.push(`  • ${item.materialCode} – ${item.materialName}: ${item.quantity} ${item.unit}`)
  }

  if (report.notes) {
    lines.push('', `Anteckningar: ${report.notes}`)
  }

  return lines.join('\n')
}

export async function submitPickupReport(report: PickupReport): Promise<SubmitResult> {
  const emailBody = formatReportForEmail(report)
  const apiUrl = import.meta.env.VITE_EMAIL_API_URL

  if (!apiUrl) {
    console.info('[pickupService] Ingen e-post-API konfigurerad. Rapport:', emailBody)
    await new Promise((resolve) => setTimeout(resolve, 600))
    return {
      success: true,
      message: 'Rapporten är registrerad (lokalt läge – e-post skickas när API är kopplat).',
    }
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: `Materialavhämtning – ${report.locationName}`,
      body: emailBody,
      report,
    }),
  })

  if (!response.ok) {
    throw new Error('Kunde inte skicka rapporten. Försök igen.')
  }

  return {
    success: true,
    message: 'Rapporten har skickats. Du får bekräftelse via e-post.',
  }
}
