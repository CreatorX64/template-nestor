# Nestor — App Landing Page Template

This is a website template built for a mobile app landing page. Thanks to Tailwind CSS's flexible nature, many design elements can easily be customized including colors, typography, and spacing.

Below is the file & folder structure of the package that you received:
- resources
  |- Nestor.fig: Figma file that includes the design files of desktop & mobile versions of the template.
- template
  |- public: Includes images, favicons, logo, and other assets that Vite will serve from root (/).
  |- src: Includes JavaScript and CSS code for the template.
  |- .gitignore: Lists files & folders that git should ignore.
  |- index.html: The main HTML file for this landing page template.
  |- package.json: Includes a list of depencencies, browser configuration, and executable commands.
  |- postcss.config.js: PostCSS configuration. We need this because we use Tailwind as a PostCSS plugin, among other plugins.
  |- tailwind.config.js: Tailwind CSS configuration.
- LICENSE.md: Includes the license for all files in this package.
- README.md: This file.

Tech stack:
- Add here

Attributions:
- Add here

(other notes below)

Each section title in **index.html** file is tagged with the "@" character. To navigate easier in this file, use the search functionality of your text editor and search for "_@section_name_". For instance to go to the _CTA_ section you can do `Ctrl+F` and search for "@cta", to go to the _How It Works_ section you can search for "@how it works", and so on. After the saerch, you'll be brought to the beginning of the section. Make sure you're searching in case insensitive mode to make the search easier.

Here are all the section names you can use with above information:

- Navigation
- Hero
- Features
- How it works
- Data points
- Testimonials
- Pricing
- Newsletter
- CTA
- Footer

In the _index.html_ file, important notes are tagged with "@NOTE" comment. I recommend reading these comments before you make updates to the file as they can save you a lot of time. Again, to see the imporant notes, you can search for "@NOTE" in your text editor.
