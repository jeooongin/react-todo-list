const Header = ({ headerText, leftChild, rightChild }) => {
  return (
    <header className="Header">
      <div className="header_btn_left">{leftChild}</div>
      <div className="header_text">{headerText}</div>
      <div className="header_btn_right">{rightChild}</div>
    </header>
  );
};

export default Header;
