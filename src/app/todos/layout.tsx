export default function TodoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="mt-6 mx-auto max-w-2xl">
      {children}
    </section>
  )
}
