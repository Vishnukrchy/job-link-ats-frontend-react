import React, { useState } from 'react';
import { Bell, Check, Trash2, Filter, Calendar, MessageSquare, FileText, Star } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

interface Notification {
  id: string;
  type: 'interview' | 'status' | 'feedback' | 'message' | 'reminder';
  title: string;
  message: string;
  date: Date;
  isRead: boolean;
  company?: string;
  actionUrl?: string;
}

const NotificationsCenterPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Your interview with TechCorp Solutions for Senior Frontend Developer position has been scheduled for Jan 25, 2024 at 10:00 AM.',
      date: new Date('2024-01-22T14:30:00'),
      isRead: false,
      company: 'TechCorp Solutions',
      actionUrl: '/candidate/calendar'
    },
    {
      id: '2',
      type: 'status',
      title: 'Application Status Updated',
      message: 'Your application for Full Stack Developer at StartupXYZ has been moved to "Under Review" status.',
      date: new Date('2024-01-21T09:15:00'),
      isRead: false,
      company: 'StartupXYZ',
      actionUrl: '/candidate/applications'
    },
    {
      id: '3',
      type: 'feedback',
      title: 'Resume Feedback Received',
      message: 'You have received feedback on your resume from InnovateLabs. Overall rating: 4.2/5.0',
      date: new Date('2024-01-20T16:45:00'),
      isRead: true,
      company: 'InnovateLabs',
      actionUrl: '/candidate/feedback'
    },
    {
      id: '4',
      type: 'message',
      title: 'New Message from HR',
      message: 'Sarah Johnson from TechCorp Solutions has sent you a message regarding your upcoming interview.',
      date: new Date('2024-01-19T11:20:00'),
      isRead: true,
      company: 'TechCorp Solutions',
      actionUrl: '/candidate/calls'
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Interview Reminder',
      message: 'Reminder: You have an interview tomorrow at 2:00 PM with StartupXYZ for Full Stack Developer position.',
      date: new Date('2024-01-18T18:00:00'),
      isRead: true,
      company: 'StartupXYZ',
      actionUrl: '/candidate/calendar'
    }
  ]);

  const [filterType, setFilterType] = useState('all');
  const [filterRead, setFilterRead] = useState('all');

  const filteredNotifications = notifications.filter(notification =>
    (filterType === 'all' || notification.type === filterType) &&
    (filterRead === 'all' || 
     (filterRead === 'unread' && !notification.isRead) ||
     (filterRead === 'read' && notification.isRead))
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'interview': return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'status': return <FileText className="w-5 h-5 text-green-500" />;
      case 'feedback': return <Star className="w-5 h-5 text-yellow-500" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-purple-500" />;
      case 'reminder': return <Bell className="w-5 h-5 text-orange-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'interview': return 'primary';
      case 'status': return 'success';
      case 'feedback': return 'warning';
      case 'message': return 'secondary';
      case 'reminder': return 'accent';
      default: return 'neutral';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            Stay updated with your job applications and interviews
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            leftIcon={<Check size={18} />}
            onClick={markAllAsRead}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="interview">Interviews</option>
          <option value="status">Status Updates</option>
          <option value="feedback">Feedback</option>
          <option value="message">Messages</option>
          <option value="reminder">Reminders</option>
        </select>
        
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filterRead}
          onChange={(e) => setFilterRead(e.target.value)}
        >
          <option value="all">All Notifications</option>
          <option value="unread">Unread Only</option>
          <option value="read">Read Only</option>
        </select>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`hover:shadow-lg transition-shadow ${
              !notification.isRead ? 'border-l-4 border-l-primary-500 bg-primary-50' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    <Badge variant={getTypeVariant(notification.type)} size="sm">
                      {notification.type}
                    </Badge>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{notification.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{formatTimeAgo(notification.date)}</span>
                      {notification.company && (
                        <span>• {notification.company}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {notification.actionUrl && (
                        <Button variant="outline\" size="sm">
                          View Details
                        </Button>
                      )}
                      
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Check size={16} />}
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Trash2 size={16} />}
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
          <p className="text-gray-600">
            {filterType !== 'all' || filterRead !== 'all' 
              ? 'Try adjusting your filters to see more notifications'
              : 'You\'re all caught up! New notifications will appear here.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationsCenterPage;