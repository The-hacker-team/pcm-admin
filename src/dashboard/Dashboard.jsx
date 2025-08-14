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
        {/* Content will go here */}
        <div style={{ padding: "1rem" }}>
          <Text size="xl" fw={500} mb="md">
            {active}
          </Text>
          <Text c="dimmed">
            Welcome to the {active} section. Content for this section will be
            displayed here.
          </Text>
        </div>
      </main>
    </div>
  );
}
