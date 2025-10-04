import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "首頁",
    key: "/",
  },
  {
    label: "購買未來的自己",
    key: "/good",
  },
  {
    label: "登入",
    key: "/login",
  },
  {
    label: "使用者",
    key: "/profile",
  },
  {
    label: "購物車",
    key: "/shopCart",
  },

];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      className="navbar"
    />
  );
};

export default Navbar;
