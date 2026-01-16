"use client"
import { useState } from "react";
import EmptyClientDetail from "@/components/clients/EmptyClient";
import ClientDetail from "@/components/clients/ClientDetail";
import { clients, filters } from "@/utils/clientpage";
import { Search, Eye, MessageSquare, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/Dashboard/StatusBadge";

export default function Page() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  const filteredClients = clients.filter((client) => {
    const matchesFilter = activeFilter === 'All' || 
      (activeFilter === 'New' && client.status === 'New') ||
      (activeFilter === 'Inactive' && client.status === 'Inactive');
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleClientSelect = (client) => {
    setSelectedClient(client);
  };

  const handleBackToList = () => {
    setSelectedClient(null);
  };

  return (
    <div className="min-h-screen bg-secondary p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-accent mb-1">Clients</h1>
        </div>

        {/* Desktop: Always show EmptyClientDetail or ClientDetail */}
        <div className="hidden lg:block">
          {selectedClient ? (
            <ClientDetail client={selectedClient} onBack={handleBackToList} />
          ) : (
            <EmptyClientDetail />
          )}
        </div>

        {/* Mobile: Show ClientDetail only when client is selected */}
        {selectedClient && (
          <div className="lg:hidden">
            <ClientDetail client={selectedClient} onBack={handleBackToList} />
          </div>
        )}

        {/* Hide filters and list when client is selected on mobile */}
        <div className={`${selectedClient ? 'hidden lg:block' : 'block'} space-y-4`}>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-accent hover:bg-accent/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80 bg-white rounded-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
              <Input
                type="text"
                placeholder="Search Clients"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-white border-accent/10 text-accent placeholder:text-accent focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => handleClientSelect(client)}
                className="bg-tertiary rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className={`w-12 h-12 ${client.avatarColor}`}>
                      <AvatarFallback className="text-white font-bold">
                        {client.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-accent">{client.name}</p>
                      <p className="text-sm text-accent/60">{client.email}</p>
                    </div>
                  </div>
                  <Badge className={`${client.planColor} border-0 font-semibold`}>
                    {client.plan}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-accent/60 mb-1">Tenure</p>
                    <p className="text-sm font-medium text-accent">{client.tenure}</p>
                  </div>
                  <div>
                    <p className="text-xs text-accent/60 mb-1">Active Projects</p>
                    <p className="text-sm font-medium text-accent">{client.activeProjects}</p>
                  </div>
                  <div>
                    <p className="text-xs text-accent/60 mb-1">Last Activity</p>
                    <p className="text-sm font-medium text-accent">{client.lastActivity}</p>
                  </div>
                </div>

                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleClientSelect(client)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg text-accent hover:bg-accent/5 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">View</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg text-accent hover:bg-accent/5 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-medium">Message</span>
                  </button>
                  <button className="px-4 py-2 bg-white rounded-lg text-accent hover:bg-accent/5 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-tertiary rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-accent/10">
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">
                    Client
                  </th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">
                    Plan
                  </th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">
                    Tenure
                  </th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">
                    Active Projects
                  </th>
                  <th className="text-left p-4 text-accent/70 font-semibold uppercase text-xs">
                    Last Activity
                  </th>
                  <th className="text-right p-4 text-accent/70 font-semibold uppercase text-xs">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => handleClientSelect(client)}
                    className={`border-b border-accent/10 hover:bg-accent/5 transition-colors cursor-pointer ${
                      selectedClient?.id === client.id ? 'bg-accent/5' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className={`w-10 h-10 ${client.avatarColor}`}>
                          <AvatarFallback className="text-white font-bold">
                            {client.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-accent">{client.name}</p>
                          <p className="text-xs text-accent/60">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={`${client.planColor} border-0 font-semibold`}>
                        {client.plan}
                      </Badge>
                    </td>
                    <td className="p-4 text-accent/70">{client.tenure}</td>
                    <td className="p-4 text-accent/70">{client.activeProjects}</td>
                    <td className="p-4 text-accent/70">{client.lastActivity}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <ActionButton icon={Eye} label="View" onClick={() => handleClientSelect(client)} />
                        <ActionButton icon={MessageSquare} label="Message" />
                        <ActionButton icon={MoreVertical} label="More" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredClients.length === 0 && (
            <div className="bg-tertiary rounded-2xl p-12 text-center">
              <p className="text-accent/60">No clients found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}