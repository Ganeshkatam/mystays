export interface NotificationDto {
  id: string;
  type: string;
  title: string;
  body: string;
  entityType: string;
  entityId: string;
  readAt: string | null;
  createdAt: string;
}
export interface NotificationListResponse {
  data: NotificationDto[];
  error: null;
  meta: { requestId: string };
}
export interface NotificationReadResponse {
  data: { id: string; readAt: string } | null;
  error: null | { code: string; message: string };
  meta: { requestId: string };
}
