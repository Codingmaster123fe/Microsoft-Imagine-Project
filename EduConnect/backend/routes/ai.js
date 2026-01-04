const express = require('express');
const router = express.Router();

/**
 * Ask AI Tutor a question
 * POST /api/ai/ask
 */
router.post('/ask', async (req, res) => {
  try {
    const { question, subject } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Mock AI response (in production, use OpenAI API)
    const mockResponse = {
      question,
      answer: `This is a comprehensive answer to your question about ${subject || 'the topic'}. 
      In a real implementation, this would use OpenAI's GPT model to provide detailed, 
      educational responses tailored to the student's level.`,
      resources: [
        { title: 'Related Article', url: 'https://example.com/article' },
        { title: 'Video Explanation', url: 'https://example.com/video' },
      ],
      followUpQuestions: [
        'Can you clarify further?',
        'What about related concepts?',
      ],
    };

    res.json(mockResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get learning resources for a topic
 * GET /api/ai/resources/:topic
 */
router.get('/resources/:topic', (req, res) => {
  try {
    const { topic } = req.params;

    const resources = [
      {
        id: 1,
        title: `Beginner's Guide to ${topic}`,
        type: 'article',
        difficulty: 'beginner',
        url: 'https://example.com/guide',
      },
      {
        id: 2,
        title: `Advanced ${topic} Concepts`,
        type: 'video',
        difficulty: 'advanced',
        url: 'https://example.com/video',
      },
      {
        id: 3,
        title: `${topic} Practice Problems`,
        type: 'interactive',
        difficulty: 'intermediate',
        url: 'https://example.com/practice',
      },
    ];

    res.json({ topic, resources });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get explanation on a topic
 * POST /api/ai/explain
 */
router.post('/explain', (req, res) => {
  try {
    const { topic, level } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const explanation = {
      topic,
      level: level || 'intermediate',
      explanation: `Here's a clear explanation of ${topic} at the ${level} level. 
      This covers the fundamental concepts, real-world applications, and key takeaways.`,
      keyPoints: [
        'Key concept 1',
        'Key concept 2',
        'Key concept 3',
      ],
      examples: [
        'Example 1: ...',
        'Example 2: ...',
      ],
      nextTopics: ['Related topic 1', 'Related topic 2'],
    };

    res.json(explanation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
