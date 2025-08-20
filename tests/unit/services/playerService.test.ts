import { PlayerService } from '../../../../src/services/playerService';

describe('PlayerService', () => {
  it('creates and fetches a player', async () => {
    const svc = new PlayerService();
    const created = await svc.createPlayer('Bob', 'bob@example.com');
    const fetched = await svc.getPlayerById(created.id);
    expect(fetched?.id).toBe(created.id);
  });
});

