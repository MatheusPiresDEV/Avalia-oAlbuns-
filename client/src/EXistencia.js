import React, { useEffect, useState } from 'react';
import './Existencia.css';

const Existencia = () => {
  const nascimento = new Date('2006-11-12T00:00:00');
  const historicoCriado = new Date('2023-03-22T00:00:00');

  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAgora(new Date());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const proximoAniversario = new Date(agora.getFullYear(), 10, 12); // 12/11
  const idadeAnos = agora.getFullYear() - nascimento.getFullYear();
  const jaFezAniversario = agora >= proximoAniversario;
  const idadeCompleta = jaFezAniversario ? idadeAnos : idadeAnos - 1;

  const diffMs = agora - nascimento;
  const totalSegundos = Math.floor(diffMs / 1000);
  const segundos = totalSegundos % 60;
  const totalMinutos = Math.floor(totalSegundos / 60);
  const minutos = totalMinutos % 60;
  const totalHoras = Math.floor(totalMinutos / 60);
  const horas = totalHoras % 24;
  const totalDias = Math.floor(totalHoras / 24);

  const anosPrecisos = totalDias / 365.25;
  const mesesRestantes = Math.floor((anosPrecisos - idadeCompleta) * 12);
  const diasRestantes = Math.floor((anosPrecisos - idadeCompleta - mesesRestantes / 12) * 365.25);

  const anoInicial = historicoCriado.getFullYear();
  const anoAtual = agora.getFullYear();

  const idadePorAno = Array.from({ length: anoAtual - anoInicial + 1 }, (_, i) => {
    const ano = anoInicial + i;
    const aniversario = new Date(ano, 10, 12);
    const idade = ano - nascimento.getFullYear();
    const status = agora < aniversario ? `vai fazer ${idade} anos` : `${idade} anos`;
    return { ano, status };
  });

  const idadePorAnoHistorico = Array.from({ length: anoAtual - anoInicial + 1 }, (_, i) => {
    const ano = anoInicial + i;
    const aniversario = new Date(ano, 2, 22); // 22/03
    const idade = ano - historicoCriado.getFullYear();
    const status = agora < aniversario ? `vai fazer ${idade} anos` : `${idade} anos`;
    return { ano, status };
  });

  const aniversarioHistoricoEsteAno = new Date(agora.getFullYear(), 2, 22);
  const jaFezAniversarioHistorico = agora >= aniversarioHistoricoEsteAno;
  const idadeHistorico = jaFezAniversarioHistorico
    ? agora.getFullYear() - historicoCriado.getFullYear()
    : agora.getFullYear() - historicoCriado.getFullYear() - 1;

  const statusHistorico = jaFezAniversarioHistorico
    ? `${idadeHistorico} anos`
    : `vai fazer ${idadeHistorico + 1} anos`;

  const diasDesdeHistorico = Math.floor((agora - historicoCriado) / (1000 * 60 * 60 * 24));

  return (
    <div className="existencia">
      <div className="exist-card">
        <h3>Data atual</h3>
        <p>{agora.toLocaleString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}</p>
      </div>

      <div className="exist-card">
        <h3>Idade atual</h3>
        <p>{idadeCompleta} anos, {mesesRestantes} meses, {diasRestantes} dias</p>
        <p>{horas}h {minutos}min {segundos}s</p>
      </div>

      <div className="exist-card">
        <h3>Histórico de álbuns</h3>
        <p>Iniciado em: 22/03/2023</p>
        <p>Tempo de vida: {diasDesdeHistorico} dias</p>
        <p>Status: {statusHistorico}</p>
        <ul>
          {idadePorAnoHistorico.map(({ ano, status }) => (
            <li key={ano}>{ano}: {status}</li>
          ))}
        </ul>
      </div>

      <div className="exist-card">
        <h3>Idade por ano desde 2023</h3>
        <ul>
          {idadePorAno.map(({ ano, status }) => (
            <li key={ano}>{ano}: {status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Existencia;
