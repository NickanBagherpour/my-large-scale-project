import styled from 'styled-components';
import { cssVar, respondTo } from '@oxygen/utils';

export const UserProfileWrapper = styled.div`
    background: ${(p) => p.theme.surface};
    border-radius: var(${cssVar.radius});

    & .user-section {
        background: ${(p) => p.theme.surface};
        display: flex;
        flex-direction: column;
        padding: 2.4rem 1.6rem;
        border-radius: var(${cssVar.radius});

        ${respondTo.down('sm')} {
            padding: 1.8rem;
        }

        & .user-section__top-row {
            display: flex;
            flex-direction: row;

            & .user-avatar-container {
                width: 60px;
                height: 60px;
                flex-shrink: 0; /* prevent from shrinking */
            }

            & .user-info {
                display: flex;
                flex-direction: column;
                padding: 0 0.6rem;
                justify-content: space-evenly;
                overflow: hidden; /* hide overflow content */

                & .user-profile-name {
                    font-size: 1.4rem;
                    font-weight: bold;
                    margin-top: 0.8rem;
                    color: ${(p) => p.theme.text.primary};
                    line-height: 1;

                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                & .user-profile-organization-container {
                    font-size: 1.4rem;
                    font-weight: normal;
                    color: ${(p) => p.theme.text.secondary};

                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }

        & .user-section__bottom-row {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            margin-top: 2.4rem;

            & > * {
                min-width: 45%;
                font-weight: 300;
                margin-inline: 0.3rem;

                ${respondTo.down('sm')} {
                    font-size: 1.4rem;
                }
            }
        }
    }
}
`;
