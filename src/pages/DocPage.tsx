import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Stack, Row } from '@/components/pouf/layout'
import { Heading, Text, Eyebrow } from '@/components/pouf/text'
import { Card } from '@/components/pouf/surface'
import { Badge } from '@/components/pouf/media'
import { sectionMeta, type Page } from '@/lib/content'
import { href } from '@/lib/base'

const tone = (stage: string) =>
  stage === 'running' ? 'info' : stage === 'analysis' ? 'warn' : stage === 'design' ? 'idle' : 'up'

export function DocPage({ page }: { page: Page }) {
  const meta = sectionMeta(page.section)
  return (
    <Stack gap={5}>
      <Stack gap={2}>
        <Eyebrow>{meta.label}</Eyebrow>
        <Heading level={1}>{page.title}</Heading>
        <Text muted>{page.description}</Text>
        <Row gap={3} align="center" wrap>
          <Badge tone={tone(page.stage)}>{page.stage}</Badge>
          <Text size="sm" muted mono>
            updated {page.updated}
          </Text>
        </Row>
      </Stack>

      <Card>
        <div className="prose-pouf">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.body.replace(/^\s*#\s+[^\n]*\n/, '')}</ReactMarkdown>
        </div>
      </Card>

      <Text size="sm" muted>
        <a href={href(`/${page.section}`)}>← All of {meta.label.toLowerCase()}</a>
      </Text>
    </Stack>
  )
}
