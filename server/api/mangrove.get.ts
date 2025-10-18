export default defineEventHandler((event) => {
  const host = getRequestHeader(event, 'host') || 'unknown'

  return {
    success: true,
    message: 'Mangrove API está funcionando!',
    data: {
      tenant: 'Mangrove Labs',
      host: host,
      timestamp: new Date().toISOString(),
      endpoint: '/api/mangrove'
    }
  }
})
