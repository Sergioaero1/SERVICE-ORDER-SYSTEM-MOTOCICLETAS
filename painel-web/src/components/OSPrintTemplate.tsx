import React from 'react';

interface Props { os: any; }

export const OSPrintTemplate = React.forwardRef<HTMLDivElement, Props>(({ os }, ref) => {
  return (
    <div ref={ref} className="p-12 bg-white text-slate-900 font-sans print:p-8" style={{ width: '210mm' }}>
      {/* HEADER PROFISSIONAL */}
      <div className="flex justify-between items-start border-b-4 border-slate-800 pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-800 uppercase">MotocicletasBrasil</h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Centro de Engenharia e Manutenção</p>
        </div>
        <div className="text-right">
          <div className="bg-slate-800 text-white px-4 py-2 mb-2 font-bold text-xl uppercase">Ordem de Serviço</div>
          <p className="text-sm font-bold">Nº CONTROLE: <span className="text-red-600">{String(os.id).padStart(6, '0')}</span></p>
        </div>
      </div>

      {/* BLOCOS DE INFORMAÇÃO */}
      <div className="grid grid-cols-2 gap-px bg-slate-300 border border-slate-300 mb-8">
        <div className="bg-slate-50 p-4">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Proprietário / Cliente</label>
          <p className="text-lg font-bold text-slate-800">{os.cliente_nome}</p>
        </div>
        <div className="bg-slate-50 p-4">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Identificação do Veículo (Placa)</label>
          <p className="text-2xl font-black text-slate-800 font-mono tracking-tighter uppercase">{os.veiculo_placa}</p>
        </div>
        <div className="bg-slate-50 p-4">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Data de Abertura</label>
          <p className="font-bold">{new Date(os.data_criacao).toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="bg-slate-50 p-4">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Status do Processo</label>
          <p className="font-bold uppercase text-blue-700">{os.status}</p>
        </div>
      </div>

      {/* ÁREA TÉCNICA */}
      <div className="border-2 border-slate-800 mb-8">
        <div className="bg-slate-800 text-white px-4 py-1 text-xs font-bold uppercase">Relatório Técnico de Diagnóstico</div>
        <div className="p-6 text-slate-700 leading-relaxed text-sm min-h-[300px]">
          {os.problema}
        </div>
      </div>

      {/* RODAPÉ DE ASSINATURAS */}
      <div className="grid grid-cols-2 gap-20 mt-20">
        <div className="text-center border-t border-slate-400 pt-2">
          <p className="text-[10px] uppercase font-bold text-slate-500">Responsável Técnico</p>
          <p className="text-[9px] font-mono text-slate-300 mt-1">ID: {os.tecnico_id}</p>
        </div>
        <div className="text-center border-t border-slate-400 pt-2">
          <p className="text-[10px] uppercase font-bold text-slate-500">Autorização do Cliente</p>
        </div>
      </div>

      <div className="mt-12 text-[9px] text-center text-slate-400 uppercase tracking-widest">
        Este documento é um registro oficial de manutenção. MotocicletasBrasil © 2025
      </div>
    </div>
  );
});
