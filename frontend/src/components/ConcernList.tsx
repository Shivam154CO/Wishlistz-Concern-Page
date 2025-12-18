import React, { useEffect, useState } from 'react';

interface Concern {
  _id: string;
  name: string;
  email: string;
  orderId?: number;
  category: string;
  description: string;
  image1: string;
  image2: string;
  ticketId: string;
  status: 'submitted' | 'in-progress' | 'resolved';
  createdAt?: string;
}

type ConcernStatus = 'submitted' | 'in-progress' | 'resolved';

interface ConcernListProps {}

const ConcernList: React.FC<ConcernListProps> = () => {
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    status: '' as ConcernStatus | '',
    category: '',
    search: ''
  });

  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<{ [key: string]: string }>({});

  /* ================= FETCH ALL ================= */
  useEffect(() => {
    fetchConcerns();
  }, []);

  const fetchConcerns = async () => {
    try {
      const res = await fetch('http://localhost:8000/complaint/all');
      const data = await res.json();

      if (Array.isArray(data)) setConcerns(data);
      else if (Array.isArray(data.data)) setConcerns(data.data);
      else setConcerns([]);
    } catch (err) {
      console.error(err);
      setConcerns([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE STATUS (PATCH) ================= */
  const updateStatus = async (ticketId: string, status: ConcernStatus) => {
    try {
      await fetch('http://localhost:8000/complaint/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ticketId,
          status
        })
      });

      // UI update (without refetch)
      setConcerns(prev =>
        prev.map(c =>
          c.ticketId === ticketId ? { ...c, status } : c
        )
      );
    } catch (err) {
      console.error('Status update failed', err);
    }
  };

  /* ================= FILTER ================= */
  const filteredConcerns = concerns.filter(c => {
    if (filters.status && c.status !== filters.status) return false;
    if (filters.category && c.category !== filters.category) return false;

    if (filters.search) {
      const s = filters.search.toLowerCase();
      return (
        c.ticketId?.toLowerCase().includes(s) ||
        c.email?.toLowerCase().includes(s) ||
        c.name?.toLowerCase().includes(s)
      );
    }
    return true;
  });

  /* ================= UI HELPERS ================= */
  const getStatusBadge = (status: ConcernStatus) => {
    const map: Record<string, string> = {
      submitted: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${map[status]}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading complaints...
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">Customer Support Dashboard</h1>

        {/* FILTERS */}
        <div className="bg-white p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.status}
            onChange={e =>
              setFilters({ ...filters, status: e.target.value as ConcernStatus })
            }
            className="border p-2 rounded"
          >
            <option value="">All Status</option>
            <option value="submitted">submitted</option>
            <option value="in-progress">in-progress</option>
            <option value="resolved">resolved</option>
          </select>

          <select
            value={filters.category}
            onChange={e =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="Payment issue">Payment issue</option>
            <option value="Order not received">Order not received</option>
            <option value="Damaged or wrong item">Damaged or wrong item</option>
            <option value="Technical bug">Technical bug</option>
            <option value="Login/Account issue">Login/Account issue</option>
            <option value="Other concern">Other concern</option>
          </select>

          <input
            type="text"
            placeholder="Search ticket / email"
            value={filters.search}
            onChange={e =>
              setFilters({ ...filters, search: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Ticket</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredConcerns.map(c => (
                <React.Fragment key={c._id}>
                  <tr className="border-t">
                    <td className="p-3">
                      <p className="font-mono font-bold">{c.ticketId}</p>
                      <p className="text-sm text-gray-500">{c.category}</p>
                    </td>

                    <td className="p-3">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-gray-500">{c.email}</p>
                    </td>

                    <td className="p-3">{getStatusBadge(c.status)}</td>

                    <td className="p-3">
                      <button
                        onClick={() =>
                          setSelectedTicket(
                            selectedTicket === c._id ? null : c._id
                          )
                        }
                        className="text-blue-600"
                      >
                        {selectedTicket === c._id ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>

                  {selectedTicket === c._id && (
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="p-4">
                        <p className="mb-3">{c.description}</p>

                        <div className="flex gap-2">
                          {(['submitted', 'in-progress', 'resolved'] as ConcernStatus[]).map(s => (
                            <button
                              key={s}
                              onClick={() => updateStatus(c.ticketId, s)}
                              className="border px-4 py-2 rounded"
                            >
                              Mark {s}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {filteredConcerns.length === 0 && (
            <p className="text-center p-6 text-gray-500">
              No complaints found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConcernList;
