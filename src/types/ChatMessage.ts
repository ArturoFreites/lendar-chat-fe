import type { Author } from "./Author";

export interface ChatMessage {
    id: number;
    body: string;
    createdAt: string;
    author: Author;
    applicationId: number;
}
