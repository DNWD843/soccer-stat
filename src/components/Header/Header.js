import './Header.css';

function Header() {
  return (
    <header className="header">
      <span className="header__logo">SoccerState</span>
      <a
        className="header__link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        На главную
      </a>
    </header>
  );
}

export default Header;
