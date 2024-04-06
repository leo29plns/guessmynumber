import axios from 'axios';

export const fetchDataFromApi = async (apiEndpoint: string, locale: string): Promise<any> => {
    const params = {
        "locale": locale
    };

    try {
        const response = await axios.get(apiEndpoint, {params});
        
        return response.data;
    } catch (error) {
        throw new Error(`Can't get data from API (${apiEndpoint}).`);
    }
};