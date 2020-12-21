import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { TLoginFormData } from '../../../../store/authStore';

type LoginFormProps = {
  onSubmit: (formData: TLoginFormData) => Promise<TSubmitResponse>;
};

type TFormikValues = TLoginFormData & { common: string };

export type TSubmitResponse = {
  success: boolean;
  error?: Omit<Partial<TFormikValues>, 'rememberMe'>;
};

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const submitHandler = async (
    values: TFormikValues,
    { setErrors, setSubmitting }: FormikHelpers<TFormikValues>
  ) => {
    setSubmitting(true);
    const result = (await onSubmit(values)) as {
      success: boolean;
      common: string;
    };
    const { success, ...resultData } = result;
    if (!success) {
      setErrors(resultData);
    }
    setSubmitting(false);
  };

  return (
    <>
      <h1>Вход в HunterTask</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
          common: '',
        }}
        onSubmit={submitHandler}
      >
        {formikProps => (
          <Form>
            <div className="inputWrapper">
              <label htmlFor="email">Email адрес</label>
              <Field name="email" type="text" id="email" />
            </div>
            <div className="inputWrapper">
              <label htmlFor="password">Пароль</label>
              <Field name="password" type="password" id="password" />
            </div>
            <div className="inputWrapper">
              <button disabled={formikProps.isSubmitting} type="submit">
                Войти
              </button>
            </div>
            <ErrorMessage name="common" className="error--common" component="span" />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
