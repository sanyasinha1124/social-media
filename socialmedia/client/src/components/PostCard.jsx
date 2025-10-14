import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import React, { useState } from "react";
import moment from "moment";
import { dummyUserData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes_count || []);
  const currentUser = dummyUserData;

  const handleLike = () => {
    if (likes.includes(currentUser._id)) {
      setLikes(likes.filter((id) => id !== currentUser._id));
    } else {
      setLikes([...likes, currentUser._id]);
    }
  };

  // on clicking user icon on postcard navigate to user profile
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl">
      {/* user info */}
      <div
        onClick={() => navigate("/profile/" + post.user_id)}
        className="inline-flex items-center gap-3 cursor-pointer"
      >
        <img
          src={post.user.profile_picture}
          alt={post.user.full_name}
          className="w-10 h-10 rounded-full shadow"
        />
        <div>
          <div className="flex items-center space-x-1">
            <span>{post.user.full_name}</span>
            <BadgeCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-gray-500 text-sm">
            @{post.user.full_name} · {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* content with hashtags */}
      <div
        className="text-gray-800 text-sm whitespace-pre-line"
        dangerouslySetInnerHTML={{
          __html: post.content.replace(
            /(#\w+)/g,
            '<span class="text-indigo-600">$1</span>'
          ),
        }}
      />

      {/* images */}
      <div className="grid grid-cols-2 gap-2">
        {post.image_urls.map((img, index) => (
          <img
            src={img}
            key={index}
            className={`w-full h-48 object-cover rounded-lg ${
              post.image_urls.length === 1 ? "col-span-2 h-auto" : ""
            }`}
            alt={post.user.full_name}
          />
        ))}
      </div>

      {/* actions */}
      <div className="flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300">
        <div className="flex items-center gap-1">
          <Heart
            className={`w-4 h-4 cursor-pointer ${
              likes.includes(currentUser._id) ? "text-red-500 fill-red-500" : ""
            }`}
            onClick={handleLike}
          />
          <span>{likes.length}</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <MessageCircle className="w-4 h-4" />
          <span>{12}</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <Share2 className="w-4 h-4" />
          <span>{7}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
