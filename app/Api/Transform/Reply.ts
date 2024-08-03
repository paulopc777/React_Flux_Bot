type Reply = {
  id: number;
  bot_trigger_id: number;
  description?: string;
  reply?: string;
  final_intent: number;
  weight?: number | null;
};

type Entry = {
  id: number;
  trigger: string;
  accounts: any[];
  buttons: string[];
  button_header: string;
  button_body: string;
  button_footer: string;
  use_button: boolean;
  company_id: number;
  final_intent: number | null;
  action: any[];
  initial_intent: number | null;
  stream: string;
  replies: Reply[];
};

export async function replaceReplyWithDescription(entries: any) {
  return entries.map((entry:any) => {
    return {
      ...entry,
      replies: entry.replies.map((reply:any) => {
        const { reply: replyText, ...rest } = reply;
        return {
          ...rest,
          description: replyText,
        };
      }),
    };
  });
}
