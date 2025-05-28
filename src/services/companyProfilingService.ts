


export const analyzeCompanyWebsite = async (website: string): Promise<any> => {
  try {
    console.log('Starting website analysis for:', website);
    
    // Make POST request to the DigitalOcean API (removed /docs from the URL)
    const response = await fetch('https://starfish-app-xbudz.ondigitalocean.app', {
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
    console.log('Full API response data:', JSON.stringify(data, null, 2));
    
    if (data?.textContent) {
      console.log('Website text content found');
      console.log('Text content length:', data.textContent.length);
      console.log('First 400 characters from website:', data.textContent.substring(0, 400));
    }

    if (data?.title) {
      console.log('Website title:', data.title);
    }

    if (data?.meta) {
      console.log('Website meta data:', data.meta);
    }

    if (data?.links) {
      console.log('Website links found:', data.links.length);
    }

    console.log('Analysis complete, returning data');
    
    return data;
  } catch (error) {
    console.error('Error in analyzeCompanyWebsite:', error);
    throw error;
  }
};


