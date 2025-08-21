import React from 'react';

const StyleGuide = () => (
  <div className="card card--pad" style={{ margin: 'var(--space-24)' }}>
    <h1 className="h1" style={{ margin: 0, marginBottom: 'var(--space-16)' }}>Heading One</h1>
    <p className="body" style={{ margin: 0, marginBottom: 'var(--space-24)' }}>
      Body text at 15px/1.5 demonstrates comfortable reading rhythm and neutral-800 color.
    </p>

    <div style={{ display: 'flex', gap: 'var(--space-12)', alignItems: 'center', marginBottom: 'var(--space-24)' }}>
      <button className="btn btn--primary btn--md">Primary</button>
      <button className="btn btn--secondary btn--md">Secondary</button>
      <button className="btn btn--ghost btn--md">Ghost</button>
      <button className="btn btn--danger btn--md">Danger</button>
      <button className="btn btn--primary btn--icon btn--md" aria-label="Settings">⚙️</button>
    </div>

    <div style={{ display: 'flex', gap: 'var(--space-12)', alignItems: 'center', marginBottom: 'var(--space-24)' }}>
      <label className="ui caps" htmlFor="email">Email</label>
      <div className="input input--md" style={{ width: 280 }}>
        <input id="email" placeholder="you@example.com" />
      </div>
      <span className="badge badge--info">Info</span>
      <span className="badge badge--ok">Success</span>
      <span className="badge badge--warn">Warning</span>
      <span className="badge badge--err">Error</span>
    </div>

    <div className="empty">No data yet. Try adjusting filters.</div>
  </div>
);

export default StyleGuide;