
// Re-export everything from the refactored modules for backward compatibility
export type { MatchingBuyer } from './matching/types';
export { MatchingDataService } from './matching/dataService';
export { MatchingLinkingService } from './matching/linkingService';
export { RelationshipService as MatchingRelationshipService } from './matching/relationshipService';
export { transformMatchingBuyerToComponentFormat } from './matching/transformer';
export { normalizeWebsite, parseMatchScore } from './matching/utils';

// Legacy exports for backward compatibility
import { MatchingDataService } from './matching/dataService';
import { MatchingLinkingService } from './matching/linkingService';
import { RelationshipService } from './matching/relationshipService';

export const getBuyersFromMatching = MatchingDataService.getBuyersFromMatching;
export const getLinkedBuyerData = MatchingLinkingService.getLinkedBuyerData;
export const updateMatchingBuyerRelationships = RelationshipService.linkMatchingToBuyers;
