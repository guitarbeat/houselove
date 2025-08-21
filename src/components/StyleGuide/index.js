import React from 'react';
import './index.scss';

const StyleGuide = () => {
    return (
        <div className="style-guide">
            <div className="style-guide__header">
                <h1 className="h1">HouseLove Design System</h1>
                <p className="body-lg">A comprehensive design system built with accessibility and consistency in mind.</p>
            </div>

            <section className="style-guide__section">
                <h2 className="h2">Typography</h2>
                <div className="typography-showcase">
                    <div className="typography-item">
                        <h1 className="h1">Heading One (46px)</h1>
                        <p className="body">Font: Brand Family | Weight: 700 | Line-height: 1.2 | Letter-spacing: -0.02em</p>
                    </div>
                    <div className="typography-item">
                        <h2 className="h2">Heading Two (37px)</h2>
                        <p className="body">Font: Brand Family | Weight: 600 | Line-height: 1.2 | Letter-spacing: -0.02em</p>
                    </div>
                    <div className="typography-item">
                        <h3 className="h3">Heading Three (30px)</h3>
                        <p className="body">Font: Brand Family | Weight: 600 | Line-height: 1.2 | Letter-spacing: -0.02em</p>
                    </div>
                    <div className="typography-item">
                        <h4 className="h4">Heading Four (24px)</h4>
                        <p className="body">Font: Brand Family | Weight: 600 | Line-height: 1.2 | Letter-spacing: 0em</p>
                    </div>
                    <div className="typography-item">
                        <h5 className="h5">Heading Five (18px)</h5>
                        <p className="body">Font: Brand Family | Weight: 400 | Line-height: 1.2 | Letter-spacing: 0em</p>
                    </div>
                    <div className="typography-item">
                        <h6 className="h6">Heading Six (15px)</h6>
                        <p className="body">Font: Brand Family | Weight: 400 | Line-height: 1.2 | Letter-spacing: 0em</p>
                    </div>
                    <div className="typography-item">
                        <p className="body-lg">Body Large (18px)</p>
                        <p className="body">Font: System Sans | Weight: 400 | Line-height: 1.5 | Letter-spacing: 0em</p>
                    </div>
                    <div className="typography-item">
                        <p className="body">Body (15px)</p>
                        <p className="body-sm">Font: System Sans | Weight: 400 | Line-height: 1.5 | Letter-spacing: 0em</p>
                    </div>
                    <div className="typography-item">
                        <p className="body-sm">Body Small (12px)</p>
                        <p className="body-sm">Font: System Sans | Weight: 400 | Line-height: 1.5 | Letter-spacing: 0em</p>
                    </div>
                    <div className="typography-item">
                        <p className="ui">UI Label (15px)</p>
                        <p className="body-sm">Font: System Sans | Weight: 600 | Line-height: 1.4 | Letter-spacing: 0em</p>
                    </div>
                    <div className="typography-item">
                        <p className="caps">Small Caps (15px)</p>
                        <p className="body-sm">Font: System Sans | Weight: 600 | Line-height: 1.4 | Letter-spacing: 0.05em</p>
                    </div>
                </div>
            </section>

            <section className="style-guide__section">
                <h2 className="h3">Color Palette</h2>
                <div className="color-showcase">
                    <div className="color-group">
                        <h4 className="h5">Primary (Brand)</h4>
                        <div className="color-swatches">
                            <div className="color-swatch" style={{ backgroundColor: 'var(--primary-50)' }}>
                                <span>50</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--primary-100)' }}>
                                <span>100</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--primary-200)' }}>
                                <span>200</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--primary-300)' }}>
                                <span>300</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--primary-400)' }}>
                                <span>400</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--primary-500)' }}>
                                <span>500</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--primary-600)' }}>
                                <span>600</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--primary-700)' }}>
                                <span>700</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--primary-800)' }}>
                                <span>800</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--primary-900)' }}>
                                <span>900</span>
                            </div>
                        </div>
                    </div>

                    <div className="color-group">
                        <h4 className="h5">Secondary</h4>
                        <div className="color-swatches">
                            <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-50)' }}>
                                <span>50</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-100)' }}>
                                <span>100</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-200)' }}>
                                <span>200</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-300)' }}>
                                <span>300</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-400)' }}>
                                <span>400</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-500)' }}>
                                <span>500</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-600)' }}>
                                <span>600</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-700)' }}>
                                <span>700</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-800)' }}>
                                <span>800</span>
                            </div>
                            <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-900)' }}>
                                <span>900</span>
                            </div>
                        </div>
                    </div>

                    <div className="color-group">
                        <h4 className="h5">Semantic Colors</h4>
                        <div className="semantic-colors">
                            <div className="semantic-color success">
                                <span className="badge badge--ok">Success</span>
                                <p className="body-sm">Used for positive actions and confirmations</p>
                            </div>
                            <div className="semantic-color warning">
                                <span className="badge badge--warn">Warning</span>
                                <p className="body-sm">Used for cautionary messages</p>
                            </div>
                            <div className="semantic-color danger">
                                <span className="badge badge--err">Danger</span>
                                <p className="body-sm">Used for errors and destructive actions</p>
                            </div>
                            <div className="semantic-color info">
                                <span className="badge badge--info">Info</span>
                                <p className="body-sm">Used for informational messages</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="style-guide__section">
                <h2 className="h3">Spacing System</h2>
                <div className="spacing-showcase">
                    <div className="spacing-item">
                        <div className="spacing-visual" style={{ width: 'var(--space-4)', height: 'var(--space-4)' }}></div>
                        <span className="body-sm">4px</span>
                    </div>
                    <div className="spacing-item">
                        <div className="spacing-visual" style={{ width: 'var(--space-8)', height: 'var(--space-8)' }}></div>
                        <span className="body-sm">8px</span>
                    </div>
                    <div className="spacing-item">
                        <div className="spacing-visual" style={{ width: 'var(--space-12)', height: 'var(--space-12)' }}></div>
                        <span className="body-sm">12px</span>
                    </div>
                    <div className="spacing-item">
                        <div className="spacing-visual" style={{ width: 'var(--space-16)', height: 'var(--space-16)' }}></div>
                        <span className="body-sm">16px</span>
                    </div>
                    <div className="spacing-item">
                        <div className="spacing-visual" style={{ width: 'var(--space-24)', height: 'var(--space-24)' }}></div>
                        <span className="body-sm">24px</span>
                    </div>
                    <div className="spacing-item">
                        <div className="spacing-visual" style={{ width: 'var(--space-32)', height: 'var(--space-32)' }}></div>
                        <span className="body-sm">32px</span>
                    </div>
                    <div className="spacing-item">
                        <div className="spacing-visual" style={{ width: 'var(--space-48)', height: 'var(--space-48)' }}></div>
                        <span className="body-sm">48px</span>
                    </div>
                    <div className="spacing-item">
                        <div className="spacing-visual" style={{ width: 'var(--space-64)', height: 'var(--space-64)' }}></div>
                        <span className="body-sm">64px</span>
                    </div>
                </div>
            </section>

            <section className="style-guide__section">
                <h2 className="h3">Components</h2>

                <div className="component-showcase">
                    <h4 className="h4">Buttons</h4>
                    <div className="button-showcase">
                        <button className="btn btn--primary btn--sm">Small Primary</button>
                        <button className="btn btn--primary btn--md">Medium Primary</button>
                        <button className="btn btn--primary btn--lg">Large Primary</button>
                        <button className="btn btn--secondary btn--md">Secondary</button>
                        <button className="btn btn--ghost btn--md">Ghost</button>
                        <button className="btn btn--danger btn--md">Danger</button>
                        <button className="btn btn--primary btn--icon btn--md" aria-label="Settings">⚙️</button>
                    </div>

                    <h4 className="h4">Inputs</h4>
                    <div className="input-showcase">
                        <div className="input input--sm">
                            <input placeholder="Small input" />
                        </div>
                        <div className="input input--md">
                            <input placeholder="Medium input" />
                        </div>
                        <div className="input input--lg">
                            <input placeholder="Large input" />
                        </div>
                        <div className="input input--md is-error">
                            <input placeholder="Error state" />
                        </div>
                        <div className="input input--md is-success">
                            <input placeholder="Success state" />
                        </div>
                    </div>

                    <h4 className="h4">Cards</h4>
                    <div className="card-showcase">
                        <div className="card card--pad">
                            <h5 className="h5">Basic Card</h5>
                            <p className="body">This is a basic card with padding and subtle shadow.</p>
                        </div>
                        <div className="card card--pad card--elevated">
                            <h5 className="h5">Elevated Card</h5>
                            <p className="body">This card has more prominent shadow for emphasis.</p>
                        </div>
                    </div>

                    <h4 className="h4">Feedback States</h4>
                    <div className="feedback-showcase">
                        <div className="empty">
                            <p className="body">No data available</p>
                        </div>
                        <div className="skeleton" style={{ width: '200px', height: '20px' }}></div>
                    </div>
                </div>
            </section>

            <section className="style-guide__section">
                <h2 className="h3">Accessibility Features</h2>
                <div className="accessibility-info">
                    <div className="accessibility-item">
                        <h4 className="h5">WCAG AA Compliance</h4>
                        <ul className="body">
                            <li>All text meets 4.5:1 contrast ratio minimum</li>
                            <li>Interactive elements have visible focus indicators</li>
                            <li>Color is not the only way to convey information</li>
                            <li>Touch targets meet minimum 44px size requirements</li>
                        </ul>
                    </div>
                    <div className="accessibility-item">
                        <h4 className="h5">Typography Best Practices</h4>
                        <ul className="body">
                            <li>Line heights optimized for readability (1.2 for headings, 1.5 for body)</li>
                            <li>Letter spacing adjusted for text size and purpose</li>
                            <li>Font weights clearly defined and consistently applied</li>
                            <li>Responsive typography scales appropriately</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StyleGuide;
