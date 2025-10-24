import { useState, useEffect } from 'react'
import api from '../api'

export default function EmpresasAssistencia() {
  const [empresas, setEmpresas] = useState([])
  const [nome, setNome] = useState('')
  const [endereco, setEndereco] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/EmpresasAssistencia').then(res => setEmpresas(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!nome || !endereco) {
      setError("Nome e Endereço são obrigatórios.")
      return
    }
    try {
      await api.post('/EmpresasAssistencia', { nome, endereco })
      window.location.reload()
    } catch {
      setError("Falha ao cadastrar nova empresa.")
    }
  }

  return (
    <div>
      <h2>Empresas de Assistência</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Nome</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div>
          <label>Endereço</label>
          <input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <ul>
        {empresas.map(e => (
          <li key={e.id}>{e.nome} - {e.endereco}</li>
        ))}
      </ul>
    </div>
  )
}
