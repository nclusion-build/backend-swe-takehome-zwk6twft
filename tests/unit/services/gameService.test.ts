import { GameService } from '../../../src/services/gameService'
import { Player } from '../../../src/types'

describe('GameService', () => {
  it('creates a game and joins two players', async () => {
    const service = new GameService()
    const game = await service.createGame('Test')
    const p1: Player = {
      id: 'p1',
      name: 'P1',
      email: 'p1@example.com',
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        gamesDrawn: 0,
        totalMoves: 0,
        averageMovesPerWin: 0,
        winRate: 0,
        efficiency: 0
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const p2: Player = { ...p1, id: 'p2', email: 'p2@example.com' }

    await service.joinGame(game.id, p1)
    await service.joinGame(game.id, p2)

    const status = await service.getGameStatus(game.id)
    expect(status.players.length).toBe(2)
    expect(status.status === 'active' || status.status === 'waiting').toBe(true)
  })
})

