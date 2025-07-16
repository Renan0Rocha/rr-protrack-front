// src/utils/format-money.ts

/**
 * Formata um número como moeda brasileira (R$)
 */
export function formatMoney(value: number | string): string {
  const number = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(number)) return '';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

/**
 * Converte uma string "R$ 1.234,56" para número: 1234.56
 */
export function parseMoney(value: string): number {
  const cleaned = value
    .replace(/\s/g, '')
    .replace('R$', '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim();
  return parseFloat(cleaned);
}
