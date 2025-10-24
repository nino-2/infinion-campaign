import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Form from '../components/Form';
import { ArrowLeft, Tally1 } from 'lucide-react';
import api from '../api/axiosIntegration';

const UserCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate('/campaigns');
      return;
    }

    const fetchCampaign = async () => {
      try {
        const response = await api.get(`/Campaign/${id}`);
        setCampaign(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Campaign not found.');
        navigate('/campaigns');
      }
    };

    fetchCampaign();
  }, [id, navigate]);

  if (!campaign) {
    return <div className="p-6">Loading...</div>;
  }

   {/* Doublecheck to avoid uncontrolled input errors*/}
  const safeCampaign = {
    campaignName: campaign.campaignName || '',
    campaignDescription: campaign.campaignDescription || '',
    startDate: campaign.startDate ? campaign.startDate.split('T')[0] : '',
    endDate: campaign.endDate ? campaign.endDate.split('T')[0] : '',
    dailyDigest: campaign.digestCampaign === true,
    keywords: Array.isArray(campaign.linkedKeywords)
      ? campaign.linkedKeywords.join(', ')
      : '',
    digestFrequency: campaign.dailyDigest || '',
  };

  {/*Edit*/}
  const handleSave = async (updatedData) => {
    try {
      const formatDate = (dateStr) => {
        if (!dateStr) return null;
        return new Date(dateStr).toISOString();
      };

      const payload = {
        id: parseInt(id, 10),
        campaignName: updatedData.campaignName,
        campaignDescription: updatedData.campaignDescription,
        startDate: formatDate(updatedData.startDate),
        endDate: updatedData.endDate ? formatDate(updatedData.endDate) : null,
        digestCampaign: updatedData.dailyDigest,
        linkedKeywords: updatedData.keywords.split(',').map(k => k.trim()).filter(Boolean),
        dailyDigest: updatedData.digestFrequency,
      };

      console.log('PUT Payload:', payload)

      await api.put(`/Campaign/${id}`, payload);
      setCampaign(prev => ({ ...prev, ...payload }));
      setEditing(false);
      alert('Campaign updated successfully!');
    } catch (error) {
      console.error('Update error:', error.response?.data || error.message);
      alert('Failed to update campaign.');
    }
  };

  {/*Delete*/}
  const handleDelete = async () => {
    try {
      await api.delete(`/Campaign/${id}`);
      alert('Campaign deleted successfully!');
      navigate('/campaigns');
    } catch (error) {
      console.error('Delete error:', error.response?.data || error.message);
      alert('Failed to delete campaign.');
    }
  };
 
  {/*Status*/}
 const isCampaignActive = campaign?.campaignStatus === true;
 const statusText = isCampaignActive ? "Active" : "Inactive";
 const statusColor = isCampaignActive ? "text-green-600" : "text-red-600";

  return (
    <>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ml-64">
          <Navbar />
          <main className="p-5 md:p-6">
            
            {/* Back Button */}
            <button onClick={()=>navigate('/campaigns')} className="inline-flex items-center mb-6">
              <ArrowLeft size={18} className="mr-1" />
              <span className="font-nunito font-medium">Back</span>
            </button>
            

            <div className="py-4 flex justify-between items-center">
              <h1 className="font-worksans font-bold text-2xl text-[#247b7b]">
                Campaign Information
              </h1>
              <div className="inline-flex items-center bg-[#f0f4f4] p-2 rounded-sm">
                <span className="font-nunito font-medium">Campaign Status</span>
                <Tally1 size={18} className="ml-2 text-gray-400" />
                <span className={`font-nunito ml-1 ${statusColor}`}>
                  {statusText}
                </span>
              </div>
            </div>

            <Form
              initialValues={safeCampaign}
              onSubmit={handleSave}
              disabled={!editing}
            />

            <div className="flex gap-3 mt-6">
              {editing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-5 py-2 text-sm rounded-md border border-[#247b7b] bg-transparent text-[#247b7b] hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                   <button
                    type="button"
                    onClick={() => document.querySelector('form')?.requestSubmit()}
                    className="px-5 py-2 text-sm rounded-md bg-[#247b7b] text-white hover:bg-[#1f6666]"
                    >
                      Save Changes
                    </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="px-5 py-2 text-sm rounded-md bg-[#247b7b] text-white hover:bg-[#1f6666]"
                  >
                    Edit Information
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="px-5 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                  >
                    Stop Campaign
                  </button>
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Are you sure you want to delete{' '}
                <span className="text-[#247b7b]">{campaign.campaignName}</span> campaign?
              </h3>
              <p className="text-gray-600 mt-2">This action cannot be undone.</p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Delete Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCampaign;