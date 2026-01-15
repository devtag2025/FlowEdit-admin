"use client"
import { TrendingUp } from "lucide-react";
const StatCard = ({ icon: Icon, title, percentage, subtitle, progress, trend }) => (
  <div className="bg-tertiary rounded-2xl p-6 space-y-4">
    <div className="flex items-start justify-between">
      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </div>
      )}
    </div>
    
    <div>
      <p className="text-sm text-accent/70 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-accent">{percentage}</h3>
      <p className="text-xs text-accent/60 mt-1">{subtitle}</p>
    </div>
    
    <div className="space-y-2">
      <div className="w-full h-2 bg-accent/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: percentage }}
        />
      </div>
    </div>
  </div>
);
export default StatCard;