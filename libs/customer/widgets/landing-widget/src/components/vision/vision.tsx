import { useTr } from '@oxygen/translation';
import * as S from './vision.style';
import appsImg from 'apps/customer-portal/public/assets/images/apps.svg';
import Image from 'next/image';

export default function Vision() {
  const [t] = useTr();

  return (
    <S.Container>
      <div>
        <S.Title>{t('oxygen_vision')}</S.Title>
        <S.Desc>{t('oxygen_vision_desc')}</S.Desc>
      </div>

      <Image src={appsImg} alt='' width={740} height={723} />
    </S.Container>
  );
}
