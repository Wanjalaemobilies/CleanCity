// Mock localStorage
global.localStorage = {
  store: {},

  getItem(key) {
    return this.store[key] || null;
  },

  setItem(key, value) {
    this.store[key] = String(value);
  },

  removeItem(key) {
    delete this.store[key];
  },

  clear() {
    this.store = {};
  },
};


const dataService = require('../src/services/dataService.js');


beforeEach(() => {
  localStorage.clear();
  dataService.clearAllData(); // Reset to default sample data
});

describe('Pickup Requests', () => {
  test('should return all sample pickup requests on init', () => {
    const requests = dataService.getAllPickupRequests();
    expect(requests.length).toBeGreaterThan(0);
  });

  test('should add a new pickup request', () => {
    const newRequest = {
      fullName: 'Alice Test',
      location: 'Kisumu',
      wasteType: 'Hazardous',
      preferredDate: '2025-08-10'
    };

    const added = dataService.addPickupRequest(newRequest);
    expect(added.name).toBe('Alice Test');

    const all = dataService.getAllPickupRequests();
    expect(all.find(req => req.name === 'Alice Test')).toBeDefined();
  });

  test('should update a request status', () => {
    const requests = dataService.getAllPickupRequests();
    const id = requests[0].id;

    const result = dataService.updateRequestStatus(id, 'Completed');
    expect(result).toBe(true);

    const updated = dataService.getAllPickupRequests().find(r => r.id === id);
    expect(updated.status).toBe('Completed');
  });

  test('should filter requests by status', () => {
    const completed = dataService.filterRequestsByStatus('Completed');
    expect(Array.isArray(completed)).toBe(true);
    completed.forEach(req => expect(req.status).toBe('Completed'));
  });

  test('should filter location "Eldoret" and return incorrect Nairobi data (intentional bug)', () => {
    const filtered = dataService.filterRequestsByLocation('Eldoret');
    filtered.forEach(req => {
      expect(req.location).toBe('Nairobi'); // Bug: should be Eldoret
    });
  });
});

describe('Feedback', () => {
  test('should start with empty feedback list', () => {
    const feedback = dataService.getAllFeedback();
    expect(feedback.length).toBe(0);
  });

  test('should add new feedback successfully', () => {
    const newFeedback = {
      requestId: 'REQ001',
      reason: 'Delay in pickup',
      comments: 'It took 3 extra days'
    };

    const added = dataService.addFeedback(newFeedback);
    expect(added.reason).toBe('Delay in pickup');

    const allFeedback = dataService.getAllFeedback();
    expect(allFeedback.length).toBe(1);
  });
});

describe('User Management', () => {
  test('should return all sample users', () => {
    const users = dataService.getAllUsers();
    expect(users.length).toBeGreaterThanOrEqual(2);
  });

  test('should not add user with existing email', () => {
    const duplicate = {
      id: '999',
      name: 'Duplicate User',
      email: 'user@cleancity.com',
      password: 'pass123',
      role: 'user',
      createdAt: new Date().toISOString()
    };

    const result = dataService.addUser(duplicate);
    expect(result).toBe(false);
  });

  test('should get user by email', () => {
    const user = dataService.getUserByEmail('admin@cleancity.com');
    expect(user).toBeDefined();
    expect(user.role).toBe('admin');
  });

  test('should update user successfully', () => {
    const users = dataService.getAllUsers();
    const target = users[0];

    const success = dataService.updateUser(target.id, { name: 'Updated Name' });
    expect(success).toBe(true);

    const updated = dataService.getUserById(target.id);
    expect(updated.name).toBe('Updated Name');
  });

  test('should delete user', () => {
    const users = dataService.getAllUsers();
    const userId = users[0].id;

    const deleted = dataService.deleteUser(userId);
    expect(deleted).toBe(true);

    const allUsers = dataService.getAllUsers();
    expect(allUsers.find(u => u.id === userId)).toBeUndefined();
  });
});

// test('should return empty list after clearing pickup requests', () => {
//   dataService.clearPickupRequests();
//   const requests = dataService.getAllPickupRequests();
//   expect(requests).toEqual([]);
// });

test('should not add feedback with empty message', () => {
  const feedback = {
    id: 'FB002',
    userEmail: 'user@example.com',
    message: ''
  };
  dataService.addFeedback(feedback);
  const feedbackList = dataService.getAllFeedback();
  expect(feedbackList.some(fb => fb.message === '')).toBe(false); // or handle rejection in real logic
});

test('should not get a user that does not exist', () => {
  const user = dataService.getUserByEmail('nonexistent@example.com');
  expect(user).toBeUndefined();
});

test('should not update non-existent user', () => {
  const updatedUser = {
    email: 'ghost@example.com',
    name: 'Ghost'
  };
  const result = dataService.updateUser(updatedUser);
  expect(result).toBe(false); // assuming your updateUser returns false if user not found
});

test('should handle malformed user data gracefully', () => {
  expect(() => {
    dataService.addUser({}); // Missing required fields
  }).not.toThrow();
});

test('should not add feedback without email', () => {
  const feedback = {
    message: 'This is a test.',
    email: '' // missing email
  };
  const result = dataService.addFeedback(feedback);
  expect(result).toBe(false);
});

test('should not find user after deletion', () => {
  const email = 'jane@example.com';
  dataService.deleteUser(email);
  const user = dataService.getUserByEmail(email);
  expect(user).toBeUndefined();
});

test('should return empty array for unknown pickup request status', () => {
  const results = dataService.filterPickupRequestsByStatus('Archived');
  expect(results).toEqual([]);
});


