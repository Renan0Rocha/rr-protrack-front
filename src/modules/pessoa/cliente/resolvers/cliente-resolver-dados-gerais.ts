import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0, rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

export const clienteResolverDadosGerais = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string()
    .required('CPF é obrigatório')
    .test('valid-cpf', 'CPF inválido', value => !!value && isValidCPF(value)),
  dataNasc: yup.string().required('Data de nascimento é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório'),
  vendedor: yup.object({
    id: yup.string().required('Vendedor é obrigatório'),
    nome: yup.string().required('Nome do vendedor é obrigatório'),
  }).required(),
});

export function useClienteResolverDadosGerais(currentData: {
  nome?: string;
  cpf?: string;
  dataNasc?: string;
  telefone?: string;
  vendedor?: { id: string; nome: string };
} = {}) {
  const initialValues = {
    nome:     currentData.nome ?? '',
    cpf:      currentData.cpf ?? '',
    dataNasc: currentData.dataNasc ?? '',
    telefone: currentData.telefone ?? '',
    vendedor: {
      id:   currentData.vendedor?.id   ?? '',
      nome: currentData.vendedor?.nome ?? '',
    },
  };

  const { handleSubmit } = useForm({
    validationSchema: clienteResolverDadosGerais,
    initialValues,
  });

  const { value: nome,           errorMessage: nomeErro           } = useField<string>('nome');
  const { value: cpf,            errorMessage: cpfErro            } = useField<string>('cpf');
  const { value: dataNasc, errorMessage: dataNascErro } = useField<string>('dataNasc');
  const { value: telefone,       errorMessage: telefoneErro       } = useField<string>('telefone');
  const { value: vendedorId,   errorMessage: vendedorIdErro   } = useField<string>('vendedor.id');
  const { value: vendedorNome, errorMessage: vendedorNomeErro } = useField<string>('vendedor.nome');

  return {
    handleSubmit,
    nome, nomeErro,
    cpf, cpfErro,
    dataNasc, dataNascErro,
    telefone, telefoneErro,
    vendedorId,   vendedorIdErro,
    vendedorNome, vendedorNomeErro,
  };
}
