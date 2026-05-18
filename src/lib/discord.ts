const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

const COUNTRY_FLAGS: Record<string, string> = {
  'Local': '🏠',
  'United States': '🇺🇸', 'US': '🇺🇸',
  'United Kingdom': '🇬🇧', 'GB': '🇬🇧',
  'Canada': '🇨🇦', 'CA': '🇨🇦',
  'Australia': '🇦🇺', 'AU': '🇦🇺',
  'Germany': '🇩🇪', 'DE': '🇩🇪',
  'France': '🇫🇷', 'FR': '🇫🇷',
  'India': '🇮🇳', 'IN': '🇮🇳',
  'Nigeria': '🇳🇬', 'NG': '🇳🇬',
  'South Africa': '🇿🇦', 'ZA': '🇿🇦',
  'Japan': '🇯🇵', 'JP': '🇯🇵',
  'China': '🇨🇳', 'CN': '🇨🇳',
  'Brazil': '🇧🇷', 'BR': '🇧🇷',
  'Mexico': '🇲🇽', 'MX': '🇲🇽',
  'Netherlands': '🇳🇱', 'NL': '🇳🇱',
  'Spain': '🇪🇸', 'ES': '🇪🇸',
  'Italy': '🇮🇹', 'IT': '🇮🇹',
  'Sweden': '🇸🇪', 'SE': '🇸🇪',
  'Switzerland': '🇨🇭', 'CH': '🇨🇭',
  'Singapore': '🇸🇬', 'SG': '🇸🇬',
  'Malaysia': '🇲🇾', 'MY': '🇲🇾',
  'Indonesia': '🇮🇩', 'ID': '🇮🇩',
  'Philippines': '🇵🇭', 'PH': '🇵🇭',
  'Thailand': '🇹🇭', 'TH': '🇹🇭',
  'Vietnam': '🇻🇳', 'VN': '🇻🇳',
  'South Korea': '🇰🇷', 'KR': '🇰🇷',
}

function getCountryFlag(country: string): string {
  return COUNTRY_FLAGS[country] || COUNTRY_FLAGS[country.split(',')[0]] || '🌍'
}

export interface VisitorArrivalPayload {
  city: string
  country: string
  ip: string
  isp: string
  browser: string
  os: string
  deviceType: string
  referrer: string | null
  timestamp: Date
}

export interface SessionEndPayload {
  pages: string[]
  clicks: string[]
  durationSeconds: number
}

export async function notifyVisitorArrival(data: VisitorArrivalPayload) {
  if (!WEBHOOK_URL) return

  const time = data.timestamp.toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/London',
  })

  const flag = getCountryFlag(data.country)

  const content = [
    `👤 **New visitor!**`,
    `${flag} **${data.country}** · ${data.city}`,
    `🌐 IP: \`${data.ip}\` · ISP: ${data.isp}`,
    `💻 ${data.browser} on ${data.os} · ${data.deviceType}`,
    `🔗 Referred by: ${data.referrer ?? 'direct'}`,
    `🕐 ${time} (GMT+1)`,
    ``,
  ].join('\n')

  await sendWebhook(content)
}

export async function notifySessionEnd(data: SessionEndPayload) {
  if (!WEBHOOK_URL) return

  const minutes = Math.floor(data.durationSeconds / 60)
  const seconds = data.durationSeconds % 60
  const duration = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`

  const pagesStr = data.pages.join(' → ')
  const clicksStr =
    data.clicks.length > 0
      ? `${data.clicks.length}: "${data.clicks.slice(0, 6).join('", "')}"`
      : 'none'

  const content = [
    `📊 **Session ended**`,
    `⏱ Duration: ${duration}`,
    `📄 Pages: ${pagesStr}`,
    `🖱 Clicks (${clicksStr})`,
    ``,
  ].join('\n')

  await sendWebhook(content)
}

async function sendWebhook(content: string) {
  if (!WEBHOOK_URL) return
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
  } catch {
    // Silently fail — analytics should never break the site
  }
}
