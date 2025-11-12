export default function Home() {
  return (
    <section className="card" style={{ padding: 24 }}>
      <h1 style={{ fontFamily: 'var(--bb-font-heading)', color: 'var(--bb-brand-2)', fontSize: '48px', lineHeight: 1.2 }}>
        Private nature yards for happy dogs.
      </h1>
      <p style={{ marginTop: 8, maxWidth: 640 }}>
        Book secure, serene spaces by the hour—fenced, shaded, host-verified.
      </p>

      <form aria-label="Search yards" style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr 1fr auto', marginTop: 16 }}>
        <input className="input" placeholder="Location" aria-label="Location" />
        <input className="input" type="date" aria-label="Date" />
        <select className="input" aria-label="Filter">
          <option value="">Any amenity</option>
          <option value="fenced">Fenced</option>
          <option value="water">Water access</option>
        </select>
        <button className="button-primary" type="submit">Find a yard</button>
      </form>
    </section>
  );
}
