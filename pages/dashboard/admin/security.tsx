
import React, { useEffect, useState } from 'react';
import SecurityToggle from '../../../shared/components/SecurityToggle';

type Feature = {
  id: string;
  feature_key: string;
  enabled: boolean;
};

async function fetchSecurityFeatures() {
  const res = await fetch('/api/security/features');
  if (!res.ok) throw new Error('Gagal load fitur keamanan');
  return res.json();
}

async function updateSecurityFeature(featureKey: string, enabled: boolean) {
  const res = await fetch(`/api/security/features/${featureKey}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled }),
  });
  if (!res.ok) throw new Error('Gagal update fitur keamanan');
  return res.json();
}

export default function SecurityDashboard() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatures() {
      try {
        const data = await fetchSecurityFeatures();
        setFeatures(data);
      } catch {
        alert('Gagal load fitur keamanan');
      } finally {
        setLoading(false);
      }
    }
    loadFeatures();
  }, []);

  async function toggleFeature(key: string, enabled: boolean) {
    try {
      await updateSecurityFeature(key, enabled);
      setFeatures((prev) =>
        prev.map((f) => (f.feature_key === key ? { ...f, enabled } : f))
      );
    } catch {
      alert('Gagal update fitur');
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Dashboard Keamanan</h1>
      {features.length === 0 && <p>Tidak ada fitur tersedia</p>}
      {features.map(({ id, feature_key, enabled }) => (
        <SecurityToggle
          key={id}
          featureKey={feature_key}
          label={feature_key.replace(/_/g, ' ')}
          enabled={enabled}
          onToggle={toggleFeature}
        />
      ))}
    </div>
  );
}
