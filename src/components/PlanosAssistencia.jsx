import { useState, useEffect } from 'react'
import api from '../api'

export default function PlanosAssistencia() {
  const [planos, setPlanos] = useState([])
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [empresaId, setEmpresaId] = useState('')
  const [empresas, setEmpresas] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/PlanosAssistencia').then(res => setPlanos(res.data))
    api.get('/EmpresasAssistencia').then(res => setEmpresas(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!nome || !descricao || !empresaId) {
      setError("Todos os campos são obrigatórios.")
      return
    }
    try {
      await api.post('/PlanosAssistencia', { nome, descricao, empresa_id: empresaId })
      window.location.reload()
    } catch {
      setError("Falha ao cadastrar novo plano.")
    }
  }

  return (
    <div>
      <h2>Planos de Assistência</h2>
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
        <div>
          <label>Empresa</label>
          <select value={empresaId} onChange={e => setEmpresaId(e.target.value)}>
            <option value="">Selecione</option>
            {empresas.map(emp => <option key={emp.id} value={emp.id}>{emp.nome}</option>)}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <ul>
        {planos.map(p => (
          <li key={p.id}>{p.nome} - {p.descricao}</li>
        ))}
      </ul>
    </div>
  )
}
