# **Caveats When Working with Payload CMS**

## **Table of Contents**

- [**Caveats When Working with Payload CMS**](#caveats-when-working-with-payload-cms) - [**Table of Contents**](#table-of-contents)
  - [**1. Introduction**](#1-introduction)
  - [**2. Type Generation**](#2-type-generation)
    - [**Example**](#example)
  - [**3. PostgreSQL \& Enum Handling**](#3-postgresql--enum-handling)
    - [**Recommendation**](#recommendation)
    - [**Example**](#example-1)
  - [**4. Field Configuration Best Practices**](#4-field-configuration-best-practices)
  - [**5. Conclusion**](#5-conclusion)

---

## **1. Introduction**

Payload CMS is a robust headless CMS, but certain quirks and limitations can arise depending on your configuration and use case. This document highlights specific caveats we've encountered while working with Payload, particularly regarding type generation and database handling with PostgreSQL.

---

## **2. Type Generation**

When using Payload CMS, you may notice that **TypeScript types aren't generated as expected** in some scenarios. This can lead to issues with type safety and code maintainability.

- **Issue**: By default, Payload does not automatically generate reusable or composable types.
- **Recommendation**: Always configure your schemas to use `interfaceName` for generating composable GraphQL and TypeScript types. This ensures that your types are clean and reusable.

- **Reference**: [Payload CMS Blog: InterfaceName Generating Composable GraphQL and TypeScript Types](https://payloadcms.com/blog/interfacename-generating-composable-graphql-and-typescript-types)

### **Example**

```typescript
// Schema with interfaceName
import { buildConfig } from "payload/config";

export default buildConfig({
  collections: [
    {
      slug: "posts",
      labels: { singular: "Post", plural: "Posts" },
      interfaceName: "Post",
      fields: [
        { name: "title", type: "text" },
        { name: "content", type: "richText" },
      ],
    },
  ],
});
```

Using `interfaceName` in your schema configuration ensures better type inference in your TypeScript codebase.

---

## **3. PostgreSQL & Enum Handling**

If you are using **PostgreSQL** as your database (as we are), Payload handles enums in an unconventional manner, which can lead to issues:

- **Issue**: Payload generates enums with names and formats that may not align with standard practices or your project’s requirements.
- **Impact**: This can make the database schema harder to read and maintain, particularly in larger projects.

### **Recommendation**

For fields like **selects** or **option fields**, explicitly define the `enum` for your field instead of relying on Payload’s defaults. This gives you greater control and clarity.

- **Reference**: [Payload CMS Docs: Select Fields](https://payloadcms.com/docs/fields/select)

### **Example**

```typescript
// Explicitly defining an enum
import { buildConfig } from "payload/config";

export default buildConfig({
  collections: [
    {
      slug: "posts",
      fields: [
        {
          name: "status",
          type: "select",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
          ],
          enumName: "PostStatus", // Explicit enum for PostgreSQL
        },
      ],
    },
  ],
});
```

By explicitly setting the `enum`, your database schema remains consistent and easier to manage.

---

## **4. Field Configuration Best Practices**

- **Select Fields**: Always define your options and enums explicitly.
- **Rich Text Fields**: Be cautious with deeply nested structures as they may require custom resolvers or processing logic.
- **Custom Validation**: Implement validation where necessary to prevent unexpected behavior at runtime.

---

## **5. Conclusion**

By adhering to these recommendations, you can avoid many common pitfalls when working with Payload CMS. Explicitly managing types and database schema is critical for maintaining a scalable and maintainable codebase.
