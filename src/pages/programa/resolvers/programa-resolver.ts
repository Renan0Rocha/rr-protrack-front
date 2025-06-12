import { useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  nome: yup.string().required('Nome é obrigatório').min(5),
  sigla: yup.string().required('Sigla é obrigatória'),
  descricao: yup.string(),
  tipo: yup.string(),
  horarioInicio: yup.string().required('Horário inicial é obrigatório'),
  horarioFim: yup.string().required('Horário final é obrigatório'),
  dataInicio: yup.string().required('Data de início é obrigatória'),
  dataFim: yup.string().required('Data de fim é obrigatória'),
  status: yup.string().required('Status é obrigatório')
});

export const useProgramaForm = () => {
  return useForm({
    validationSchema: schema,
    initialValues: {
      nome: '',
      sigla: '',
      descricao: '',
      tipo: '',
      horarioInicio: '',
      horarioFim: '',
      dataInicio: '',
      dataFim: '',
      status: ''
    }
  });
}
