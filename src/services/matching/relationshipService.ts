
/**
 * Service for updating matching buyer relationships
 */
export class MatchingRelationshipService {
  
  /**
   * Updated function to use the improved BuyerRelationshipService
   */
  static async updateMatchingBuyerRelationships() {
    try {
      console.log('Updating matching table buyer relationships using improved BuyerRelationshipService...');
      
      // Import the service dynamically to avoid circular dependencies
      const { BuyerRelationshipService } = await import('../buyerRelationshipService');
      const result = await BuyerRelationshipService.updateAllRelationships();
      
      console.log(`Updated ${result.updated} relationships with ${result.errors.length} errors`);
      return result.updated > 0;
    } catch (error) {
      console.error('Exception updating buyer relationships:', error);
      return false;
    }
  }
}
