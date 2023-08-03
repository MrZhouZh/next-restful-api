import { NextResponse } from "next/server"

const allowOrigins = process.env.NODE_ENV === 'production'
  ? [
      `https://next-restful-eizniie2y-mrzhouzh.vercel.app`,
      `https://next-restful-api-mrzhouzh.vercel.app`,
      `https://next-restful-api-git-main-mrzhouzh.vercel.app`,
      `https://next-restful-api.vercel.app`,
      `${process.env.API_URL}`
    ]
  : [`${process.env.API_URL}`]

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

  const res = NextResponse.next()
  // add the CORS headers to the response
  if (origin && allowOrigins.includes(origin)) {
    res.headers.append('Access-Control-Allow-Origin', origin);
    // res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
  }
  res.headers.append('Access-Control-Allow-Credentials', "true")
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  return res
}

export const config = {
  matcher: '/api/:path*',
}
