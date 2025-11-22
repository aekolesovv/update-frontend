export const hashString = (s: string): number => {
    let h = 0;
    let i = 0;
    const l = s.length;

    if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
    return h;
};

const checkRes = (res: Response) => {
    if (res.ok) {
        return res;
    } else {
        return Promise.reject(res);
    }
};

export const fetchData = (url: string, method: string, data: any) => {
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...(!!data && { body: JSON.stringify(data) }),
    }).then(res => checkRes(res));
};
