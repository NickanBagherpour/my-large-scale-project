import { Button, Progress } from '@oxygen/ui-kit';
import * as S from './draft-card.style';
import { ROUTES } from '@oxygen/utils';
import { Draft } from '../../types';

export default function DraftCard(props: Draft) {
  const { clientId, stepName, clientName, progressPercent } = props;

  const remove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    // TODO: see if this functionality should exist
  };

  return (
    <S.Container href={`${ROUTES.BACKOFFICE.CLIENT_CREATION}?client-id=${clientId}`}>
      <S.Header>
        <S.Name>{clientName}</S.Name>
        <Button onClick={remove} color='primary' variant='text' size='small'>
          <S.Trash className='icon-trash' />
        </Button>
      </S.Header>

      <Progress percent={progressPercent} showInfo={false} isPrimary />

      <S.Footer>
        ({stepName}) {progressPercent}%
      </S.Footer>
    </S.Container>
  );
}
