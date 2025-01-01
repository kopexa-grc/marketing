import { CMSLink } from "@/components/cms/cms-link";
import { cn } from "@/lib/utils";
import type { MainMenuSections } from "@/payload-types";

type LinkSectionProps = {
  section: NonNullable<MainMenuSections>[number];
  sectionsLength: number;
};

export const LinkSection = ({ section, sectionsLength }: LinkSectionProps) => {
  return (
    <div className="border-r last:border-none flex-auto p-8 max-w-96">
      {section.title && (
        <p className={cn("font-sans text-base px-4 py-2.5", "font-semibold")}>
          {section.title}
        </p>
      )}
      {Array.isArray(section.links) && (
        <ul
          className={cn(
            section.links.length > 4 && sectionsLength <= 2
              ? // grid
                "grid grid-cols-2 auto-rows-auto gap-2.5"
              : "flex flex-col gap-2.5"
          )}
        >
          {section.links.map((link) => (
            <li key={`${link.id}`} className="flex items-center">
              <CMSLink
                {...link.link}
                appearance="none"
                className="cursor-pointer w-full group"
              >
                <div
                  className={cn(
                    "flex flex-col py-3 px-4 rounded-2xl",
                    "group-hover:bg-accent"
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold leading-none text-sm group-hover:text-primary">
                      {link.label}
                    </span>
                    <span className="text-sm text-accent-foreground">
                      {link.description}
                    </span>
                  </div>
                </div>
              </CMSLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};