import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { TLoginFormData } from '../../../store/authStore';
import * as Yup from 'yup';

type LoginFormProps = {
  onSubmit: (formData: TLoginFormData) => Promise<TSubmitResponse>;
};

type TFormikValues = TLoginFormData & { common: string };

export type TSubmitResponse = {
  success: boolean;
  error?: Omit<Partial<TFormikValues>, 'rememberMe'>;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введите корректный e-mail')
    .required('Обязательное поле!'),
  password: Yup.string().required('Обязательное поле!'),
});

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const submitHandler = async (
    values: TFormikValues,
    { setErrors, setSubmitting }: FormikHelpers<TFormikValues>
  ) => {
    setSubmitting(true);
    const result = await onSubmit(values);
    if (!result.success && result.error) {
      setErrors(result.error);
    }
    setSubmitting(false);
  };

  return (
    <>
      <h1>login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
          common: '',
        }}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <Form>
            <div>
              <Field name="email" type="text" placeholder="Email" />
              <ErrorMessage name="email" />
            </div>
            <div>
              <Field name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" />
            </div>
            <ErrorMessage name="common" />
            <div>
              <button disabled={formikProps.isSubmitting} type="submit">
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
