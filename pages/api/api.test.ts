import request from 'supertest';
import handler from '../pages/api/audit-logs/[id]';
import { createMocks } from 'node-mocks-http';

describe('API audit-logs/[id]', () => {
  it('should return 401 Unauthorized if no token', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: 'some-id' },
      headers: {},
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('error', 'Unauthorized');
  });
});
