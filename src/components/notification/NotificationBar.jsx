import {
  Clock,
  DollarSign,
  FileExclamationPoint,
  MessageCircle,
} from "lucide-react";
import React from "react";

const NotificationBar = ({ notifications }) => {
  const typeToIcon = {
    project: Clock,
    billing: DollarSign,
    system: FileExclamationPoint,
    other: MessageCircle,
  };

  return (
    <div className="space-y-4 mt-4">
      {/* Desktop */}
      {notifications.map((notification) => {
        const Icon = typeToIcon[notification.type] || MessageCircle;
        return (
          <div
            key={notification.id}
            className="hidden bg-tertiary rounded-2xl p-5 md:flex justify-between hover:bg-gray-300"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="bg-primary p-3 rounded-full">
                <Icon size={18} />
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-accent font-semibold text-lg mb-1">
                  {notification.title}
                </h4>
                <p className="text-slate-600 text-sm">
                  {notification.description}
                </p>
              </div>
            </div>

            <span className="text-sm text-slate-600 whitespace-nowrap">
              {notification.time}
            </span>
          </div>
        );
      })}

      {/* Mobile */}
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="md:hidden bg-tertiary rounded-xl p-4 flex flex-col"
        >
          <span className="text-xs text-slate-600 whitespace-nowrap">
            {notification.time}
          </span>
          <h4 className="text-accent font-semibold text-lg mb-1">
            {notification.title}
          </h4>
          <p className="text-slate-600 text-sm">{notification.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;
