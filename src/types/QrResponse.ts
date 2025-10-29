export interface QrResponse<T> {
    data: T;
    code: number;
    message: string;
    errors?: string[] | null;
}
