import React from 'react';

import { useTr } from '@oxygen/translation';

import CommercialResultBox from '../commercial-result-box/commercial-result-box';
import BusinessResultBox from '../business-result-box/business-result-box';
import { ExpertType, RequestStatus, Review, SubmissionDetailType, UserRole } from '../../types';
import ConfirmModal from '../confirm-modal/confirm-modal';
import { useAppState } from '../../context';

import * as S from './request-result-box.style';

type Props = {
  data: SubmissionDetailType;
};

const RequestResultBox: React.FC<Props> = ({ data }) => {
  const { reviews, submissionInfoDto } = data;

  const state = useAppState();
  const { submissionId } = state;

  const [t] = useTr();

  const [openModal, setOpenModal] = React.useState(false);
  const [isConfirm, setIsConfirm] = React.useState<boolean>();

  const handleConfirm = () => {
    setIsConfirm(true);
    setOpenModal(true);
  };

  const handleReject = () => {
    setIsConfirm(false);
    setOpenModal(true);
  };

  const getConfirmButtons = () => {
    return (
      <S.ButtonContainer>
        <S.RejectButton size={'large'} variant={'outlined'} onClick={handleReject}>
          {t('button.reject_request')}
        </S.RejectButton>
        <S.ConfirmButton size={'large'} variant={'outlined'} onClick={handleConfirm}>
          {t('button.confirm_request')}
        </S.ConfirmButton>
      </S.ButtonContainer>
    );
  };

  const resultType = submissionInfoDto?.submissionStatus?.code;

  const renderReviewComponent = (review: Review) => {
    const key = review?.expertId;
    if (review?.expertType === ExpertType.COMMERCIAL) {
      return (
        <CommercialResultBox
          key={key}
          isReviewed={data?.isReviewed}
          resultType={resultType}
          review={review}
          allReviews={reviews}
        />
      );
    }

    // Then check for ExpertType.BUSINESS
    if (review?.expertType === ExpertType.BUSINESS) {
      return <BusinessResultBox key={key} isReviewed={data?.isReviewed} resultType={resultType} review={review} />;
    }

    return <></>;
  };

  const resultTitle =
    state?.userRole === UserRole.COMMERCIAL_BANKING_ADMIN ? 'commercial_banking_result' : 'business_unit_result';
  // const renderButton =
  //   !data?.isReviewed &&
  //   resultType !== RequestStatus.DRAFT &&
  //   ((resultType === RequestStatus.UNDER_REVIEW_COMMERCIAL_BANK && state?.userRole === UserRole.COMMERCIAL_BANKING_ADMIN)||
  //   (state?.userRole === UserRole.BUSINESS_ADMIN &&
  //     (resultType === RequestStatus.APPROVED_BY_COMMERCIAL_BANK || resultType===RequestStatus.UNDER_REVIEW_BUSINESS_UNIT)));
  const isReviewed = data?.isReviewed;
  const isDraft = resultType === RequestStatus.DRAFT;

  const isUnderReviewCommercialBank = resultType === RequestStatus.UNDER_REVIEW_COMMERCIAL_BANK;
  const isCommercialBankingAdmin = state?.userRole === UserRole.COMMERCIAL_BANKING_ADMIN;

  const isBusinessAdmin = state?.userRole === UserRole.BUSINESS_ADMIN;
  const isApprovedByCommercialBank = resultType === RequestStatus.APPROVED_BY_COMMERCIAL_BANK;
  const isUnderReviewBusinessUnit = resultType === RequestStatus.UNDER_REVIEW_BUSINESS_UNIT;

  const renderButton =
    !isReviewed &&
    !isDraft &&
    ((isUnderReviewCommercialBank && isCommercialBankingAdmin) ||
      (isBusinessAdmin && (isApprovedByCommercialBank || isUnderReviewBusinessUnit)));

  const renderContainer = reviews.length > 0 || renderButton;
  return (
    <>
      {renderContainer && (
        <S.StyledContainer>
          {reviews.length > 0 &&
            reviews.sort((a, b) => a.expertType - b.expertType).map((review) => renderReviewComponent(review))}

          {renderButton && (
            <>
              <S.StyledTitle>{t(resultTitle)}</S.StyledTitle>
              {getConfirmButtons()}
            </>
          )}
        </S.StyledContainer>
      )}
      <ConfirmModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        isConfirm={isConfirm}
        data={submissionInfoDto}
        submissionId={submissionId}
      />
    </>
  );
};

export default RequestResultBox;
