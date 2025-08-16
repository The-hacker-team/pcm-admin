import { useEffect, useState } from "react";
import { Button, Group, Notification, rem } from "@mantine/core";
import { IconDownload, IconWifiOff } from "@tabler/icons-react";
import { useRegisterSW } from "virtual:pwa-register/react";

export function PWABadge() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showOfflineWarning, setShowOfflineWarning] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  // Handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setShowOfflineWarning(false);
    };

    const handleOffline = () => {
      setShowOfflineWarning(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      {/* App Update Available */}
      {needRefresh && (
        <Notification
          icon={<IconDownload style={{ width: rem(20), height: rem(20) }} />}
          color="blue"
          title="New version available!"
          onClose={() => setNeedRefresh(false)}
          style={{ marginBottom: "10px" }}
        >
          <Group gap="xs">
            <span>
              New version available, click on reload button to update.
            </span>
            <Button size="xs" onClick={() => updateServiceWorker(true)}>
              Reload
            </Button>
          </Group>
        </Notification>
      )}

      {/* Offline Warning */}
      {showOfflineWarning && (
        <Notification
          icon={<IconWifiOff style={{ width: rem(20), height: rem(20) }} />}
          color="red"
          title="No Internet Connection"
          onClose={() => setShowOfflineWarning(false)}
          style={{ marginBottom: "10px" }}
        >
          <Group gap="xs">
            <span>
              This app requires an internet connection to work properly.
            </span>
          </Group>
        </Notification>
      )}

      {/* PWA Install Prompt */}
      {showInstallPrompt && (
        <Notification
          icon={<IconDownload style={{ width: rem(20), height: rem(20) }} />}
          color="green"
          title="Install App"
          onClose={() => setShowInstallPrompt(false)}
        >
          <Group gap="xs">
            <span>Install PCM Admin Dashboard for quick access!</span>
            <Button size="xs" onClick={handleInstallClick}>
              Install
            </Button>
          </Group>
        </Notification>
      )}
    </div>
  );
}
