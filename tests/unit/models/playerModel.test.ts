import { PlayerModel } from '../../../../src/models/player';

describe('PlayerModel', () => {
  it('creates a player', async () => {
    const model = new PlayerModel();
    const player = await model.createPlayer('Alice', 'alice@example.com');
    expect(player.id).toBeDefined();
    expect(player.email).toBe('alice@example.com');
  });
});

