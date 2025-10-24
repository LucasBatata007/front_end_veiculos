import { useState, useEffect } from 'react'
import api from '../api'

export default function GrupoVeiculos() {
  const [grupos, setGrupos] = useState([])
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/GrupoVeiculos').then(res => setGrupos(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!nome || !descricao) {
      setError("Nome e Descrição são obrigatórios.")
      return
    }
    try {
      await api.post('/GrupoVeiculos', { nome, descricao })
      window.location.reload()
    } catch {
      setError("Falha ao cadastrar novo grupo.")
    }
  }

  return (
    <div>
      <h2>Grupos de Veículos</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Nome</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div>
          <label>Descrição</label>
          <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <ul>
        {grupos.map(g => (
          <li key={g.id}>{g.nome} - {g.descricao}</li>
        ))}
      </ul>
    </div>
  )
}
