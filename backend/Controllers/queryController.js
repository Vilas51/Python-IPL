const axios = require('axios');
// const Player = require('../Models/Player'); 
// const Team = require('../Models/Team');     
require('dotenv').config();

const PORT= process.env.PORT||8080;
const queryTeams = async (req, res) => {
  const { FirstTeam, SecondTeam, FromYear, ToYear } = req.body;

  try {
    const flaskResponse = await axios.post(`http://127.0.0.1:8000/query`, {
      team1: FirstTeam,
      team2: SecondTeam,
      fromYear: FromYear,
      toYear: ToYear
    });

    const {
      headToHead,
      mostRuns,
      bestStrikeRate,
      mostWickets
    } = flaskResponse.data;

    // const [team1, team2] = await Promise.all([
    //   Team.findOne({ name: FirstTeam }),
    //   Team.findOne({ name: SecondTeam })
    // ]);

    // const [batsman, striker, bowler] = await Promise.all([
    //   Player.findOne({ name: mostRuns }),
    //   Player.findOne({ name: bestStrikeRate }),
    //   Player.findOne({ name: mostWickets })
    // ]);

    res.status(200).json({
        headToHead,
        mostRuns,
        bestStrikeRate,
        mostWickets
    //   headToHead,
    //   teamImages: {
    //     [FirstTeam]: team1?.imageUrl || null,
    //     [SecondTeam]: team2?.imageUrl || null
    //   },
    //   mostRuns: {
    //     name: mostRuns,
    //     image: batsman?.imageUrl || null
    //   },
    //   bestStrikeRate: {
    //     name: bestStrikeRate,
    //     image: striker?.imageUrl || null
    //   },
    //   mostWickets: {
    //     name: mostWickets,
    //     image: bowler?.imageUrl || null
    //   }
    });

  } catch (error) {
    console.error('Error in queryTeams:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { queryTeams };
