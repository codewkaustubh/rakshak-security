// Contacts page — not available in Rakshak Web v2
// This page is kept for backwards compat but is not routed
export function ContactsPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-xs text-muted-foreground font-mono">
        Contacts screen not available in cloud mode
      </p>
    </div>
  );
}
