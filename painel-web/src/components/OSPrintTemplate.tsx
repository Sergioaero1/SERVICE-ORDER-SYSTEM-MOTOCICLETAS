import React from 'react';

interface Props { os: any; }

// Mapeador para manter consistência com o Dashboard
const MAPA_TECNICOS: Record<string, string> = {
  "S6p7sjZr4RhsTQnpgE2HVTsaMmJ2": "Mestre Sergioaero",
};

export const OSPrintTemplate = React.forwardRef<HTMLDivElement, Props>(({ os }, ref) => {
  if (!os) return null;

  const nomeTecnico = MAPA_TECNICOS[os.tecnico_id] || os.tecnico_id;

  return (
    <div 
      ref={ref} 
      id="os-print-content" // ID essencial para o gerador de PDF
      className="p-10 bg-white text-slate-900 font-sans" 
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      {/* HEADER PROFISSIONAL */}
      <div className="flex justify-between items-start border-b-8 border-slate-800 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-slate-800 p-2 rounded-lg text-white font-black text-2xl">MB</div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-800 uppercase">MotocicletasBrasil</h1>
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">Centro de Engenharia e Manutenção</p>
        </div>
        <div className="text-right">
          <div className="bg-slate-800 text-white px-6 py-2 mb-2 font-black text-xl uppercase tracking-widest">Ordem de Serviço</div>
          <p className="text-sm font-bold">Nº CONTROLE: <span className="text-red-600 font-mono text-lg">#{String(os.id).slice(-6).toUpperCase()}</span></p>
        </div>
      </div>

      {/* BLOCOS DE INFORMAÇÃO - GRID REFORÇADO */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
          <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Proprietário / Cliente</label>
          <p className="text-xl font-extrabold text-slate-800">{os.cliente_nome}</p>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl shadow-inner">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Identificação do Veículo</label>
          <p className="text-3xl font-black text-white font-mono tracking-[0.2em] uppercase italic">{os.veiculo_placa}</p>
        </div>
        <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Data de Emissão</label>
          <p className="font-bold text-slate-700">{new Date(os.data_criacao || Date.now()).toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Status Atual</label>
          <p className="font-black uppercase text-blue-700">{os.status}</p>
        </div>
      </div>

      {/* ÁREA TÉCNICA */}
      {/* Substitua a linha da área técnica por esta: */}
<div className="border-2 border-slate-800 rounded-2xl overflow-hidden mb-12">
  <div className="bg-slate-800 text-white px-5 py-2 text-xs font-black uppercase tracking-widest">
    Relatório Técnico de Diagnóstico
  </div>
  <div className="p-8 text-slate-700 leading-relaxed text-base min-h-96 bg-white"> 
    {/* Alterado de min-h-[350px] para min-h-96 para seguir a escala padrão */}
    {os.problema}
  </div>
</div>


      {/* RODAPÉ DE ASSINATURAS */}
      <div className="grid grid-cols-2 gap-20 mt-16 px-10">
        <div className="text-center border-t-2 border-slate-800 pt-3">
          <p className="text-sm font-black text-slate-800 uppercase">{nomeTecnico}</p>
          <p className="text-[10px] uppercase font-bold text-slate-400">Responsável Técnico</p>
        </div>
        <div className="text-center border-t-2 border-slate-300 pt-3">
          <p className="text-[10px] uppercase font-bold text-slate-400">Autorização do Cliente</p>
        </div>
      </div>

      <div className="mt-20 text-[10px] text-center text-slate-400 font-bold uppercase tracking-[0.5em] border-t border-slate-100 pt-8">
        MotocicletasBrasil © 2025 - Documento Gerado em {new Date().toLocaleDateString('pt-BR')}
      </div>
    </div>
  );
});



// import React from 'react';

// interface Props { os: any; }

// export const OSPrintTemplate = React.forwardRef<HTMLDivElement, Props>(({ os }, ref) => {
//   return (
//     <div ref={ref} className="p-12 bg-white text-slate-900 font-sans print:p-8" style={{ width: '210mm' }}>
//       {/* HEADER PROFISSIONAL */}
//       <div className="flex justify-between items-start border-b-4 border-slate-800 pb-6 mb-8">
//         <div>
//           <h1 className="text-4xl font-black tracking-tighter text-slate-800 uppercase">MotocicletasBrasil</h1>
//           <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Centro de Engenharia e Manutenção</p>
//         </div>
//         <div className="text-right">
//           <div className="bg-slate-800 text-white px-4 py-2 mb-2 font-bold text-xl uppercase">Ordem de Serviço</div>
//           <p className="text-sm font-bold">Nº CONTROLE: <span className="text-red-600">{String(os.id).padStart(6, '0')}</span></p>
//         </div>
//       </div>

//       {/* BLOCOS DE INFORMAÇÃO */}
//       <div className="grid grid-cols-2 gap-px bg-slate-300 border border-slate-300 mb-8">
//         <div className="bg-slate-50 p-4">
//           <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Proprietário / Cliente</label>
//           <p className="text-lg font-bold text-slate-800">{os.cliente_nome}</p>
//         </div>
//         <div className="bg-slate-50 p-4">
//           <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Identificação do Veículo (Placa)</label>
//           <p className="text-2xl font-black text-slate-800 font-mono tracking-tighter uppercase">{os.veiculo_placa}</p>
//         </div>
//         <div className="bg-slate-50 p-4">
//           <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Data de Abertura</label>
//           <p className="font-bold">{new Date(os.data_criacao).toLocaleDateString('pt-BR')}</p>
//         </div>
//         <div className="bg-slate-50 p-4">
//           <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Status do Processo</label>
//           <p className="font-bold uppercase text-blue-700">{os.status}</p>
//         </div>
//       </div>

//       {/* ÁREA TÉCNICA */}
//       <div className="border-2 border-slate-800 mb-8">
//         <div className="bg-slate-800 text-white px-4 py-1 text-xs font-bold uppercase">Relatório Técnico de Diagnóstico</div>
//         <div className="p-6 text-slate-700 leading-relaxed text-sm min-h-[300px]">
//           {os.problema}
//         </div>
//       </div>

//       {/* RODAPÉ DE ASSINATURAS */}
//       <div className="grid grid-cols-2 gap-20 mt-20">
//         <div className="text-center border-t border-slate-400 pt-2">
//           <p className="text-[10px] uppercase font-bold text-slate-500">Responsável Técnico</p>
//           <p className="text-[9px] font-mono text-slate-300 mt-1">ID: {os.tecnico_id}</p>
//         </div>
//         <div className="text-center border-t border-slate-400 pt-2">
//           <p className="text-[10px] uppercase font-bold text-slate-500">Autorização do Cliente</p>
//         </div>
//       </div>

//       <div className="mt-12 text-[9px] text-center text-slate-400 uppercase tracking-widest">
//         Este documento é um registro oficial de manutenção. MotocicletasBrasil © 2025
//       </div>
//     </div>
//   );
// });
