import { Button, Progress } from '@oxygen/ui-kit';
import * as S from './draft-card.style';
import { useTr } from '@oxygen/translation';
import { ROUTES } from '@oxygen/utils';

type DraftCardType = {
  organizationName: string;
  progress: number;
  stepName: string;
  submissionId: number;
  deleteDraft: (submissionId: number) => void;
};

export default function DraftCard(props: DraftCardType) {
  const { organizationName, progress, stepName, submissionId, deleteDraft } = props;
  // debugger;
  const remove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    deleteDraft(submissionId);
  };

  const [t] = useTr();

  const progressPercentage = progress;

  return (
    <S.Container href={`${ROUTES.CUSTOMER.REQUEST_REGISTRATION}?submissionId=${submissionId}&progress=${progress}`}>
      <S.Header>
        <S.Name>{organizationName}</S.Name>
        <Button onClick={remove} color='primary' variant='text' size='small'>
          <S.Trash className='icon-trash' />
        </Button>
      </S.Header>

      <Progress percent={progressPercentage} showInfo={false} isPrimary />

      <S.Footer>
        ({stepName}) {progressPercentage}%
      </S.Footer>
    </S.Container>
  );
}
