import "./SideBar.css";
export default function SideBar({ children, ready }) {
  return <div className={`side-nav ${ready ? "hidden" : ""}`}>{children}</div>;
}
