import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AuthField from '../components/AuthField/AuthField';
import { AuthType } from '../types/types';
import { useAppDispatch } from 'common/hooks/reduxHooks';
import { signIn } from 'features/Auth/redux/authSlice';

const SignInForm: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<AuthType>();

  const onSubmit = ({ name, email, password }: AuthType): void => {
    console.log(name, email, password);
    dispatch(signIn(true));
  };

  return (
    <form id="userForm" onSubmit={handleSubmit(onSubmit)}>
      <AuthField
        register={register}
        type="name"
        label={t('auth_form.name_label')}
        placeholder={t('auth_form.name_placeholder')}
      />
      <AuthField
        register={register}
        type="email"
        label={t('auth_form.email_label')}
        placeholder={t('auth_form.email_placeholder')}
      />
      <AuthField
        register={register}
        type="password"
        label={t('auth_form.password_label')}
        placeholder={t('auth_form.password_placeholder')}
      />
      <button type="submit">{t('auth.sign_up')}</button>
    </form>
  );
};

export { SignInForm };