from sqlalchemy.orm import Session
from typing import List
from geopy.distance import geodesic
# Use absolute imports instead of relative imports
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import models
from models import User, WasteListing

class ComposterMatcher:
    """
    Service for matching waste listings with appropriate composters based on multiple factors
    """
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_recommended_composters(self, waste_listing_id: int, limit: int = 10) -> List[User]:
        """
        Get recommended composters for a waste listing based on multiple factors:
        1. Location proximity (primary factor)
        2. Composter capacity
        3. Waste type compatibility
        4. Composter rating/reviews (future enhancement)
        
        Args:
            waste_listing_id: ID of the waste listing
            limit: Maximum number of recommendations to return
            
        Returns:
            List of recommended composters sorted by relevance
        """
        # Get the waste listing
        waste_listing = self.db.query(WasteListing).filter(
            WasteListing.id == waste_listing_id
        ).first()
        
        if not waste_listing:
            return []
        
        # Get all active composters
        composters = self.db.query(User).filter(
            User.role == "composter",
            User.is_active == True
        ).all()
        
        # Score each composter based on multiple factors
        scored_composters = []
        for composter in composters:
            score = self._calculate_match_score(waste_listing, composter)
            if score > 0:  # Only include composters with some relevance
                scored_composters.append((composter, score))
        
        # Sort by score (descending) and return top matches
        scored_composters.sort(key=lambda x: x[1], reverse=True)
        return [composter for composter, score in scored_composters[:limit]]
    
    def _calculate_match_score(self, waste_listing: WasteListing, composter: User) -> float:
        """
        Calculate a match score between a waste listing and a composter.
        
        Factors considered:
        1. Location proximity (0-50 points)
        2. Waste type compatibility (0-30 points)
        3. Composter capacity (0-20 points)
        
        Returns:
            Score between 0 and 100
        """
        score = 0.0
        
        # 1. Location proximity (up to 50 points)
        # Use geospatial coordinates if available
        if (waste_listing.latitude and waste_listing.longitude and 
            composter.latitude and composter.longitude):
            # Calculate distance using geopy
            waste_coords = (waste_listing.latitude, waste_listing.longitude)
            composter_coords = (composter.latitude, composter.longitude)
            distance_km = geodesic(waste_coords, composter_coords).kilometers
            
            # Score based on distance (closer is better)
            if distance_km <= 5:  # Within 5 km
                score += 50
            elif distance_km <= 15:  # Within 15 km
                score += 35
            elif distance_km <= 30:  # Within 30 km
                score += 20
            elif distance_km <= 50:  # Within 50 km
                score += 10
            else:  # More than 50 km
                score += 5
        elif waste_listing.city and composter.city:
            # Fallback to city matching if coordinates aren't available
            if waste_listing.city.lower() == composter.city.lower():
                score += 50
            elif (waste_listing.city.lower() in composter.city.lower() or
                  composter.city.lower() in waste_listing.city.lower()):
                score += 30
            else:
                # Try state matching
                if (waste_listing.state and composter.state and 
                    waste_listing.state.lower() == composter.state.lower()):
                    score += 20
                else:
                    score += 10  # Some points for being in the system
        else:
            # Fallback to simple string matching
            if waste_listing.pickup_location and composter.location:
                if waste_listing.pickup_location.lower() == composter.location.lower():
                    score += 50
                else:
                    # Try to find partial matches
                    if (waste_listing.pickup_location.lower() in composter.location.lower() or
                        composter.location.lower() in waste_listing.pickup_location.lower()):
                        score += 30
                    else:
                        score += 10  # Some points for being in the system
        
        # 2. Waste type compatibility (up to 30 points)
        # Organic waste should go to composters
        if waste_listing.waste_type == models.WasteType.ORGANIC:
            score += 30  # Composters are ideal for organic waste
        else:
            # For non-organic waste, composters might still be relevant
            # but with lower priority
            score += 10
        
        # 3. Composter capacity/load (up to 20 points)
        # Check how many listings this composter is already handling
        current_load = self.db.query(WasteListing).filter(
            WasteListing.composter_id == composter.id,
            WasteListing.status.in_([
                models.WasteListingStatus.PENDING_PICKUP,
                models.WasteListingStatus.AVAILABLE
            ])
        ).count()
        
        # Composter with fewer listings gets higher score
        if current_load < 5:
            score += 20
        elif current_load < 10:
            score += 15
        elif current_load < 20:
            score += 10
        else:
            score += 5  # Still some capacity, but limited
            
        return score

def get_recommended_composters(db: Session, waste_listing_id: int, limit: int = 10) -> List[User]:
    """
    Convenience function to get recommended composters using the ComposterMatcher service.
    
    Args:
        db: Database session
        waste_listing_id: ID of the waste listing
        limit: Maximum number of recommendations to return
        
    Returns:
        List of recommended composters
    """
    matcher = ComposterMatcher(db)
    return matcher.get_recommended_composters(waste_listing_id, limit)