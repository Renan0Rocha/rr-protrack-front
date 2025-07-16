import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const insercaoResolverDadosGerais = yup.object({
  tempo: yup
  .string()
  .required('Tempo é obrigatório')
  .matches(/^[0-5][0-9]:[0-5][0-9]$/, 'Formato inválido (use mm:ss)'),
  valor: yup
  .number()
  .transform((value, originalValue) => originalValue === '' ? undefined : parseFloat(originalValue))
  .test('decimal-places', 'Use no máximo 2 casas decimais', (value) => {
    if (value === undefined || value === null) return true;
    return /^\d+(\.\d{1,2})?$/.test(value.toString());
  })
  .required('Valor é obrigatório'),
});

export function useInsercaoResolverDadosGerais(currentData: {
  tempo?: string;
  valor?: number;
} = {}) {
  const initialValues = {
    tempo: currentData.tempo ?? '',
    valor: currentData.valor ?? 0,
  };

 const { handleSubmit, setValues } = useForm({
  validationSchema: insercaoResolverDadosGerais,
  initialValues,
});

  const { value: tempo, errorMessage: tempoErro } = useField<string>('tempo');
  const { value: valor, errorMessage: valorErro } = useField<number>('valor');

  return {
    handleSubmit,
    tempo, tempoErro,
    valor, valorErro,
    setValues,
  };
}