import './App.css'
import GrupoVeiculos from './components/GrupoVeiculos'
import Veiculos from './components/Veiculos'
import EmpresasAssistencia from './components/EmpresasAssistencia'
import PlanosAssistencia from './components/PlanosAssistencia'
import VeiculosAssistencia from './components/VeiculosAssistencia'

function App() {
  return (
    <div className="app-container">
      <h1>Sistema de Alocação de Veículos</h1>

      <div className="card">
        <GrupoVeiculos />
      </div>

      <div className="card">
        <Veiculos />
      </div>

      <div className="card">
        <EmpresasAssistencia />
      </div>

      <div className="card">
        <PlanosAssistencia />
      </div>

      <div className="card">
        <VeiculosAssistencia />
      </div>
    </div>
  )
}

export default App
