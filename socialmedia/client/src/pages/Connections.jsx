import React, { useState } from "react";
import {
  Users,
  UserPlus,
  UserCheck,
  UserRoundPen,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingconnections,
} from "../assets/assets";

const Connections = () => {
  const [currentTab, setCurrentTab] = useState("Followers");
  const navigate = useNavigate();

  const dataArray = [
    { label: "Followers", value: followers, icon: Users },
    { label: "Following", value: following, icon: UserCheck },
    { label: "Pending", value: pendingconnections, icon: UserRoundPen },
    { label: "Connections", value: connections, icon: UserPlus },
  ];

  // Get current tab data dynamically
  const currentData =
    dataArray.find((item) => item.label === currentTab)?.value || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Connections
          </h1>
          <p className="text-slate-600">
            Manage your network and discover new connections!
          </p>
        </div>

        {/* Cards showing numbers */}
        <div className="mb-8 flex flex-wrap gap-6">
          {dataArray.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-1 border h-20 w-40 border-gray-200 bg-white shadow rounded-md"
            >
              <b>{item.value.length}</b>
              <p className="text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm mb-6">
          {dataArray.map((tab) => (
            <button
              onClick={() => setCurrentTab(tab.label)}
              key={tab.label}
              className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors ${
                currentTab === tab.label
                  ? "bg-slate-100 font-medium text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="ml-1">{tab.label}</span>
              <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                {tab.value.length}
              </span>
            </button>
          ))}
        </div>

        {/* Connections List */}
        <div className="flex flex-col gap-4">
          {currentData.length > 0 ? (
            currentData.map((user) => (
              <div
                key={user._id}
                className="flex gap-5 p-6 bg-white shadow rounded-md hover:shadow-md transition"
              >
                <img
                  src={user.profile_picture}
                  alt={user.full_name}
                  className="rounded-full w-12 h-12 shadow-md object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium text-slate-700">
                    {user.full_name}
                  </p>
                  <p className="text-slate-500 text-sm">{user.username}</p>
                  <p className="text-slate-500 text-sm">
                    {user.bio?.slice(0, 40) || "No bio available"}...
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {/* View Profile */}
                    <button
                      onClick={() => navigate(`/profile/${user._id}`)}
                      className="px-3 py-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white"
                    >
                      View Profile
                    </button>

                    {/* Conditional Buttons */}
                    {currentTab === "Following" && (
                      <button className="px-3 py-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition">
                        Unfollow
                      </button>
                    )}

                    {currentTab === "Pending" && (
                      <button className="px-3 py-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition">
                        Accept
                      </button>
                    )}

                    {currentTab === "Connections" && (
                      <button
                        onClick={() => navigate(`/messages/${user._id}`)}
                        className="flex items-center justify-center gap-1 px-3 py-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 mt-6">
              No users found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connections;
