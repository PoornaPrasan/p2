import React, { createContext, useContext, useState, useEffect } from 'react';
import { Complaint, ComplaintCategory, ComplaintStatus, Analytics, Attachment } from '../types';

interface ComplaintContextType {
  complaints: Complaint[];
  myComplaints: Complaint[];
  analytics: Analytics;
  submitComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'updates'>) => void;
  updateComplaintStatus: (id: string, status: ComplaintStatus, message?: string) => void;
  addComplaintUpdate: (id: string, message: string, attachments?: File[]) => Promise<void>;
  getComplaintsByUser: (userId: string) => Complaint[];
  getComplaintsByCategory: (category: ComplaintCategory) => Complaint[];
  rateComplaint: (id: string, rating: number, feedback?: string) => void;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (context === undefined) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};

export const ComplaintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [myComplaints, setMyComplaints] = useState<Complaint[]>([]);

  // Fetch complaints from backend (all)
  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/complaints', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok && data.data && data.data.complaints) {
        setComplaints(
          data.data.complaints.map((c: Complaint & { submittedBy: unknown }) => ({
            ...c,
            submittedBy: typeof c.submittedBy === 'object' && c.submittedBy !== null
              ? (c.submittedBy as { _id: string })._id
              : c.submittedBy
          }))
        );
      }
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    }
  };

  // Fetch complaints submitted by the current user
  const fetchMyComplaints = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await fetch('http://localhost:5000/api/v1/complaints/my', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token || ''}`
        }
      });
      const data = await response.json();
      if (response.ok && data.data && data.data.complaints) {
        setMyComplaints(
          data.data.complaints.map((c: Complaint & { submittedBy: unknown }) => ({
            ...c,
            submittedBy: typeof c.submittedBy === 'object' && c.submittedBy !== null
              ? (c.submittedBy as { _id: string })._id
              : c.submittedBy
          }))
        );
        console.log('Fetched myComplaints:', data.data.complaints);
      }
    } catch (error) {
      console.error('Failed to fetch my complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchMyComplaints();
  }, []);

  const analytics: Analytics = {
    totalComplaints: complaints.length,
    resolvedComplaints: complaints.filter(c => c.status === 'resolved').length,
    averageResolutionTime: 3.5, // days (placeholder)
    complaintsByCategory: complaints.reduce((acc, complaint) => {
      acc[complaint.category] = (acc[complaint.category] || 0) + 1;
      return acc;
    }, {} as Record<ComplaintCategory, number>),
    complaintsByStatus: complaints.reduce((acc, complaint) => {
      acc[complaint.status] = (acc[complaint.status] || 0) + 1;
      return acc;
    }, {} as Record<ComplaintStatus, number>),
    monthlyTrends: [] // Placeholder
  };

  // Submit complaint to backend and refresh list
  const submitComplaint = async (complaintData: Partial<Complaint>) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await fetch('http://localhost:5000/api/v1/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token || ''}`
        },
        body: JSON.stringify(complaintData)
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to submit complaint');
      }
      await fetchComplaints();
      await fetchMyComplaints(); // Refresh my complaints as well
    } catch (error) {
      console.error('Error submitting complaint:', error);
      throw error;
    }
  };

  const updateComplaintStatus = (id: string, status: ComplaintStatus, message?: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id 
        ? { 
            ...complaint, 
            status, 
            updatedAt: new Date(),
            resolvedAt: status === 'resolved' ? new Date() : complaint.resolvedAt,
            updates: message ? [...complaint.updates, {
              id: `update-${Date.now()}`,
              message,
              createdBy: 'system',
              createdAt: new Date(),
              type: 'status_change' as const
            }] : complaint.updates
          }
        : complaint
    ));
  };

  const addComplaintUpdate = async (id: string, message: string, attachments?: File[]) => {
    try {
      // Upload attachments if provided
      const uploadedAttachments: Attachment[] = [];
      
      if (attachments && attachments.length > 0) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        for (const file of attachments) {
          const formData = new FormData();
          formData.append('file', file);
          
          const uploadResponse = await fetch('http://localhost:5000/api/v1/upload', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${user.token || ''}`
            },
            body: formData
          });
          
          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json().catch(() => null);
            throw new Error(errorData?.error || `Failed to upload file: ${file.name}`);
          }
          
          const uploadData = await uploadResponse.json();
          uploadedAttachments.push({
            id: `attachment-${Date.now()}-${uploadedAttachments.length}`,
      filename: file.name,
            url: uploadData.data.url,
      type: file.type.startsWith('image/') ? 'image' as const : 
            file.type.startsWith('video/') ? 'video' as const : 'document' as const,
      size: file.size
          });
        }
      }

    setComplaints(prev => prev.map(complaint => 
      complaint.id === id 
        ? { 
            ...complaint, 
            updatedAt: new Date(),
            updates: [...complaint.updates, {
              id: `update-${Date.now()}`,
              message,
                attachments: uploadedAttachments,
              createdBy: 'provider',
              createdAt: new Date(),
              type: 'progress_update' as const
            }]
          }
        : complaint
    ));
    } catch (error) {
      console.error('Error adding complaint update:', error);
      throw error;
    }
  };

  const getComplaintsByUser = (userId: string) => {
    return complaints.filter(complaint => complaint.submittedBy === userId);
  };

  const getComplaintsByCategory = (category: ComplaintCategory) => {
    return complaints.filter(complaint => complaint.category === category);
  };

  const rateComplaint = (id: string, rating: number, feedback?: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id 
        ? { ...complaint, rating, feedback, updatedAt: new Date() }
        : complaint
    ));
  };

  return (
    <ComplaintContext.Provider value={{
      complaints,
      myComplaints,
      analytics,
      submitComplaint,
      updateComplaintStatus,
      addComplaintUpdate,
      getComplaintsByUser,
      getComplaintsByCategory,
      rateComplaint
    }}>
      {children}
    </ComplaintContext.Provider>
  );
};