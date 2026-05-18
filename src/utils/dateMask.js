/** Máscara dd/mm/aaaa (legado / exibição). */

export function formatarDataBR(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function dateParaISO(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function dataISOParaDate(iso) {
  if (!iso) return new Date();
  const partes = String(iso).trim().split('-');
  if (partes.length !== 3) return new Date();
  const [ano, mes, dia] = partes.map(Number);
  if (!ano || !mes || !dia) return new Date();
  return new Date(ano, mes - 1, dia);
}

export function aplicarMascaraDataDigitos(texto) {
  const d = String(texto).replace(/\D/g, '').slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

export function dataBRparaISO(br) {
  const partes = String(br).split('/');
  if (partes.length !== 3) return '';
  const [dia, mes, ano] = partes.map((p) => p.trim());
  if (dia.length !== 2 || mes.length !== 2 || ano.length !== 4) return '';
  const nDia = Number(dia);
  const nMes = Number(mes);
  const nAno = Number(ano);
  if (!nDia || !nMes || !nAno) return '';
  if (nMes < 1 || nMes > 12 || nDia < 1 || nDia > 31) return '';
  return `${ano}-${mes}-${dia}`;
}

export function dataISOparaBR(iso) {
  if (!iso) return '';
  const s = String(iso).trim();
  const partes = s.split('-');
  if (partes.length !== 3) return aplicarMascaraDataDigitos(s);
  const [ano, mes, dia] = partes;
  if (ano.length === 4 && mes.length === 2 && dia.length === 2)
    return `${dia}/${mes}/${ano}`;
  return s;
}
