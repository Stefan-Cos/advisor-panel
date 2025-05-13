
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const BuyerMandatesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    timeline: '',
    industry: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "New mandate created successfully"
      });
      navigate('/buyer-mandates'); // Redirect to the mandates list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create mandate. Please try again."
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="w-full max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold text-blueknight-800 mb-6">Create New Buyer Mandate</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="e.g., Seeking SaaS Company in Healthcare" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of the buyer's mandate..."
                  className="input-field w-full"
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input 
                  type="text" 
                  id="budget" 
                  name="budget" 
                  value={formData.budget} 
                  onChange={handleChange} 
                  placeholder="e.g., $10M - $50M" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="timeline">Timeline</Label>
                <Input 
                  type="text" 
                  id="timeline" 
                  name="timeline" 
                  value={formData.timeline} 
                  onChange={handleChange} 
                  placeholder="e.g., Within 6 months" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    {/* Add more industries as needed */}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  type="text" 
                  id="location" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  placeholder="e.g., United States" 
                  required 
                />
              </div>
              
              <Button type="submit" className="bg-blueknight-700 hover:bg-blueknight-800">
                Create Mandate
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerMandatesPage;
