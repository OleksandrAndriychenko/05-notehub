export interface Note {
    "id": string,
    "title": string,
    "content": string,
    "tag": string
}
export interface FormData {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
