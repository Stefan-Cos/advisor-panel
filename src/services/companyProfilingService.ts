
export const analyzeCompanyWebsite = async (website: string): Promise<any> => {
  try {
    console.log('Starting website analysis for:', website);
    
    // Ensure the URL has a protocol
    let formattedUrl = website;
    if (!website.startsWith('http://') && !website.startsWith('https://')) {
      formattedUrl = 'https://' + website;
    }
    
    console.log('Formatted URL:', formattedUrl);
    
    // Make POST request to the DigitalOcean API
    const response = await fetch('https://starfish-app-xbudz.ondigitalocean.app/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: formattedUrl })
    });

    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}. Response: ${errorText}`);
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
