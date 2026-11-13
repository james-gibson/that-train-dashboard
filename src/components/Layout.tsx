import type { ReactNode } from 'react'
import { Shell, Sidebar, Stack, Row } from '@/components/pouf/layout'
import { Heading, Text, Eyebrow } from '@/components/pouf/text'
import { Blob } from '@/components/pouf/media'
import { NavLink } from '@/components/pouf/NavLink'
import { Footer } from '@/components/pouf/footer'
import { SECTIONS } from '@/lib/content'
import { href } from '@/lib/base'

const NAV_ICON: Record<string, 'overview' | 'lab' | 'activity' | 'log'> = {
  brief: 'overview',
  studies: 'lab',
  ops: 'activity',
  notes: 'log',
}

export function Layout({ path, children }: { path: string; children: ReactNode }) {
  return (
    <Shell>
      <Sidebar>
        <Row gap={3} align="center">
          <Blob icon="overview" tone="pink" label="That Train Dashboard" />
          <Stack gap={1}>
            <Heading level={3}>That Train</Heading>
            <Text size="sm" muted>
              Research dashboard
            </Text>
          </Stack>
        </Row>

        <nav aria-label="Sections">
          <Stack gap={1}>
            {SECTIONS.map((section) => (
              <NavLink
                key={section.id}
                href={href(`/${section.id}`)}
                currentPath={path}
                icon={NAV_ICON[section.id]}
                tone="pink"
              >
                {section.label}
              </NavLink>
            ))}
          </Stack>
        </nav>

        <Stack gap={2}>
          <Eyebrow>Parent</Eyebrow>
          <Text size="sm" muted>
            A child seed of le.gume. Same content model, same gate, different question.
          </Text>
        </Stack>
      </Sidebar>

      <main>
        <Stack gap={6}>
          {children}
          <Footer
            brand="That Train Dashboard"
            tagline="Economic studies run as OpenTTD simulations, with the provenance attached."
            columns={[
              {
                title: 'Sections',
                links: SECTIONS.map((section) => ({
                  label: section.label,
                  href: href(`/${section.id}`),
                })),
              },
              {
                title: 'Parent',
                links: [
                  { label: 'le.gume', href: 'https://james-gibson.github.io/le.gume/' },
                  {
                    label: 'The content model',
                    href: 'https://james-gibson.github.io/le.gume/docs/content-model',
                  },
                ],
              },
            ]}
            note="AGPL-3.0-only. No accounts, no analytics, no search."
          />
        </Stack>
      </main>
    </Shell>
  )
}
