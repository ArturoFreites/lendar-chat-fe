export interface PaginationResponse<T> {
    results: T[];
    page: number;
    totalItems: number;
    totalPages: number;
}
