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
    console.log(result);
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
      {success && (
        <div>
          Регистрация успешна! Вы можете <Link to="/login"> войти</Link>
        </div>
      )}
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
            <div>
              <Field name="name" type="text" placeholder="Name" />
              <ErrorMessage name="name" />
            </div>
            <div>
              <Field name="email" type="text" placeholder="Email" />
              <ErrorMessage name="email" />
            </div>
            <div>
              <Field name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" />
            </div>
            <div>
              <Field
                name="passwordConfirmation"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage name="passwordConfirmation" />
            </div>
            <ErrorMessage name="common" />
            <div>
              <button disabled={formikProps.isSubmitting} type="submit">
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
