
// Utility to help identify tracking scripts and pixels
export const debugTrackingScripts = () => {
  console.log('=== TRACKING SCRIPT DEBUGGER ===');
  
  // Check for Facebook pixel scripts
  const fbScripts = document.querySelectorAll('script[src*="facebook"], script[src*="fbevents"]');
  console.log('Facebook scripts found:', fbScripts.length);
  fbScripts.forEach((script, index) => {
    console.log(`FB Script ${index + 1}:`, script.src);
  });
  
  // Check for Facebook pixel noscript tags
  const fbNoscripts = document.querySelectorAll('noscript img[src*="facebook.com/tr"]');
  console.log('Facebook noscript pixels found:', fbNoscripts.length);
  fbNoscripts.forEach((img, index) => {
    console.log(`FB Pixel ${index + 1}:`, img.src);
  });
  
  // Check all external scripts
  const allScripts = document.querySelectorAll('script[src]');
  console.log('All external scripts:');
  allScripts.forEach((script, index) => {
    console.log(`Script ${index + 1}:`, script.src);
  });
  
  // Check for any tracking pixels in img tags
  const trackingImages = document.querySelectorAll('img[src*="tr?"], img[src*="pixel"], img[src*="analytics"]');
  console.log('Tracking images found:', trackingImages.length);
  trackingImages.forEach((img, index) => {
    console.log(`Tracking Image ${index + 1}:`, img.src);
  });
  
  console.log('=== END TRACKING DEBUGGER ===');
};
