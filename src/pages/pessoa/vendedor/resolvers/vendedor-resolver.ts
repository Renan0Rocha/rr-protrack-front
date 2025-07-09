import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const validationSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  cnpj: yup.string().required('CNPJ/CPF é obrigatório'),
  contato: yup.string().required('Contato é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  cep: yup.string().required('CEP é obrigatório'),
  bairro: yup.string().required('Bairro é obrigatório'),
  logradouro: yup.string().required('Logradouro é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatória'),
  estado: yup.string().required('Estado é obrigatório'),
});

export const useVendedorForm = () => {
  const { handleSubmit } = useForm({ validationSchema });

  const { value: nome, errorMessage: nomeErro } = useField<string>('nome');
  const { value: cnpj, errorMessage: cnpjErro } = useField<string>('cnpj');
  const { value: contato, errorMessage: contatoErro } = useField<string>('contato');
  const { value: email, errorMessage: emailErro } = useField<string>('email');

  const { value: cep, errorMessage: cepErro } = useField<string>('cep');
  const { value: bairro, errorMessage: bairroErro } = useField<string>('bairro');
  const { value: logradouro, errorMessage: logradouroErro } = useField<string>('logradouro');
  const { value: numero, errorMessage: numeroErro } = useField<string>('numero');
  const { value: cidade, errorMessage: cidadeErro } = useField<string>('cidade');
  const { value: estado, errorMessage: estadoErro } = useField<string>('estado');

  return {
    handleSubmit,
    nome, nomeErro,
    cnpj, cnpjErro,
    contato, contatoErro,
    email, emailErro,
    cep, cepErro,
    bairro, bairroErro,
    logradouro, logradouroErro,
    numero, numeroErro,
    cidade, cidadeErro,
    estado, estadoErro,
  };
};
