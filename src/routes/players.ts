import { Router, Request, Response } from 'express';
import { PlayerModel } from '../models/player';

const router = Router();
const playerModel = new PlayerModel();

// Create player
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body || {};
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Bad Request', message: 'Name is required' });
    }
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Bad Request', message: 'Email is required' });
    }
    const player = await playerModel.createPlayer(name, email);
    res.status(201).json({ player, message: 'Player created' });
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Internal server error', message: 'Failed to create player' });
  }
});

// Get player by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const player = await playerModel.getPlayerById(id);
    if (!player) {
      return res.status(404).json({ error: 'Not found', message: 'Player not found' });
    }
    res.status(200).json({ player });
  } catch (error) {
    console.error('Error getting player:', error);
    res.status(500).json({ error: 'Internal server error', message: 'Failed to get player' });
  }
});

// Get player stats
router.get('/:id/stats', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stats = await playerModel.getPlayerStats(id);
    res.status(200).json({ stats });
  } catch (error) {
    console.error('Error getting player stats:', error);
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ error: 'Not found', message: error.message });
    }
    res.status(500).json({ error: 'Internal server error', message: 'Failed to get player stats' });
  }
});

// Update player
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body as Partial<{ name: string; email: string }>;
    const player = await playerModel.updatePlayer(id, updates);
    res.status(200).json({ player, message: 'Player updated' });
  } catch (error) {
    console.error('Error updating player:', error);
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: 'Not found', message: 'Player not found' });
      }
      if (
        error.message.includes('required') ||
        error.message.includes('Valid email') ||
        error.message.includes('non-empty')
      ) {
        return res.status(400).json({ error: 'Bad Request', message: error.message });
      }
      if (error.message.includes('already in use')) {
        return res.status(409).json({ error: 'Conflict', message: error.message });
      }
    }
    res.status(500).json({ error: 'Internal server error', message: 'Failed to update player' });
  }
});

// Delete player
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await playerModel.deletePlayer(id);
    res.status(200).json({ message: 'Player deleted' });
  } catch (error) {
    console.error('Error deleting player:', error);
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ error: 'Not found', message: 'Player not found' });
    }
    res.status(500).json({ error: 'Internal server error', message: 'Failed to delete player' });
  }
});

// Search players by name
router.get('/', async (req: Request, res: Response) => {
  try {
    const { name, limit } = req.query as { name?: string; limit?: string };
    if (!name) {
      const players = await playerModel.getAllPlayers();
      return res.status(200).json({ players, count: players.length });
    }
    const players = await playerModel.searchPlayersByName(name, limit ? parseInt(limit) : 10);
    res.status(200).json({ players, count: players.length });
  } catch (error) {
    console.error('Error searching players:', error);
    res.status(500).json({ error: 'Internal server error', message: 'Failed to search players' });
  }
});

export { router as playerRoutes };


// TODO: Complete players routes (update, delete, search) [ttt.todo.routes.players.complete]