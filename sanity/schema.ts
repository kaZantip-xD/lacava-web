import { defineType, defineField } from "sanity";

const menuCategory = defineType({
  name: "menuCategory",
  title: "Menu Categories",
  type: "document",
  fields: [
    defineField({
      name: "locale",
      title: "Language",
      type: "string",
      options: { list: ["en", "ua"] },
      initialValue: "en",
    }),
    defineField({
      name: "title",
      title: "Category Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Options: Utensils, Coffee, Wine, Beer, CupSoda, Apple, Sandwich, IceCream",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
    defineField({
      name: "items",
      title: "Menu Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "item",
          title: "Item",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "description", title: "Description / Ingredients", type: "text" },
            { name: "price", title: "Price", type: "string" },
            { name: "image", title: "Image (upload file)", type: "image" },
            { name: "imageUrl", title: "Image (paste URL)", type: "string", description: "Paste an image URL like https://images.unsplash.com/..." },
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "locale" },
  },
});

export const schemaTypes = [menuCategory];