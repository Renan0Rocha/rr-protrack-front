import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const programaResolverDadosGerais = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  sigla: yup.string().required('Sigla é obrigatória'),
  duracao: yup.string().required('Duração é obrigatória'),
  dias_semana: yup.array().min(1, 'Selecione pelo menos um dia da semana'),
  data_inicial: yup.string().required('Data inicial é obrigatória'),
  data_final: yup.string().required('Data final é obrigatória'),
  horario_inicial: yup.string().required('Horário inicial é obrigatório'),
  horario_final: yup.string().required('Horário final é obrigatório'),
});

export function useProgramaResolverDadosGerais(currentData: {
  nome?: string;
  sigla?: string;
  duracao?: string;
  dias_semana?: string[];
  data_inicial?: string;
  data_final?: string;
  horario_inicial?: string;
  horario_final?: string;
} = {}) {
  const initialValues = {
    nome: currentData.nome ?? '',
    sigla: currentData.sigla ?? '',
    duracao: currentData.duracao ?? '',
    dias_semana: currentData.dias_semana ?? [],
    data_inicial: currentData.data_inicial ?? '',
    data_final: currentData.data_final ?? '',
    horario_inicial: currentData.horario_inicial ?? '',
    horario_final: currentData.horario_final ?? '',
  };

  const { handleSubmit } = useForm({
    validationSchema: programaResolverDadosGerais,
    initialValues,
  });

  const { value: nome, errorMessage: nomeErro } = useField<string>('nome');
  const { value: sigla, errorMessage: siglaErro } = useField<string>('sigla');
  const { value: duracao, errorMessage: duracaoErro } = useField<string>('duracao');
  const { value: dias_semana, errorMessage: diasSemanaErro } = useField<string[]>('dias_semana');
  const { value: data_inicial, errorMessage: dataInicialErro } = useField<string>('data_inicial');
  const { value: data_final, errorMessage: dataFinalErro } = useField<string>('data_final');
  const { value: horario_inicial, errorMessage: horarioInicialErro } = useField<string>('horario_inicial');
  const { value: horario_final, errorMessage: horarioFinalErro } = useField<string>('horario_final');

  return {
    handleSubmit,
    nome, nomeErro,
    sigla, siglaErro,
    duracao, duracaoErro,
    dias_semana, diasSemanaErro,
    data_inicial, dataInicialErro,
    data_final, dataFinalErro,
    horario_inicial, horarioInicialErro,
    horario_final, horarioFinalErro,
  };
}
