import {userProfile} from "./data/user.data";

export const getUserProfile = async (): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response = {
                data: userProfile
            };

            resolve(response);

        }, 1500);
    });
}

export const getUserPhoto = async () : Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response = {
                data: null
            };

            resolve(response);

        }, 2000);
    });
}

