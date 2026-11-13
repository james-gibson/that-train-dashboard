import { Stack } from '@/components/pouf/layout'
import { Heading, Text, Eyebrow } from '@/components/pouf/text'
import { href } from '@/lib/base'

export function NotFound() {
  return (
    <Stack gap={3}>
      <Eyebrow>404</Eyebrow>
      <Heading level={1}>No page at this address.</Heading>
      <Text muted>
        The path is the URL here, so a missing page is a missing file. Start from{' '}
        <a href={href('/')}>the dashboard</a>.
      </Text>
    </Stack>
  )
}
