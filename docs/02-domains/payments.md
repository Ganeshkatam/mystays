# Payments Domain

Separate payment intent, transaction state, refunds, payouts, and accounting/ledger concerns. Never treat a client callback as proof of payment; confirm authoritative provider state and make handlers idempotent.