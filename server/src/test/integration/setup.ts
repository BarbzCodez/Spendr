import resetDb from './resetDb';

beforeEach(async () => {
  await resetDb();
});
