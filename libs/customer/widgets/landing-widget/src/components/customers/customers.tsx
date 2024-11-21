import { Carousel } from 'antd';
import Image from 'next/image';
import ayandeh from 'apps/customer-portal/public/assets/images/ayandeh.svg';
import up from 'apps/customer-portal/public/assets/images/up.svg';
import top from 'apps/customer-portal/public/assets/images/top.svg';
import bale from 'apps/customer-portal/public/assets/images/bale.svg';
import azad from 'apps/customer-portal/public/assets/images/azad.svg';
import { SectionTitle } from '../section-title/section-title.style';
import { useTr } from '@oxygen/translation';
import * as S from './customers.style';

const items = [ayandeh, up, top, bale, azad];

export default function Customer() {
  const [t] = useTr();
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <S.Container>
      <SectionTitle>{t('our_customers')}</SectionTitle>
      <Carousel
        rtl
        swipe
        // autoplay
        // infinite
        centerMode
        swipeToSlide
        initialSlide={9}
        slidesToShow={11}
        afterChange={onChange}
      >
        {items.map((item, idx) => (
          <Image src={item} key={idx} alt='' width={90} height={80} />
        ))}
      </Carousel>
    </S.Container>
  );
}
