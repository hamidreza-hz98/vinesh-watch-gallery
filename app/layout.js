import "./globals.css";
import NotificationsProvider from "@/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/hooks/useDialogs/DialogsProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body>
        <NotificationsProvider>
          <DialogsProvider>{children}</DialogsProvider>
        </NotificationsProvider>
      </body>
    </html>
  );
}
