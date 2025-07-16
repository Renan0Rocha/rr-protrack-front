import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const programaResolverDadosGerais = yup.object({
  Nome: yup.string().required('Nome é obrigatório'),
  Sigla: yup.string().required('Sigla é obrigatória'),
  Duracao: yup.string().required('Duração é obrigatória'),
  DiasSemana: yup.array().of(yup.string()).min(1, 'Selecione pelo menos um dia da semana'),
  DataInicial: yup.string().required('Data inicial é obrigatória'),
  DataFinal: yup.string().required('Data final é obrigatória'),
  HorarioInicio: yup.string().required('Horário inicial é obrigatório'),
  HorarioFim: yup.string().required('Horário final é obrigatório'),
});

export function useProgramaResolverDadosGerais(currentData: Record<string, any> = {}) {
  const initialValues = {
    Nome: currentData.nome ?? '',
    Sigla: currentData.sigla ?? '',
    Duracao: currentData.duracao ?? '',
    DiasSemana: Array.isArray(currentData.diasSemana) ? currentData.diasSemana : [],
    DataInicial: currentData.dataInicio ?? '',
    DataFinal: currentData.dataFim ?? '',
    HorarioInicio: currentData.horarioInicio ?? '',
    HorarioFim: currentData.horarioFim ?? '',
  };

  const { handleSubmit } = useForm({
    validationSchema: programaResolverDadosGerais,
    initialValues,
  });

  const { value: Nome, errorMessage: nomeErro } = useField<string>('Nome');
  const { value: Sigla, errorMessage: siglaErro } = useField<string>('Sigla');
  const { value: Duracao, errorMessage: duracaoErro } = useField<string>('Duracao');
  const { value: DiasSemana, errorMessage: diasSemanaErro } = useField<string[]>('DiasSemana');
  const { value: DataInicial, errorMessage: dataInicialErro } = useField<string>('DataInicial');
  const { value: DataFinal, errorMessage: dataFinalErro } = useField<string>('DataFinal');
  const { value: HorarioInicio, errorMessage: horarioInicialErro } = useField<string>('HorarioInicio');
  const { value: HorarioFim, errorMessage: horarioFinalErro } = useField<string>('HorarioFim');

  return {
    handleSubmit,
    Nome, nomeErro,
    Sigla, siglaErro,
    Duracao, duracaoErro,
    DiasSemana, diasSemanaErro,
    DataInicial, dataInicialErro,
    DataFinal, dataFinalErro,
    HorarioInicio, horarioInicialErro,
    HorarioFim, horarioFinalErro,
  };
}
