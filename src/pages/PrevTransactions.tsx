
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DealStatisticsTable from '@/components/transactions/DealStatisticsTable';
import BuyersTable from '@/components/transactions/BuyersTable';
import AIConfiguration from '@/components/transactions/AIConfiguration';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PrevTransactions = () => {
  const [aiConfig, setAiConfig] = useState({
    offeringWeight: 25,
    problemSolvedWeight: 25,
    useCaseWeight: 25,
    customersWeight: 25
  });

  const handleConfigChange = (newConfig: typeof aiConfig) => {
    setAiConfig(newConfig);
    // This will trigger re-analysis of both tables
    console.log('AI Configuration updated:', newConfig);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Previous Transactions Analysis</h1>
          <p className="text-gray-600">
            Analyze past transactions similar to your client's profile and identify the buyers involved.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* AI Configuration Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>AI Configuration</CardTitle>
                <CardDescription>
                  Adjust scoring weights for deal statistics analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIConfiguration 
                  config={aiConfig}
                  onConfigChange={handleConfigChange}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="deals" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="deals">Deal Statistics</TabsTrigger>
                <TabsTrigger value="buyers">Buyers Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="deals" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Previous Transactions – Deal Statistics</CardTitle>
                    <CardDescription>
                      Analyze past transactions similar to your client's profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DealStatisticsTable aiConfig={aiConfig} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="buyers" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Previous Transactions – Buyers</CardTitle>
                    <CardDescription>
                      Review the buyers involved in those transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BuyersTable aiConfig={aiConfig} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevTransactions;
