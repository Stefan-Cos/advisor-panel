
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Starting to scrape URL:', url);

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set a reasonable timeout
    await page.setDefaultTimeout(30000);
    
    // Navigate to the URL
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // Extract text content from the page
    const textContent = await page.evaluate(() => {
      // Remove script and style elements
      const scripts = document.querySelectorAll('script, style, noscript');
      scripts.forEach(script => script.remove());
      
      // Get text content from body
      const body = document.querySelector('body');
      return body ? body.innerText : '';
    });

    await browser.close();

    // Split into words and take first 400
    const words = textContent.trim().split(/\s+/).filter(word => word.length > 0);
    const first400Words = words.slice(0, 400).join(' ');
    
    console.log('First 400 words extracted:', first400Words);
    console.log('Total words found:', words.length);

    return new Response(
      JSON.stringify({ 
        success: true, 
        textContent: first400Words,
        totalWords: words.length 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error scraping website:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to scrape website',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
