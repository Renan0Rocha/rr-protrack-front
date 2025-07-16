import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const clienteResolverDadosGerais = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
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
