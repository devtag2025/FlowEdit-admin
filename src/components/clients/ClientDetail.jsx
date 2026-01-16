import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Tag, Briefcase, Clock, Mail, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";

const ClientDetail = ({ client, onBack }) => (
  <div className="bg-tertiary rounded-t-3xl lg:rounded-3xl p-6 lg:p-8 space-y-6">
    <div className="lg:hidden flex items-center justify-between mb-4">
      <button
        onClick={onBack}
        className="p-2 hover:bg-accent/5 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-accent" />
      </button>
      <div className="w-12 h-1 bg-accent/20 rounded-full absolute left-1/2 -translate-x-1/2 top-3" />
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className={`w-16 h-16 ${client.avatarColor}`}>
          <AvatarFallback className="text-white text-xl font-bold">
            {client.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold text-accent">{client.name}</h2>
          <p className="text-accent/60">{client.email}</p>
        </div>
      </div>
      <Badge className="bg-green-100 text-green-700 border-0 px-3 py-1">
        {client.status}
      </Badge>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl p-6">
        <div className="flex items-center gap-2 text-accent/60 text-sm mb-2">
          <Tag className="w-4 h-4" />
          <span>Plan</span>
        </div>
        <h3 className="text-2xl font-bold text-accent mb-1">{client.plan}</h3>
        <p className="text-xs text-accent/60">{client.memberSince}</p>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <div className="flex items-center gap-2 text-accent/60 text-sm mb-2">
          <Briefcase className="w-4 h-4" />
          <span>Active projects</span>
        </div>
        <h3 className="text-2xl font-bold text-accent mb-1">{client.activeProjects}</h3>
        <p className="text-xs text-accent/60">Current workload</p>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <div className="flex items-center gap-2 text-accent/60 text-sm mb-2">
          <Clock className="w-4 h-4" />
          <span>Tenure</span>
        </div>
        <h3 className="text-2xl font-bold text-accent mb-1">{client.tenure}</h3>
        <p className="text-xs text-accent/60">Member since</p>
      </div>
    </div>

    <div>
      <h4 className="text-sm font-semibold text-accent/70 uppercase mb-4">Actions</h4>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex flex-col lg:flex-row gap-3">
          <Button className="bg-primary hover:bg-primary/90 text-white gap-2 w-full lg:w-auto">
            <Mail className="w-4 h-4" />
            Send Message
          </Button>
          <Button variant="outline" className="border-accent/20 text-accent hover:bg-accent/5 gap-2 w-full lg:w-auto">
            <Tag className="w-4 h-4" />
            Send Custom Offer
          </Button>
        </div>
        <Button variant="ghost" className="text-danger hover:bg-danger/10 hover:text-danger gap-2 w-full lg:w-auto">
          <Trash2 className="w-4 h-4" />
          Delete Client
        </Button>
      </div>
    </div>
  </div>
);

export default ClientDetail;