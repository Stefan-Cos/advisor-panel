
export const analyzeCompanyWebsite = async (website: string): Promise<any> => {
  try {
    const response = await fetch('http://167.71.130.151/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: website
      })
    });
    
    console.log('API Response status:', response.status);
    
    if (response.ok) {
      const apiData = await response.json();
      console.log('API Response data:', apiData);
      return apiData;
    } else {
      console.error('API request failed:', response.statusText);
      throw new Error(`API request failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error making API request:', error);
    throw error;
  }
};
