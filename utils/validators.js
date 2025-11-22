export function isValidCode(code) {
  if (!code) return false
  return /^[A-Za-z0-9]{6,8}$/.test(code)
}

export function isValidUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}