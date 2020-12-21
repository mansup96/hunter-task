import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TSignUpFormData } from '../../../../store/authStore';
import { Link } from 'react-router-dom';

type LoginFormProps = {
  onSubmit: (formData: TSignUpFormData) => Promise<TSubmitResponse>;
  error?: string | null;
};
export type TSubmitResponse = {
  success: boolean;
  error?: Partial<TFormikValues>;
};
type TFormikValues = TSignUpFormData & { common: string };

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(20, 'Имя не должно содержать больше 20-ти символов')
    .required('Обязательное поле!'),
  email: Yup.string()
    .min(6, 'E-mail должен содержать больше 6-ти символов')
    .email('Введите корректный E-mail')
    .required('Обязательное поле!'),
  password: Yup.string()
    .required('Обязательное поле!')
    .min(8, 'Пароль должен содержать больше 8-ти символов'),
  passwordConfirmation: Yup.string()
    .required('Обязательное поле!')
    .oneOf([Yup.ref('password'), null], 'Пароль должен совпадать'),
});

const SignUpForm = ({ onSubmit }: LoginFormProps) => {
  const [success, setSuccess] = useState(false);

  const submitHandler = async (
    values: TFormikValues,
    { setErrors, setSubmitting, resetForm }: FormikHelpers<TFormikValues>
  ) => {
    setSubmitting(true);
    const result = await onSubmit(values);
    if (!result.success && result.error) {
      setErrors(result.error);
    } else {
      resetForm();
      setSubmitting(false);
      setSuccess(true);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          common: '',
        }}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <Form>
            <div className="inputWrapper">
              <label htmlFor="name">Имя</label>
              <Field name="name" type="text" id="name" />
              <ErrorMessage name="name" className="error" component="span" />
            </div>
            <div className="inputWrapper">
              <label htmlFor="email">Email адрес</label>
              <Field name="email" type="text" id="email" />
              <ErrorMessage name="email" className="error" component="span" />
            </div>
            <div className="inputWrapper">
              <label htmlFor="password">Пароль</label>
              <Field name="password" type="password" id="password" />
              <ErrorMessage
                name="password"
                className="error"
                component="span"
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="passwordConfirmation">Повторите пароль</label>
              <Field
                name="passwordConfirmation"
                type="password"
                id="passwordConfirmation"
              />
              <ErrorMessage
                name="passwordConfirmation"
                className="error"
                component="span"
              />
            </div>
            <div>
              <button disabled={formikProps.isSubmitting} type="submit">
                Зарегистрироваться
              </button>
            </div>
            {success && (
              <span className="success">
                Регистрация успешна! Вы можете <Link to="/login">войти</Link>
              </span>
            )}
            <ErrorMessage
              name="common"
              className="error--common"
              component="span"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
