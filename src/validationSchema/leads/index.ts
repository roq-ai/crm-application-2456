import * as yup from 'yup';

export const leadValidationSchema = yup.object().shape({
  status: yup.string().required(),
  note: yup.string(),
  assigned_to: yup.string().nullable(),
  created_by: yup.string().nullable(),
});
