"use client";

import { cn } from "@/lib/utils";
import { usePrivacy } from "@/providers/privacy";
import { Button } from "../ui/button";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useAccessibilityContext } from "@/providers/accessibility";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Portal } from "../ui/portal";

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

export const PrivacyBanner: React.FC = () => {
  const t = useTranslations("privacy");

  const { showConsent, updateCookieConsent } = usePrivacy();
  const { motionPreference } = useAccessibilityContext();

  const shouldAnimate = motionPreference !== "no-motion";

  if (!showConsent) {
    return null;
  }

  return (
    <Portal>
      <AnimatePresence mode="wait">
        <motion.div
          role="alertdialog"
          aria-label={t("title")}
          className={cn(
            "fixed inset-x-4 bottom-4 z-50 mx-auto",
            "w-full max-w-sm md:max-w-2xl rounded-lg border bg-background shadow-lg md:bottom-8",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          )}
          {...(shouldAnimate && {
            initial: "initial",
            animate: "animate",
            exit: "exit",
            variants: variants,
          })}
        >
          <ScrollArea className="max-h-[80vh]">
            <div className="p-6">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed">{t("mainText")}</p>

                <div className="space-y-4">
                  <CookieCategory
                    title={t("cookies.essential.title")}
                    description={t("cookies.essential.description")}
                    status={t("cookies.essential.status")}
                  />

                  <Separator />

                  <CookieCategory
                    title={t("cookies.analytics.title")}
                    description={t("cookies.analytics.description")}
                    status={t("cookies.analytics.status")}
                  />

                  <Separator />

                  <CookieCategory
                    title={t("cookies.marketing.title")}
                    description={t("cookies.marketing.description")}
                    status={t("cookies.marketing.status")}
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
                <div className="text-sm">
                  <Link
                    href="/legal/cookie"
                    prefetch={false}
                    className="text-sm underline-offset-4 hover:text-primary hover:underline"
                  >
                    {t("actions.learnMore")}
                  </Link>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => updateCookieConsent(false, true)}
                  >
                    {t("actions.decline")}
                  </Button>
                  {/* <Button
                variant="outline"
                onClick={() => updateCookieConsent(false, false)}
              >
                {t("actions.customize")}
              </Button> */}
                  <Button onClick={() => updateCookieConsent(true, false)}>
                    {t("actions.acceptAll")}
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </motion.div>
      </AnimatePresence>
    </Portal>
  );
};

interface CookieCategoryProps {
  title: string;
  description: string;
  status: string;
}

function CookieCategory({ title, description, status }: CookieCategoryProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        <span className="text-xs text-muted-foreground">{status}</span>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
