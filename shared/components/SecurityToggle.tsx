import React, { useState } from 'react';

type SecurityToggleProps = {
  featureKey: string;
  label: string;
  enabled: boolean;
  onToggle: (key: string, enabled: boolean) => Promise<void>;
};

export default function SecurityToggle({ featureKey, label, enabled, onToggle }: SecurityToggleProps) {
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    try {
      await onToggle(featureKey, e.target.checked);
    } catch {
      alert('Gagal update fitur, coba lagi');
    }
    setLoading(false);
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleChange}
          disabled={loading}
        />
        {label}
      </label>
    </div>
  );
}
