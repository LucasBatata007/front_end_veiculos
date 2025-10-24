import { useState, useEffect } from 'react'
import api from '../api'

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState([])
  const [modelo, setModelo] = useState('')
  const [placa, setPlaca] = useState('')
  const [grupoId, setGrupoId] = useState('')
  const [grupos, setGrupos] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/Veiculos').then(res => setVeiculos(res.data))
    api.get('/GrupoVeiculos').then(res => setGrupos(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!modelo || !placa || !grupoId) {
      setError("Todos os campos são obrigatórios.")
      return
    }
    try {
      await api.post('/Veiculos', { modelo, placa, grupo_id: grupoId })
      window.location.reload()
    } catch {
      setError("Falha ao cadastrar novo veículo.")
    }
  }

  return (
    <div>
      <h2>Veículos</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Modelo</label>
          <input type="text" value={modelo} onChange={e => setModelo(e.target.value)} />
        </div>
        <div>
          <label>Placa</label>
          <input type="text" value={placa} onChange={e => setPlaca(e.target.value)} />
        </div>
        <div>
          <label>Grupo</label>
          <select value={grupoId} onChange={e => setGrupoId(e.target.value)}>
            <option value="">Selecione</option>
            {grupos.map(g => <option key={g.id} value={g.id}>{g.nome}</option>)}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <ul>
        {veiculos.map(v => (
          <li key={v.id}>{v.modelo} - {v.placa}</li>
        ))}
      </ul>
    </div>
  )
}
