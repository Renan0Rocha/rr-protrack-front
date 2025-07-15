import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const clienteResolverEndereco = yup.object({
  endereco: yup.object({
    cep: yup.string().required('CEP é obrigatório'),
    bairro: yup.string().required('Bairro é obrigatório'),
    logradouro: yup.string().required('Logradouro é obrigatório'),
    numero: yup.string().required('Número é obrigatório'),
    cidade: yup.string().required('Cidade é obrigatória'),
    estado: yup.string().required('Estado é obrigatório'),
  }),
});

export function useClienteResolverEndereco(currentData: {
  endereco?: {
    cep?: string;
    bairro?: string;
    logradouro?: string;
    numero?: string;
    cidade?: string;
    estado?: string;
  };
} = {}) {
  // agora inicializa ANINHADO em `endereco`
  const initialValues = {
    endereco: {
      cep:        currentData.endereco?.cep        ?? '',
      bairro:     currentData.endereco?.bairro     ?? '',
      logradouro: currentData.endereco?.logradouro ?? '',
      numero:     currentData.endereco?.numero     ?? '',
      cidade:     currentData.endereco?.cidade     ?? '',
      estado:     currentData.endereco?.estado     ?? '',
    },
  };

  const { handleSubmit } = useForm({
    validationSchema: clienteResolverEndereco,
    initialValues,
  });

  // campos continuam usando "endereco.campo"
  const { value: cep,        errorMessage: cepErro        } = useField<string>('endereco.cep');
  const { value: bairro,     errorMessage: bairroErro     } = useField<string>('endereco.bairro');
  const { value: logradouro, errorMessage: logradouroErro } = useField<string>('endereco.logradouro');
  const { value: numero,     errorMessage: numeroErro     } = useField<string>('endereco.numero');
  const { value: cidade,     errorMessage: cidadeErro     } = useField<string>('endereco.cidade');
  const { value: estado,     errorMessage: estadoErro     } = useField<string>('endereco.estado');

  return {
    handleSubmit,
    cep, cepErro,
    bairro, bairroErro,
    logradouro, logradouroErro,
    numero, numeroErro,
    cidade, cidadeErro,
    estado, estadoErro,
  };
}
