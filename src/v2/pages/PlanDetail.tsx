import * as React from 'react'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'

function Field(p: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: '1px solid var(--v2-line)',
      borderRadius: 8,
      padding: '0.7rem 0.9rem',
      background: 'var(--v2-bg-soft)',
      fontSize: '0.88rem'
    }}>
      <strong style={{
        display: 'block',
        fontSize: '0.68rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: 'var(--v2-brand-dark)',
        fontWeight: 700,
        marginBottom: '0.25rem'
      }}>{p.label}</strong>
      {p.children}
    </div>
  )
}

function Comment(p: { name: string; time: string; text: string }) {
  return (
    <div style={{ display: 'flex', gap: '0.65rem', padding: '0.85rem 0', borderBottom: '1px solid var(--v2-line-soft)' }}>
      <Avatar name={p.name} size={30} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'baseline', fontSize: '0.78rem', marginBottom: '0.2rem' }}>
          <strong style={{ fontSize: '0.82rem' }}>{p.name}</strong>
          <span style={{ color: 'var(--v2-muted)' }}>{p.time}</span>
        </div>
        <div style={{ fontSize: '0.86rem', color: 'var(--v2-ink-soft)' }}>{p.text}</div>
      </div>
    </div>
  )
}

export function PlanDetail() {
  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--v2-muted)', marginBottom: '0.3rem' }}>
            Action Plans / Chrystaline Glenn
          </div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Reducing transition time</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            For Chrystaline Glenn · created May 6 · due May 28
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'var(--v2-success-soft)',
            color: 'var(--v2-success)',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--v2-radius-pill)',
            fontSize: '0.78rem', fontWeight: 600
          }}>✓ Saved 3s ago</span>
          <Button>⋯ More</Button>
          <Button variant="primary">📨 Send to teacher</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        {/* Left: plan content */}
        <div>
          <Card style={{ marginBottom: '0.85rem' }} padding="1.35rem">
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>🎯 Goal</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--v2-ink-soft)' }}>
              Reduce the average transition time between activities from 5 minutes to under 2 minutes, while maintaining smooth flow and minimal disruption.
            </p>
          </Card>

          <Card style={{ marginBottom: '0.85rem' }} padding="1.35rem">
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>📋 Action steps</h3>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              <Field label="Step 1 · By May 22">
                Introduce a transition song as a cue. Use the same song daily for one week.
              </Field>
              <Field label="Step 2 · By May 25">
                Set up the next activity materials before ending the current one (parallel prep).
              </Field>
              <Field label="Step 3 · By May 27">
                Self-time each transition using the in-app timer. Log duration in observation notes.
              </Field>
            </div>
          </Card>

          <Card padding="1.35rem">
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>📊 Measurement</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--v2-ink-soft)' }}>
              Tisha will observe two transitions per week and log timing. Target: average under 2:00 by May 28.
            </p>
          </Card>
        </div>

        {/* Right: conversation + progress */}
        <div>
          <Card padding="1.35rem">
            <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.65rem' }}>
              💬 Conversation
              <span style={{ fontWeight: 400, color: 'var(--v2-muted)', fontSize: '0.75rem', marginLeft: '0.5rem' }}>3 messages · in CHALK</span>
            </div>

            <Comment
              name="Tisha Owen"
              time="May 6 · 2:14 PM"
              text="Chrystaline, here's the plan we discussed. The song idea came up because I noticed kids respond well to your singing during circle time."
            />
            <Comment
              name="Chrystaline Glenn"
              time="May 7 · 9:32 AM"
              text='Got it — tried "Tidy Up" song this morning, kids loved it. Transition went from ~5 min to ~3 min. 🎉'
            />
            <Comment
              name="Tisha Owen"
              time="May 7 · 11:05 AM"
              text="Amazing progress! Let's keep tracking — I'll observe tomorrow morning."
            />

            <div style={{
              marginTop: '0.85rem',
              border: '1px solid var(--v2-line)',
              borderRadius: 'var(--v2-radius-pill)',
              padding: '0.4rem 0.55rem 0.4rem 1.1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}>
              <input
                type="text"
                placeholder="Write a message…"
                style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent', fontSize: '0.85rem', color: 'var(--v2-ink)' }}
              />
              <Button variant="primary" size="sm">Send</Button>
            </div>
          </Card>

          <Card style={{ marginTop: '1rem' }} padding="1.35rem">
            <CardHeader title="📈 Progress" />
            <div style={{ height: 6, background: 'var(--v2-bg-soft)', borderRadius: 999, overflow: 'hidden', marginBottom: '0.5rem' }}>
              <div style={{ height: '100%', width: '65%', background: 'var(--v2-brand)', borderRadius: 999 }} />
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--v2-muted)', display: 'flex', justifyContent: 'space-between' }}>
              <span>2 of 3 steps complete</span><span>8 days remaining</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
