'use client';

import { useNotifications, type Notification } from '../lib/use-notifications';

interface NotificationCenterProps { userId:string; onRead?:(notification:Notification)=>void; }

export function NotificationCenter({userId,onRead}:NotificationCenterProps){
 const notifications=useNotifications(userId);
 const unread=notifications.filter(n=>n.read_at===null).length;
 const markRead=async(n:Notification)=>{if(n.read_at)return;const response=await fetch('/api/v1/notifications/'+n.id+'/read',{method:'PATCH'});if(response.ok)onRead?.(n);};
 return <section aria-label="Notifications">
  <header><h2>Notifications</h2><span aria-label={unread+' unread notifications'}>{unread}</span></header>
  {notifications.length===0?<p>No notifications yet.</p>:<ul>{notifications.map(n=><li key={n.id} data-unread={n.read_at===null}><button type="button" onClick={()=>void markRead(n)} aria-label={'Mark '+n.title+' as read'}>{n.title}</button><p>{n.body}</p><time dateTime={n.created_at}>{new Date(n.created_at).toLocaleString()}</time></li>)}</ul>}
 </section>;
}
