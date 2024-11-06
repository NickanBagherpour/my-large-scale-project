import styled from "styled-components";
import RawFormItem from '../form-item/form-item';

export const FormItem = styled(RawFormItem)`
	flex: 1;
	& label {
		font-size: 1.2rem;
	}
`;

export const Create = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
