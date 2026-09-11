import { useMemo, useState } from 'react';

const navItems = [
  { id: 'home', label: 'HOME', number: '01' },
  { id: 'work', label: 'WORK', number: '02' },
  { id: 'about', label: 'ABOUT', number: '03' },
];

const projects = [
  { title: 'Orbit Notes', category: 'UI / UX', year: '2026', emoji: '◌' },
  { title: 'Mellow Market', category: 'BRANDING', year: '2026', emoji: '✦' },
  { title: 'Frame Archive', category: 'WEB', year: '2025', emoji: '▣' },
];

function Header({ page, onNavigate, dark, onToggleTheme }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => onNavigate('home')} aria-label="홈으로 이동">
        FLOW<span>.</span>
      </button>

      <nav className="nav" aria-label="주요 메뉴">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={page === item.id ? 'nav-btn active' : 'nav-btn'}
            onClick={() => onNavigate(item.id)}
          >
            <span>{item.number}</span>{item.label}
          </button>
        ))}
      </nav>

      <button className="theme-btn" onClick={onToggleTheme} aria-label="테마 전환">
        {dark ? '☀' : '☾'}
      </button>
    </header>
  );
}

function Home({ onNavigate }) {
  return (
    <section className="page page-home">
      <div className="eyebrow">CREATIVE FRONT-END / 2026</div>
      <h1>
        SMALL<br />
        <em>INTERACTIONS</em><br />
        BIG FEELING.
      </h1>
      <div className="home-bottom">
        <p>
          버튼을 누르면 상태가 바뀌고,<br />
          그 상태를 따라 화면이 자연스럽게 전환되는<br />
          React 기반 Single Page Application.
        </p>
        <button className="circle-cta" onClick={() => onNavigate('work')}>
          <span>VIEW WORK</span>
          <b>↘</b>
        </button>
      </div>
    </section>
  );
}

function Work() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const filters = ['ALL', 'WEB', 'UI / UX', 'BRANDING'];
  const visibleProjects = useMemo(
    () => activeFilter === 'ALL' ? projects : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  return (
    <section className="page page-work">
      <div className="section-head">
        <div>
          <div className="eyebrow">SELECTED PROJECTS</div>
          <h2>WORK<span>.</span></h2>
        </div>
        <div className="filters" aria-label="프로젝트 필터">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? 'filter active' : 'filter'}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <article className="project-card" key={project.title} style={{ '--i': index }}>
            <div className="project-visual">
              <span className="project-symbol">{project.emoji}</span>
              <span className="project-index">0{index + 1}</span>
            </div>
            <div className="project-meta">
              <div>
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
              <span>{project.year}</span>
            </div>
          </article>
        ))}
      </div>

      {visibleProjects.length === 0 && <p className="empty">해당 카테고리의 프로젝트가 없습니다.</p>}
    </section>
  );
}

function About({ onNavigate }) {
  const [messageVisible, setMessageVisible] = useState(false);

  return (
    <section className="page page-about">
      <div className="about-copy">
        <div className="eyebrow">ABOUT THIS MISSION</div>
        <h2>STATE CHANGES.<br />UI RESPONDS.</h2>
        <p>
          이 결과물은 React의 핵심 흐름인 <strong>이벤트 → 상태 변경 → 리렌더링</strong>을
          한 화면 안에서 직접 확인할 수 있도록 설계했습니다. 메뉴 버튼, 프로젝트 필터,
          테마 전환과 메시지 토글은 각각 독립적인 상태를 가지고 UI를 선언적으로 갱신합니다.
        </p>
        <div className="about-actions">
          <button className="primary" onClick={() => setMessageVisible((v) => !v)}>
            {messageVisible ? 'CLOSE NOTE' : 'OPEN NOTE'}
          </button>
          <button className="text-btn" onClick={() => onNavigate('home')}>BACK HOME →</button>
        </div>
        {messageVisible && (
          <div className="note" role="status">
            <b>핵심 포인트</b>
            <span>직접 DOM을 바꾸지 않고 상태를 바꾸면 React가 필요한 UI를 다시 그립니다.</span>
          </div>
        )}
      </div>
      <div className="about-orbit" aria-hidden="true">
        <div className="orbit orbit-1"></div>
        <div className="orbit orbit-2"></div>
        <div className="planet">STATE</div>
      </div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [previousPage, setPreviousPage] = useState('home');
  const [dark, setDark] = useState(true);

  const handleNavigate = (nextPage) => {
    if (nextPage === page) return;
    setPreviousPage(page);
    setPage(nextPage);
  };

  const content = {
    home: <Home onNavigate={handleNavigate} />,
    work: <Work />,
    about: <About onNavigate={handleNavigate} />,
  }[page];

  return (
    <main className={dark ? 'app theme-dark' : 'app theme-light'}>
      <Header
        page={page}
        onNavigate={handleNavigate}
        dark={dark}
        onToggleTheme={() => setDark((value) => !value)}
      />

      <div className="screen-shell">
        <div key={`${previousPage}-${page}`} className="screen-transition">
          {content}
        </div>
      </div>

      <footer className="footer">
        <span>REACT SPA</span>
        <span>STATE / EVENT / RENDER</span>
        <span>SEOUL · 2026</span>
      </footer>
    </main>
  );
}
