import ThemeRegistry from "@/theme/ThemeRegistry";
import PageTransition from "@/components/PageTransition";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <PageTransition>{children}</PageTransition>
        </ThemeRegistry>
      </body>
    </html>
  );
}
