# Wp Panda HTML Export

Build the complete static website with:

```bash
npm run build
```

The production export is `dist/index.html`. The single-file Vite plugin embeds the application JavaScript and CSS into that HTML file. Keep the two local visual assets beside it when deploying:

- `dist/panda.svg`
- `dist/images/wp-panda-hero.png`

The interface includes the home page, product catalog and product pages, gallery and preview dialogs, checkout, blog and article pages, knowledge base, FAQ, support-account flow, and WooCommerce-style customer account. Client-side sections are navigated through hash routes such as `#/shop`, `#/faq`, and `#/account`.

Google Fonts and product/article photography are loaded from external services, so those visuals require an internet connection. The app UI and state handling are bundled in the HTML; production payment processing and WordPress/WooCommerce data connections still require backend integration.