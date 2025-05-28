
export const analyzeCompanyWebsite = async (website: string): Promise<any> => {
  try {
    console.log('Starting website analysis for:', website);
    
    // Make POST request to the DigitalOcean API
    const response = await fetch('https://starfish-app-xbudz.ondigitalocean.app/docs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: website })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API response successful:', data);
    
    if (data?.textContent) {
      console.log('First 400 words from website:', data.textContent);
    }
    
    return data;
  } catch (error) {
    console.error('Error in analyzeCompanyWebsite:', error);
    throw error;
  }
};
