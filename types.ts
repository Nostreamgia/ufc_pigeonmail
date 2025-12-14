export interface NotebookMessage {
  id: string;
  variant: string;
  title: string;
  body: string;
}

export enum ReplyTone {
  HEROIC = 'Heroic Return',
  RELUCTANT = 'Reluctant refusal',
  NOSTALGIC = 'Nostalgic',
  STERN = 'Stern Leader',
  OLD_ENGLISH = 'Old English',
  FORMAL = 'Formal'
}

export interface GeneratedReply {
  text: string;
  tone: ReplyTone;
}