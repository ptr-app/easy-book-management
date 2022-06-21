function middlewarePipeline(context, middleware, index) {
  const nextMiddleware = middleware[index]

  if (!nextMiddleware) {
    return context.next
  }

  return () => {
    const nextPiepline = middlewarePipeline(context, middleware, index + 1)
    nextMiddleware({ ...context, next: nextPiepline })
  }
}

export default middlewarePipeline
