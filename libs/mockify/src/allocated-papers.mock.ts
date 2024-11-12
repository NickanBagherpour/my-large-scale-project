import {allocatedPapersData} from "./data/allocated-papers.data";

export const getAllocatedPapersData = async (params): Promise<any> => {

    const offset = params.pagination.offset;
    const limit = params.pagination.limit;
    const endIndex = offset + limit;
    const data = await new Promise((resolve) => {
        setTimeout(() => {
            const response = {
                data: {
                    content: allocatedPapersData.slice(offset, endIndex),
                    total: allocatedPapersData.length,
                }
            };

            resolve(response);

        }, 2500);
    });

    return data;
}