import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const contratoResolverDadosGerais = yup.object({
  numeroDocumento: yup.string().required('Número do documento é obrigatório'),
  situacao: yup.string().required('Situação é obrigatória'),
  plano: yup.string().required('Plano é obrigatório'),
  cliente: yup.object({
    id: yup.string().required('Cliente é obrigatório'),
    nome: yup.string().required('Nome do cliente é obrigatório'),
  }).required(),
  vendedor: yup.object({
    id: yup.string().required('Vendedor é obrigatório'),
    nome: yup.string().required('Nome do vendedor é obrigatório'),
  }).required(),
  dataEmissao: yup.string().required('Data de emissão é obrigatória'),
  dataInicio: yup.string().required('Data de início é obrigatória'),
  dataFim: yup.string().required('Data de fim é obrigatória'),
  totalInsercoes: yup.number()
    .required('Total de inserções é obrigatório')
    .min(1, 'Total de inserções deve ser pelo menos 1'),
  valorBruto: yup.number()
    .required('Valor bruto é obrigatório')
    .min(0, 'Valor bruto não pode ser negativo'),
  valorDesconto: yup
  .number()
  .transform((value, originalValue) =>
    String(originalValue).trim() === '' ? 0 : value
  )
  .required('Valor de desconto é obrigatório')
  .min(0, 'Valor de desconto não pode ser negativo'),
  valorTotal: yup.number()
    .required('Valor total é obrigatório')
    .min(0, 'Valor total não pode ser negativo'),
  valorComissao: yup.number()
    .required('Valor de comissão é obrigatório')
    .min(0, 'Valor de comissão não pode ser negativo'),
  insercao: yup.object({
    tempo: yup.string().required('Tempo de inserção é obrigatório'),
    valor: yup.number()
      .required('Valor da inserção é obrigatório')
      .min(0, 'Valor da inserção não pode ser negativo'),
  }).required(),
  descricao: yup.string().optional(),
});

export function useContratoResolverDadosGerais(currentData: {
  numeroDocumento?: string;
  situacao?: string;
  plano?: string;
  cliente?: {
    id?: string;
    nome?: string;
  };
  vendedor?: {
    id?: string;
    nome?: string;
  };
  dataEmissao?: string;
  dataInicio?: string;
  dataFim?: string;
  totalInsercoes?: number;
  valorBruto?: number;
  valorDesconto?: number;
  valorTotal?: number;
  valorComissao?: number;
  insercao?: {
    tempo?: string;
    valor?: number;
  };
  descricao?: string;
} = {}) {
  const initialValues = {
    numeroDocumento: currentData.numeroDocumento ?? '',
    situacao: currentData.situacao ?? '',
    plano: currentData.plano ?? '',
    cliente: {
      id: currentData.cliente?.id ?? '',
      nome: currentData.cliente?.nome ?? '',
    },
    vendedor: {
      id: currentData.vendedor?.id ?? '',
      nome: currentData.vendedor?.nome ?? '',
    },
    dataEmissao: currentData.dataEmissao ?? '',
    dataInicio: currentData.dataInicio ?? '',
    dataFim: currentData.dataFim ?? '',
    totalInsercoes: currentData.totalInsercoes ?? 0,
    valorBruto: currentData.valorBruto ?? 0,
    valorDesconto: currentData.valorDesconto ?? 0,
    valorTotal: currentData.valorTotal ?? 0,
    valorComissao: currentData.valorComissao ?? 0,
    insercao: {
      tempo: currentData.insercao?.tempo ?? '',
      valor: currentData.insercao?.valor ?? 0,
    },
    descricao: currentData.descricao ?? '',
  };

 const { handleSubmit, setValues } = useForm({
  validationSchema: contratoResolverDadosGerais,
  initialValues,
});

  const { value: numeroDocumento, errorMessage: numeroDocumentoErro } = useField<string>('numeroDocumento');
  const { value: situacao, errorMessage: situacaoErro } = useField<string>('situacao');
  const { value: plano, errorMessage: planoErro } = useField<string>('plano');
  const { value: cliente, errorMessage: clienteErro } = useField<{ id: string; nome: string }>('cliente');
  const { value: vendedor, errorMessage: vendedorErro } = useField<{ id: string; nome: string }>('vendedor');
  const { value: dataEmissao, errorMessage: dataEmissaoErro } = useField<string>('dataEmissao');
  const { value: dataInicio, errorMessage: dataInicioErro } = useField<string>('dataInicio');
  const { value: dataFim, errorMessage: dataFimErro } = useField<string>('dataFim');
  const { value: totalInsercoes, errorMessage: totalInsercoesErro } = useField<number>('totalInsercoes');
  const { value: valorBruto, errorMessage: valorBrutoErro } = useField<number>('valorBruto');
  const { value: valorDesconto, errorMessage: valorDescontoErro } = useField<number>('valorDesconto');
  const { value: valorTotal, errorMessage: valorTotalErro } = useField<number>('valorTotal');
  const { value: valorComissao, errorMessage: valorComissaoErro } = useField<number>('valorComissao');
  const { value: insercao, errorMessage: insercaoErro } = useField<{ tempo: string; valor: number }>('insercao'); 
  const { value: descricao, errorMessage: descricaoErro } = useField<string>('descricao');


  return {
    handleSubmit,
    numeroDocumento, numeroDocumentoErro,
    situacao, situacaoErro,
    plano, planoErro,
    cliente, clienteErro,
    vendedor, vendedorErro,
    dataEmissao, dataEmissaoErro,
    dataInicio, dataInicioErro,
    dataFim, dataFimErro,
    totalInsercoes, totalInsercoesErro,
    valorBruto, valorBrutoErro,
    valorDesconto, valorDescontoErro,
    valorTotal, valorTotalErro,
    valorComissao, valorComissaoErro,
    insercao, insercaoErro,
    descricao, descricaoErro,
    setValues,
  };
}


