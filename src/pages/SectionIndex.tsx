import { Stack, Grid } from '@/components/pouf/layout'
import { Heading, Text, Eyebrow } from '@/components/pouf/text'
import { Card } from '@/components/pouf/surface'
import { Badge } from '@/components/pouf/media'
import { pagesIn, sectionMeta, type SectionId } from '@/lib/content'
import { href } from '@/lib/base'

const tone = (stage: string) =>
  stage === 'running' ? 'info' : stage === 'analysis' ? 'warn' : stage === 'design' ? 'idle' : 'up'

export function SectionIndex({ section }: { section: SectionId }) {
  const meta = sectionMeta(section)
  const pages = pagesIn(section)
  return (
    <Stack gap={5}>
      <Stack gap={2}>
        <Eyebrow>Section</Eyebrow>
        <Heading level={1}>{meta.label}</Heading>
        <Text muted>{meta.blurb}</Text>
      </Stack>

      <Grid cols={2}>
        {pages.map((page) => (
          <Card key={page.path}>
            <Stack gap={3}>
              <Heading level={3}>{page.title}</Heading>
              <Text size="sm" muted>
                {page.description}
              </Text>
              <Text size="sm">
                <a href={href(`/${page.section}/${page.slug}`)}>Read it</a>
              </Text>
              <Badge tone={tone(page.stage)}>{page.stage}</Badge>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  )
}
