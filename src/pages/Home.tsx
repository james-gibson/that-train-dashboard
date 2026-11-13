import { Grid, Stack, Row } from '@/components/pouf/layout'
import { Heading, Text, Eyebrow } from '@/components/pouf/text'
import { Card } from '@/components/pouf/surface'
import { Stat } from '@/components/pouf/readout'
import { Status } from '@/components/pouf/status'
import { Badge } from '@/components/pouf/media'
import { Table } from '@/components/pouf/table'
import { pagesIn, latestUpdate } from '@/lib/content'
import { href } from '@/lib/base'

type Study = {
  title: string
  stage: string
  updated: string
  href: string
}

const tone = (stage: string) =>
  stage === 'running' ? 'info' : stage === 'analysis' ? 'warn' : stage === 'design' ? 'idle' : 'up'

export function Home() {
  const studies = pagesIn('studies')
  const rows: Study[] = studies.map((study) => ({
    title: study.title,
    stage: study.stage,
    updated: study.updated,
    href: href(`/studies/${study.slug}`),
  }))

  return (
    <>
      <Stack gap={2}>
        <Eyebrow>Research dashboard</Eyebrow>
        <Heading level={1}>That Train Dashboard</Heading>
        <Text muted>
          A small team studies economic questions by running them as OpenTTD simulations. Every
          finding is attached to a scenario, a seed and a version — and every page says what it does
          not claim.
        </Text>
      </Stack>

      <Row gap={4} align="center" wrap>
        <Status label="Simulation idle — no run in progress" tone="idle" />
        <Text size="sm" muted>
          Last review {latestUpdate()}
        </Text>
      </Row>

      <Grid cols={3}>
        <Stat label="Studies" value={String(studies.length)} icon="lab" tone="info" />
        <Stat label="Pages" value={String(pagesIn('brief').length + studies.length + pagesIn('ops').length + pagesIn('notes').length)} icon="log" tone="idle" />
        <Stat label="Open questions" value="3" icon="warn" tone="warn" />
      </Grid>

      <Card>
        <Stack gap={4}>
          <Row justify="between" align="center" wrap>
            <Heading level={2}>Studies in flight</Heading>
            <Badge tone="idle">stage is a claim, not a schedule</Badge>
          </Row>
          <Table<Study>
            columns={[
              {
                key: 'title',
                header: 'Study',
                render: (row) => <a href={row.href}>{row.title}</a>,
              },
              {
                key: 'stage',
                header: 'Stage',
                render: (row) => <Badge tone={tone(row.stage)}>{row.stage}</Badge>,
              },
              { key: 'updated', header: 'Updated', mono: true, render: (row) => row.updated },
            ]}
            rows={rows}
            getKey={(row) => row.href}
          />
        </Stack>
      </Card>

      <Grid cols={2}>
        <Card>
          <Stack gap={3}>
            <Heading level={3}>The rule</Heading>
            <Text size="sm" muted>
              A claim without a run is a hypothesis and is labelled as one. A run without a recorded
              seed, version and scenario is not a run.
            </Text>
            <Text size="sm">
              <a href={href('/brief/mission')}>Read the mission</a>
            </Text>
          </Stack>
        </Card>
        <Card>
          <Stack gap={3}>
            <Heading level={3}>The limits</Heading>
            <Text size="sm" muted>
              OpenTTD is a toy economy. The model tests mechanisms; it does not forecast a market,
              and no page here claims otherwise.
            </Text>
            <Text size="sm">
              <a href={href('/notes/what-we-do-not-claim')}>What we do not claim</a>
            </Text>
          </Stack>
        </Card>
      </Grid>
    </>
  )
}
