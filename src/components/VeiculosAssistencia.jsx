  import React, { useState, useEffect } from 'react';
  import api from '../api';

  function VeiculosAssistencia() {
    // Estados para as três listas
    const [associacoes, setAssociacoes] = useState([]);
    const [veiculos, setVeiculos] = useState([]); // <-- Para o dropdown 1
    const [planos, setPlanos] = useState([]); // <-- Para o dropdown 2
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Estados para o formulário (os IDs selecionados)
    const [selectedVeiculoId, setSelectedVeiculoId] = useState('');
    const [selectedPlanoId, setSelectedPlanoId] = useState('');

    // Função para buscar TODOS os dados
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        // Faz as três chamadas à API em paralelo
        const [resAssoc, resVeiculos, resPlanos] = await Promise.all([
          api.get('/VeiculosAssistencia'),
          api.get('/Veiculos'),
          api.get('/PlanosAssistencia')
        ]);
        
        setAssociacoes(resAssoc.data);
        setVeiculos(resVeiculos.data);
        setPlanos(resPlanos.data);

        // Define valores padrão para os dropdowns
        if (resVeiculos.data.length > 0) {
          setSelectedVeiculoId(resVeiculos.data[0].id);
        }
        if (resPlanos.data.length > 0) {
          setSelectedPlanoId(resPlanos.data[0].id);
        }

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Falha ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }

    // Função para buscar APENAS as associações (para atualizar a lista após o POST)
    async function fetchAssociacoes() {
      try {
        const response = await api.get('/VeiculosAssistencia');
        setAssociacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar associações:", error);
      }
    }

    // Roda o 'fetchData' quando o componente carrega
    useEffect(() => {
      fetchData();
    }, []);

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      if (!selectedVeiculoId || !selectedPlanoId) {
        setError("Você deve selecionar um veículo e um plano.");
        return;
      }

      try {
        const novaAssociacao = { 
          veiculoId: parseInt(selectedVeiculoId),
          planoId: parseInt(selectedPlanoId)
        };
        
        await api.post('/VeiculosAssistencia', novaAssociacao);
        
        // Atualiza APENAS a lista de associações
        fetchAssociacoes(); 

      } catch (error) {
        console.error("Erro ao criar associação:", error);
        setError("Falha ao criar associação. Talvez ela já exista?");
      }
    };

    if (loading) {
      return <p>Carregando dados...</p>;
    }

    // Funções auxiliares para mostrar nomes na lista (em vez de só IDs)
    const getVeiculoNome = (id) => veiculos.find(v => v.id === id)?.modelo || `ID ${id}`;
    const getPlanoNome = (id) => planos.find(p => p.id === id)?.descricao || `ID ${id}`;

    return (
      <div>
        <h2>Associar Veículos a Planos</h2>

        {/* --- Formulário de Associação --- */}
        <form onSubmit={handleSubmit}>
          <h3>Nova Associação</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label>Veículo: </label>
            <select value={selectedVeiculoId} onChange={(e) => setSelectedVeiculoId(e.target.value)}>
              {veiculos.map(veiculo => (
                <option key={veiculo.id} value={veiculo.id}>
                  {veiculo.modelo} (Placa: {veiculo.placa})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Plano: </label>
            <select value={selectedPlanoId} onChange={(e) => setSelectedPlanoId(e.target.value)}>
              {planos.map(plano => (
                <option key={plano.id} value={plano.id}>
                  {plano.descricao}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Associar</button>
        </form>

        <hr />

        {/* --- Lista de Associações Existentes --- */}
        <h3>Associações Atuais</h3>
        <ul>
          {associacoes.map(assoc => (
            <li key={assoc.id}>
              <strong>Veículo:</strong> {getVeiculoNome(assoc.veiculoId)}
              {' -> '}
              <strong>Plano:</strong> {getPlanoNome(assoc.planoId)}
              {' (ID da Associação: '}{assoc.id}{')'}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default VeiculosAssistencia;