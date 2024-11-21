import { useTr } from '@oxygen/translation';
import * as S from './login.style';
import { Form, Input } from 'antd';
import Link from 'next/link';
import { Divider } from '@oxygen/ui-kit';

export default function Login() {
  const [t] = useTr();

  return (
    <S.Container>
      <S.Main>
        <S.Title>{t('login_to_platform')}</S.Title>
        <Form.Item>
          <S.Input placeholder={t('username')} />
        </Form.Item>
        <Form.Item>
          <S.Input placeholder={t('password')} suffix={<S.Visibility className='icon-visibility' />} />
        </Form.Item>

        <Form.Item>
          <Input.Password iconRender={() => <S.Visibility className='icon-visibility' />} />
        </Form.Item>

        <Link href='/'>{t('forget_password')}</Link>
        <S.Btn>{t('login')}</S.Btn>
        <Divider />
        <S.Btn variant='link'>{t('register_in_o2')}</S.Btn>
      </S.Main>
    </S.Container>
  );
}
