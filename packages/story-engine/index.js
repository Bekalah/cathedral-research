// Cathedral Research Story Engine
// Branching narrative system for archetypal journeys and CYOA experiences

import { NarrativeEngine } from './src/narrative.js';
import { ChoiceSystem } from './src/choices.js';
import { ArchetypeProgression } from './src/archetypes.js';

class StoryEngine {
  constructor() {
    this.narrativeEngine = new NarrativeEngine();
    this.choiceSystem = new ChoiceSystem();
    this.archetypeProgression = new ArchetypeProgression();
    this.activeStories = new Map();
    this.playerProgress = new Map();
  }

  // Initialize a new story journey
  startStory(storyId, playerId = 'default') {
    const story = this.narrativeEngine.getStory(storyId);
    if (!story) {
      throw new Error(`Story not found: ${storyId}`);
    }

    const journey = {
      id: `${playerId}-${storyId}-${Date.now()}`,
      playerId,
      storyId,
      currentNode: story.startNode,
      progress: [],
      choices: [],
      archetype: this.archetypeProgression.initializeArchetype(story.archetype),
      startedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    this.activeStories.set(journey.id, journey);
    return journey;
  }

  // Get current story state
  getStoryState(journeyId) {
    return this.activeStories.get(journeyId);
  }

  // Make a choice and progress the story
  makeChoice(journeyId, choiceId) {
    const journey = this.activeStories.get(journeyId);
    if (!journey) {
      throw new Error(`Journey not found: ${journeyId}`);
    }

    const currentNode = this.narrativeEngine.getNode(journey.storyId, journey.currentNode);
    const choice = currentNode.choices.find(c => c.id === choiceId);

    if (!choice) {
      throw new Error(`Choice not found: ${choiceId}`);
    }

    // Record the choice and its consequences
    const choiceRecord = {
      nodeId: journey.currentNode,
      choiceId,
      choiceText: choice.text,
      timestamp: new Date().toISOString(),
      consequences: choice.consequences || []
    };

    journey.choices.push(choiceRecord);
    journey.currentNode = choice.nextNode;
    journey.lastUpdated = new Date().toISOString();

    // Update archetype based on choice
    if (choice.archetypeEffects) {
      journey.archetype = this.archetypeProgression.updateArchetype(
        journey.archetype,
        choice.archetypeEffects
      );
    }

    // Check for story completion
    if (choice.nextNode === 'END') {
      journey.completed = true;
      journey.completedAt = new Date().toISOString();
    }

    return {
      journey,
      nextNode: choice.nextNode === 'END' ? null : this.narrativeEngine.getNode(journey.storyId, choice.nextNode),
      archetypeChanges: choice.archetypeEffects || []
    };
  }

  // Get available choices for current node
  getAvailableChoices(journeyId) {
    const journey = this.activeStories.get(journeyId);
    if (!journey) return [];

    const currentNode = this.narrativeEngine.getNode(journey.storyId, journey.currentNode);
    return currentNode.choices.map(choice => ({
      id: choice.id,
      text: choice.text,
      description: choice.description,
      archetypeEffects: choice.archetypeEffects,
      requirements: choice.requirements
    }));
  }

  // Save story progress
  saveProgress(journeyId) {
    const journey = this.activeStories.get(journeyId);
    if (journey) {
      const saveData = {
        ...journey,
        savedAt: new Date().toISOString()
      };

      // Store in localStorage for browser environments
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`cathedral-story-${journeyId}`, JSON.stringify(saveData));
      }

      return saveData;
    }
    return null;
  }

  // Load story progress
  loadProgress(journeyId) {
    // Try to load from localStorage first
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(`cathedral-story-${journeyId}`);
      if (saved) {
        try {
          const journeyData = JSON.parse(saved);
          this.activeStories.set(journeyId, journeyData);
          return journeyData;
        } catch (e) {
          console.error('Failed to load saved story:', e);
        }
      }
    }

    return null;
  }

  // Get all available stories
  getAvailableStories() {
    return this.narrativeEngine.getAllStories();
  }

  // Get story by ID
  getStory(storyId) {
    return this.narrativeEngine.getStory(storyId);
  }

  // Generate story statistics
  getStoryStats(journeyId) {
    const journey = this.activeStories.get(journeyId);
    if (!journey) return null;

    return {
      totalChoices: journey.choices.length,
      storyProgress: this.calculateProgress(journey),
      archetypeLevel: journey.archetype.level,
      archetypeTraits: journey.archetype.traits,
      timePlayed: this.calculatePlayTime(journey),
      completionStatus: journey.completed ? 'completed' : 'in_progress'
    };
  }

  // Calculate story progress percentage
  calculateProgress(journey) {
    const story = this.narrativeEngine.getStory(journey.storyId);
    const totalNodes = this.narrativeEngine.getStoryNodeCount(journey.storyId);
    const visitedNodes = new Set(journey.progress.map(p => p.nodeId));

    return Math.round((visitedNodes.size / totalNodes) * 100);
  }

  // Calculate total play time
  calculatePlayTime(journey) {
    if (journey.completed && journey.completedAt) {
      const start = new Date(journey.startedAt);
      const end = new Date(journey.completedAt);
      return Math.round((end - start) / (1000 * 60)); // minutes
    }
    return 0;
  }

  // Export story data for analysis
  exportStoryData(journeyId) {
    const journey = this.activeStories.get(journeyId);
    if (!journey) return null;

    return {
      journeyId: journey.id,
      storyId: journey.storyId,
      playerId: journey.playerId,
      progress: journey.progress,
      choices: journey.choices,
      archetype: journey.archetype,
      statistics: this.getStoryStats(journeyId),
      exportedAt: new Date().toISOString()
    };
  }

  // Get recommended next story based on archetype
  getRecommendedStory(playerId) {
    const playerArchetype = this.getPlayerArchetype(playerId);

    // Recommend stories that would balance or develop the player's archetype
    const availableStories = this.getAvailableStories();

    return availableStories
      .filter(story => this.isStoryAccessible(story.id, playerArchetype))
      .map(story => ({
        ...story,
        relevance: this.calculateStoryRelevance(story, playerArchetype)
      }))
      .sort((a, b) => b.relevance - a.relevance);
  }

  // Get player's overall archetype from all completed stories
  getPlayerArchetype(playerId) {
    const playerJourneys = Array.from(this.activeStories.values())
      .filter(journey => journey.playerId === playerId);

    if (playerJourneys.length === 0) {
      return this.archetypeProgression.getDefaultArchetype();
    }

    // Combine archetypes from all journeys
    const combinedArchetype = this.archetypeProgression.combineArchetypes(
      playerJourneys.map(j => j.archetype)
    );

    return combinedArchetype;
  }

  // Check if story is accessible based on archetype
  isStoryAccessible(storyId, playerArchetype) {
    const story = this.narrativeEngine.getStory(storyId);
    if (!story) return false;

    // Check archetype requirements
    if (story.requiredArchetype) {
      return this.archetypeProgression.meetsRequirements(playerArchetype, story.requiredArchetype);
    }

    return true;
  }

  // Calculate how relevant a story is for current archetype development
  calculateStoryRelevance(story, playerArchetype) {
    let relevance = 0.5; // Base relevance

    // Increase relevance if story develops weak traits
    if (story.developsTraits) {
      const weakTraits = this.archetypeProgression.getWeakTraits(playerArchetype);
      const overlap = story.developsTraits.filter(trait => weakTraits.includes(trait)).length;
      relevance += overlap * 0.2;
    }

    // Increase relevance if story balances archetype
    if (story.balanceAspects) {
      const imbalance = this.archetypeProgression.getImbalance(playerArchetype);
      if (story.balanceAspects.includes(imbalance)) {
        relevance += 0.3;
      }
    }

    return Math.min(relevance, 1.0);
  }

  // Clean up old completed stories
  cleanup(maxAge = 30) { // days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - maxAge);

    for (const [journeyId, journey] of this.activeStories.entries()) {
      if (journey.completed && new Date(journey.completedAt) < cutoffDate) {
        this.activeStories.delete(journeyId);

        // Also clean localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(`cathedral-story-${journeyId}`);
        }
      }
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StoryEngine;
}

// Export for browser use
if (typeof window !== 'undefined') {
  window.StoryEngine = StoryEngine;
}

export default StoryEngine;
