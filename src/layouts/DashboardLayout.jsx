import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconMenu2,
  IconX,
  IconUser,
  IconBell,
  IconDashboard,
  IconUserPlus,
  IconUsers,
  IconSpeakerphone,
  IconCalendarEvent,
  IconNote,
} from "@tabler/icons-react";
import { Group, Burger, ActionIcon, Text, Avatar } from "@mantine/core";
import classes from "../dashboard/dashboard.module.css";
import { getUserFromToken, clearAuth } from "../utils/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";

const data = [
  { link: "/dashboard/overview", label: "Overview", icon: IconDashboard },
  {
    link: "/dashboard/register-users",
    label: "Register users",
    icon: IconUserPlus,
  },
  {
    link: "/dashboard/register-members",
    label: "Register Members",
    icon: IconUsers,
  },
  {
    link: "/dashboard/announcements",
    label: "Announcements",
    icon: IconSpeakerphone,
  },
  {
    link: "/dashboard/upcoming-events",
    label: "UpComing events",
    icon: IconCalendarEvent,
  },
  { link: "/dashboard/minutes", label: "Minutes", icon: IconNote },
  { link: "/dashboard/visitors", label: "Visitors", icon: IconUser },
];

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("Overview");
  const [mobileNavOpened, setMobileNavOpened] = useState(false);
  const [user, setUser] = useState(null);

  // Get user details on component mount
  useEffect(() => {
    const userDetails = getUserFromToken();
    if (userDetails) {
      setUser(userDetails);
    } else {
      // If no valid token, redirect to login
      navigate("/");
    }
  }, [navigate]);

  // Update active state based on current location
  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = data.find((item) => item.link === currentPath);
    if (currentItem) {
      setActive(currentItem.label);
    } else if (currentPath === "/dashboard" || currentPath === "/dashboard/") {
      setActive("Overview");
    }
  }, [location.pathname]);

  // Handle logout
  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  const links = data.map((item) => (
    <Link
      to={item.link}
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      onClick={() => setMobileNavOpened(false)}
      style={{ textDecoration: "none" }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <div className={classes.container}>
      {/* Header for mobile and desktop */}
      <header className={classes.headerBar}>
        <Group justify="space-between" h="100%">
          <Group>
            <Burger
              opened={mobileNavOpened}
              onClick={() => setMobileNavOpened(!mobileNavOpened)}
              hiddenFrom="md"
              size="sm"
            />
            <Text size="lg" fw={500} visibleFrom="md">
              PCM Admin
            </Text>
          </Group>

          {/* Right side header links */}
          <Group gap="sm">
            <ActionIcon variant="subtle" size="lg">
              <IconBell size={20} />
            </ActionIcon>
            <ActionIcon variant="subtle" size="lg">
              <IconSettings size={20} />
            </ActionIcon>
            <Group gap="xs">
              <Avatar size="sm" radius="xl">
                <IconUser size={16} />
              </Avatar>
              <Text size="sm" hiddenFrom="xs">
                {user?.name || user?.email || "Admin"}
              </Text>
            </Group>
          </Group>
        </Group>
      </header>

      {/* Mobile overlay */}
      {mobileNavOpened && (
        <div
          className={classes.overlay}
          onClick={() => setMobileNavOpened(false)}
        />
      )}

      {/* Navigation sidebar */}
      <nav
        className={`${classes.navbar} ${
          mobileNavOpened ? classes.mobileNavOpen : ""
        }`}
      >
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Text size="lg" fw={500}>
              PCM Admin
            </Text>
            <ActionIcon
              variant="subtle"
              onClick={() => setMobileNavOpened(false)}
              hiddenFrom="md"
            >
              <IconX size={18} />
            </ActionIcon>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </a>

          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              handleLogout();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </nav>

      {/* Main content area */}
      <main className={classes.content}>
        {/* Content header - hidden on small screens */}
        <header className={classes.contentHeader}>
          <Group justify="space-between" align="center">
            <div>
              <Text size="xl" fw={600} mb={4}>
                {`${user?.firstName} ${user?.lastName}`}
              </Text>
            </div>

            {/* Right side header - notifications and avatar */}
            <Group gap="sm">
              <Group gap="xs">
                <Avatar size="md" radius="xl" color="blue">
                  <IconUser size={18} />
                </Avatar>
                <div style={{ textAlign: "left" }}>
                  <Text size="sm" fw={500}>
                    {user?.name || user?.email || "Admin User"}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {user?.role || "Administrator"}
                  </Text>
                </div>
              </Group>
            </Group>
          </Group>
        </header>

        {/* Active content based on route */}
        <div className={classes.contentBody}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
