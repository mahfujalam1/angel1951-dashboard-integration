import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Building2,
} from "lucide-react";
import { Button, message } from "antd";
import Card from "../../components/ui/Card";

const BranchProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Branch",
    email: "branch@buanlogistics.com",
    phone: "+880 1712 345678",
    role: "Branch",
    branch: "Dhaka Central Branch",
    address: "House 12, Road 4, Dhanmondi, Dhaka",
    joinDate: "January 2023",
  });

  const handleSave = () => {
    message.success("Profile updated successfully");
    setEditing(false);
  };

  const labelClass =
    "block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5";
  const inputClass =
    "w-full border-none bg-slate-100/50 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:bg-slate-100 transition-colors";
  const readClass = "text-sm font-semibold text-slate-700 py-2";

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto pb-12">
        <div className="mb-8">
          <h1
            className="text-2xl font-black text-slate-800"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            My Profile
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your branch account information
          </p>
        </div>

        {/* Avatar Card */}
        <Card className="border-none shadow-sm mb-6">
          <div className="flex items-center gap-6 py-2">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-100">
                <User size={36} />
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 shadow-sm transition-colors">
                <Camera size={13} />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800">
                {profile.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {profile.role}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Building2 size={11} /> {profile.branch}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Member since {profile.joinDate}
              </p>
            </div>
            <div className="ml-auto">
              {editing ? (
                <div className="flex gap-2">
                  <Button
                    onClick={() => setEditing(false)}
                    className="rounded-lg h-9"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    icon={<Save size={14} />}
                    onClick={handleSave}
                    className="rounded-lg h-9 bg-blue-600"
                  >
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setEditing(true)}
                  className="rounded-lg h-9"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Info Fields */}
        <Card
          title="Personal Information"
          className="border-none shadow-sm mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
            <div>
              <label className={labelClass}>
                <User size={11} className="inline mr-1" />
                Full Name
              </label>
              {editing ? (
                <input
                  className={inputClass}
                  value={profile.name}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, name: e.target.value }))
                  }
                />
              ) : (
                <p className={readClass}>{profile.name}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>
                <Mail size={11} className="inline mr-1" />
                Email Address
              </label>
              {editing ? (
                <input
                  className={`${inputClass} opacity-60 cursor-not-allowed`}
                  value={profile.email}
                  readOnly
                />
              ) : (
                <p className={readClass}>{profile.email}</p>
              )}
              {editing && (
                <p className="text-[10px] text-slate-400 mt-1">
                  Email cannot be changed
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>
                <Phone size={11} className="inline mr-1" />
                Phone Number
              </label>
              {editing ? (
                <input
                  className={inputClass}
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, phone: e.target.value }))
                  }
                />
              ) : (
                <p className={readClass}>{profile.phone}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>
                <Building2 size={11} className="inline mr-1" />
                Branch
              </label>
              <p className={readClass}>{profile.branch}</p>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>
                <MapPin size={11} className="inline mr-1" />
                Address
              </label>
              {editing ? (
                <input
                  className={inputClass}
                  value={profile.address}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, address: e.target.value }))
                  }
                />
              ) : (
                <p className={readClass}>{profile.address}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Password */}
        <Card title="Security" className="border-none shadow-sm">
          <div className="py-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">Password</p>
              <p className="text-xs text-slate-400">
                Last changed 3 months ago
              </p>
            </div>
            <Button className="rounded-lg h-9 border-slate-300">
              Change Password
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BranchProfilePage;
