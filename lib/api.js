import axios from 'axios'

const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'

const client = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000
})

export async function listLinks() {
  const res = await client.get('/api/links')
  return res.data
}

export async function createLink(payload) {
  const res = await client.post('/api/links', payload)
  return res.data
}

export async function getLink(code) {
  const res = await client.get(`/api/links/${code}`)
  return res.data
}

export async function deleteLink(code) {
  const res = await client.delete(`/api/links/${code}`)
  return res.data
}