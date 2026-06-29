import { TResponse } from '@/types/response.types';

export type ApplicationStatus = 'Pending' | 'Accepted' | 'Rejected';

export const APPLICATION_STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Accepted', label: 'Accepted' },
  { value: 'Rejected', label: 'Rejected' },
];

export type PaginatedPayload<T> = {
  data?: T[];
  items?: T[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  total?: number;
};

export function getPaginatedList<T>(response?: TResponse<PaginatedPayload<T> | T[]>): {
  list: T[];
  total: number;
} {
  if (!response?.data) return { list: [], total: 0 };

  const payload = response.data;

  if (Array.isArray(payload)) {
    return { list: payload, total: payload.length };
  }

  const list = payload.data ?? payload.items ?? [];
  const total = payload.meta?.total ?? payload.total ?? list.length;

  return { list, total };
}

export function normalizeStatus(status?: string): ApplicationStatus {
  if (!status) return 'Pending';
  const lower = status.toLowerCase();
  if (lower === 'accepted' || lower === 'approved') return 'Accepted';
  if (lower === 'rejected' || lower === 'declined') return 'Rejected';
  return 'Pending';
}

export function isPendingStatus(status?: string): boolean {
  return normalizeStatus(status) === 'Pending';
}

export function isAcceptedStatus(status?: string): boolean {
  return normalizeStatus(status) === 'Accepted';
}

/** @deprecated use isAcceptedStatus */
export function isApprovedStatus(status?: string): boolean {
  return isAcceptedStatus(status);
}

export function isRejectedStatus(status?: string): boolean {
  return normalizeStatus(status) === 'Rejected';
}

export function getStatusTagColor(status?: string): string {
  if (isAcceptedStatus(status)) return 'green';
  if (isRejectedStatus(status)) return 'red';
  return 'gold';
}

export function formatDetailDate(value?: string | null): string {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function formatDetailBoolean(value?: boolean | null): string {
  if (value === true) return 'Yes';
  if (value === false) return 'No';
  return '—';
}
