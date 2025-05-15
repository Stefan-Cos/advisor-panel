
import Shepherd from 'shepherd.js';
import { toast } from "@/hooks/use-toast";

// Tour steps configuration
const tourSteps = [
  {
    id: 'welcome',
    title: 'Welcome to BlueKnight',
    text: 'We help M&A advisors accelerate buyer discovery using our M&A-grade AI. Our system matches your deals to the right strategic and PE buyers using data-driven analysis.',
    attachTo: {
      element: 'body',
      on: 'bottom'
    },
    buttons: [
      {
        action: function() {
          return this.cancel();
        },
        classes: 'shepherd-button-secondary',
        text: 'Skip Tour'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Let\'s Start the Tour'
      }
    ],
    arrow: true
  },
  {
    id: 'dashboard-overview',
    title: 'Dashboard Overview',
    text: 'This is your command center. Track your projects, access insights, and begin your buyer searches directly from here.',
    attachTo: {
      element: '.premium-card',
      on: 'bottom'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Back'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Next'
      }
    ],
    arrow: true
  },
  {
    id: 'create-buyer-search',
    title: 'Create a Buyer Search',
    text: 'Start by creating a buyer search. We use AI to prefill your search based on your mandate criteria, saving you time and improving precision.',
    attachTo: {
      element: 'a[href="/add-listing"]',
      on: 'bottom'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Back'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Next'
      }
    ],
    arrow: true
  },
  {
    id: 'navigate-projects',
    title: 'Navigate to Projects',
    text: 'All your active mandates live here. Select a project to continue your search or refine existing buyer lists.',
    attachTo: {
      element: 'a[href="/listings"]',
      on: 'right'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Back'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Next'
      }
    ],
    arrow: true
  },
  {
    id: 'matching-in-progress',
    title: 'AI Matching in Progress',
    text: 'Our AI is analyzing your mandate to score buyers based on offering, positioning, use case, acquisition history, and more.',
    attachTo: {
      element: '.process-animation-placeholder',
      on: 'bottom'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Back'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Next'
      }
    ],
    arrow: true,
    beforeShowPromise: function() {
      return new Promise((resolve) => {
        // We'll add an animation placeholder in the BlueKnightList component
        resolve();
      });
    }
  },
  {
    id: 'blueknight-list',
    title: 'BlueKnight List',
    text: 'This is our pre-generated list of top-fit buyers based on your criteria. Think of it as your AI-powered short list.',
    attachTo: {
      element: '#blueknight-list-section',
      on: 'bottom'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Back'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Next'
      }
    ],
    arrow: true
  },
  {
    id: 'ai-buyer-builder',
    title: 'AI Buyer Builder',
    text: 'Our most powerful tool. Configure multiple buyer list strategies — geographic expansion, product adjacencies, roll-ups, and more — to generate bespoke buyer lists.',
    attachTo: {
      element: '#ai-buyer-builder-section',
      on: 'bottom'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Back'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Next'
      }
    ],
    arrow: true
  },
  {
    id: 'youre-set',
    title: 'You\'re Set!',
    text: 'You\'re ready to accelerate your dealmaking. Create your first search or explore your active projects.',
    attachTo: {
      element: 'body',
      on: 'bottom'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Back'
      },
      {
        action: function() {
          window.location.href = '/add-listing';
          return this.complete();
        },
        text: 'Create First Search'
      },
      {
        action: function() {
          window.location.href = '/listings';
          return this.complete();
        },
        text: 'Go to Projects'
      }
    ],
    arrow: true
  }
];

class TourService {
  private tour: Shepherd.Tour;
  private hasSeenTour: boolean;

  constructor() {
    this.hasSeenTour = Boolean(localStorage.getItem('blueknight_tour_completed'));
    
    this.tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'shadow-lg rounded-lg',
        scrollTo: { behavior: 'smooth', block: 'center' }
      },
      exitOnEsc: true
    });

    // Add steps to the tour
    tourSteps.forEach(step => {
      this.tour.addStep(step);
    });

    // Set up tour completion event
    this.tour.on('complete', this.onTourComplete.bind(this));
    this.tour.on('cancel', this.onTourComplete.bind(this));
  }

  // Check if user should see the tour
  shouldShowTour(): boolean {
    return !this.hasSeenTour;
  }

  // Start the tour
  startTour() {
    this.tour.start();
  }

  // Restart the tour manually
  restartTour() {
    this.tour.cancel();
    setTimeout(() => {
      this.tour.start();
    }, 100);
  }

  // Handle tour completion
  private onTourComplete() {
    localStorage.setItem('blueknight_tour_completed', 'true');
    this.hasSeenTour = true;
  
    toast({
      title: "Tour Completed",
      description: "You can restart the tour anytime from your settings.",
    });
  }
}

// Create a singleton instance
const tourService = new TourService();

export default tourService;
