import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InternationalForm from "../../components/forms/InternationalForm";
import NigeriaToAbroadForm from "../../components/forms/NigeriaToAbroadForm";

const CreateShipmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"international" | "nigeria">(
    "nigeria",
  );

  const tabs = [
    // { key: "international", label: "International" },
    { key: "nigeria", label: "Nigeria to Abroad" },
  ] as const;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1
                className="text-2xl font-bold text-slate-800"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Create New Shipment
              </h1>
              <p className="text-slate-500 text-sm">
                Fill in the details to generate a new shipment record
              </p>
            </div>
          </div>
        </div>

        {/* Tab System */}
        <div className="border-b border-slate-200 mb-6">
          <div className="flex gap-0 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-semibold transition-all border-none outline-none cursor-pointer bg-transparent relative
                  ${
                    activeTab === tab.key
                      ? "text-blue-600"
                      : "text-slate-400 hover:text-slate-600"
                  }
                `}
              >
                {tab.label}
                {/* Active underline indicator */}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div>
          {/* activeTab === "international" ? (
            <InternationalForm />
          ) : */ (
            <NigeriaToAbroadForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateShipmentPage;
