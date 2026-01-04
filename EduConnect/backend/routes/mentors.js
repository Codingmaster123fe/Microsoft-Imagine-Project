const express = require('express');
const router = express.Router();

/**
 * List available mentors with optional filtering
 * GET /api/mentors?subject=Mathematics&availability=weekends
 */
router.get('/', (req, res) => {
  try {
    const { subject, availability, limit = 10, skip = 0 } = req.query;

    // Mock mentor database - would be MongoDB in production
    const allMentors = [
      {
        id: 1,
        name: 'Dr. Sarah Chen',
        expertise: ['Mathematics', 'Physics'],
        experience: '8 years',
        rating: 4.9,
        reviews: 234,
        availability: 'weekends',
        bio: 'PhD in Mathematics with passion for teaching',
      },
      {
        id: 2,
        name: 'James Wilson',
        expertise: ['Computer Science', 'AI'],
        experience: '5 years',
        rating: 4.8,
        reviews: 189,
        availability: 'evenings',
        bio: 'Software engineer and AI enthusiast',
      },
      {
        id: 3,
        name: 'Maria Garcia',
        expertise: ['Languages', 'Literature'],
        experience: '6 years',
        rating: 4.9,
        reviews: 267,
        availability: 'flexible',
        bio: 'Language expert fluent in 5 languages',
      },
    ];

    // Apply filters
    let filtered = allMentors;
    if (subject && subject !== 'all') {
      filtered = filtered.filter(m => 
        m.expertise.some(exp => exp.toLowerCase().includes(subject.toLowerCase()))
      );
    }
    if (availability && availability !== 'all') {
      filtered = filtered.filter(m => m.availability.includes(availability));
    }

    // Pagination
    const total = filtered.length;
    const paginatedMentors = filtered.slice(parseInt(skip), parseInt(skip) + parseInt(limit));

    res.json({ 
      total, 
      count: paginatedMentors.length,
      mentors: paginatedMentors,
      filters: { subject: subject || 'all', availability: availability || 'all' }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Request a mentor
 * POST /api/mentors/:id/request
 */
router.post('/:id/request', (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, goals, preferredTimes } = req.body;

    if (!studentId || !goals) {
      return res.status(400).json({ error: 'Student ID and goals required' });
    }

    const mentorshipRequest = {
      requestId: `REQ_${Date.now()}`,
      mentorId: id,
      studentId,
      goals,
      preferredTimes,
      status: 'pending',
      createdAt: new Date(),
      message: 'Mentor request sent! You\'ll be notified when they accept.',
    };

    res.json(mentorshipRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Check mentor availability
 * GET /api/mentors/:id/availability
 */
router.get('/:id/availability', (req, res) => {
  try {
    const { id } = req.params;

    const availability = {
      mentorId: id,
      weeklyHours: 10,
      nextAvailable: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      schedule: [
        { day: 'Saturday', hours: '10:00-14:00' },
        { day: 'Sunday', hours: '15:00-18:00' },
        { day: 'Wednesday', hours: '18:00-20:00' },
      ],
      timezone: 'UTC',
    };

    res.json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
