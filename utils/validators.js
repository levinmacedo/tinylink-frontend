export function isValidCode(code) {
  if (!code) return false
  return /^[A-Za-z0-9]{6,8}$/.test(code)
}

export function isValidUrl(value) {
  if (!value) return false

  try {
    const trimmed = value.trim()
    const url = new URL(trimmed)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}