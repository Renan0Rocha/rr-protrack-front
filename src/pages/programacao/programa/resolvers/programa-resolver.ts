import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const validationSchema = yup.object({
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
  const { handleSubmit } = useForm({ validationSchema });

  const { value: nome, errorMessage: nomeErro } = useField<string>('nome');
  const { value: sigla, errorMessage: siglaErro } = useField<string>('sigla');
  const { value: descricao, errorMessage: descricaoErro } = useField<string>('descricao');
  const { value: tipo, errorMessage: tipoErro } = useField<string>('tipo');
  const { value: horarioInicio, errorMessage: horarioInicioErro } = useField<string>('horarioInicio');
  const { value: horarioFim, errorMessage: horarioFimErro } = useField<string>('horarioFim');
  const { value: dataInicio, errorMessage: dataInicioErro } = useField<string>('dataInicio');
  const { value: dataFim, errorMessage: dataFimErro } = useField<string>('dataFim');
  const { value: status, errorMessage: statusErro } = useField<string>('status');

  return {
    handleSubmit,
    nome, nomeErro,
    sigla, siglaErro,
    descricao, descricaoErro,
    tipo, tipoErro,
    horarioInicio, horarioInicioErro,
    horarioFim, horarioFimErro,
    dataInicio, dataInicioErro,
    dataFim, dataFimErro,
    status, statusErro
  };
};
