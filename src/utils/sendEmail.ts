import { API_BASE_URL } from '@/constants/constants';
import { IData } from '@/types/Mailer.types';

export type EmailStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SendEmailResult {
    success: boolean;
    error?: string;
}

export const sendEmail = async (data: IData): Promise<SendEmailResult> => {
    try {
        // Логирование для отладки
        if (process.env.NODE_ENV === 'development') {
            console.log('Sending email request:', {
                email: data.email,
                subject: data.subject,
                text: data.text?.substring(0, 50),
                recaptchaToken: data.recaptchaToken ? 'present' : 'missing',
            });
        }

        const response = await fetch(`${API_BASE_URL}/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            const errorMessage = responseData.error || `Ошибка: ${response.status} ${response.statusText}`;
            if (process.env.NODE_ENV === 'development') {
                console.error('Email send error:', errorMessage, responseData);
            }
            throw new Error(errorMessage);
        }

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Ошибка при отправке письма',
        };
    }
};



