const Player = require('../Models/Player');

const getPlayerByName = async (req, res) => {
  try {
    const name = req.params.name;
    const player = await Player.findOne({ name });
    if (!player) return res.status(404).json({ error: 'Player not found' });

    res.json(player);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getPlayerByName };