
// tests/api/restorasi.test.ts
import request from 'supertest';
import handler from '../../pages/api/restorasi/[id]'; // sesuaikan path

// mock Next.js API handler untuk Supertest
import { createMocks } from 'node-mocks-http';

function runHandler(req: any, res: any) {
  return new Promise<void>((resolve) => {
    handler(req, res).then(() => resolve());
  });
}

describe('GET /api/restorasi/[id]', () => {
  it('should return 401 if no auth token', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: 'some-id' },
      headers: {}
    });

    await runHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(res._getData())).toEqual({ error: 'Unauthorized' });
  });

  // Tambah test lain sesuai logic endpoint...
});
