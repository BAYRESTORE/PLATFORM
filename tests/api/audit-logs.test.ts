import request from 'supertest';
import handler from '../../pages/api/audit-logs/[id]';

describe('GET /api/audit-logs/[id]', () => {
  it('should return 401 if no token', async () => {
    const req = { method: 'GET', query: { id: 'some-id' }, headers: {} } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
  });

  // Tambah test lainnya sesuai kebutuhan
});
