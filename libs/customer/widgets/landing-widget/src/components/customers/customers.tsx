import { Carousel } from 'antd';
import Image from 'next/image';
import ayandeh from 'apps/customer-portal/public/assets/images/ayandeh.png';
import up from 'apps/customer-portal/public/assets/images/up.png';
import top from 'apps/customer-portal/public/assets/images/top.png';
import bale from 'apps/customer-portal/public/assets/images/bale.png';
import azad from 'apps/customer-portal/public/assets/images/azad.png';
import { SectionTitle } from '../section-title/section-title.style';
import { useTr } from '@oxygen/translation';
import * as S from './customers.style';
import { PaddingBox } from '../padding-box/padding-box.style';

const items = [ayandeh, up, top, bale, azad];
const DESKTOP_SLIDES_TO_SHOW = 11;
const loopedItems = Array.from({
  length: DESKTOP_SLIDES_TO_SHOW + 2 /* to prevent having two slides with the same image */,
}).reduce<string[]>((acc, _, idx) => [...acc, items[idx % items.length]], []);

export default function Customer() {
  const [t] = useTr();
  return (
    <S.Container>
      <PaddingBox>
        <SectionTitle>{t('our_customers')}</SectionTitle>
      </PaddingBox>
      <Carousel
        // rtl // Enabling "rtl" (right-to-left) changes the slide order and causes one slide to be repeated.
        swipe
        autoplay
        infinite
        draggable
        dots={false}
        swipeToSlide
        slidesToShow={11}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 9,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 6,
            },
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 4,
            },
          },
        ]}
      >
        {/* generating an array with `DESKTOP_SLIDES_TO_SHOW` items, because INIFITE SHOULD ONLY BE TRUE IF YOU HAVE ENOUGH ITEMS TO COVER ONE "SLIDE" */}
        {loopedItems.map((item, idx) => (
          <S.ImgContainer key={idx}>
            <Image src={item} alt='' fill sizes='90px' />
          </S.ImgContainer>
        ))}
      </Carousel>
    </S.Container>
  );
}
