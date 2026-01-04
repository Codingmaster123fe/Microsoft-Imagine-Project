const express = require('express');
const router = express.Router();

/**
 * Browse resource library
 * GET /api/resources
 */
router.get('/', (req, res) => {
  try {
    const { category, difficulty } = req.query;

    const resources = [
      {
        id: 1,
        title: 'Introduction to Python',
        category: 'programming',
        difficulty: 'beginner',
        type: 'course',
        duration: '4 weeks',
        provider: 'EduConnect Academy',
        rating: 4.8,
      },
      {
        id: 2,
        title: 'Advanced Calculus',
        category: 'mathematics',
        difficulty: 'advanced',
        type: 'textbook',
        duration: 'self-paced',
        provider: 'MIT OpenCourseWare',
        rating: 4.7,
      },
      {
        id: 3,
        title: 'English Literature Masterclass',
        category: 'languages',
        difficulty: 'intermediate',
        type: 'video_series',
        duration: '8 weeks',
        provider: 'EduConnect Academy',
        rating: 4.9,
      },
    ];

    // Filter by category or difficulty if provided
    let filtered = resources;
    if (category) {
      filtered = filtered.filter(r => r.category === category);
    }
    if (difficulty) {
      filtered = filtered.filter(r => r.difficulty === difficulty);
    }

    res.json({ total: filtered.length, resources: filtered });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Search resources
 * POST /api/resources/search
 */
router.post('/search', (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const searchResults = {
      query,
      resultsCount: 42,
      results: [
        {
          id: 1,
          title: `${query} Basics`,
          category: 'general',
          relevance: 0.98,
        },
        {
          id: 2,
          title: `Advanced ${query} Techniques`,
          category: 'advanced',
          relevance: 0.92,
        },
      ],
    };

    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get resource details
 * GET /api/resources/:id
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const resource = {
      id,
      title: 'Sample Educational Resource',
      description: 'A comprehensive guide to the topic',
      category: 'education',
      difficulty: 'intermediate',
      type: 'course',
      duration: '6 weeks',
      instructor: 'Expert Educator',
      rating: 4.8,
      students: 5234,
      chapters: ['Ch1: Introduction', 'Ch2: Fundamentals', 'Ch3: Advanced Topics'],
      url: `https://example.com/resource/${id}`,
    };

    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
