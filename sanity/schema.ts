import { defineType, defineField } from "sanity";
import { IconPicker } from "../sanity/components/IconPicker";
import { FeatureIconPicker } from "../sanity/components/FeatureIconPicker";

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
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      components: { input: IconPicker },
    }),
    defineField({
      name: "showOnPreviewEnabled",
      title: "Enable preview checkbox for items",
      type: "boolean",
      initialValue: false,
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
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { accept: "image/*" },
              fields: [{ name: "imageUrl", title: "Or paste external image URL", type: "string" }],
            },
            {
              name: "showOnPreview",
              title: "Show on preview page",
              type: "boolean",
              initialValue: false,
              hidden: ({ document }) => !document?.showOnPreviewEnabled,
            },
          ],
          preview: { select: { title: "name", subtitle: "price" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "locale" } },
});

const homePageSettings = defineType({
  name: "homePageSettings",
  title: "🏠 Home Page",
  type: "document",
  fields: [
    defineField({ name: "heroTitleLine1", title: "Hero Title Line 1", type: "string" }),
    defineField({ name: "heroTitleLine2", title: "Hero Title Line 2 (highlighted)", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text" }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { accept: "image/*" },
      fields: [{ name: "imageUrl", title: "Or paste external image URL", type: "string" }],
    }),
    defineField({
      name: "heroButtons",
      title: "Hero Buttons",
      type: "array",
      of: [{
        type: "object",
        name: "button",
        title: "Button",
        fields: [
          { name: "label", title: "Label", type: "string" },
          { name: "linkPage", title: "Link Page", type: "string", options: { list: ["coffee", "cocktails", "menu", "about", "contact"] } },
          { name: "icon", title: "Icon", type: "string", description: "Leave empty for no icon", components: { input: IconPicker } },
          { name: "showIcon", title: "Show icon?", type: "boolean", initialValue: true },
        ],
        preview: { select: { title: "label", subtitle: "linkPage" } },
      }],
    }),
    defineField({
      name: "features",
      title: "Feature Cards",
      type: "array",
      of: [{
        type: "object",
        name: "feature",
        title: "Feature",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "description", title: "Description", type: "text" },
          { name: "icon", title: "Icon", type: "string", components: { input: FeatureIconPicker } },
        ],
        preview: { select: { title: "title", subtitle: "icon" } },
      }],
    }),
    defineField({ name: "experienceSectionTitle", title: "Internal section title", type: "string", description: "Only visible here in the admin" }),
    defineField({
      name: "experienceCards",
      title: "Experience Cards (bottom section)",
      type: "array",
      of: [{
        type: "object",
        name: "card",
        title: "Card",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "description", title: "Description", type: "text" },
          { name: "linkLabel", title: "Link Label", type: "string" },
          { name: "linkPage", title: "Link Page", type: "string", options: { list: ["coffee", "cocktails", "menu"] } },
          { name: "image", title: "Image", type: "image", options: { accept: "image/*" }, fields: [{ name: "imageUrl", title: "Or paste external image URL", type: "string" }] },
        ],
        preview: { select: { title: "title", subtitle: "linkPage" } },
      }],
    }),
  ],
});

const aboutPageSettings = defineType({
  name: "aboutPageSettings",
  title: "📖 About Us",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Section Title", type: "string" }),
    defineField({
      name: "storyImage",
      title: "Story Image",
      type: "image",
      options: { accept: "image/*" },
      fields: [{ name: "imageUrl", title: "Or paste external image URL", type: "string" }],
    }),
    defineField({
      name: "storyParagraphs",
      title: "Story Paragraphs",
      type: "array",
      of: [{ type: "text", name: "paragraph", title: "Paragraph" }],
    }),
    defineField({ name: "valuesHeadline", title: "Values Section Title", type: "string" }),
    defineField({
      name: "values",
      title: "Values Cards",
      type: "array",
      of: [{
        type: "object",
        name: "value",
        title: "Value",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "description", title: "Description", type: "text" },
          { name: "icon", title: "Icon", type: "string", components: { input: FeatureIconPicker } },
        ],
        preview: { select: { title: "title", subtitle: "icon" } },
      }],
    }),
    defineField({ name: "findUsHeadline", title: '"Find Us" Title', type: "string" }),
    defineField({
      name: "mapImage",
      title: "Map Image",
      type: "image",
      options: { accept: "image/*" },
      fields: [{ name: "imageUrl", title: "Or paste external image URL", type: "string" }],
    }),
    defineField({ name: "ctaText", title: "CTA Button Text", type: "string" }),
    defineField({
      name: "ctaLinkPage",
      title: "CTA Link Page",
      type: "string",
      options: { list: ["contact", "menu", "about"] },
    }),
  ],
});

const contactSettings = defineType({
  name: "contactSettings",
  title: "📞 Contact Info",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "pageSubtitle", title: "Page Subtitle", type: "text" }),
    defineField({ name: "formTitle", title: "Form Title", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
  ],
});

export const schemaTypes = [menuCategory, homePageSettings, aboutPageSettings, contactSettings];