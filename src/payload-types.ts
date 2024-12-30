/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Configure the footer navigation columns
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FooterColumn".
 */
export type FooterColumn =
  | {
      /**
       * Section heading
       */
      label: string;
      /**
       * Links in this section
       */
      navItems?:
        | {
            link: CMSLinkField;
            id?: string | null;
          }[]
        | null;
      id?: string | null;
    }[]
  | null;
/**
 * Add social media links
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FooterSocialMediaLink".
 */
export type FooterSocialMediaLink =
  | {
      platform: 'twitter' | 'linkedin' | 'github' | 'instagram';
      link?: CMSLinkField;
      id?: string | null;
    }[]
  | null;
/**
 * Add legal/policy links
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FooterLegalLink".
 */
export type FooterLegalLink =
  | {
      link: CMSLinkField;
      id?: string | null;
    }[]
  | null;

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    pages: Page;
    users: User;
    media: Media;
    partners: Partner;
    forms: Form;
    'form-submissions': FormSubmission;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    pages: PagesSelect<false> | PagesSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    partners: PartnersSelect<false> | PartnersSelect<true>;
    forms: FormsSelect<false> | FormsSelect<true>;
    'form-submissions': FormSubmissionsSelect<false> | FormSubmissionsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    'main-menu': MainMenu;
    footer: Footer;
    'partner-program': PartnerProgram;
  };
  globalsSelect: {
    'main-menu': MainMenuSelect<false> | MainMenuSelect<true>;
    footer: FooterSelect<false> | FooterSelect<true>;
    'partner-program': PartnerProgramSelect<false> | PartnerProgramSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  fullTitle?: string | null;
  noindex?: boolean | null;
  hero: {
    type: 'default' | 'hero';
    layout?: ('centered' | 'start') | null;
    tagline?: string | null;
    heading?: string | null;
    description?: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    } | null;
    links?:
      | {
          link: CMSLinkField;
          id?: string | null;
        }[]
      | null;
    media?: (number | null) | Media;
  };
  layout: (
    | CallToActionBlock
    | PromoCardBlock
    | TextWithImageBlock
    | DividerBlock
    | MetricsBlock
    | ContentBlock
    | CardGridBlock
    | FeatureGridBlock
    | SolutionShowcaseBlock
  )[];
  publishedAt?: string | null;
  slug?: string | null;
  slugLock?: boolean | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  };
  parent?: (number | null) | Page;
  breadcrumbs?:
    | {
        doc?: (number | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CMSLinkField".
 */
export interface CMSLinkField {
  type?: ('reference' | 'custom') | null;
  newTab?: boolean | null;
  reference?: {
    relationTo: 'pages';
    value: number | Page;
  } | null;
  url?: string | null;
  label: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CallToActionBlock".
 */
export interface CallToActionBlock {
  title?: string | null;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  links?:
    | {
        link: CMSLinkField;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'cta';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PromoCardBlock".
 */
export interface PromoCardBlock {
  heading: string;
  description?: string | null;
  link: CMSLinkField;
  dark?: boolean | null;
  icon?: 'Sparkles' | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'promo-card';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TextWithImageBlock".
 */
export interface TextWithImageBlock {
  title: string;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  media: number | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'text-with-image';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "DividerBlock".
 */
export interface DividerBlock {
  id?: string | null;
  blockName?: string | null;
  blockType: 'divider';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MetricsBlock".
 */
export interface MetricsBlock {
  title: string;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  metrics?:
    | {
        label?: string | null;
        value?: string | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'metrics';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ContentBlock".
 */
export interface ContentBlock {
  layout?: ('oneColumn' | 'twoColumns' | 'threeColumns') | null;
  columnOne: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  columnTwo?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  columnThree?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'content';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CardGridBlock".
 */
export interface CardGridBlock {
  heading?: string | null;
  description?: string | null;
  layout?: ('grid' | 'list' | 'masonry') | null;
  cards?:
    | {
        title: string;
        subtitle?: string | null;
        description?: string | null;
        media?: (number | null) | Media;
        link: CMSLinkField;
        appearance?: {
          theme?: ('default' | 'primary' | 'secondary') | null;
          enableHover?: boolean | null;
          aspectRatio?: ('16/9' | '4/3' | '1/1' | 'auto') | null;
        };
        id?: string | null;
      }[]
    | null;
  settings?: {
    columns?: ('2' | '3' | '4') | null;
    gap?: ('small' | 'medium' | 'large') | null;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'cardGrid';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FeatureGridBlock".
 */
export interface FeatureGridBlock {
  theme: ThemeField;
  layout?: ('grid' | 'list' | 'masonry') | null;
  headline: {
    title: string;
    description: string;
    alignment?: ('center' | 'left' | 'right') | null;
  };
  cards?:
    | {
        /**
         * Name of the Lucide icon to use
         */
        icon: string;
        title: string;
        description: string;
        id?: string | null;
      }[]
    | null;
  showPromoCard?: boolean | null;
  /**
   * Optional promotional card at the bottom
   */
  promoCard?: {
    theme: ThemeField;
    title?: string | null;
    description?: string | null;
    link: CMSLinkField;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'featureGrid';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ThemeField".
 */
export interface ThemeField {
  colorMode: 'light' | 'dark';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "SolutionShowcaseBlock".
 */
export interface SolutionShowcaseBlock {
  theme: ThemeField;
  heading: {
    title: string;
    description?: string | null;
    alignment?: ('center' | 'left') | null;
  };
  /**
   * Add solutions or use cases to display
   */
  solutions: {
    theme: ThemeField;
    title: string;
    description: string;
    media?: {
      mediaType?: ('image' | 'icon') | null;
      image?: (number | null) | Media;
      /**
       * Name of the Lucide icon to use
       */
      icon?: string | null;
    };
    id?: string | null;
  }[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'solutionShowcase';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name?: string | null;
  roles: ('admin' | 'public')[];
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "partners".
 */
export interface Partner {
  id: number;
  name: string;
  website: string;
  email: string;
  slug: string;
  slugLock?: boolean | null;
  /**
   * Set to inactive to hide this partner from the directory.
   */
  agency_status?: ('active' | 'inactive') | null;
  logo: number | Media;
  /**
   * This field is managed by the Featured Partners field in the Partner Program collection
   */
  featured?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "forms".
 */
export interface Form {
  id: number;
  title: string;
  fields?:
    | (
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            defaultValue?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'checkbox';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'country';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'email';
          }
        | {
            message?: {
              root: {
                type: string;
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'message';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'number';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            options?:
              | {
                  label: string;
                  value: string;
                  id?: string | null;
                }[]
              | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'select';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'state';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'text';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'textarea';
          }
      )[]
    | null;
  submitButtonLabel?: string | null;
  /**
   * Choose whether to display an on-page message or redirect to a different page after they submit the form.
   */
  confirmationType?: ('message' | 'redirect') | null;
  confirmationMessage?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  redirect?: {
    url: string;
  };
  /**
   * Send custom emails when the form submits. Use comma separated lists to send the same email to multiple recipients. To reference a value from this form, wrap that field's name with double curly brackets, i.e. {{firstName}}. You can use a wildcard {{*}} to output all data and {{*:table}} to format it as an HTML table in the email.
   */
  emails?:
    | {
        emailTo?: string | null;
        cc?: string | null;
        bcc?: string | null;
        replyTo?: string | null;
        emailFrom?: string | null;
        subject: string;
        /**
         * Enter the message that should be sent in this email.
         */
        message?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form-submissions".
 */
export interface FormSubmission {
  id: number;
  form: number | Form;
  submissionData?:
    | {
        field: string;
        value: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'partners';
        value: number | Partner;
      } | null)
    | ({
        relationTo: 'forms';
        value: number | Form;
      } | null)
    | ({
        relationTo: 'form-submissions';
        value: number | FormSubmission;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  fullTitle?: T;
  noindex?: T;
  hero?:
    | T
    | {
        type?: T;
        layout?: T;
        tagline?: T;
        heading?: T;
        description?: T;
        links?:
          | T
          | {
              link?: T | CMSLinkFieldSelect<T>;
              id?: T;
            };
        media?: T;
      };
  layout?:
    | T
    | {
        cta?: T | CallToActionBlockSelect<T>;
        'promo-card'?: T | PromoCardBlockSelect<T>;
        'text-with-image'?: T | TextWithImageBlockSelect<T>;
        divider?: T | DividerBlockSelect<T>;
        metrics?: T | MetricsBlockSelect<T>;
        content?: T | ContentBlockSelect<T>;
        cardGrid?: T | CardGridBlockSelect<T>;
        featureGrid?: T | FeatureGridBlockSelect<T>;
        solutionShowcase?: T | SolutionShowcaseBlockSelect<T>;
      };
  publishedAt?: T;
  slug?: T;
  slugLock?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  parent?: T;
  breadcrumbs?:
    | T
    | {
        doc?: T;
        url?: T;
        label?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CMSLinkField_select".
 */
export interface CMSLinkFieldSelect<T extends boolean = true> {
  type?: T;
  newTab?: T;
  reference?: T;
  url?: T;
  label?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CallToActionBlock_select".
 */
export interface CallToActionBlockSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  links?:
    | T
    | {
        link?: T | CMSLinkFieldSelect<T>;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PromoCardBlock_select".
 */
export interface PromoCardBlockSelect<T extends boolean = true> {
  heading?: T;
  description?: T;
  link?: T | CMSLinkFieldSelect<T>;
  dark?: T;
  icon?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TextWithImageBlock_select".
 */
export interface TextWithImageBlockSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  media?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "DividerBlock_select".
 */
export interface DividerBlockSelect<T extends boolean = true> {
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MetricsBlock_select".
 */
export interface MetricsBlockSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  metrics?:
    | T
    | {
        label?: T;
        value?: T;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ContentBlock_select".
 */
export interface ContentBlockSelect<T extends boolean = true> {
  layout?: T;
  columnOne?: T;
  columnTwo?: T;
  columnThree?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CardGridBlock_select".
 */
export interface CardGridBlockSelect<T extends boolean = true> {
  heading?: T;
  description?: T;
  layout?: T;
  cards?:
    | T
    | {
        title?: T;
        subtitle?: T;
        description?: T;
        media?: T;
        link?: T | CMSLinkFieldSelect<T>;
        appearance?:
          | T
          | {
              theme?: T;
              enableHover?: T;
              aspectRatio?: T;
            };
        id?: T;
      };
  settings?:
    | T
    | {
        columns?: T;
        gap?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FeatureGridBlock_select".
 */
export interface FeatureGridBlockSelect<T extends boolean = true> {
  theme?: T | ThemeFieldSelect<T>;
  layout?: T;
  headline?:
    | T
    | {
        title?: T;
        description?: T;
        alignment?: T;
      };
  cards?:
    | T
    | {
        icon?: T;
        title?: T;
        description?: T;
        id?: T;
      };
  showPromoCard?: T;
  promoCard?:
    | T
    | {
        theme?: T | ThemeFieldSelect<T>;
        title?: T;
        description?: T;
        link?: T | CMSLinkFieldSelect<T>;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ThemeField_select".
 */
export interface ThemeFieldSelect<T extends boolean = true> {
  colorMode?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "SolutionShowcaseBlock_select".
 */
export interface SolutionShowcaseBlockSelect<T extends boolean = true> {
  theme?: T | ThemeFieldSelect<T>;
  heading?:
    | T
    | {
        title?: T;
        description?: T;
        alignment?: T;
      };
  solutions?:
    | T
    | {
        theme?: T | ThemeFieldSelect<T>;
        title?: T;
        description?: T;
        media?:
          | T
          | {
              mediaType?: T;
              image?: T;
              icon?: T;
            };
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  roles?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "partners_select".
 */
export interface PartnersSelect<T extends boolean = true> {
  name?: T;
  website?: T;
  email?: T;
  slug?: T;
  slugLock?: T;
  agency_status?: T;
  logo?: T;
  featured?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "forms_select".
 */
export interface FormsSelect<T extends boolean = true> {
  title?: T;
  fields?:
    | T
    | {
        checkbox?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              required?: T;
              defaultValue?: T;
              id?: T;
              blockName?: T;
            };
        country?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        email?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        message?:
          | T
          | {
              message?: T;
              id?: T;
              blockName?: T;
            };
        number?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              defaultValue?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        select?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              defaultValue?: T;
              options?:
                | T
                | {
                    label?: T;
                    value?: T;
                    id?: T;
                  };
              required?: T;
              id?: T;
              blockName?: T;
            };
        state?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        text?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              defaultValue?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        textarea?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              defaultValue?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
      };
  submitButtonLabel?: T;
  confirmationType?: T;
  confirmationMessage?: T;
  redirect?:
    | T
    | {
        url?: T;
      };
  emails?:
    | T
    | {
        emailTo?: T;
        cc?: T;
        bcc?: T;
        replyTo?: T;
        emailFrom?: T;
        subject?: T;
        message?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form-submissions_select".
 */
export interface FormSubmissionsSelect<T extends boolean = true> {
  form?: T;
  submissionData?:
    | T
    | {
        field?: T;
        value?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "main-menu".
 */
export interface MainMenu {
  id: number;
  tabs?:
    | {
        label: string;
        enableDirectLink?: boolean | null;
        link?: CMSLinkField;
        navItems?:
          | {
              label: string;
              description?: string | null;
              link?: CMSLinkField;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  ctas?:
    | {
        link: CMSLinkField;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: number;
  columns?: FooterColumn;
  social?: {
    links?: FooterSocialMediaLink;
  };
  legal?: {
    links?: FooterLegalLink;
    /**
     * Custom copyright text (optional)
     */
    copyrightText?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "partner-program".
 */
export interface PartnerProgram {
  id: number;
  /**
   * Select the form that should be used for the contact form.
   */
  contactForm: number | Form;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "main-menu_select".
 */
export interface MainMenuSelect<T extends boolean = true> {
  tabs?:
    | T
    | {
        label?: T;
        enableDirectLink?: T;
        link?: T | CMSLinkFieldSelect<T>;
        navItems?:
          | T
          | {
              label?: T;
              description?: T;
              link?: T | CMSLinkFieldSelect<T>;
              id?: T;
            };
        id?: T;
      };
  ctas?:
    | T
    | {
        link?: T | CMSLinkFieldSelect<T>;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer_select".
 */
export interface FooterSelect<T extends boolean = true> {
  columns?: T | FooterColumnSelect<T>;
  social?:
    | T
    | {
        links?: T | FooterSocialMediaLinkSelect<T>;
      };
  legal?:
    | T
    | {
        links?: T | FooterLegalLinkSelect<T>;
        copyrightText?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FooterColumn_select".
 */
export interface FooterColumnSelect<T extends boolean = true> {
  label?: T;
  navItems?:
    | T
    | {
        link?: T | CMSLinkFieldSelect<T>;
        id?: T;
      };
  id?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FooterSocialMediaLink_select".
 */
export interface FooterSocialMediaLinkSelect<T extends boolean = true> {
  platform?: T;
  link?: T | CMSLinkFieldSelect<T>;
  id?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FooterLegalLink_select".
 */
export interface FooterLegalLinkSelect<T extends boolean = true> {
  link?: T | CMSLinkFieldSelect<T>;
  id?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "partner-program_select".
 */
export interface PartnerProgramSelect<T extends boolean = true> {
  contactForm?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}