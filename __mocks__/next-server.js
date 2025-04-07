export class NextResponse {
  constructor(body, init = {}) {
    this.body = body
    this.status = init.status || 200
    this.headers = new Headers(init.headers)
  }

  static json(data, init = {}) {
    const response = new NextResponse(JSON.stringify(data), init)
    response.headers.set('content-type', 'application/json')
    return response
  }

  json() {
    return Promise.resolve(JSON.parse(this.body))
  }
} 