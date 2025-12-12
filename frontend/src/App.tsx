import React, { useState } from 'react';
import ConcernForm from './components/ConcernForm';
import ConcernList from './components/ConcernList';
import { Concern, ConcernFormData, ConcernStatus } from './types/concern';

const App: React.FC = () => {
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [isAdminView, setIsAdminView] = useState(false);

  const userEmail = 'Wishlistz@example.com';
  const userName = 'Wishlistz Support';

  const handleSubmitConcern = (formData: ConcernFormData) => {
    const newConcern: Concern = {
      id: Date.now().toString(),
      ...formData,
      status: 'New',
      createdAt: new Date(),
      ticketId: `TKT-${Date.now().toString().slice(-8)}`
    };
    
    setConcerns(prev => [newConcern, ...prev]);
    console.log('Submitting concern:', newConcern);
  };

  const handleUpdateStatus = (ticketId: string, status: ConcernStatus, notes?: string) => {
    setConcerns(prev => prev.map(concern => 
      concern.ticketId === ticketId 
        ? { ...concern, status, adminNotes: notes } 
        : concern
    ));
    console.log(`Updating ticket ${ticketId} to ${status}`, notes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Wishlistz Support</h1>
                <p className="text-sm text-gray-600">Customer Concern Center</p>
              </div>
            </div>
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className="px-5 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-gray-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium flex items-center gap-2"
            >
              {isAdminView ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Switch to User View
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Switch to Admin Dashboard
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAdminView ? (
          <ConcernList 
            concerns={concerns} 
            onUpdateStatus={handleUpdateStatus} 
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            <ConcernForm 
              userEmail={userEmail}
              userName={userName}
              onSubmit={handleSubmitConcern}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;