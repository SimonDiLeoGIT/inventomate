interface Decision_Info {
  id: number
  justificacion: string
  aceptado: boolean
}

interface Decision {
  usuario_decision: User
  decision: Decision_Info
}