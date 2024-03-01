import '@code-hike/mdx/styles'
import 'config/code-hike.scss'
import '../styles/main.scss'
import '../styles/new-docs.scss'
import '../styles/prism-okaidia.scss'

import { ThemeProvider } from 'common'
import { CommandMenuProvider, PortalToast, TabsProvider } from 'ui'

import Favicons from '~/components/Favicons'
import { AuthContainer, SignOutHandler } from '~/features/auth/auth.client'
import { QueryClientProvider } from '~/features/data/queryClient.client'
import { RefDocHistoryHandler } from '~/features/docs/reference/navigation.client'
import { ShortcutPreviewBuild } from '~/features/staging/staging.client'
import { PageTelemetry } from '~/features/telemetry/telemetry.client'
import { ThemeSandbox } from '~/features/ui/theme/theme.client'
import { ScrollRestoration } from '~/features/ui/utils/scroll.client'
import SiteLayout from '~/layouts/SiteLayout'
import type { AppPropsWithLayout } from '~/types'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <ShortcutPreviewBuild>
      <QueryClientProvider>
        <Favicons />
        <AuthContainer>
          <SignOutHandler>
            <PageTelemetry />
            <ScrollRestoration />
            <RefDocHistoryHandler />
            <ThemeProvider defaultTheme="system" enableSystem disableTransitionOnChange>
              <CommandMenuProvider site="docs">
                <TabsProvider>
                  <div className="h-screen flex flex-col">
                    <SiteLayout>
                      <PortalToast />
                      <Component {...pageProps} />
                    </SiteLayout>
                    <ThemeSandbox />
                  </div>
                </TabsProvider>
              </CommandMenuProvider>
            </ThemeProvider>
          </SignOutHandler>
        </AuthContainer>
      </QueryClientProvider>
    </ShortcutPreviewBuild>
  )
}

export default MyApp
