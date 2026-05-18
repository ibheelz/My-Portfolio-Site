export interface GeoData {
  ip: string
  country: string
  city: string
  isp: string
  status: 'success' | 'fail'
}

export async function lookupIp(ip: string): Promise<GeoData | null> {
  if (
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.')
  ) {
    return {
      ip,
      country: 'Local',
      city: 'Localhost',
      isp: 'Local Network',
      status: 'success',
    }
  }

  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,city,isp,query`,
      { next: { revalidate: 0 } }
    )
    if (!res.ok) return null
    const data: GeoData = await res.json()
    return data.status === 'success' ? data : null
  } catch {
    return null
  }
}
