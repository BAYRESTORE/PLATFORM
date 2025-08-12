import React from 'react'
import { useAuth } from '../../../shared/hooks/useAuth'

export default function AdminDashboard() {
  useAuth(['admin'])

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Konten admin */}
    </div>
  )
}
