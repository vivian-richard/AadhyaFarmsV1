import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';
import { 
  ChefHat, BookOpen, Tractor, Video, Heart, 
  Clock, User, Calendar, Eye, ArrowRight 
} from 'lucide-react';

const Blogs: React.FC = () => {
  const navigate = useNavigate();
  const { recipes, nutritionGuides, farmStories, videoTutorials, healthArticles } = useBlog();
  const [activeTab, setActiveTab] = useState<'recipes' | 'nutrition' | 'stories' | 'videos' | 'health'>('recipes');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#2D5016] mb-4">Farm Fresh Content</h1>
          <p className="text-xl text-gray-600">Recipes, guides, stories & more from Aadhya Farms</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'recipes'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <ChefHat className="h-5 w-5" />
            Recipes ({recipes.length})
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'nutrition'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            Nutrition Guides ({nutritionGuides.length})
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'stories'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Tractor className="h-5 w-5" />
            Farm Stories ({farmStories.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'videos'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Video className="h-5 w-5" />
            Video Tutorials ({videoTutorials.length})
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'health'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Heart className="h-5 w-5" />
            Health Articles ({healthArticles.length})
          </button>
        </div>

        {/* Recipes Tab */}
        {activeTab === 'recipes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
              >
                <div className="relative h-64">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-contain bg-gradient-to-br from-[#F5EFE0] to-white p-4"
                  />
                  <div className="absolute top-4 right-4 bg-[#2D5016] text-white px-3 py-1 rounded-full text-sm font-bold">
                    {recipe.difficulty}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#2D5016]">
                    {recipe.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2D5016] mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.prepTime} + {recipe.cookTime}
                    </span>
                    <span>{recipe.servings} servings</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-semibold text-[#2D5016]">{recipe.nutritionInfo.calories}</span>
                      <span className="text-gray-500"> cal</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#2D5016]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Nutrition Guides Tab */}
        {activeTab === 'nutrition' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {nutritionGuides.map((guide) => (
              <div
                key={guide.id}
                onClick={() => navigate(`/nutrition-guide/${guide.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-64 md:h-auto">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-contain bg-gradient-to-br from-[#F5EFE0] to-white p-6"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                        {guide.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {guide.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2D5016] mb-3">{guide.title}</h3>
                    <p className="text-gray-600 mb-4">{guide.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {guide.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(guide.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {guide.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Farm Stories Tab */}
        {activeTab === 'stories' && (
          <div className="space-y-8">
            {farmStories.map((story) => (
              <div
                key={story.id}
                onClick={() => navigate(`/farm-story/${story.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-64 md:h-auto">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-contain bg-gradient-to-br from-[#2D5016] to-[#3D6020] p-8"
                    />
                  </div>
                  <div className="md:w-3/4 p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-2 bg-[#2D5016] text-white rounded-full text-sm font-bold flex items-center gap-2">
                        <Tractor className="h-4 w-4" />
                        {story.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {story.readTime}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-[#2D5016] mb-3">{story.title}</h3>
                    <p className="text-gray-600 text-lg mb-6">{story.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {story.author}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(story.date).toLocaleDateString()}
                        </span>
                      </div>
                      <button className="flex items-center gap-2 px-6 py-3 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6020] transition-colors font-semibold">
                        Read Story
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Tutorials Tab */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoTutorials.map((video) => (
              <div
                key={video.id}
                onClick={() => navigate(`/video/${video.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="relative h-72">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-contain bg-gradient-to-br from-[#F5EFE0] to-white p-8"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all">
                    <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Video className="h-10 w-10 text-[#2D5016] ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-bold">
                    {video.duration}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#2D5016]">
                    {video.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2D5016] mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      {video.views.toLocaleString()} views
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(video.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Health Articles Tab */}
        {activeTab === 'health' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {healthArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/health-article/${article.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="relative h-64">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-contain bg-gradient-to-br from-[#F5EFE0] to-white p-6"
                  />
                  <div className="absolute top-4 right-4">
                    <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#2D5016] mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</p>
                    <div className="flex flex-wrap gap-2">
                      {article.benefits.slice(0, 3).map((benefit, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-semibold">
                          ✓ {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
