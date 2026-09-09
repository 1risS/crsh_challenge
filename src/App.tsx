import { useState, type CSSProperties } from 'react'
import './App.css'

type Screen = 'home' | 'stream'
type MomentId = 'booyah' | 'jackpot' | 'sweep'
type IconName =
    | 'home'
    | 'activity'
    | 'portfolio'
    | 'leaderboard'
    | 'gift'
    | 'chat'
    | 'chevron'
    | 'plus'
    | 'wallet'
    | 'send'
    | 'back'
    | 'spark'

type Moment = {
    id: MomentId
    label: string
    badge: string
    headline: string
    subline: string
    chip: string
}

const videoSource = '/crsh_poc.mp4'

const navItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Market Activity', icon: 'activity' },
    { label: 'Portfolio', icon: 'portfolio' },
    { label: 'Leaderboard', icon: 'leaderboard' },
    { label: 'Refer & Earn', icon: 'gift' },
] as const

const moments: Moment[] = [
    {
        id: 'booyah',
        label: 'Booyah Resolve',
        badge: 'Market resolved',
        headline: 'BOOYAH!',
        subline: 'YES hit before stream chat caught up.',
        chip: 'Crowd pop',
    },
    {
        id: 'jackpot',
        label: 'Payout Surge',
        badge: 'Big win',
        headline: 'JACKPOT',
        subline: '$950 hit balance with a full-screen credit burst.',
        chip: 'Balance jump',
    },
    {
        id: 'sweep',
        label: 'Rank Climb',
        badge: 'Unexpected swing',
        headline: 'CLEAN SWEEP',
        subline: 'Rank shot upward off one late resolution.',
        chip: 'Rank surge',
    },
]

const streamCards = [
    { title: 'Free Fire', viewers: '342', accent: 'violet' },
    { title: 'BGMI Finals', viewers: '188', accent: 'blue' },
    { title: 'Valorant Rush', viewers: '96', accent: 'green' },
] as const

const streaks = Array.from({ length: 9 }, (_, index) => ({
    left: `${7 + index * 10.5}%`,
    delay: `${0.18 + index * 0.07}s`,
    duration: `${1.02 + (index % 3) * 0.16}s`,
    rotate: `${-28 + index * 6}deg`,
}))

const tokens = Array.from({ length: 12 }, (_, index) => ({
    left: `${8 + index * 7.3}%`,
    delay: `${0.32 + index * 0.07}s`,
    duration: `${1.26 + (index % 4) * 0.16}s`,
    drift: `${-54 + (index % 6) * 18}px`,
    label: ['XP', 'WIN', '+950', 'GG'][index % 4],
}))

const emojiDrops = Array.from({ length: 12 }, (_, index) => ({
    left: `${4 + index * 7.8}%`,
    delay: `${0.5 + index * 0.08}s`,
    duration: `${2.3 + (index % 4) * 0.22}s`,
    drift: `${-28 + (index % 5) * 14}px`,
    symbol: ['🔥', '⚡', '💥', '🎯', 'WIN', 'GG'][index % 6],
}))

const credits = Array.from({ length: 5 }, (_, index) => ({
    left: `${18 + index * 14}%`,
    delay: `${0.24 + index * 0.12}s`,
    amount: ['+$120', '+$280', '+$95', '+$455', '+$950'][index],
}))

const sweepBars = Array.from({ length: 6 }, (_, index) => ({
    top: `${18 + index * 11}%`,
    delay: `${0.1 + index * 0.08}s`,
    width: `${38 + (index % 3) * 12}%`,
}))

const chatMessages = [
    { author: 'mirinda', tone: 'gold', text: 'Br', time: '11:29 am' },
    { author: 'shubham', tone: 'pink', text: 'no liq', time: '11:40 am' },
    {
        author: 'jaiho',
        tone: 'orange',
        text: 'Kisine promo balance use Kiya hai',
        time: '11:40 am',
    },
    {
        author: 'jaiho',
        tone: 'orange',
        text: '@shubham Main balance or promo ?',
        time: '11:40 am',
    },
    { author: 'ff_edge', tone: 'lime', text: 'changing', time: '11:41 am' },
    {
        author: 'dopamine',
        tone: 'violet',
        text: 'Liquidity monday ko ayaga...',
        time: '11:45 am',
    },
    {
        author: 'dopamine',
        tone: 'violet',
        text: 'Kal crsh ki chutti ha',
        time: '11:46 am',
    },
] as const

function AppIcon({ name }: { name: IconName }) {
    switch (name) {
        case 'home':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 11.5 12 5l8 6.5v7a1.5 1.5 0 0 1-1.5 1.5h-4.2V14h-4.6v6H5.5A1.5 1.5 0 0 1 4 18.5v-7Z" />
                </svg>
            )
        case 'activity':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 19V11h3v8H5Zm5 0V6h3v13h-3Zm5 0v-9h3v9h-3Z" />
                </svg>
            )
        case 'portfolio':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5v7A2.5 2.5 0 0 1 17.5 18h-11A2.5 2.5 0 0 1 4 15.5v-7Zm4-3h8v2H8v-2Zm-1.5 6h11v1.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-1.5Z" />
                </svg>
            )
        case 'leaderboard':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 4.5 14.1 9H19l-4 3.1 1.6 4.9L12 14.1 7.4 17l1.6-4.9L5 9h4.9L12 4.5ZM6 19.5h12v2H6v-2Z" />
                </svg>
            )
        case 'gift':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 9h14v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20V9Zm6 0H4.5A1.5 1.5 0 0 1 3 7.5v-1A1.5 1.5 0 0 1 4.5 5H11v4Zm2 0V5h6.5A1.5 1.5 0 0 1 21 6.5v1A1.5 1.5 0 0 1 19.5 9H13Zm-3.2-6.2c.8.8.9 2 .2 3.2H8.2c-.7-1.2-.6-2.4.2-3.2.8-.8 2.1-.8 2.9 0Zm5.8 0c.8.8.9 2 .2 3.2H14c-.7-1.2-.6-2.4.2-3.2.8-.8 2.1-.8 2.9 0Z" />
                </svg>
            )
        case 'chat':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 4c4.4 0 8 2.9 8 6.5 0 1.4-.5 2.7-1.5 3.8l.8 3.2-3.3-1.2c-1.1.4-2.6.7-4 .7-4.4 0-8-2.9-8-6.5S7.6 4 12 4Zm-3.5 5.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3.5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3.5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
                </svg>
            )
        case 'chevron':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m9 6 6 6-6 6" />
                </svg>
            )
        case 'plus':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
                </svg>
            )
        case 'wallet':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9a2.5 2.5 0 0 1 2.5 2.5v1H7.5A2.5 2.5 0 0 0 5 11v-3.5Zm0 5A1.5 1.5 0 0 1 6.5 11h12.8a.7.7 0 0 1 .7.7v6.8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5v-6Zm11.8 2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
                </svg>
            )
        case 'send':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4.5 12 20 4l-4.1 16-4.5-5-6.9-3Z" />
                </svg>
            )
        case 'back':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m14.5 5-7 7 7 7" />
                </svg>
            )
        case 'spark':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m12 2 2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2L12 2Z" />
                </svg>
            )
    }
}

function CelebrationLayer({
    moment,
    instanceKey,
    compact = false,
}: {
    moment: Moment
    instanceKey: number
    compact?: boolean
}) {
    return (
        <div
            key={`${moment.id}-${instanceKey}-${compact ? 'compact' : 'detail'}`}
            className={`effect-layer ${moment.id}${compact ? ' compact' : ''}`}
            aria-hidden="true"
        >
            <div className="center-flare" />
            <div className="pulse-ring" />
            <div className="pulse-ring alt" />

            {streaks.map((streak, index) => (
                <div
                    key={`streak-${index}`}
                    className="streak"
                    style={{
                        left: streak.left,
                        animationDelay: streak.delay,
                        animationDuration: streak.duration,
                        '--rotate': streak.rotate,
                    } as CSSProperties}
                />
            ))}

            {tokens.map((token, index) => (
                <div
                    key={`token-${index}`}
                    className="token-burst"
                    style={{
                        left: token.left,
                        animationDelay: token.delay,
                        animationDuration: token.duration,
                        '--drift': token.drift,
                    } as CSSProperties}
                >
                    {token.label}
                </div>
            ))}

            {emojiDrops.map((drop, index) => (
                <div
                    key={`emoji-${index}`}
                    className="emoji-rain"
                    style={{
                        left: drop.left,
                        animationDelay: drop.delay,
                        animationDuration: drop.duration,
                        '--drift': drop.drift,
                    } as CSSProperties}
                >
                    <span>{drop.symbol}</span>
                </div>
            ))}

            {moment.id === 'jackpot' &&
                credits.map((credit, index) => (
                    <div
                        key={`credit-${index}`}
                        className="credit-pill"
                        style={{
                            left: credit.left,
                            animationDelay: credit.delay,
                        } as CSSProperties}
                    >
                        {credit.amount}
                    </div>
                ))}

            {moment.id === 'sweep' &&
                sweepBars.map((bar, index) => (
                    <div
                        key={`bar-${index}`}
                        className="sweep-bar"
                        style={{
                            top: bar.top,
                            width: bar.width,
                            animationDelay: bar.delay,
                        } as CSSProperties}
                    />
                ))}

            <div className="resolution-card">
                <span>{moment.badge}</span>
                <strong>{moment.headline}</strong>
                <p>{moment.subline}</p>
            </div>

            <div className="event-toast">
                <AppIcon name="spark" />
                <span>{moment.chip}</span>
            </div>
        </div>
    )
}

function StreamSurface({
    moment,
    effectKey,
    compact = false,
}: {
    moment: Moment
    effectKey: number
    compact?: boolean
}) {
    return (
        <div className={`video-shell${compact ? ' compact' : ' detail'}`}>
            <CelebrationLayer moment={moment} instanceKey={effectKey} compact={compact} />

            <video
                className="stream-video"
                src={videoSource}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
            />

            <div className="video-gradient" />

            <div className="player-ui top-left">
                <div className="live-badge">LIVE</div>
            </div>

            <div className="player-ui top-right hud-counters">
                <span>7:7</span>
                <span>44</span>
                <span>3</span>
            </div>

            <div className="player-ui lower-left streamer-chip">
                <div className="cam-avatar">ff</div>
                <div>
                    <strong>ff_edge</strong>
                    <span>original</span>
                </div>
            </div>

            <div className="player-ui lower-right sound-chip">342</div>

            {!compact && <div className="progress-scrub"><div className="progress-bar" /></div>}
        </div>
    )
}

function App() {
    const [screen, setScreen] = useState<Screen>('home')
    const [effectKey, setEffectKey] = useState(0)
    const [activeMomentId, setActiveMomentId] = useState<MomentId>('booyah')

    const activeMoment = moments.find((moment) => moment.id === activeMomentId) ?? moments[0]

    function triggerMoment(momentId: MomentId) {
        setActiveMomentId(momentId)
        setEffectKey((current) => current + 1)
    }

    function cycleMoment() {
        const currentIndex = moments.findIndex((moment) => moment.id === activeMomentId)
        const nextMoment = moments[(currentIndex + 1) % moments.length]
        triggerMoment(nextMoment.id)
    }

    return (
        <main className={`app-shell${screen === 'stream' ? ' stream-view-active' : ''}`}>
            <aside className="sidebar">
                <button type="button" className="brand-lockup button-reset" onClick={() => setScreen('home')}>
                    <div className="brand-wordmark">CRSH</div>
                </button>

                <nav className="sidebar-nav" aria-label="Primary">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            className={`nav-item${item.label === 'Home' ? ' active' : ''}`}
                            onClick={() => {
                                if (item.label === 'Home') {
                                    setScreen('home')
                                }
                            }}
                        >
                            <span className="nav-icon">
                                <AppIcon name={item.icon} />
                            </span>
                            <span className="nav-label">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <a href="/">How it Works?</a>
                    <a href="/">Help Center</a>
                    <button type="button" className="community-link button-reset" aria-label="Community">
                        <AppIcon name="chat" />
                    </button>
                </div>
            </aside>

            <section className="main-shell">
                <header className="header-bar">
                    <div className="header-leading">
                        {screen === 'stream' && (
                            <button
                                type="button"
                                className="back-button"
                                onClick={() => setScreen('home')}
                            >
                                <span className="icon-wrap">
                                    <AppIcon name="back" />
                                </span>
                                Back
                            </button>
                        )}
                    </div>

                    <div className="wallet-pill">
                        <span className="wallet-amount">$0.00</span>
                        <button type="button" className="add-funds-button">
                            Add Funds
                            <span className="add-icon">
                                <AppIcon name="plus" />
                            </span>
                        </button>
                    </div>

                    <button type="button" className="profile-pill button-reset">
                        <div className="profile-copy">
                            <strong>iriss</strong>
                            <span>
                                <AppIcon name="wallet" />
                                Iriss
                            </span>
                        </div>
                        <div className="profile-avatar">I</div>
                        <span className="profile-chevron">
                            <AppIcon name="chevron" />
                        </span>
                    </button>
                </header>

                {screen === 'home' ? (
                    <div className="content-shell home-content">
                        <section className="hero-grid">
                            <article className="home-stream-card">
                                <StreamSurface moment={activeMoment} effectKey={effectKey} compact />

                                <div className="home-stream-footer">
                                    <div>
                                        <div className="stream-handle">ff_edge</div>
                                        <h1>Free Fire</h1>
                                    </div>

                                    <button
                                        type="button"
                                        className="stream-open-button"
                                        onClick={() => {
                                            setScreen('stream')
                                            setEffectKey((current) => current + 1)
                                        }}
                                    >
                                        Open
                                        <span>
                                            <AppIcon name="chevron" />
                                        </span>
                                    </button>
                                </div>
                            </article>

                            <aside className="market-panel">
                                <div className="market-prompt">
                                    <h2>Will [PLAYER]&apos;s squad win the Booyah! with 15 or more total kills?</h2>
                                    <div className="market-divider" />
                                    <div className="awaiting-copy">
                                        <strong>Awaiting result</strong>
                                        <span>Trades are closed for this round. Trade again next round.</span>
                                    </div>
                                    <div className="odds-row">
                                        <span className="odds-left">0%</span>
                                        <div className="odds-track">
                                            <div className="odds-fill" />
                                        </div>
                                        <span className="odds-right">100%</span>
                                    </div>
                                </div>

                                <div className="market-actions">
                                    <div className="settled-card">
                                        <span className="settled-label">Result</span>
                                        <strong>{activeMoment.headline}</strong>
                                        <p>{activeMoment.subline}</p>
                                    </div>

                                    <div className="moment-chip-row">
                                        {moments.map((moment) => (
                                            <button
                                                key={moment.id}
                                                type="button"
                                                className={`moment-chip${moment.id === activeMomentId ? ' active' : ''}`}
                                                onClick={() => triggerMoment(moment.id)}
                                            >
                                                {moment.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        </section>

                        <section className="streams-section">
                            <div className="section-head">
                                <h3>All Streams</h3>
                            </div>

                            <div className="stream-grid">
                                {streamCards.map((card) => (
                                    <article key={card.title} className={`mini-stream-card ${card.accent}`}>
                                        <div className="mini-live">LIVE</div>
                                        <div className="mini-viewers">{card.viewers}</div>
                                        <div className="mini-art" />
                                        <div className="mini-copy">
                                            <strong>{card.title}</strong>
                                            <span>Live market open</span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="content-shell stream-content">
                        <section className="stream-layout">
                            <div className="stream-column">
                                <StreamSurface moment={activeMoment} effectKey={effectKey} />

                                <div className="detail-question-card">
                                    <h2>Will [PLAYER] get 5 or more Kills in total before reaching Top 30?</h2>
                                    <div className="awaiting-copy detail-awaiting">
                                        <strong>Awaiting result</strong>
                                        <span>Resolution sequence mock: trigger different celebration systems below.</span>
                                    </div>
                                </div>

                                <div className="moment-controls">
                                    {moments.map((moment) => (
                                        <button
                                            key={moment.id}
                                            type="button"
                                            className={`moment-switch${moment.id === activeMomentId ? ' active' : ''}`}
                                            onClick={() => triggerMoment(moment.id)}
                                        >
                                            <span>{moment.label}</span>
                                            <small>{moment.chip}</small>
                                        </button>
                                    ))}

                                    <button type="button" className="replay-button" onClick={cycleMoment}>
                                        Replay next moment
                                    </button>
                                </div>
                            </div>

                            <aside className="chat-panel">
                                <div className="chat-header">
                                    <strong>LIVE CHAT</strong>
                                    <button type="button" className="chat-info button-reset">
                                        1
                                    </button>
                                </div>

                                <div className="pinned-card">
                                    <span className="pinned-label">PINNED</span>
                                    <p>
                                        <strong>ff_edge</strong> By participating in CRSHMARKET, you agree to our
                                        official Market Rules & Settlement Policy.
                                    </p>
                                </div>

                                <div className="chat-list">
                                    {chatMessages.map((message, index) => (
                                        <div key={`${message.author}-${message.time}-${index}`} className="chat-message">
                                            <div className={`chat-author ${message.tone}`}>{message.author}:</div>
                                            <div className="chat-text">{message.text}</div>
                                            <div className="chat-time">{message.time}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="chat-composer">
                                    <input type="text" value="Type a message..." readOnly aria-label="Type a message" />
                                    <button type="button" className="composer-gift button-reset" aria-label="Gift">
                                        <AppIcon name="gift" />
                                    </button>
                                    <button type="button" className="composer-send button-reset" aria-label="Send">
                                        <AppIcon name="send" />
                                    </button>
                                </div>
                            </aside>
                        </section>
                    </div>
                )}
            </section>
        </main>
    )
}

export default App