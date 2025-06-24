from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  

df_matches = pd.read_csv("./matches.csv")
df_deliveries = pd.read_csv("./deliveries.csv")

df_matches['season'] = df_matches['season'].astype(str).str.extract(r'(\d{4})').astype(int)
df_matches['id'] = df_matches['id'].astype(int)
df_deliveries['match_id'] = df_deliveries['match_id'].astype(int)

@app.route('/query', methods=['POST'])
def query_ipl():
    data = request.json
    team_a = data['team1']
    team_b = data['team2']
    from_year = int(data['fromYear'])
    to_year = int(data['toYear'])

    head_to_head_matches = df_matches[
        (((df_matches['team1'] == team_a) & (df_matches['team2'] == team_b)) |
         ((df_matches['team1'] == team_b) & (df_matches['team2'] == team_a))) &
        (df_matches['season'] >= from_year) &
        (df_matches['season'] <= to_year)
    ]

    relevant_match_ids = head_to_head_matches['id'].unique()
    relevant_deliveries = df_deliveries[df_deliveries['match_id'].isin(relevant_match_ids)]

    head_to_head_wins = head_to_head_matches['winner'].value_counts().to_dict()

    most_runs_series = relevant_deliveries.groupby('batter')['batsman_runs'].sum().sort_values(ascending=False)
    most_runs_player = most_runs_series.index[0] if not most_runs_series.empty else None

    valid_balls = relevant_deliveries[relevant_deliveries['extras_type'] != 'wides']
    balls_faced = valid_balls.groupby('batter').size()
    runs_scored = relevant_deliveries.groupby('batter')['batsman_runs'].sum()

    strike_data = pd.DataFrame({'runs': runs_scored, 'balls': balls_faced}).dropna()
    strike_data = strike_data[strike_data['balls'] >= 50]
    strike_data['strike_rate'] = (strike_data['runs'] / strike_data['balls']) * 100
    strike_data = strike_data.sort_values(by='strike_rate', ascending=False)

    best_striker = strike_data.index[0] if not strike_data.empty else None

    valid_wickets = relevant_deliveries[
        (relevant_deliveries['is_wicket'] == 1) &
        (~relevant_deliveries['dismissal_kind'].isin(['run out', 'retired hurt', 'obstructing the field']))
    ]
    most_wickets_series = valid_wickets['bowler'].value_counts()
    top_wicket_taker = most_wickets_series.index[0] if not most_wickets_series.empty else None

    result = {
        "headToHead": head_to_head_wins,
        "mostRuns": most_runs_player,
        "bestStrikeRate": best_striker,
        "mostWickets": top_wicket_taker
    }

    return jsonify(result)


if __name__ == '__main__':
    app.run(port=8000, debug=True)