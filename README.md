# Awesome React Native App

A modern React Native starter showcasing a beautiful home screen, product catalog, product details, cart with quantity controls, and a simple checkout and payment flow — all implemented with core React Native and `react-native-safe-area-context`.

## Features

- **Home**: Polished UI with greeting, search, and product list
- **Products**: Popular products with image, name, price, actions
- **Product Details**: Large media, price, description, Add to Cart
- **Cart**: Badge in header, qty increment/decrement, computed total
- **Checkout**: Shipping form and order total
- **Payment**: Basic card form and mock payment that clears cart
- **Light/Dark**: Theming via `useColorScheme()`

## Tech Stack

- React Native

## Project Structure

```
.
├─ app.json                  # App name (must match native entry)
├─ index.js                  # AppRegistry registration
├─ App.jsx                   # App UI, routes (home/details/cart/checkout/payment), cart logic
├─ android/                  # Android native project
├─ ios/                      # iOS native project
└─ README.md                 # This file
```

### Key modules

- `App.jsx`
  - `PRODUCTS`: Static product catalog
  - `App()`: Holds route and cart state
  - `AppContent`: Renders screens based on `route` (`home`, `details`, `cart`, `checkout`, `payment`)
  - Handlers: navigation helpers and cart operations

## Screens Overview

- **Home**: Browse products, open details, add to cart
- **Details**: Shows selected product, add to cart
- **Cart**: Adjust quantity with −/＋, see total, go to Checkout
- **Checkout**: Shipping form and total, proceed to Payment
- **Payment**: Enter mock card info; on success, cart clears and returns Home

## Customization

- Update products in `PRODUCTS` at the top of `App.jsx`
- Replace emoji with vector icons (e.g., `react-native-vector-icons`)
- Integrate real navigation (e.g., React Navigation) if desired
- Persist cart with `@react-native-async-storage/async-storage`
- Integrate real payments (Stripe/Razorpay)

## Troubleshooting

- Invariant “Application has not been registered”: ensure `app.json` `name` matches Android `MainActivity.getMainComponentName()` and `index.js` registration.
- Hooks error after edits: restart Metro with `--reset-cache`.

## License

MIT
