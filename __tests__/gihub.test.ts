import { initApp } from '../src/app';
import { diSetupInit } from '../src/core/di-container/di-container';
import { initAppServices } from '../src/services';
import supertest from 'supertest';

describe('Github', () => {
  describe('find non forked user repos', () => {
    describe('if user does not exist', () => {
      it('should return 404, not found', async () => {
        diSetupInit();
        await initAppServices();
        const app = await initApp();

        const nonExistingUsername = 'rijadfsjdjflskfjlskjf992';
        await supertest(app)
          .get(
            `/api/github/findnonforkeduserrepositories?username=${nonExistingUsername}`,
          )
          .set('accept', 'application/json')
          .expect(404);
      });

      it('should return 200 and user repos', async () => {
        diSetupInit();
        await initAppServices();
        const app = await initApp();

        const username = 'rijad992';
        const { body } = await supertest(app)
          .get(`/api/github/findnonforkeduserrepositories?username=${username}`)
          .set('accept', 'application/json')
          .expect(200);

        expect(body.success).toBe(true);
        expect(body.data.length).toBeGreaterThan(0);
      });
    });
  });
});
