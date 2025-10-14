

import React, { useEffect, useState } from "react";
import { dummyPostsData, assets } from "../assets/assets";
import Loading from "../components/Loading";
import StoriesBar from "../components/StoriesBar";
import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages";



const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    // Simulate async fetch
    setFeeds(dummyPostsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      {/* Stories and posts section */}
      <div>
        <StoriesBar />
        <div className="p-4 space-y-6">
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Sponsored and messages (Right sidebar) */}
      <div className="max-xl:hidden sticky top-10 space-y-6">
        <div className="max-w-xs bg-white text-xs p-4 rounded-md flex flex-col gap-2 shadow">
          <h3 className="text-slate-800 font-semibold">Sponsored</h3>
          <img
            src={assets.sponsored_img}
            className="w-full h-40 object-cover rounded-md"
            alt="Sponsored"
          />
          <p className="text-slate-600 font-medium">Email Marketing</p>
          <p className="text-slate-400">
            Supercharge your marketing with a powerful, easy-to-use platform
            built for results.
          </p>
        </div>

        <div>
          <h3 className="text-slate-800 font-semibold mb-2">
          <RecentMessages/>
          </h3>
          <p className="text-slate-500 text-sm">No new messages</p>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
