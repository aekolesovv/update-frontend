import { API_BASE_URL } from '@/constants/constants';
import { IData } from '@/types/Mailer.types';

const checkRes = (res: Response) => {
    if (res.ok) {
        return res;
    } else {
        console.error('API Error:', res.status, res.statusText);
        return Promise.reject(res);
    }
};

export const fetchData = (url: string, method: string, data: IData) => {
    console.log('Sending request to:', url);
    console.log('Request data:', data);

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...(!!data && { body: JSON.stringify(data) }),
    }).then(res => checkRes(res));
};

export const fetchSendEmail = (data: IData): Promise<Response> => {
    return fetchData(`${API_BASE_URL}/send-email`, 'POST', data);
};
