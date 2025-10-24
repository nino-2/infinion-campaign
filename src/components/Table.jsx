import React, { useState } from 'react'
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Table = ({campaigns = []}) => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("all");

   

    const filteredCampaigns = campaigns.filter((campaign) => {
    if (activeTab === "active") return campaign.status === "ACTIVE";
    if (activeTab === "inactive") return campaign.status === "INACTIVE";
    return true;
  });

   const goToCampaign = (id) => {
     navigate(`/campaign/${id}`)
   }
   
    

  return (
    <div className=" overflow-hidden bg-background">
        <table className="w-full">
        <thead>
            <tr className=" shadow-md bg-[#f0f4f4]">
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                S/N
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Campaign Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Start Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Actions
            </th>
            </tr>
        </thead>
        <tbody>
            {filteredCampaigns.map((campaign, idx) => (
            <tr
                key={campaign.id}
                className="border-b border-gray-500 hover:bg-muted/40 transition-colors last:border-0"
            >
                <td className="px-6 py-4 text-sm text-foreground">{idx + 1}.</td>
                <td className="px-6 py-4 text-sm text-foreground">
                {campaign.campaignName}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                {campaign.startDate}
                </td>
                <td className="px-6 py-4 text-sm">
                <span className={`font-medium ${campaign.campaignStatus ? "text-green-600" : "text-red-600"}`}>
                    {campaign.campaignStatus ? "ACTIVE" : "INACTIVE"}
                </span>
                </td>
                <td className="px-6 py-4 text-sm">
                <div className="flex gap-3">
                    <button onClick={() =>goToCampaign(campaign.id)}
                    className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="View"
                    >
                    <Eye className="h-5 w-5" />
                    </button>
                    <button onClick={() =>goToCampaign(campaign.id)}
                    className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Edit"
                    >
                    <Edit2 className="h-5 w-5" />
                    </button>
                    <button onClick={() =>goToCampaign(campaign.id)}
                    className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground hover:text-destructive"
                    aria-label="Delete"
                    >
                    <Trash2 className="h-5 w-5" />
                    </button>
                </div>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  )
}

export default Table