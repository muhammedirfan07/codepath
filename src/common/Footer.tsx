import {GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon} from '../ui/Icons'
import logo from "../assets/LOGO.png"
function Footer() {
  return (
    <footer className="w-full border-t border-black/5 bg-[#FBFAF7]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <img src={logo} alt="CodePath" className="h-8 w-auto" />
          </div>
          <p className="mt-4 text-[11px] text-[#6B6B6B]">
            Explore new skills. Elevate your learning. Unlock your potential.
          </p>
        </div>
        <FooterCol title="Explore" links={["Home", "Features", "Pricing", "Blog", "Testimonials"]} />
        <FooterCol title="Company" links={["About Us", "Careers", "Partnerships", "Press & Media", "Affiliate Program"]} />
        <div>
          <div className="text-sm font-semibold">Follow</div>
          <div className="mt-3 flex gap-2 text-[#6B6B6B]">
            {[GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon].map((I, i) => (
              <a
                key={i}
                href="#"
                className="grid h-8 w-8 place-items-center rounded-full border border-black/10 hover:text-[#7C3AED]"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-black/5 py-5 text-center text-xs text-[#8A8A8A]">
        Terms of Service · Privacy policy · Cookies settings · © {new Date().getFullYear()} Your Learn-ing Platform. All Rights Reserved.
      </div>
    </footer>
  )
}
function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-[#6B6B6B]">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-[#7C3AED]">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer