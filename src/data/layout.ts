import { defaultLocale, Locales, type TLocale } from "@/i18n/routing";
import { createClient } from "@/prismicio";
import { cache } from "react";

export const getLayoutData = cache(async (lang?: string) => {
  const client = createClient();

  let queryLang = lang;

  if (queryLang && !Locales.includes(queryLang as TLocale)) {
    queryLang = defaultLocale;
  }
  const layoutData = await client.getSingle("layout", {
    lang: queryLang,
    graphQuery: `{
        layout {
            ...layoutFields
            slices {
                ...on menu_item {
                    variation {
                        ...on withSubMenu {
                        
                            primary {
                                label
                                subMenu {
                                    ...on sub_menu {
                                        ...sub_menuFields
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }`,
  });

  return layoutData;
});

/**
 * 
 *   const layoutData = await client.getSingle("layout", {
    graphQuery: `{
        layout {
            ...layoutFields
            slices {
                ...on menu_item {
                    variation {
                        ...menuItemFields
                        ...on withSubmenu {
                            primary {
                                submenu {
                                    ...on submenu {
                                        ...submenuFields
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }`,
  });
 */
