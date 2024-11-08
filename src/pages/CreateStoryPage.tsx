import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import { useStoryStore } from '../store/useStoryStore';

interface LocationState {
  anonymousId: string;
}

interface FormData {
  category: string;
  topic: string;
  country: string;
  title: string;
  description: string;
}

const CATEGORIES = ['Company', 'College', 'School', 'Government', 'Other'];
const TOPICS = ['WorkPressure', 'Bullying', 'Harassment', 'Discrimination', 'Corruption', 'Other'];
const COUNTRIES = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Other'];

export default function CreateStoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { anonymousId } = (location.state as LocationState) || {};
  const addStory = useStoryStore((state) => state.addStory);

  const [formData, setFormData] = useState<FormData>({
    category: '',
    topic: '',
    country: '',
    title: '',
    description: '',
  });

  if (!anonymousId) {
    navigate('/claim-identity');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStory({
      category: formData.category,
      subCategory: formData.topic,
      insider: anonymousId,
      location: formData.country,
      title: formData.title,
      content: formData.description,
    });
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">It's time to blow the whistle...</h1>
          <p className="text-gray-600">Make sure you don't reveal your personal details...</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insider Name
              </label>
              <input
                type="text"
                value={anonymousId}
                disabled
                className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Select your category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Choose your topic</option>
                  {TOPICS.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Select your location</option>
                  {COUNTRIES.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title of your story"
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Story description
              </label>
              <RichTextEditor
                content={formData.description}
                onChange={(content) => setFormData(prev => ({ ...prev, description: content }))}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}