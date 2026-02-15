export interface HistoryRecord {
  id: string;
  question: string;
  timestamp: number;
  yaos: number[];
}

// Local storage operations
export function getLocalHistory(): HistoryRecord[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('liuyao-history');
  return stored ? JSON.parse(stored) : [];
}

export function saveLocalHistory(records: HistoryRecord[]) {
  localStorage.setItem('liuyao-history', JSON.stringify(records));
}

export function addLocalRecord(record: HistoryRecord) {
  const history = getLocalHistory();
  history.unshift(record);
  saveLocalHistory(history);
}

export function deleteLocalRecord(id: string) {
  const history = getLocalHistory().filter(r => r.id !== id);
  saveLocalHistory(history);
  return history;
}

export function clearLocalHistory() {
  localStorage.removeItem('liuyao-history');
}

// Cloud API operations
export async function getCloudHistory(): Promise<HistoryRecord[]> {
  const res = await fetch('/api/history');
  if (!res.ok) throw new Error('Failed to fetch cloud history');
  return res.json();
}

export async function saveCloudRecord(record: HistoryRecord): Promise<void> {
  const res = await fetch('/api/history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  });
  if (!res.ok) throw new Error('Failed to save to cloud');
}

export async function deleteCloudRecord(id: string): Promise<void> {
  const res = await fetch(`/api/history?id=${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete from cloud');
}

export async function syncLocalToCloud(): Promise<{ synced: number }> {
  const local = getLocalHistory();
  if (local.length === 0) return { synced: 0 };

  const res = await fetch('/api/history/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ records: local }),
  });
  if (!res.ok) throw new Error('Failed to sync');
  return res.json();
}
