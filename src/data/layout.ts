import { createClient } from "@/prismicio";

export async function getLayoutData(lang?: string) {
  const client = createClient();

  const layoutData = await client.getSingle("layout", {
    lang,
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
}

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
