import React, { useState, useEffect } from 'react';
import { 
  X, Bell, MessageSquare, Check, ShieldCheck, Calendar, 
  DollarSign, FileText, Send, ArrowLeft, User, Sparkles, CheckCheck, Building
} from 'lucide-react';
import { 
  getNotifications, 
  markAllNotificationsRead, 
  markNotificationRead,
  getMessages, 
  sendMessageToThread, 
  markThreadRead,
  getUser 
} from '../utils/userStorage';
import { apiService } from '../services/api';

export default function NotificationModal({ 
  isOpen, 
  onClose, 
  initialTab = 'notifications',
  initialThreadId = null,
  onNotificationCountChange
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'notifications' | 'messages'
  const [notifications, setNotifications] = useState(getNotifications());
  const [messages, setMessages] = useState(getMessages());
  const [activeThreadId, setActiveThreadId] = useState(initialThreadId);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Sync state whenever modal is opened or thread target changes
  useEffect(() => {
    if (isOpen) {
      const currentUser = getUser();
      // Load from local storage first for instant render
      setNotifications(getNotifications());
      setMessages(getMessages());

      if (initialThreadId) {
        setActiveTab('messages');
        setActiveThreadId(initialThreadId);
        markThreadRead(initialThreadId);
      } else {
        setActiveTab(initialTab);
        setActiveThreadId(null);
      }

      // Fetch fresh data from backend
      apiService.getNotificationsList(currentUser).then(remoteNotifs => {
        if (Array.isArray(remoteNotifs)) setNotifications(remoteNotifs);
      }).catch(() => {});

      apiService.getThreads(currentUser).then(remoteThreads => {
        if (Array.isArray(remoteThreads)) setMessages(remoteThreads);
      }).catch(() => {});
    }
  }, [isOpen, initialTab, initialThreadId]);

  if (!isOpen) return null;

  // Unread counts
  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const unreadMsgCount = messages.reduce((acc, m) => acc + (m.unreadCount || 0), 0);

  const handleMarkAllRead = async () => {
    const updated = markAllNotificationsRead();
    setNotifications(updated);
    if (onNotificationCountChange) {
      onNotificationCountChange(0 + unreadMsgCount);
    }
    await apiService.markAllNotificationsRead(getUser()).catch(() => {});
  };

  const handleNotificationClick = async (id) => {
    const updated = markNotificationRead(id);
    setNotifications(updated);
    if (onNotificationCountChange) {
      const newNotifCount = updated.filter(n => !n.read).length;
      onNotificationCountChange(newNotifCount + unreadMsgCount);
    }
    await apiService.markNotificationRead(id, getUser()).catch(() => {});
  };

  const handleOpenThread = async (threadId) => {
    setActiveThreadId(threadId);
    const updated = markThreadRead(threadId);
    setMessages(updated);
    if (onNotificationCountChange) {
      const newMsgCount = updated.reduce((acc, m) => acc + (m.unreadCount || 0), 0);
      onNotificationCountChange(unreadNotifCount + newMsgCount);
    }
    await apiService.markThreadRead(threadId, getUser()).catch(() => {});
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThreadId || isSending) return;

    const textToSend = replyText.trim();
    setReplyText('');
    setIsSending(true);

    // Optimistic local update
    const updated = sendMessageToThread(activeThreadId, textToSend);
    setMessages(updated);

    try {
      // Direct call to Hono backend API
      const res = await apiService.sendMessage(activeThreadId, textToSend, getUser());
      if (res?.threadMessages) {
        setMessages(prev => prev.map(t => {
          if (t.id === activeThreadId) {
            return { ...t, messages: res.threadMessages, time: 'Just now' };
          }
          return t;
        }));
      }
    } catch (err) {
      console.warn('Backend message send error:', err);
    } finally {
      setIsSending(false);
    }
  };

  const activeThread = messages.find(t => t.id === activeThreadId);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'inspection':
        return <Calendar size={16} style={{ color: '#2563EB' }} />;
      case 'price':
        return <DollarSign size={16} style={{ color: '#D97706' }} />;
      case 'legal':
        return <ShieldCheck size={16} style={{ color: 'var(--accent)' }} />;
      case 'inquiry':
        return <MessageSquare size={16} style={{ color: 'var(--accent-gold)' }} />;
      default:
        return <Bell size={16} style={{ color: 'var(--accent)' }} />;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(12, 20, 15, 0.45)',
      backdropFilter: 'blur(4px)',
      padding: '75px 20px 20px 20px'
    }} onClick={onClose}>
      
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '430px',
          height: 'min(680px, calc(100vh - 100px))',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          border: '1px solid rgba(210, 125, 45, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideInRight 0.25s ease-out'
        }}
      >
        {/* Header Bar */}
        <div style={{
          backgroundColor: '#1A3E26',
          color: '#FFFFFF',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: 'rgba(210, 125, 45, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-gold)'
            }}>
              <Bell size={16} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Activity & Inbox</h3>
              <p style={{ margin: 0, fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>
                Notifications & Direct Messages
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher: Notifications vs Messages */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border)',
          backgroundColor: '#FAF9F6'
        }}>
          <button
            onClick={() => { setActiveTab('notifications'); setActiveThreadId(null); }}
            style={{
              flex: 1,
              padding: '12px 14px',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'notifications' ? 700 : 500,
              color: activeTab === 'notifications' ? 'var(--accent)' : 'var(--text-body)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'notifications' ? '2.5px solid var(--accent)' : '2.5px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Bell size={15} />
            <span>Notifications</span>
            {unreadNotifCount > 0 && (
              <span style={{
                backgroundColor: 'var(--accent-gold)',
                color: '#FFFFFF',
                borderRadius: '10px',
                fontSize: '0.68rem',
                padding: '1px 6px',
                fontWeight: 700
              }}>
                {unreadNotifCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            style={{
              flex: 1,
              padding: '12px 14px',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'messages' ? 700 : 500,
              color: activeTab === 'messages' ? 'var(--accent)' : 'var(--text-body)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'messages' ? '2.5px solid var(--accent)' : '2.5px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <MessageSquare size={15} />
            <span>Messages</span>
            {unreadMsgCount > 0 && (
              <span style={{
                backgroundColor: 'var(--accent-gold)',
                color: '#FFFFFF',
                borderRadius: '10px',
                fontSize: '0.68rem',
                padding: '1px 6px',
                fontWeight: 700
              }}>
                {unreadMsgCount}
              </span>
            )}
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          
          {/* TAB 1: NOTIFICATIONS VIEW */}
          {activeTab === 'notifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Quick Actions Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 18px',
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid var(--border)',
                fontSize: '0.75rem'
              }}>
                <span style={{ color: 'var(--text-body)', fontWeight: 600 }}>
                  {unreadNotifCount} unread alert{unreadNotifCount !== 1 ? 's' : ''}
                </span>
                {unreadNotifCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CheckCheck size={14} />
                    <span>Mark all as read</span>
                  </button>
                )}
              </div>

              {/* Notification Items List */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9CA3AF' }}>
                    <Bell size={36} style={{ strokeWidth: 1.5, margin: '0 auto 10px', display: 'block' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleNotificationClick(item.id)}
                      style={{
                        padding: '14px 18px',
                        borderBottom: '1px solid var(--border)',
                        backgroundColor: item.read ? '#FFFFFF' : 'rgba(26, 62, 38, 0.04)',
                        display: 'flex',
                        gap: '12px',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(26, 62, 38, 0.08)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = item.read ? '#FFFFFF' : 'rgba(26, 62, 38, 0.04)'}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        backgroundColor: '#FAF9F6',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {getCategoryIcon(item.category)}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3px' }}>
                          <h4 style={{
                            margin: 0,
                            fontSize: '0.85rem',
                            fontWeight: item.read ? 600 : 700,
                            color: 'var(--text-title)'
                          }}>
                            {item.title}
                          </h4>
                          {!item.read && (
                            <span style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--accent)',
                              display: 'inline-block',
                              marginLeft: '6px'
                            }} />
                          )}
                        </div>
                        <p style={{
                          margin: 0,
                          fontSize: '0.78rem',
                          color: 'var(--text-body)',
                          lineHeight: '1.4',
                          fontWeight: 400
                        }}>
                          {item.message}
                        </p>
                        <span style={{
                          fontSize: '0.68rem',
                          color: '#9CA3AF',
                          display: 'block',
                          marginTop: '5px'
                        }}>
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MESSAGES VIEW */}
          {activeTab === 'messages' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* If no thread selected: show thread list */}
              {!activeThreadId ? (
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <div style={{
                    padding: '10px 18px',
                    backgroundColor: '#FAF9F6',
                    borderBottom: '1px solid var(--border)',
                    fontSize: '0.75rem',
                    color: 'var(--text-body)',
                    fontWeight: 600
                  }}>
                    Conversations with Agents & Inquiries
                  </div>

                  {messages.map(thread => {
                    const lastMsg = thread.messages[thread.messages.length - 1];
                    return (
                      <div
                        key={thread.id}
                        onClick={() => handleOpenThread(thread.id)}
                        style={{
                          padding: '14px 18px',
                          borderBottom: '1px solid var(--border)',
                          backgroundColor: thread.unreadCount > 0 ? 'rgba(210, 125, 45, 0.05)' : '#FFFFFF',
                          display: 'flex',
                          gap: '12px',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(26, 62, 38, 0.06)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = thread.unreadCount > 0 ? 'rgba(210, 125, 45, 0.05)' : '#FFFFFF'}
                      >
                        <img 
                          src={thread.contactAvatar} 
                          alt={thread.contactName}
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '1.5px solid var(--accent)',
                            flexShrink: 0
                          }}
                        />

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>
                                {thread.contactName}
                              </span>
                              <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
                            </div>
                            <span style={{ fontSize: '0.68rem', color: '#9CA3AF' }}>
                              {thread.time}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.68rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                              {thread.contactRole}
                            </span>
                            {thread.propertyTitle && (
                              <span style={{
                                fontSize: '0.64rem',
                                color: 'var(--accent)',
                                backgroundColor: 'rgba(26,62,38,0.08)',
                                padding: '1px 5px',
                                borderRadius: '3px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '160px'
                              }}>
                                🏡 {thread.propertyTitle}
                              </span>
                            )}
                          </div>

                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <p style={{
                              margin: 0,
                              fontSize: '0.76rem',
                              color: thread.unreadCount > 0 ? 'var(--text-title)' : 'var(--text-body)',
                              fontWeight: thread.unreadCount > 0 ? 600 : 400,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {lastMsg ? lastMsg.text : 'Start conversation...'}
                            </p>
                            {thread.unreadCount > 0 && (
                              <span style={{
                                backgroundColor: 'var(--accent)',
                                color: '#FFFFFF',
                                borderRadius: '10px',
                                fontSize: '0.66rem',
                                padding: '1px 6px',
                                fontWeight: 700,
                                marginLeft: '8px'
                              }}>
                                {thread.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Thread Detail & Active Chat */
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  
                  {/* Thread Top Sub-bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    backgroundColor: '#FAF9F6',
                    borderBottom: '1px solid var(--border)'
                  }}>
                    <button
                      onClick={() => setActiveThreadId(null)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title="Back to all messages"
                    >
                      <ArrowLeft size={18} />
                    </button>

                    <img 
                      src={activeThread?.contactAvatar} 
                      alt={activeThread?.contactName}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>
                          {activeThread?.contactName}
                        </span>
                        <ShieldCheck size={13} style={{ color: 'var(--accent)' }} />
                      </div>
                      <span style={{ fontSize: '0.68rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                        Online • Verified
                      </span>
                    </div>
                  </div>

                  {activeThread?.propertyTitle && (
                    <div style={{
                      backgroundColor: 'rgba(26,62,38,0.06)',
                      borderBottom: '1px solid var(--border)',
                      padding: '7px 16px',
                      fontSize: '0.74rem',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Building size={13} style={{ flexShrink: 0, color: 'var(--accent-gold)' }} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Regarding: <strong>{activeThread.propertyTitle}</strong>
                      </span>
                    </div>
                  )}

                  {/* Chat Messages Stream */}
                  <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    backgroundColor: '#FAFAF9'
                  }}>
                    {activeThread?.messages.map(msg => {
                      const isMe = msg.sender === 'me';
                      return (
                        <div
                          key={msg.id}
                          style={{
                            alignSelf: isMe ? 'flex-end' : 'flex-start',
                            maxWidth: '82%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isMe ? 'flex-end' : 'flex-start'
                          }}
                        >
                          <div style={{
                            padding: '10px 14px',
                            borderRadius: isMe ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                            backgroundColor: isMe ? 'var(--accent)' : '#FFFFFF',
                            color: isMe ? '#FFFFFF' : 'var(--text-title)',
                            fontSize: '0.82rem',
                            lineHeight: '1.45',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            border: isMe ? 'none' : '1px solid var(--border)'
                          }}>
                            {msg.text}
                          </div>
                          <span style={{
                            fontSize: '0.64rem',
                            color: '#9CA3AF',
                            marginTop: '3px',
                            padding: '0 4px'
                          }}>
                            {msg.time}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Interactive Reply Input Bar */}
                  <form
                    onSubmit={handleSendReply}
                    style={{
                      padding: '10px 14px',
                      backgroundColor: '#FFFFFF',
                      borderTop: '1px solid var(--border)',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center'
                    }}
                  >
                    <input
                      type="text"
                      placeholder={`Reply to ${activeThread?.contactName.split(' ')[0]}...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: '20px',
                        border: '1px solid var(--border)',
                        fontSize: '0.84rem',
                        outline: 'none',
                        backgroundColor: '#FAF9F6'
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        backgroundColor: replyText.trim() ? 'var(--accent)' : '#E5E7EB',
                        color: '#FFFFFF',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: replyText.trim() ? 'pointer' : 'default',
                        transition: 'background 0.2s'
                      }}
                    >
                      <Send size={16} />
                    </button>
                  </form>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
