import { useState } from "react";
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
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
} from "@tabler/icons-react";
import {
  Code,
  Group,
  Burger,
  Button,
  ActionIcon,
  Text,
  Avatar,
} from "@mantine/core";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./dashboard.module.css";

const data = [
  { link: "", label: "Overview", icon: IconDashboard },
  { link: "", label: "Register users", icon: IconUserPlus },
  { link: "", label: "Register Members", icon: IconUsers },
  { link: "", label: "Announcements", icon: IconSpeakerphone },
  { link: "", label: "UpComing events", icon: IconCalendarEvent },
];

export function Dashboard() {
  const [active, setActive] = useState("Overview");
  const [mobileNavOpened, setMobileNavOpened] = useState(false);

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        setMobileNavOpened(false); // Close mobile nav when item is clicked
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
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
                Admin
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
            onClick={(event) => event.preventDefault()}
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
                {active}
              </Text>
              <Text size="sm" c="dimmed">
                Welcome to the {active} section
              </Text>
            </div>

            {/* Right side header - notifications and avatar */}
            <Group gap="sm">
              <ActionIcon variant="light" size="lg" radius="md">
                <IconBell size={20} />
              </ActionIcon>
              <ActionIcon variant="light" size="lg" radius="md">
                <IconSettings size={20} />
              </ActionIcon>
              <Group gap="xs">
                <Avatar size="md" radius="xl" color="blue">
                  <IconUser size={18} />
                </Avatar>
                <div style={{ textAlign: "left" }}>
                  <Text size="sm" fw={500}>
                    Admin User
                  </Text>
                  <Text size="xs" c="dimmed">
                    Administrator
                  </Text>
                </div>
              </Group>
            </Group>
          </Group>
        </header>

        {/* Active content based on navigation */}
        <div className={classes.contentBody}>
          {active === "Overview" && (
            <div>
              <Text size="lg" fw={500} mb="md">
                Dashboard Overview
              </Text>
              <Text c="dimmed" mb="lg">
                Here you can view key metrics and recent activities across your
                platform.
              </Text>
              {/* Add your overview content here */}
            </div>
          )}

          {active === "Register users" && (
            <div>
              <Text size="lg" fw={500} mb="md">
                User Registration
              </Text>
              <Text c="dimmed" mb="lg">
                Register new users to the platform and manage their access
                levels.
              </Text>
              {/* Add your user registration form here */}
            </div>
          )}

          {active === "Register Members" && (
            <div>
              <Text size="lg" fw={500} mb="md">
                Member Registration
              </Text>
              <Text c="dimmed" mb="lg">
                Register new members and manage their membership details.
              </Text>
              {/* Add your member registration form here */}
            </div>
          )}

          {active === "Announcements" && (
            <div>
              <Text size="lg" fw={500} mb="md">
                Announcements
              </Text>
              <Text c="dimmed" mb="lg">
                Create and manage announcements for your community.
              </Text>
              {/* Add your announcements content here */}
            </div>
          )}

          {active === "UpComing events" && (
            <div>
              <Text size="lg" fw={500} mb="md">
                Upcoming Events
              </Text>
              <Text c="dimmed" mb="lg">
                View and manage upcoming events and activities.
              </Text>
              {/* Add your events content here */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
