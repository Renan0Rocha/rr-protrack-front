import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export const validationSchema = yup.object({
  id: yup.string().nullable(),
  nome: yup.string().required('Nome é obrigatório'),
  data_nasc: yup.string().required('Data de nascimento é obrigatória'),
  tipo: yup.string().oneOf(['física', 'jurídica']).required('Tipo é obrigatório'),
  cpf: yup.string().required('CPF/CNPJ é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  vendedor_id: yup.number().required('Vendedor é obrigatório'),
  endereco_id: yup.number().required('Endereço é obrigatório'),
})

export const useClienteForm = () => {
  const { handleSubmit } = useForm({ validationSchema })

  const { value: id, errorMessage: idErro } = useField<string | null>('id')
  const { value: nome, errorMessage: nomeErro } = useField<string>('nome')
  const { value: data_nasc, errorMessage: dataNascErro } = useField<string>('data_nasc')
  const { value: tipo, errorMessage: tipoErro } = useField<string>('tipo')
  const { value: cpf, errorMessage: cpfErro } = useField<string>('cpf')
  const { value: telefone, errorMessage: telefoneErro } = useField<string>('telefone')
  const { value: email, errorMessage: emailErro } = useField<string>('email')
  const { value: vendedor_id, errorMessage: vendedorIdErro } = useField<number>('vendedor_id')
  const { value: endereco_id, errorMessage: enderecoIdErro } = useField<number>('endereco_id')

  return {
    handleSubmit,
    id, idErro,
    nome, nomeErro,
    data_nasc, dataNascErro,
    tipo, tipoErro,
    cpf, cpfErro,
    telefone, telefoneErro,
    email, emailErro,
    vendedor_id, vendedorIdErro,
    endereco_id, enderecoIdErro,
  }
}
