import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAppSelector } from "../hooks/redux";
import "./Navbar.sass";
type MenuItem = Required<MenuProps>["items"][number];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const totalQuantity = useAppSelector((state) => state.totalQuantity);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  const handleCartClick = () => {
    navigate("/shopCart");
    setCurrent("/shopCart");
  };

  const items: MenuItem[] = [
    {
      label: "首頁",
      key: "/",
    },
    {
      label: "商店",
      key: "/good",
    },
 
  ];

  return (
    <div className="navbar-container">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="navbar"
      />
      <div className="cart-icon-container" onClick={handleCartClick}>
        <Badge count={totalQuantity} showZero={false} className="cart-badge">
          <ShoppingCartOutlined className="cart-icon" />
        </Badge>
      </div>
    </div>
  );
};

export default Navbar;
