// app/page.js

import FireBackground from "@/components/FireBackground";

export default function SK() {
  return (
    <main style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
        <FireBackground />
      <h1 style={{ fontSize: '4rem', marginTop: '20vh' }}>HELL'S KITCHEN</h1>
      <p>This page is literally on fire.</p>
      
      <button style={{
        marginTop: '2rem',
        padding: '1rem 2rem',
        background: 'white',
        color: 'black',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Don't Touch
      </button>
    </main>
  );
}