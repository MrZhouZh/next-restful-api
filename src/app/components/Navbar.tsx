import Link from "next/link";
import { FaFacebook, FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Navbar() {
  const socials: {
    href: string
    icon: React.JSX.Element
  }[] = [
    // {
    //   href: 'https://www.youtube.com/channel/UC6A66BIHpJYhOzf4zqk125Q',
    //   icon: <FaYoutube />
    // },
    {
      href: 'https://twitter.com/JacezChou',
      icon: <FaTwitter />
    },
    {
      href: 'https://github.com/MrZhouZh',
      icon: <FaGithub />
    },
    // {
    //   href: 'https://www.facebook.com/dylan.zhou.982/',
    //   icon: <FaFacebook />
    // }
  ]
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 z-10 drop-shadow">
      <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
          <Link href="/" className="text-white/90 no-underline hover:text-white">Zeke Chow</Link>
        </h1>
        <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
          {socials.map(socials => (
            <Link
              key={socials.href}
              className="text-white/90 hover:text-white"
              href={socials.href}
              target="_blank"
            >
              {socials.icon}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
