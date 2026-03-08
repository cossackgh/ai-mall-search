export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type ApiMessage = {
  role: "user" | "assistant";
  content: string;
};
