import { ErrorBoundary } from "react-error-boundary"
import { ErrorView } from "../molecules/ErrorView"
import { ReactNode, Suspense } from "react"
import { LoadingView } from "../molecules/LoadingView"
import { QueryErrorResetBoundary } from "@tanstack/react-query"

export const SuspenseLoader = ({ children }: { children: ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={(props) => <ErrorView {...props} />}>
          <Suspense fallback={<LoadingView />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
