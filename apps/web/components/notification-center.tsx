"use client";

import { useNotifications, type Notification } from "../lib/use-notifications";

interface NotificationCenterProps {
  userId: string;
  onRead?: (notification: Notification) => void;
}

export function NotificationCenter({
  userId,
  onRead,
}: NotificationCenterProps) {
  const notifications = useNotifications(userId);
  const unread = notifications.filter(
    (notification) => notification.read_at === null,
  ).length;

  const markRead = async (notification: Notification) => {
    if (notification.read_at) return;

    const response = await fetch(
      "/api/v1/notifications/" + notification.id + "/read",
      {
        method: "PATCH",
      },
    );

    if (response.ok) {
      onRead?.(notification);
    }
  };

  return (
    <section className="notificationPanel" aria-label="Notifications">
      <header className="notificationPanelHeader">
        <div>
          <span className="eyebrow">INBOX</span>
          <h2>Notifications</h2>
        </div>
        <span className="unreadBadge">{unread} unread</span>
      </header>

      {notifications.length === 0 ? (
        <div className="notificationEmpty">
          <div>✓</div>
          <h3>You&apos;re all caught up.</h3>
          <p>
            New activity will appear here when something needs your attention.
          </p>
        </div>
      ) : (
        <ul className="notificationList">
          {notifications.map((notification) => (
            <li
              className="notificationItem"
              data-unread={notification.read_at === null}
              key={notification.id}
            >
              <span className="notificationDot" aria-hidden="true" />
              <div>
                <button
                  type="button"
                  className="notificationTitle"
                  onClick={() => void markRead(notification)}
                  aria-label={"Mark " + notification.title + " as read"}
                >
                  {notification.title}
                </button>
                <p>{notification.body}</p>
                <time dateTime={notification.created_at}>
                  {new Date(notification.created_at).toLocaleString()}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
