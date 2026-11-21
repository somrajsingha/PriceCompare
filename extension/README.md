# PriceCompare browser extension

This Chrome/Edge extension uses the existing local website API. It fills the search box from an open Amazon India, Flipkart, Croma, or JioMart product page. You can also search manually.

1. In the project root, run `npm start` with Node.js 18 or newer.
2. Open `chrome://extensions` or `edge://extensions` and enable Developer mode.
3. Choose **Load unpacked** and select this `extension` folder.
4. Pin PriceCompare, open a product page, and click the extension icon.

The server scrapes Amazon and Flipkart. Its JioMart and Croma prices are estimates derived from those results, so the popup labels them as estimates. For a deployed API, change the localhost URL in `popup.js` and the matching `host_permissions` in `manifest.json`.
