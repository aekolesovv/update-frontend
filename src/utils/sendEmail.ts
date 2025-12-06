import { API_BASE_URL } from '@/constants/constants';
import { IData } from '@/types/Mailer.types';

export type EmailStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SendEmailResult {
    success: boolean;
    error?: string;
}

export const sendEmail = async (data: IData): Promise<SendEmailResult> => {
    try {
        const response = await fetch(`${API_BASE_URL}/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Ошибка при отправке письма',
        };
    }
};

