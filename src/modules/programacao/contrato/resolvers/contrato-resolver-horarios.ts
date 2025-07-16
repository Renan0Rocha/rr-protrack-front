import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const contratoResolverHorarios = yup.object({
  horarios: yup.array()
    .of(yup.string().required('Horário é obrigatório'))
    .required('Horários são obrigatórios'),
});

export function useContratoResolverHorarios(currentData: {
  horarios?: string[];
} = {}) {
  const initialValues = {
    horarios: currentData.horarios ?? [],
  };

  const { handleSubmit } = useForm({
    validationSchema: contratoResolverHorarios,
    initialValues,
  });

  const { value: horarios, errorMessage: horariosErro } = useField<string[]>('horarios');

  return {
    handleSubmit,
    horarios, horariosErro,
  };
}

