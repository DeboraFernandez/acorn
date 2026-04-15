export type SearchResult = {
  id: string;
  title: string;
  domain: string;
  snippet: string;
  url: string;
  createdAt: string;
  isRead: boolean;
  tags: string[];
};

export type SearchRow = {
  id: string;
  title: string | null;
  description: string | null;
  domain: string | null;
  url: string | null;
  created_at: string;
  is_read: boolean;
  tags: string[] | null;
};

export type SearchScreenProps = {
  onBack: () => void;
  onOpenDetail: (itemId: string) => void;
};

export type DateFilterValue = 'all' | '7d' | '30d' | '365d';
export type ReadFilterValue = 'all' | 'unread' | 'read';
