import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const clienteResolverDadosGerais = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  cpfCnpj: yup.string().required('CPF/CNPJ é obrigatório'),
  dataNascimento: yup.string().required('Data de nascimento é obrigatório'),
  vendedor: yup.object({
    id: yup.string().required('Vendedor é obrigatório'),
    nome: yup.string().required('Nome do vendedor é obrigatório'),
  }).required(),
});

export function useClienteResolverDadosGerais(currentData: {
  nome?: string;
  cpfCnpj?: string;
  dataNascimento?: string;
  vendedor?: { id: string; nome: string };
} = {}) {
  const initialValues = {
    nome: currentData.nome ?? '',
    cpfCnpj: currentData.cpfCnpj ?? '',
    dataNascimento: currentData.dataNascimento ?? '',
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
  const { value: cpfCnpj,        errorMessage: cpfCnpjErro        } = useField<string>('cpfCnpj');
  const { value: dataNascimento, errorMessage: dataNascimentoErro } = useField<string>('dataNascimento');
  const { value: vendedorId,   errorMessage: vendedorIdErro   } = useField<string>('vendedor.id');
  const { value: vendedorNome, errorMessage: vendedorNomeErro } = useField<string>('vendedor.nome');

  return {
    handleSubmit,
    nome, nomeErro,
    cpfCnpj, cpfCnpjErro,
    dataNascimento, dataNascimentoErro,
    vendedorId,   vendedorIdErro,
    vendedorNome, vendedorNomeErro,
  };
}
