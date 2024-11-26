import React from 'react';
import Image from 'next/image';

import { Icons, InputProps, Loading } from '@oxygen/ui-kit';

import * as S from './captcha-input.styles';

// Define the props interface for CaptchaInput
interface CaptchaInputProps extends InputProps {
  imageSrc: string; // Source URL for the captcha image
  altText?: string; // Alternative text for the image
  onRefresh: () => void; // Function to refresh the captcha
  name?: string; // Form item name
  rules?: any[]; // Validation rules for the form item
  loading?: boolean; // Loading state for the refresh button
}

const CaptchaInput: React.FC<CaptchaInputProps> = ({
  imageSrc,
  altText = 'Captcha',
  onRefresh,
  name,
  loading = false,
  rules,
  ...rest
}) => {
  return (
    <S.KitInput
      suffix={
        <S.SuffixContainer>
          {loading ? (
            <Loading size={'small'} style={{ padding: '0 2rem' }} />
          ) : (
            <Image
              src={imageSrc}
              alt={altText}
              width={140}
              height={32}
              style={{ margin: '0 1rem', objectFit: 'cover' }}
            />
          )}
          <S.RefreshButton
            size='small'
            type='text'
            shape='circle'
            icon={
              <S.IconWrapper>
                <Icons.Refresh />
              </S.IconWrapper>
            }
            onClick={onRefresh}
            disabled={loading}
            aria-label='Refresh Captcha'
          />
        </S.SuffixContainer>
      }
      {...rest}
    />
  );
};

export default CaptchaInput;
