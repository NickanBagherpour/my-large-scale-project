import { MarkText } from '@oxygen/ui-kit';
import * as S from './service-status-text.style';

const ServiceStatusText: React.FC<{ text: string; wordToHighlight: string; isActive: boolean }> = ({
  text,
  wordToHighlight,
  isActive,
}) => {
  if (!text) return null;
  return <MarkText text={text} wordToHighlight={wordToHighlight} highlightColor={isActive ? 'error' : 'success'} />;
};

const ClientList: React.FC<{ clients: { id: string; name: string }[] }> = ({ clients }) => {
  if (clients.length === 0) return null;
  return (
    <S.ClientsContainer>
      <S.ClientList>
        {clients.map((client, index) => (
          <li key={client?.id ?? index}>{client.name}</li>
        ))}
      </S.ClientList>
    </S.ClientsContainer>
  );
};

export default ServiceStatusText;
