import type { User } from "@/payload-types";
import { Media } from "../media";
import { Heading, Paragraph } from "@/components/ui/typography";
import { Globe, type LucideIcon } from "lucide-react";
import { GitHubIcon } from "@/components/icons/github-icon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { TwitterIcon } from "@/components/icons/twitter-icon";

type UserBiographySectionProps = {
  user: User;
};

interface SocialLink {
  href: string;
  icon: LucideIcon;
  label: string;
  showLabel?: boolean;
}

export const UserBiographySection = ({ user }: UserBiographySectionProps) => {
  const socialLinks = [
    user.socialLinks?.website && {
      href: user.socialLinks.website,
      icon: Globe,
      label: "Website",
      showLabel: true,
    },
    user.socialLinks?.twitter && {
      href: `https://twitter.com/${user.socialLinks.twitter}`,
      icon: TwitterIcon,
      label: "Twitter profile",
    },
    user.socialLinks?.linkedin && {
      href: user.socialLinks.linkedin,
      icon: LinkedInIcon,
      label: "LinkedIn profile",
    },
    user.socialLinks?.github && {
      href: user.socialLinks.github,
      icon: GitHubIcon,
      label: "GitHub profile",
    },
  ].filter((link): link is SocialLink => link !== null && link !== undefined);

  return (
    <section className="layout" itemScope itemType="https://schema.org/Person">
      <div className="col-span-4 lg:col-span-6 lg:col-start-4 flex flex-col items-center gap-4 text-center">
        {user.avatar && (
          <Media
            resource={user.avatar}
            imgClassName="size-16 rounded-full grayscale object-cover"
            alt={`Profile photo of ${user.name}`}
            itemProp="image"
          />
        )}
        <Heading as="h1" level={1} itemProp="name">
          {user.name}
        </Heading>
        {user.headline && (
          <Paragraph className="font-bold" itemProp="jobTitle">
            {user.headline}
          </Paragraph>
        )}
        {user.bio && <Paragraph itemProp="description">{user.bio}</Paragraph>}

        {/** social media links and website, socials with icons */}
        <nav className="flex gap-4 mt-4" aria-label="Social media profiles">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              aria-label={link.label}
            >
              <link.icon className="w-5 h-5" aria-hidden="true" />
              {link.showLabel && link.href}
              <span className="sr-only">{link.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
};
