import React, { useState } from 'react';
import { Concern, ConcernStatus, IssueCategory } from '../types/concern';

interface ConcernListProps {
  concerns: Concern[];
  onUpdateStatus: (ticketId: string, status: ConcernStatus, notes?: string) => void;
}

const ConcernList: React.FC<ConcernListProps> = ({ concerns, onUpdateStatus }) => {
  const [filters, setFilters] = useState({
    status: '' as ConcernStatus | '',
    category: '' as IssueCategory | '',
    search: ''
  });

  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<{ [key: string]: string }>({});

  const filteredConcerns = concerns.filter(concern => {
    if (filters.status && concern.status !== filters.status) return false;
    if (filters.category && concern.category !== filters.category) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        concern.ticketId.toLowerCase().includes(searchLower) ||
        concern.email.toLowerCase().includes(searchLower) ||
        concern.fullName.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const getStatusBadge = (status: ConcernStatus) => {
    const config = {
      'New': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '🆕' },
      'In-progress': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '⚙️' },
      'Resolved': { color: 'bg-green-100 text-green-800 border-green-200', icon: '✅' }
    };
    
    const { color, icon } = config[status];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${color}`}>
        {icon} {status}
      </span>
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Support Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Manage and track all customer concerns and support requests
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-500">Total Tickets:</span>
                <span className="ml-2 font-semibold">{concerns.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">New Issues</p>
                <p className="text-2xl font-bold text-gray-900">
                  {concerns.filter(c => c.status === 'New').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🆕</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {concerns.filter(c => c.status === 'In-progress').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {concerns.filter(c => c.status === 'Resolved').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as ConcernStatus | '' })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="In-progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value as IssueCategory | '' })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Payment issue">Payment Issue</option>
                <option value="Order not received">Order Not Received</option>
                <option value="Damaged or wrong item">Damaged/Wrong Item</option>
                <option value="Technical bug">Technical Bug</option>
                <option value="Login/Account issue">Login/Account Issue</option>
                <option value="Other concern">Other Concern</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Search by Ticket ID, Email, or Name"
                  className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Concerns Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Ticket Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredConcerns.map((concern) => (
                  <React.Fragment key={concern.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-mono font-bold text-gray-900">{concern.ticketId}</div>
                          <div className="text-sm text-gray-600 mt-1">{concern.category}</div>
                          {concern.orderId && (
                            <div className="text-xs text-gray-500 mt-1">Order: {concern.orderId}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{concern.fullName}</div>
                          <div className="text-sm text-gray-600">{concern.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(concern.status)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {formatDate(concern.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedTicket(selectedTicket === concern.id ? null : concern.id)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
                        >
                          {selectedTicket === concern.id ? 'Hide' : 'View'} Details
                        </button>
                      </td>
                    </tr>
                    
                    {selectedTicket === concern.id && (
                      <tr>
                        <td colSpan={5} className="px-6 py-6 bg-blue-50 border-t border-blue-100">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Issue Description</h3>
                                <p className="text-gray-700 whitespace-pre-line">{concern.description}</p>
                                
                                <div className="mt-6">
                                  <h3 className="font-semibold text-gray-900 mb-3">Internal Notes</h3>
                                  <textarea
                                    value={adminNotes[concern.id] || concern.adminNotes || ''}
                                    onChange={(e) => setAdminNotes({ ...adminNotes, [concern.id]: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Add internal notes..."
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
                                <h3 className="font-semibold text-gray-900 mb-4">Update Status</h3>
                                <div className="space-y-3">
                                  {(['New', 'In-progress', 'Resolved'] as ConcernStatus[]).map((status) => (
                                    <button
                                      key={status}
                                      onClick={() => onUpdateStatus(concern.ticketId, status, adminNotes[concern.id])}
                                      className={`w-full px-4 py-3 rounded-lg text-sm font-medium border transition ${
                                        concern.status === status
                                          ? 'bg-blue-600 text-white border-blue-600'
                                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                      }`}
                                    >
                                      Mark as {status}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Attachments</h3>
                                <div className="grid grid-cols-2 gap-3">
                                  {concern.screenshots.map((_, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                          <span className="text-sm">📷</span>
                                        </div>
                                        <div>
                                          <div className="text-sm font-medium text-gray-900">Screenshot {index + 1}</div>
                                          <div className="text-xs text-gray-500">Click to view</div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredConcerns.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📭</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No concerns found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {filters.status || filters.category || filters.search 
                  ? 'Try changing your filters to see more results'
                  : 'No customer concerns have been submitted yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConcernList;