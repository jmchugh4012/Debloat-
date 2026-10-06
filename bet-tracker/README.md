# JMbets

JMbets is a standalone, single-file bet tracking site. No install, no server, no account.

**To use:** open `index.html` in any browser (double-click it). Bets are saved in that browser's local storage.

- Pick the exact bet per sport (moneyline, spread, totals and player props like passing yards, receptions, saves, shots on goal); player props record player, over/under and line
- Add bets with American (`-110`, `+150`) or decimal (`2.50`) odds
- One-click settle pending bets as won/lost; push, void and cash-out supported
- Profit/loss, ROI, record, win rate, pending exposure, average odds, streak
- Profit-over-time chart with optional starting bankroll
- Breakdown by sport, sportsbook and bet type
- Search, filter and sort; press `n` to add a bet
- Night (default) and day themes
- Export to CSV, plus **Backup**/**Restore** (JSON) to move data between devices or browsers

> Clearing your browser data deletes your bets — use **Backup** regularly.

## Live page (`jmbets-live.html`)

The version published as a claude.ai page that followers can open from a link. Bets are stored inside the page itself, so they're the same in every browser and on every device. Only the owner sees the add, edit and settle controls. Everyone else gets a read-only view with an **Open plays** section for tailing.
