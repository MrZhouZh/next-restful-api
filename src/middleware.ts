import { NextResponse } from "next/server"

const allowOrigins = process.env.NODE_ENV === 'production'
  ? ['https://www.yoursite.com', 'https://yoursite.com']
  : ['http://localhost:3000']

export function middleware(req: Request) {
  const origin = req.headers.get('origin')
  console.log({ origin });
  
  if (origin && !allowOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  console.log('Middleware!');

  console.log({ method: req.method });
  console.log({ url: req.url });

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
