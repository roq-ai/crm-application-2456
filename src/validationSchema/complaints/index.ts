import * as yup from 'yup';

export const complaintValidationSchema = yup.object().shape({
  status: yup.string().required(),
  created_by: yup.string().nullable(),
});
