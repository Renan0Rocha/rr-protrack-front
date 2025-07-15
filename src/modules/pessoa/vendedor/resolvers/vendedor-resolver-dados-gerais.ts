import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const vendedorResolverDadosGerais = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  vinculo: yup.string().required('vinculo é obrigatório'),
  dataNascimento: yup.string().required('Data nascimento é obrigatório'),
});

export function useVendedorResolverDadosGerais(currentData: {
  nome?: string;
  cpf?: string;
  vinculo?: string;
  dataNascimento?: string;
} = {}) {
  const initialValues = {
    nome: currentData.nome ?? '',
    cpf: currentData.cpf ?? '',
    vinculo: currentData.vinculo ?? '',
    dataNascimento: currentData.dataNascimento ?? '',
  };

  const { handleSubmit } = useForm({
    validationSchema: vendedorResolverDadosGerais,
    initialValues,
  });

  const { value: nome, errorMessage: nomeErro }       = useField<string>('nome');
  const { value: cpf, errorMessage: cpfErro }       = useField<string>('cpf');
  const { value: vinculo, errorMessage: vinculoErro } = useField<string>('vinculo');
  const { value: dataNascimento, errorMessage: dataNascimentoErro }     = useField<string>('dataNascimento');

  return {
    handleSubmit,
    nome, nomeErro,
    cpf, cpfErro,
    vinculo, vinculoErro,
    dataNascimento, dataNascimentoErro,
  };
}